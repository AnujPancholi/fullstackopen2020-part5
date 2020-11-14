
const BASE_URL = 'http://localhost:3000'

import CONSTANTS from '../../src/lib/constants.js'

const TEST_USER_DATA = [{
  username: 'testUsernameAlpha',
  name: 'First Username',
  user_type: 'ADMIN',
  password: 'testPass1'
}]

const TEST_BLOG_DATA = [{
  title: 'Testing is a Pain',
  url: 'http://test.url.com'
}]

const asyncHangup = (timeout) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(true)
    },timeout)
  })
}

describe('Blog app', function() {

  const testUserObj = TEST_USER_DATA[0]

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

  const testUserObj = TEST_USER_DATA[0]

  const testBlog = TEST_BLOG_DATA[0]

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
    cy.get('#blog-input-title').type(testBlog.title)
    cy.get('#blog-input-url').type(testBlog.url)

    cy.get('#blog-input-add-button').click()

    cy.contains(`Blog "${testBlog.title}" added`)

    cy.get(`[data-title="${testBlog.title}"]`).should('contain',testBlog.title)


  })

  it('should click like button',async function(){

    const testTitleElement = await cy.contains(testBlog.title)
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

  it('should be able to delete blog that user owns',async function(){
    const testTitleElement = await cy.contains(testBlog.title)
    const blogId = testTitleElement.attr('data-blogid')
    const blogUserId = testTitleElement.attr('data-userid')

    const titleText = testTitleElement.text();

    const displayedAuthorName = titleText.split('by ')[1]

    const loggedInUser = JSON.parse(localStorage.getItem(CONSTANTS.LS_LOGIN_NAME))

    expect(loggedInUser.id).to.equal(blogUserId)
    expect(loggedInUser.name).to.equal(displayedAuthorName)

    cy.get(`#blog-details-vis-button-${blogId}`).click()

    cy.get(`#blog-delete-button-${blogId}`).click()

    cy.get(`#blog-container-${blogId}`).should('not.exist')


  })

  describe('Tests on set of blogs',() => {
    before(() => {
      cy.request('POST','http://localhost:3001/api/testing/reset?blogset=SET1')
    })

    it('should order blogs by likes',async function(){

      cy.get('.blog-details-vis-button').each(visButton => {
        visButton.click()
      })

      await asyncHangup(1000)

      const likesDisplayContainers = Cypress.$('.likes-display')

      // console.log(likesDisplayContainers.toArray())
      const likesArr = likesDisplayContainers.toArray().map(elem => parseInt(elem.innerText.split(' ')[1]))

      for(let i=0;i<likesArr.length-1;++i){
        expect(likesArr[i]>=likesArr[i+1]).to.be.true
      }

    })

  })
})