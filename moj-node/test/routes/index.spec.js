const request = require('supertest');
const cheerio = require('cheerio');

const createIndexRouter = require('../../server/routes/index');
const featureToggleMiddleWare = require('../../server/middleware/featureToggle');
const { setupBasicApp, logger } = require('../test-helpers');

describe('GET /', () => {
  const featuredItem = {
    id: 1,
    title: 'foo title',
    contentType: 'foo',
    summary: 'foo summary',
    image: {
      alt: 'Foo image alt text',
      url: 'image.url.com',
    },
    duration: '40:00',
  };

  const hubFeaturedContentService = {
    hubFeaturedContent: sinon.stub().returns({
      newsAndEvents: [{ ...featuredItem, title: 'News story', id: 0 }],
      music: [{ ...featuredItem, title: 'Foo radio show', id: 1 }],
      healthyMindAndBody: [{ ...featuredItem, id: 2 }],
      inspiration: [{ ...featuredItem, id: 3 }],
      scienceAndNature: [{ ...featuredItem, id: 4 }],
      artAndCulture: [{ ...featuredItem, id: 5 }],
      history: [{ ...featuredItem, id: 6 }],
      legalAndYourRights: [{ ...featuredItem, id: 7 }],
    }),
  };

  const hubPromotedContentService = {
    hubPromotedContent: sinon.stub().returns({
      ...featuredItem,
      title: 'foo promoted content',
      summary: 'foo promoted summary',
      contentUrl: 'foo.content.url',
    }),
  };

  const hubMenuService = {
    seriesMenu: sinon
      .stub()
      .returns([
        { linkText: 'Foo', href: '/content/1', id: '1' },
        { linkText: 'Bar', href: '/content/2', id: '2' },
      ]),
    homepageMenu: sinon.stub().returns([]),
  };

  it('renders promoted content', () => {
    const router = createIndexRouter({
      logger,
      hubFeaturedContentService,
      hubPromotedContentService,
      hubMenuService,
    });
    const app = setupBasicApp();

    app.use(router);

    return request(app)
      .get('/')
      .expect(200)
      .then(response => {
        const $ = cheerio.load(response.text);

        expect($('[data-promoted-item-text]').text()).to.include(
          'foo promoted content',
          'Incorrect title rendered',
        );
        expect($('[data-promoted-item-text]').text()).to.include(
          'foo promoted summary',
          'Incorrect description rendered',
        );
        expect($('[data-promoted-item-background]').attr('style')).to.include(
          'image.url.com',
          'Incorrect image rendered',
        );

        expect($('[data-call-to-action]').attr('href')).to.include(
          'foo.content.url',
          'Incorrect content url rendered',
        );
      });
  });

  it('renders featured content', () => {
    const router = createIndexRouter({
      logger,
      hubFeaturedContentService,
      hubPromotedContentService,
      hubMenuService,
    });
    const app = setupBasicApp();

    app.use(router);

    return request(app)
      .get('/')
      .expect(200)
      .then(response => {
        const $ = cheerio.load(response.text);
        const radioItemSelector =
          '[data-featured-item-id="featured-content-1"]';
        expect($('[data-featured-item-id]').length).to.equal(
          8,
          '8 featured items should be rendered',
        );
        expect($(radioItemSelector).text()).to.include(
          'Foo radio show',
          'Correct title rendered',
        );
        expect($(radioItemSelector).text()).to.include(
          'foo summary',
          'Correct description rendered',
        );
        expect(
          $(`${radioItemSelector} [data-featured-item-background]`).attr(
            'style',
          ),
        ).to.include('image.url.com', 'Correct image rendered');
        expect(
          $(`${radioItemSelector} [data-featured-item-duration]`).text(),
        ).to.include('40:00', 'Correct duration rendered');
      });
  });

  it('render a 500 when there is an error', () => {
    const hubFeaturedContentServiceFailure = {
      hubFeaturedContent: sinon.stub().throws('boom'),
    };

    const router = createIndexRouter({
      logger,
      hubFeaturedContentService: hubFeaturedContentServiceFailure,
      hubPromotedContentService,
      hubMenuService,
    });
    const app = setupBasicApp();

    app.use(router);

    return request(app)
      .get('/')
      .expect(500);
  });

  describe('when the feature the showBrowseByTopics is not enabled', () => {
    it('does not render browse by series menu', () => {
      const router = createIndexRouter({
        logger,
        hubFeaturedContentService,
        hubPromotedContentService,
        hubMenuService,
      });
      const app = setupBasicApp();

      app.use(router);

      return request(app)
        .get('/')
        .expect(200)
        .then(response => {
          const $ = cheerio.load(response.text);

          expect($('#browser-by-topic').length).to.equal(
            0,
            'should not have rendered browse by series section',
          );
        });
    });
  });

  describe('when the feature the showBrowseByTopics is enabled', () => {
    it('show the browse by series menu', () => {
      const router = createIndexRouter({
        logger,
        hubFeaturedContentService,
        hubPromotedContentService,
        hubMenuService,
      });

      const app = setupBasicApp();

      app.use(featureToggleMiddleWare(['showBrowseByTopics']));

      app.use(router);

      return request(app)
        .get('/')
        .query({ showBrowseByTopics: 'true' })
        .then(response => {
          const $ = cheerio.load(response.text);

          expect($('#browser-by-topic h1').text()).to.equal('Browse by topic');
          expect($('#browser-by-topic .govuk-hub-topics li').length).to.equal(
            6,
            'Correct number of menu items',
          );
        });
    });
  });
});
