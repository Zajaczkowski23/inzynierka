describe('e2e test', () => {
  it('checks test', () => {
    cy.visit('http://localhost:3000/matches')

    cy.get('.header__btn').click()

    cy.get('.account-input').eq(0).type("krystian14714@gmail.com")
    cy.get('.account-input').eq(1).type("1111")

    cy.get('.form-btn').click()

    cy.get('.error').should('exist');

    cy.get('.account-input').eq(1).clear()
    cy.get('.account-input').eq(1).type("111")

    cy.get('.form-btn').click()

    cy.get('.all-matches-league-info a').eq(0).click();

    cy.get('.top-teams-container').should('exist');

    cy.get('.header__logo').click()

    cy.url().should('eq', 'http://localhost:3000/matches');

    cy.get('.data-section__teams a').eq(0).click();

    cy.get('.team-logo').should('exist');
    cy.get('.header__logo').click()

    cy.contains(/Hello/).click();
    cy.contains(/Profile/).click();

    cy.get('.profile-stats').should('exist')

    cy.contains(/Hello/).click();
    cy.contains(/Chat/).click();

    cy.get('.user-list-item').eq(0).click();
    cy.get('.message-input').type('Message');

    cy.get('.send-button').click();
    cy.get('.header__logo').click();

    cy.get('.nav__leagues__item').should('exist');
    cy.get('.calendar').should('exist');

    cy.get('.best-player').eq(0).click();
    cy.get('.stat-box').should('exist');
    cy.get('.lastMatchesContainer').should('exist');
    cy.get('.header__logo').click();

    cy.get('.sidebar-icons').eq(1).get('a').eq(2).click()
    cy.url().should('eq', 'http://localhost:3000/news');
    cy.get('.news__container').should('exist');


    cy.contains(/Hello/).click();
    cy.contains(/Logout/).click();

    cy.contains(/Sign In/).should('exist');
    cy.get('.account-link').click();

    cy.url().should('eq', 'http://localhost:3000/account/register');

    cy.get('.account-input').eq(0).type("krystian14714@gmail.com");
    cy.get('.account-input').eq(1).type("krystian14714");

    cy.get('.close').click();
    cy.get('.close').click();

    cy.url().should('not.eq', 'http://localhost:3000/account/register');
    cy.contains(/Hello/).should('not.exist');
    cy.get('.featured-title').should('exist');
  })
})