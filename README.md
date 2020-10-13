# Part 5

**NOTE:** I am using the backend from the last part that I made and for the frontend I have cloned the provided repo as directed by the course.

## Exercise 5.1

Backend was complete from the last part, so the first step was to integrate the login POST API in a module `/services/login.js`, much like the existing `blogs` service. Then I had to make a login form which I decided to make as an independent component. This component would take the username and password, and perform the login using the `login.js` service made earlier.

One thing that I've done differently here is that `username` and `password` are in the state of the `LoginForm` component itself rather than being in the state of the root component, and also, it is the `LoginForm` component where the login is being performed instead of in the root component. On login the `LoginForm` component sets the `user` object in the state of the root component by taking the setter method (`setUser`) as a prop from the root component.

Also, to show any notification (such as failed login), I decided to use a toast notification. I was initially going to try to make it myself but it would be too much effort, so I found [react-toast-notifications](https://www.npmjs.com/package/react-toast-notifications) used that instead.

**NOTE:** It's after completing this exercise that I noticed that I have not displayed the name of the logged in user on the front end. Since the focus is on the completed application, I will include this later.



---


