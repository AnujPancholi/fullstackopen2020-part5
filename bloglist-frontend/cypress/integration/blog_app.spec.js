
const BASE_URL = 'http://localhost:3000'

import CONSTANTS from '../../src/lib/constants.js'

const testUserObj = {
  username: 'testUsernameAlpha',
  name: 'First Username',
  user_type: 'ADMIN',
  password: 'testPass1'
}

const asyncHangup = (timeout) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(true)
    },timeout)
  })
}

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

      cy.get('#login-username-entry').type(testUserObj.username)
      cy.get('#login-password-entry').type('wrongpassword')

      cy.get('#login-button').click()

      cy.get('.react-toast-notifications__container').should('contain','INCORRECT PASSWORD')

    })

    it('should log in user with correct credentials successfully', function(){
      cy.visit(BASE_URL)

      cy.get('#login-username-entry').type(testUserObj.username)
      cy.get('#login-password-entry').type(testUserObj.password)

      cy.get('#login-button').click()

      cy.contains(`Hello, ${testUserObj.username}`)
    })

  })

})


describe('Blogs',function(){

  before(() => {
    cy.request('POST','http://localhost:3001/api/testing/reset')
  })

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/login',
      auth: {
        user: testUserObj.username,
        pass: testUserObj.password
      }
    }).then((response) => {
      localStorage.setItem(CONSTANTS.LS_LOGIN_NAME,JSON.stringify(response.body))
      cy.visit(BASE_URL)
    })
  })

  it('should be able to add new blog',function(){
    cy.get('#blog-input-show-button').click()
    cy.get('#blog-input-title').type('Testing is a Pain')
    cy.get('#blog-input-url').type('http://test.url.com')

    cy.get('#blog-input-add-button').click()

    cy.contains('Blog "Testing is a Pain" added')

    cy.get(`[data-title="${'Testing is a Pain'}"]`).should('contain','Testing is a Pain')


  })

  it('should click like button',async function(){

    const testTitleElement = await cy.contains('Testing is a Pain')
    const blogId = testTitleElement.attr('data-blogid')

    cy.get(`#blog-details-vis-button-${blogId}`).click()

    const likesDisplayElement = Cypress.$(`#blog-likes-display-${blogId}`)
    const initialLikes = parseInt(likesDisplayElement.text().split(' ')[1])

    cy.get(`#blog-like-button-${blogId}`).click()

    await asyncHangup(3000)

    const changedLikesDisplayElement = Cypress.$(`#blog-likes-display-${blogId}`)

    const finalLikes = parseInt(changedLikesDisplayElement.text().split(' ')[1])

    expect(finalLikes).to.equal(initialLikes+1)

  })

})