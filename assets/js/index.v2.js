/* 
    JWD Web Developer Program 
    Project: Final Project
    Sprint: 2
    Task: 4
    Author: Vineet W. Singh 
    Start Date: 10/12/2020
    Date of last edit: 17/12/2020
    Date of last review:
*/

//main function for the page
function main(){
    //format a new date for the date field. 
    const cDt = new Date();
    const cDate = `${cDt.getFullYear()}-${cDt.getMonth()+1}-${cDt.getDate()}`;
    //get form
    const form = document.getElementById("taskForm");
    //set date attributes
    const dateFld =  document.getElementById("dDate");
    dateFld.setAttribute("min", cDate);
    dateFld.setAttribute("value", cDate);

    //add event listeners, submit & reset
    form.addEventListener('submit', event => {
        /*check value of date field if it is blank or in the past - raise error
        const todayDt = new Date();
        // check if date is blank after triming, if so return null
        const valueDt = dateFld.value.trim() ? new Date(dateFld.value) : null;
        // check if date is blank or in the past...
        if (valueDt==null || valueDt < todayDt) {
            // add invalid class to date input
            dateFld.classList.add("is-invalid");
            //check if error message is visible or not, if not add class 
            //to make it visible
            if (!isVisible(document.getElementById("invalidDateMsg"))){
                document.getElementById("invalidDateMsg").classList.add("d-block");
            }
        }*/ 
        event.preventDefault();
        form.classList.add('was-validated');
        // check if any form-controls have form-control:invalid class, stop if true
        // otherwise add the task to the store.taskList and render on screen.
        if (form.checkValidity()){
            //no invalid controls detected - continue:
            const projectName = document.querySelector("#projNam").value;
            const taskName = document.querySelector("#taskNam").value;
            const desc = document.querySelector("#desc").value;
            const assignee = document.querySelector("#assignee").value; 
            const status = document.querySelector("#status").value; 
            const dueDate = document.querySelector("#dDate").value;
            store.addTask(projectName, taskName, desc, assignee, status, dueDate);
            renderTask();
            form.classList.remove("was-validated");
            form.reset();
        }
    });

    form.addEventListener('reset', event=>{
        form.classList.remove("was-validated");
        form.reset();
    });


};

/* check if an element is visible on a page */
function isVisible (ele) {
    var style = window.getComputedStyle(ele);
    return (style.width !== "0" &&
    style.height !== "0" &&
    style.opacity !== "0" &&
    style.display!=='none' &&
    style.visibility!== 'hidden');
}

//display task added to list after it is added
function renderTask(){
    console.log(store.taskList);
}
