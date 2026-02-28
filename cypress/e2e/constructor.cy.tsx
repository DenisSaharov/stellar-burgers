const SELECTORS = {
  ingredientItem: 'li',
  ingredientLink: 'a',
  modalRoot: '#modals',
  closeIcon: 'svg'
} as const;

const TEXT = {
  bunName: 'Тестовая булка',
  mainName: 'Тестовая начинка',
  addButton: 'Добавить',
  bunTop: 'Тестовая булка (верх)',
  bunBottom: 'Тестовая булка (низ)',
  ingredientDetailsTitle: 'Детали ингредиента',
  calories: 'Калории, ккал',
  orderButton: 'Оформить заказ',
  orderNumber: '12345',
  chooseBuns: 'Выберите булки',
  chooseFilling: 'Выберите начинку'
} as const;

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
    cy.contains(SELECTORS.ingredientItem, TEXT.bunName)
      .contains(TEXT.addButton)
      .click();
    cy.contains(SELECTORS.ingredientItem, TEXT.mainName)
      .contains(TEXT.addButton)
      .click();

    cy.contains(TEXT.bunTop).should('exist');
    cy.contains(TEXT.bunBottom).should('exist');
    cy.contains(TEXT.mainName).should('exist');
  });

  it('opens and closes ingredient modal by close button', () => {
    cy.contains(SELECTORS.ingredientItem, TEXT.bunName)
      .find(SELECTORS.ingredientLink)
      .click();

    cy.contains(TEXT.ingredientDetailsTitle).should('exist');
    cy.get(SELECTORS.modalRoot).should('contain', TEXT.bunName);
    cy.contains(TEXT.calories).should('exist');

    cy.get(SELECTORS.modalRoot)
      .find(SELECTORS.closeIcon)
      .first()
      .click({ force: true });
    cy.get(SELECTORS.modalRoot).should('not.contain', TEXT.ingredientDetailsTitle);
  });

  it('opens and closes ingredient modal by overlay click', () => {
    cy.contains(SELECTORS.ingredientItem, TEXT.bunName)
      .find(SELECTORS.ingredientLink)
      .click();
    cy.contains(TEXT.ingredientDetailsTitle).should('exist');

    cy.get(SELECTORS.modalRoot).children().last().click({ force: true });
    cy.get(SELECTORS.modalRoot).should('not.contain', TEXT.ingredientDetailsTitle);
  });

  it('creates order and clears constructor after modal close', () => {
    cy.setCookie('accessToken', 'Bearer test-access-token');
    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.reload();
    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains(SELECTORS.ingredientItem, TEXT.bunName)
      .contains(TEXT.addButton)
      .click();
    cy.contains(SELECTORS.ingredientItem, TEXT.mainName)
      .contains(TEXT.addButton)
      .click();

    cy.contains(TEXT.orderButton).click();
    cy.wait('@createOrder');

    cy.contains(TEXT.orderNumber).should('exist');

    cy.get(SELECTORS.modalRoot)
      .find(SELECTORS.closeIcon)
      .first()
      .click({ force: true });
    cy.get(SELECTORS.modalRoot).should('not.contain', TEXT.orderNumber);

    cy.contains(TEXT.chooseBuns).should('exist');
    cy.contains(TEXT.chooseFilling).should('exist');
  });
});
