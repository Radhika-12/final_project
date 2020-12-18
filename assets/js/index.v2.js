/* 
    JWD Web Developer Program 
    Project: Final Project
    Sprint: 2
    Task: 6
    Author: Vineet W. Singh 
    Start Date: 10/12/2020
    Date of last edit: 17/12/2020
    Date of last review:
*/

 //store that acts as a task manager.
 const store = new TaskManager();
 store.restoreData();

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

    if (store.taskList.length!=0) renderTask();

    //add event listeners, submit & reset
    form.addEventListener('submit', event => {
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
            form.classList.remove("was-validated");
            renderTask(form);
            form.reset();
        }
    });
    //reset form when button is pressed
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
    //get task table body
    const taskTableBody=document.querySelector("#taskTableBody");
    //delete existing display of data in the table
    //check if task table body contains any rows - if so delete all of them
    if (taskTableBody!=null){
        while(taskTableBody.hasChildNodes()) 
            taskTableBody.removeChild(taskTableBody.firstChild);
        //run a Array.forEach here to process each element in the task list
        store.taskList.forEach(ele=>{
            // create a new table row
            const tbRow=document.createElement("TR");
            // get all data values from task and add it to a row
            for (prop in ele.allData){
                //create a new table row data field - task name
                const tbCell=document.createElement("TD");
                //add a text node with contents
                const tbCellCnt=document.createTextNode(ele.allData[prop]);
                //add text node to table data field
                tbCell.appendChild(tbCellCnt);
                //add data field to table row
                tbRow.appendChild(tbCell);
            }
            // //add the row to the body
            taskTableBody.appendChild(tbRow);
            if (isVisible(document.querySelector("#noDataLine"))){
                document.querySelector("#noDataLine").classList.add("d-none");
                document.querySelector("#taskTable").classList.remove("d-none");
            }
        });
    }
}

/* custom code for date check: 
    //check value of date field if it is blank or in the past - raise error
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
    }
*/ 