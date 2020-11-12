# Part 5

**NOTE:** I am using the backend from the last part that I made and for the frontend I have cloned the provided repo as directed by the course.

## Exercise 5.1

Backend was complete from the last part, so the first step was to integrate the login POST API in a module `/services/login.js`, much like the existing `blogs` service. Then I had to make a login form which I decided to make as an independent component. This component would take the username and password, and perform the login using the `login.js` service made earlier.

One thing that I've done differently here is that `username` and `password` are in the state of the `LoginForm` component itself rather than being in the state of the root component, and also, it is the `LoginForm` component where the login is being performed instead of in the root component. On login the `LoginForm` component sets the `user` object in the state of the root component by taking the setter method (`setUser`) as a prop from the root component.

Also, to show any notification (such as failed login), I decided to use a toast notification. I was initially going to try to make it myself but it would be too much effort, so I found [react-toast-notifications](https://www.npmjs.com/package/react-toast-notifications) used that instead.

**NOTE:** It's after completing this exercise that I noticed that I have not displayed the name of the logged in user on the front end. Since the focus is on the completed application, I will include this later.


## Exercise 5.2

**NOTE:** I usually make a commit for each exercise but I have made a combined commit for 5.2, 5.3 and 5.4 in haste.

Added a `setItem` call in the login process, and made a simple function to logout, which cleared the specific JSON blob stored in `localStorage`, triggered by a simple button.


## Exercise 5.3

Added a component `BlogEntryForm` in the file `BlogListing.js` file itself. I was going to make this a separate component but decided to make it a child component of `BlogListing` because I would need to refresh the blog listing after addition of the new blog, so I would need some way to do that, such as passing a function to refresh the blogs as a prop to this component.


## Exercise 5.4

Had inadvertantly done this already using `react-toast-notifications`.


## Exercise 5.5

Instead of having the boolean for visibility in the state of the root component (like shown in the course) I decided to add this boolean in the state of the form itself. To change the rendering based on this boolean, I used a css file in which I created a class that simply sets `display: none` for a particular element. I added this className to the requisite elements based on the `isVisible` boolean of the state.


## Exercise 5.6

I had already separated the `BlogEntryForm` into its own component, but moreover I separated it into its own file, which the `BlogListing` component imports. In the exercise it is mentioned that it should be implemented in the same way that the `noteForm` component as shown in the material, but my component is a bit different, in the following ways:

 - Instead of having the title and url values sent to it by the parent component as props, those properties are in its own state. I didn't see a reason to have those sitting in the state of the parent, which would only complicate things.
 - It takes a user object (for the token that it needs to make the request) and a function to refresh the blog listings in the props from its parent. The function that it takes does change the state of its parent (by triggering a call to the blogs backend service to fetch all the blogs and refresh the listing), but intead of changing the value in the form, it changes a property in the state that it doesn't take from the parent.

  
## Exercise 5.11

I decided to go with this exercise first because the preceeding exercises were optional. Used proptypes check on the `BlogListing` component.


## Exercise 5.12

Setting up the eslint config and scripts was pretty simple, I took the file as described in the course, added a rule of my own, removed one rule that was causing issues, and auto-corrected the linting errors throughout the project.


## Exercise 5.7

Added a flag to check if the details should be visible in the state, a function as a handler to toggle it, and the button itself that triggers this handler on click.


## Exercise 5.8

Added the functionality, however, did not need to send all the blog details, just needed to use `$inc` with 1. Also had to make a separate component for showing the likes so that they could be increased in the front end. Refreshing the page would sync the latest count from the server.


## Exercise 5.9

Performed the sort simply with the `array.sort()` method on the front end.


## Exercise 5.10

Added the functionality, which required a small change in the backend, and with a comparison between the logged-in user's id and the userid of the blog, conditional rendering of the `Delete` button was achieved.


## Exercise 5.13

Adding the test to check for the existence of the `title` and `author` was easy enough, what was tricky is adding the assertions to check for non-existence of the `url` and `likes`. I did find a solution [here](https://stackoverflow.com/a/52783201/6718353) using the `queryByText()` method.


## Exercise 5.14

Used `fireEvent` to test this quite simple to implement.


## Exercise 5.15

Before I explain how I did this exercise, let me focus on how the like button is implemented.

The implementation of the like button functionality is done in exercises 5.7 and 5.8, however, there were certain issues that I saw with that approach:

 - Firstly, I don't see why we would need to update the whole document if the only one like is to be added. The exercise said that the backend will only accept the whole document, but the backend that I made in the last part can update only some property in it (which is how it should work).
 - Secondly, there would be an issue of concurrency here. The `like` that is being updated is the absolute value of `likes`, with 1 added to the current value of `likes`, however, if two users on different browsers were to press like at nearly the same time, this would create a race condition in which one of the likes would be dropped. It's a no-brainer in this situation to only increment the `likes` by 1 to mitigate this concurrency issue.
 - Thirdly, if we do update the `blog` document, the state of the component which lists the blogs (`BlogListing` in my case) would be the same, unless we change that particular `blog` with the updated `likes` count, which we shouldn't do, given that we have to set the state of any component using only the setter function provided by `useState` hook. One way to overcome this would be to reset the state of the `BlogListing` component, but this would be very cumbersome and would need us to re-render the whole component just because of one like.
 
The behaviour here should be that the change should be made in the database via the PUT API call and the `likes` count should subsequently go up by 1 on the front-end, without anything else being affected.

To achieve this, I made another component rendered within the `Blog` component, called `LikesContainer`, which displays the `likes` count, which is in its own state, initialized by the `likes` count of its parent `Blog` component, and contains the "Like" button that performs the increment.

However, to test whether the correct function is being triggered or not, I would have to pass the function to the `LikesContainer` component as a prop (as per exercise 5.15), so I made that function `addLike` in the `Blog` component and passed it to `LikesContainer`. Then I mocked that function using `jest.fn()`, gave it a [mocked implementation](https://jestjs.io/docs/en/jest-object#jestfnimplementation) that mocked a successful likes update in the DB. So, this test is written in the `LikesContainer.test.js` file.

**NOTE:**: This `addLikes` function is **not** the handler of the Like button, but is used by a function that is the handler of the Like button, therefore, I was getting a warning that said [that any events that cause state change should be wrapped in "act"](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning). I tried sevaral ways, every way I could to get rid of it but couldn't. All the tests pass, however, that warning persists.


## Exercise 5.17

I added an endpoint `/testing/reset` to:

 - delete all documents in the `blogs` and `users` collections.
 - add just one admin user in the `users` collections.

After that, writing the test for the login page was quite easy. Note that since localstorage stores values against a particular origin, one would need to ensure that localstorage is cleared (user is logged out) for this test to work


## Exercise 5.18

Added tests to check
 - one error scenario where nothing is entered and login is clicked.
 - valid username and wrong password is entered.
 - correct username-password combination is entered.
I know more scenarios could be tested but this would be enough for the purpose of the exercise.


## Exercise 5.19

Added the test, however, needed to do some research to see how exactly to check whether the blog has been added in the list of blogs, and found the solution, by adding a `data-*` attribute in the element that contains the title of the blog, and used the use of `cy.get()` as shown [here]("https://docs.cypress.io/api/commands/get.html#Find-5-elements-with-the-given-data-attribute") to get the exact element needed and simple checked if the title is added.


## Exercise 5.20

Here was my approach with this test:

1. Add some useful `id` and `class` attributes to some of the DOM elements in the JSX to help with the testing (of course, this is not part of the test itself, but it's important).
2. Get the `blog-container` div using `cy.contains(<title>)` and get the blogId via its `data-blogid` attribute.
3. Use the blogId to get the likes display span as a jquery element using `Cypress.$` and deduce the current number of likes from that (will most probably be 0).
4. Get the like button by id using the blogId and click it.
5. Wait for few seconds using the custom `asyncHangup` function. This is because the likes will not immediately change, first it will be updated on the server end and the likes will change on the front-end only when that request is complete. So, we need to allow some time for that to happen, since we do not know when that will finish.
6. Get the number of likes again using the aforementioed method.
7. Assert that the likes count has increased by 1.

---


