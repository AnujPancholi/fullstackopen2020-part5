
const BASE_URL = 'http://localhost:3000'

describe('Blog app', function() {

  beforeEach(() => {
    cy.request('POST','http://localhost:3001/api/testing/reset')
  })


  it('front page shows login', function() {
    cy.visit(BASE_URL)
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })


  describe('Login', function(){

    it('should give malformed auth header with nothing entered',function(){
      cy.visit(BASE_URL)

      cy.get('#login-button').click()

      cy.contains('MALFORMED AUTH HEADER')
    })

    it('should give error if wrong password entered',function(){
      cy.visit(BASE_URL)

      cy.get('#login-username-entry').type('testUsernameAlpha')
      cy.get('#login-password-entry').type('wrongpassword')

      cy.get('#login-button').click()

      cy.get('.react-toast-notifications__container').should('contain','INCORRECT PASSWORD')

    })

    it('should log in user with correct credentials successfully', function(){
      cy.visit(BASE_URL)

      cy.get('#login-username-entry').type('testUsernameAlpha')
      cy.get('#login-password-entry').type('testPass1')

      cy.get('#login-button').click()

      cy.contains('Hello, testUsernameAlpha')
    })

  })

})