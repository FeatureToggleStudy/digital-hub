describe('Feedback mechanism', () => {
  beforeEach(() => {
    cy.visit('/content/3151');
  });
  describe('When a user clicks the like button', () => {
    it('it sends the correct events', () => {
      cy.window()
        .its('_paq.length')
        .should('equal', 5);

      cy.get('.govuk-hub-thumbs--up').click();

      cy.window()
        .its('_paq.length')
        .should('equal', 7);

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        const containsPageViewEvent = piwikQueue.some(event =>
          event.includes('trackPageView'),
        );

        expect(containsPageViewEvent).to.equal(
          true,
          'this should be a pageViewEvent',
        );
        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('video');
        expect(action).to.equal('LIKE');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);
      });

      cy.get('.govuk-textarea').type('Hello, World');

      cy.get('#feedback-widget').within(() => {
        cy.get('.govuk-button').click();
      });

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('video');
        expect(action).to.equal('LIKE - Hello, World');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);
      });
    });
  });

  describe('When a user clicks the dislike button', () => {
    it('it sends the correct events', () => {
      cy.window()
        .its('_paq.length')
        .should('equal', 5);

      cy.get('.govuk-hub-thumbs--down').click();

      cy.window()
        .its('_paq.length')
        .should('equal', 7);

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        const containsPageViewEvent = piwikQueue.some(event =>
          event.includes('trackPageView'),
        );

        expect(containsPageViewEvent).to.equal(
          true,
          'this should be a pageViewEvent',
        );
        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('video');
        expect(action).to.equal('DISLIKE');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);
        expect(labelValues.every(Boolean)).to.equal(true);
      });

      cy.get('.govuk-textarea').type('Hello, World');

      cy.get('#feedback-widget').within(() => {
        cy.get('.govuk-button').click();
      });

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('video');
        expect(action).to.equal('DISLIKE - Hello, World');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);

        expect(labelValues.every(Boolean)).to.equal(true);
      });
    });
  });
});

describe('Feedback mechanism on search page', () => {
  beforeEach(() => {
    cy.visit('/search?query=');
  });
  describe('When a user clicks the like button', () => {
    it('it sends the correct events', () => {
      cy.window()
        .its('_paq.length')
        .should('equal', 5);

      cy.get('.govuk-hub-thumbs--up').click();

      cy.window()
        .its('_paq.length')
        .should('equal', 7);

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        const containsPageViewEvent = piwikQueue.some(event =>
          event.includes('trackSiteSearch'),
        );

        expect(containsPageViewEvent).to.equal(
          true,
          'this should be a trackSiteSearch',
        );
        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('search');
        expect(action).to.equal('LIKE');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);
      });

      cy.get('.govuk-textarea').type('Hello, World');

      cy.get('#feedback-widget').within(() => {
        cy.get('.govuk-button').click();
      });

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('search');
        expect(action).to.equal('LIKE - Hello, World');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);
      });
    });
  });

  describe('When a user clicks the dislike button', () => {
    it('it sends the correct events', () => {
      cy.window()
        .its('_paq.length')
        .should('equal', 5);

      cy.get('.govuk-hub-thumbs--down').click();

      cy.window()
        .its('_paq.length')
        .should('equal', 7);

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        const containsPageViewEvent = piwikQueue.some(event =>
          event.includes('trackSiteSearch'),
        );

        expect(containsPageViewEvent).to.equal(
          true,
          'this should be a trackSiteSearch',
        );
        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('search');
        expect(action).to.equal('DISLIKE');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);
      });

      cy.get('.govuk-textarea').type('Hello, World');

      cy.get('#feedback-widget').within(() => {
        cy.get('.govuk-button').click();
      });

      cy.window().then(({ _paq: piwikQueue }) => {
        const [eventType, contentType, action, label] = piwikQueue[
          piwikQueue.length - 1
        ];

        expect(eventType).to.equal('trackEvent');
        expect(contentType).to.equal('search');
        expect(action).to.equal('DISLIKE - Hello, World');

        const labelValues = label.split('|');

        expect(labelValues.length).to.equal(9);
      });
    });
  });
});
