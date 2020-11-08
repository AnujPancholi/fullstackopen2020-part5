
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

      cy.contains('login').click()

      cy.contains('MALFORMED AUTH HEADER')
    })

  })

})