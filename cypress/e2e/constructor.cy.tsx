describe('Burger constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((window) => {
      window.localStorage.removeItem('refreshToken');
    });
  });

  it('adds bun and filling ingredients to constructor', () => {
    cy.contains('li', 'Тестовая булка').contains('Добавить').click();
    cy.contains('li', 'Тестовая начинка').contains('Добавить').click();

    cy.contains('Тестовая булка (верх)').should('exist');
    cy.contains('Тестовая булка (низ)').should('exist');
    cy.contains('Тестовая начинка').should('exist');
  });

  it('opens and closes ingredient modal by close button', () => {
    cy.contains('li', 'Тестовая булка').find('a').click();

    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').should('contain', 'Тестовая булка');
    cy.contains('Калории, ккал').should('exist');

    cy.get('#modals').find('svg').first().click({ force: true });
    cy.get('#modals').should('not.contain', 'Детали ингредиента');
  });

  it('opens and closes ingredient modal by overlay click', () => {
    cy.contains('li', 'Тестовая булка').find('a').click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('#modals').children().last().click({ force: true });
    cy.get('#modals').should('not.contain', 'Детали ингредиента');
  });

  it('creates order and clears constructor after modal close', () => {
    cy.setCookie('accessToken', 'Bearer test-access-token');
    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.reload();
    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains('li', 'Тестовая булка').contains('Добавить').click();
    cy.contains('li', 'Тестовая начинка').contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.contains('12345').should('exist');

    cy.get('#modals').find('svg').first().click({ force: true });
    cy.get('#modals').should('not.contain', '12345');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
