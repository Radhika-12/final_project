# Final Project for 
## Generation Australia Junior Web Developer Course Cohort 3 Pod 1
Team upto Sprint 2 Task 3: Radhika & Vineet.
Team after Task 4: Vineet.

## Link
The application can be accessed at: [JWD Cohort 3 Final Project by Vineet] (https://vulcan-logic.github.io/final_project/)

### Description 
A project to implement task management (creation, tracking, updation & deletion). 
It has three pages, a home page which redirects to a 'Add Tasks' page and a 'manage Tasks' page.  
The 'Add Tasks' page displays a form on which tasks can be added. All tasks stored in the application are displayed in a list on this page. 
Clicking on a list item displays a modal window on the screen where details of the tasks can be seen and the task can be marked as done. 
Only tasks  with status of 'TO DO','REVIEW' or 'IN PROGRESS' can be marked as done. The 'Mark As Done' button is not displayed for tasks whose 
status is set to 'done'.  
The Manage Tasks page displays each task on a card where the status of task can be reassigned and the card can be 
deleted if required. Only tasks marked as 'done' can be deleted. 
Alternatively, if needed all tasks stored in memory can be deleted regardless of thier status. 
A confirmation dialog box pops up if the 'Delete All Tasks' button is pressed. 
The 'Delete All Tasks' button is disabled if there are no tasks stored in the application.  

### Installation
Code can be downloaded and run on a webserver without the need to install any other software.  
To test the application 'npm' is required and all required libraries can be installed using 'npm install' command. 

### Technology Stack
HTML 5, 
CSS 3, 
Bootstrap 4. 
Javascript ES6. 
* Javascript Libraries. 
+ Bootstrap Native JavaScript. 
+ Mocha. 
+ Mock-local-storage. 
Node Package Manager.

**Bootstrap**
* CSS Classes by Bootstrap (in no particular order)
+ navbar
+ navbar-expand-lg
+ navbar-light
+ bg-info
+ fixed-top
+ navbar-brand
+ navbar-toggler
+ navbar-toggler-icon
+ collapse
+ navbar-collapse
+ navbar-nav
+ nav-item
+ nav-link
+ row 
+ align-items-center 
+ justify-contents-center
+ btn
+ btn-primary
+ btn-danger
+ btn-warning
+ col-12
+ d-md-block 
+ col-md-1
+ col-md-4
+ col-md-6 
+ col-md-10
+ col-sm-4
+ col-sm-8
+ d-none
+ d-flex 
+ text-center
+ modal
+ modal-fade
+ modal-dialog
+ modal-content
+ modal-header
+ modal-body
+ modal-footer
+ form-group 
+ form-inline
+ form-control
+ invalid-feedback
+ table-responsive 
+ scrl-y
+ table 
+ table-striped 
+ table-bordered 
+ table-hover
+ container-fluid
+ card
+ card-body
+ card-title

* Javascript functions on events
+ window > blur
+ window > focus
+ list > click
+ button > click
+ card > change

The list and modal on the 'Add Task' page are generated dynamically by the javascript as are the cards on the 'Manage Tasks' page. 

### Testing 
Certain aspects of the application (TaskManager class and methods) can be tested by using the 'npm test' command. 
A screen shot of test results follows.
Image: ![Test Results] ('./test-results.png')






