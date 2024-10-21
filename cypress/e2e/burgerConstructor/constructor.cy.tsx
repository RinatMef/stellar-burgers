


const burgerConstructor = '[data-cy=burgerConstructor]';
const bunTop = '[data-cy="bunTop"]';
const bunBottom = '[data-cy="bun-bottom"]';
const constructorIngredientContainer = '[data-cy="constructor-ingredient"]'
const orderButton = '[data-cy="orderButton"]'
// const addIngredientButton = '[data-cy="add-ingredient"]'
const ingredientMain = '[data-cy="main"]';
const ingredientSauce = '[data-cy="sauce"]';
const ingredientBun = '[data-cy="bun"]';
const modal = '[data-cy="modal"]';
const closeButton = '[data-cy="modal"] button';
const modalOverlay = '[data-cy="modal-overlay"]';
const orderNumber = '[data-cy="order-number"]';
const userName = '[data-cy=userName]';

describe('add ingredients to burger constructor', function()  {
    beforeEach(function () {
      cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients') ;
      cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'}).as('getUser');
      cy.intercept('POST', 'api/orders', {fixture: 'post_order.json'}).as('postOrder');
      cy.viewport(1200, 750);
      cy.visit('/');
      cy.wait('@getIngredients')
    })

    it('should add bun to constructor', function() {
        cy.get(burgerConstructor).should('exist')
        cy.get(ingredientBun).contains('Добавить').click()
        cy.get(bunTop).should('exist');
        cy.get(bunTop).contains('Ингредиент 1 (верх)');
        cy.get(bunBottom).should('exist');
        cy.get(bunBottom).contains('Ингредиент 1 (низ)');
        cy.get(ingredientSauce).contains('Добавить').click()
        cy.get(ingredientMain).contains('Добавить').click()
       
        
    })

    describe('open modal and close', function() {
      it('should open the ingredient modal and close it', function() {
      cy.get(ingredientMain).first().click();
      cy.get(modal).should('exist');
      cy.get(closeButton).click();
      cy.get(modal).should('not.exist');
      cy.get(ingredientMain).first().click();
      cy.get(modal).should('exist');
      cy.get(modalOverlay).click({ force: true });
      cy.get(modal).should('not.exist');
      })
    })

    describe('Create order', function() {
      beforeEach(() => {
        cy.setCookie('accessToken', 'mockAccessToken');
        cy.setCookie('refreshToken', 'mockRefreshToken');

        cy.visit('/', {
          onBeforeLoad(win) {
            win.localStorage.setItem('accessToken', 'mockAccessToken');
            win.localStorage.setItem('refreshToken', 'mockRefreshToken');
          }
        });
        cy.wait('@getUser');
      });
      
      it('should create order with ingredients, click on button Оформить заказ, then check that modal is open and number of order is right', function() {
        cy.get(burgerConstructor).should('exist')
        cy.get(ingredientBun).contains('Добавить').click()
        cy.get(ingredientSauce).contains('Добавить').click()
        cy.get(ingredientMain).contains('Добавить').click()
        cy.get(orderButton).click()
        cy.wait('@postOrder')
        cy.get(modal).should('be.visible');
        cy.get(orderNumber).should('contain', 101010)
        cy.get(modalOverlay).click({ force: true });
        cy.get(modal).should('not.exist');
        cy.get(burgerConstructor).should('not.contain', bunTop);
        cy.get(burgerConstructor).should('not.contain', bunBottom);
        cy.get(burgerConstructor).should('not.contain', ingredientMain);
        cy.get(burgerConstructor).should('not.contain', ingredientSauce);
      })
    })
})




