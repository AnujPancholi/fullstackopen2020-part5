import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { ToastProvider } from 'react-toast-notifications'

import Blog from './Blog.js'

import './css/Blog.css'

const TEST_USER_DATA = [
  {
    'id': '1',
    'username': 'user 1',
    'name': 'Author 1',
    'user_type': 'ADMIN',
    'auth': {
      'password': 'pass1'
    }
  }]

const TEST_BLOG_DATA = [
  {
    'title': 'Mock Blog Title',
    'author': 'Author 1',
    'userId': '1',
    'url': 'https://www.mockblog.com/123456',
    'likes': 23
  }
]

const mockRefreshBlogLists = () => {
  return null
}


describe('Tests for Blog component',() => {
  test('Blog renders only default content',() => {
    const testBlog = TEST_BLOG_DATA[0]
    const testUser = TEST_USER_DATA[0]

    const component = render(
      <ToastProvider>
        <Blog blog={testBlog} user={testUser} refreshBlogList={mockRefreshBlogLists} />
      </ToastProvider>
    )

    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.author)

    const urlPart = component.queryByText(testBlog.url)
    expect(urlPart).toBe(null)

    const likesPart = component.queryByText(String(testBlog.likes))
    expect(likesPart).toBe(null)


  })
})
