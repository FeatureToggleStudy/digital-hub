const createHubFeaturedContentService = require('../../server/services/hubFeaturedContent');


const hubRepository = {
  newsAndEvents: sinon.stub().returns({ newsAndEvents: 'newsAndEvents' }),
  dayToDay: sinon.stub().returns({ dayToDay: 'dayToDay' }),
  games: sinon.stub().returns({ games: 'games' }),
  musicAndGames: sinon.stub().returns({ musicAndGames: 'musicAndGames' }),
  healthyMindAndBody: sinon.stub().returns({ healthyMindAndBody: 'healthyMindAndBody' }),
  inspiration: sinon.stub().returns({ inspiration: 'inspiration' }),
  scienceAndNature: sinon.stub().returns({ scienceAndNature: 'scienceAndNature' }),
  artAndCulture: sinon.stub().returns({ artAndCulture: 'artAndCulture' }),
  history: sinon.stub().returns({ history: 'history' }),
  legalAndYourRights: sinon.stub().returns({ legalAndYourRights: 'legalAndYourRights' }),

};


  describe('hubFeaturedService', () => {
  describe('#hubFeaturedContent', () => {
    it('returns featured content', async () => {
      const service = createHubFeaturedContentService(hubRepository);
      const response = await service.hubFeaturedContent();
      const expectedResult = {
        newsAndEvents: { newsAndEvents: 'newsAndEvents' },
        dayToDay: { dayToDay: 'dayToDay' },
        games: { games: 'games' },
        musicAndGames: { musicAndGames: 'musicAndGames' },
        healthyMindAndBody: { healthyMindAndBody: 'healthyMindAndBody' },
        inspiration: { inspiration: 'inspiration' },
        scienceAndNature: { scienceAndNature: 'scienceAndNature' },
        artAndCulture: { artAndCulture: 'artAndCulture' },
        history: { history: 'history' },
        legalAndYourRights: { legalAndYourRights: 'legalAndYourRights' },
      };

      expect(response).to.eql(expectedResult);
    });

    context('when some feature content are missing', () => {
      it('fails to return content', async () => {
        const hubRepositoryWithError = {
          newsAndEvents: sinon.stub().returns({}),
          dayToDay: sinon.stub().returns({}),
          games: sinon.stub().returns({}),
          radioShowsAndPodcasts: sinon.stub().throws(new Error('error')),
          musicAndGames: sinon.stub().returns({}),
          inspiration: sinon.stub().returns({}),
          scienceAndNature: sinon.stub().returns({}),
          artAndCulture: sinon.stub().returns({}),
          history: sinon.stub().throws(new Error('error')),
          legalAndYourRights: sinon.stub().throws(new Error('error')),
        };

        const service = createHubFeaturedContentService(hubRepositoryWithError);
        const response = await service.hubFeaturedContent();
        const expectedResult = null;

        expect(response).to.eql(expectedResult);
      });
    });
  });
});
