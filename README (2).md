# Work Day Scheduler - Day Planner

## Overview
This is a project carried out to create a simple calenar application that helps the user to save appointments or events for the working hours. It is implemented by using HTML, CSS and jquery. Majority of the styles and layouts were done using the Bootstrap framework.

Moment Javascript is used to manupulate the date and time when required.

## Important Links
Refer to the following links:
* [Day Planner - Deployed page](https://vish-opatha.github.io/day-planner/)
* [Day Planner - Github repository](https://github.com/vish-opatha/day-planner)

## Mock-up
* This is the index page view.
![Main view](./assets/images/main.png)


* This is message that will appear when the user tries to save an empty appointment.
![Empty appointments validation](./assets/images/msg-one.jpg)


* This is message that will appear when the user tries to save an appointment for already existing appointment.
![Existing](./assets/images/msg-two.JPG)


---
Highlights :
  1. When the 'Start' button is pressed quiz starts with the timer
  2. Questions are presented to the user until the available time is zero or question count in the pool is zero.
  3. Once the user clicks an answer, result is displayed.
  4. When all questions are answered or availble time is zero, user is presented to save the score.
  5. Marks are saved in local storage, and if there are any marks are saved already, they are loaded in view_highscore.html.

## Technical Acceptance - Work Done
1. When the planner is loaded,  current date is displayed on the page and moment.js is used for that.
2. When the daily planner is opened, timeblocks are created using javascript(JQuery).
3. Timeblocks are constantly updated with the different background color to indicate past,present or future.
4. When the user clicks the relevant save button, event will be saved to the local storage and data attributes of the button have used to identify the timeslot.
5. When the page is refreshed, saved events will persist, through rendering them from local storage.
6. Bootstrap is used for layouts and JQuery is used to perform the javascript functionality.
7. Existing CSS class in style.css were used and some modifications and additions were done.
8. Validations were added to make sure, not to save empty appointment to the local storage and when saving an appointment on the same timeblock.

## Deployment - Work Done
1. Application is deployed at live URL using Github pages, and the link is in the "Important links" section.
2. No errors were found in loading and executing the function.
3. Link to the Github URL is given and the repository and it contains the complete code.

## Application Quality - Work Done
1. Deployed page resembles the mock-up in design and functionality.
2. Deployed page is easy to understand and navigate.
3. CSS file has been amended to improve the responsive nature of the application as much as possible.

## Repository Quality - Work Done
1. Repository is named as day-planner.
2. Regarding the folder structure, "Assets" includes separate folders for images,CSS and javascript.
4. Tags are indented accordingly and comments are included while following the best practices for naming conventions.
5. Changes were committed multiple times with messages.

- - -
📝 Created by Vish Opatha (Last updated on 07 July 2021).

