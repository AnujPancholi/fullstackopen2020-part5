describe('Blog app', function() {
  it('front page shows login', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})