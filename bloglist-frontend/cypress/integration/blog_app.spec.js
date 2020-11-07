describe('Blog app', function() {

  beforeEach(() => {
    cy.request('POST','http://localhost:3001/api/testing/reset')
  })


  it('front page shows login', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})