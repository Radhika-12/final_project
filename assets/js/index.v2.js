/* 
    JWD Web Developer Program 
    Project: Final Project
    Sprint: 2
    Task: 6
    Author: Vineet W. Singh 
    Start Date: 10/12/2020
    Date of last edit: 21/12/2020
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
    // if list of tasks is not empty render list of tasks on screen and set up 
    // modal that allows modification
    if (store.taskList.length!=0){
        renderTask();
        initModal();
    }
    //add event listeners, submit & reset
    form.addEventListener('submit', event => {
        event.preventDefault();
        form.classList.add('was-validated');
        // check if any form-controls have form-control:invalid class, stop if true
        // otherwise add the task to the store.taskList and render on screen.
        if (form.checkValidity()){
            const listLength=store.taskList.length;
            //no invalid controls detected - continue:
            const projectName = document.querySelector("#projNam").value;
            const taskName = document.querySelector("#taskNam").value;
            const desc = document.querySelector("#desc").value;
            const assignee = document.querySelector("#assignee").value; 
            const status = document.querySelector("#status").value; 
            const dueDate = document.querySelector("#dDate").value;
            store.addTask(projectName, taskName, desc, assignee, status, dueDate);
            //check if task list is empty before adding a task and initModal only once
            if (listLength===0) initModal();
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
}

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
    //prepare & display tabble head row
    const taskTableHead=document.querySelector("#taskTableHead");
    const taskTblHdRw=document.createElement("TR");
    //prepare the th row
    const taskTblHdCnt = store.getTaskHeaders().map(ele=>`<th> ${ele} </th>`).join(' ');
    //display
    taskTblHdRw.insertAdjacentHTML("afterbegin",taskTblHdCnt);
    taskTableHead.appendChild(taskTblHdRw);

    //get task table body
    const taskTableBody=document.querySelector("#taskTableBody");
    //delete existing display of data in the table
    //check if task table body contains any rows - if so delete all of them
    if (taskTableBody!=null){
        while(taskTableBody.hasChildNodes()) 
            taskTableBody.removeChild(taskTableBody.firstChild);
    }
    if (store.taskList.length>0){
        //run a Array.forEach here to process each element in the task list
        store.taskList.forEach(ele=>{
            // create a new table row
            const tbRow=document.createElement("TR");
            tbRow.setAttribute("id",`${ele.allData["ID"]}`);
            tbRow.classList.add("taskTableRow");
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

// function to initialise a modal which will allow a task to be modified
function initModal(){
     //constants used for modal 
     const modalContHeader = 
     `<!-- Modal Header -->
     <div class="modal-header">
         <h4 class="modal-title">Modify Task</h4>
         <button type="button" class="close" data-dismiss="modal">&times;</button>
     </div>`;
     let modalContBody = 
     `<!-- Modal Body -->
     <div class="modal-body">
     </div>`;
     const modalContFooter = 
     `<!-- Modal Footer -->
     <div class="modal-footer">
         <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
     </div>`;
     // make a constant with modal contents
    const modalCont=modalContHeader+modalContBody+modalContFooter;
    // initialize on a <div class="modal"> with all options
    // Note: options object is optional
    const taskModalInstance = new BSN.Modal(
        '#taskModal', 
        // target selector
        { // options object
        content: modalCont, // sets modal content
        backdrop: 'static', // we don't want to dismiss Modal when Modal or backdrop is the click event target
        keyboard: false // we don't want to dismiss Modal on pressing Esc key
        }
    ); //end taskModalInstance
    //update modal body with task details and set up a "mark as done" button
    const updateModalBody = id => {
        const cTask = store.getTaskById(id);
        const preButtonBody=`<!-- Modal Body -->
        <div class="modal-body">
            <div>
                <h4> Task ID: ${cTask.id} </h4>
                <hr/>
                <p> <strong>Task: </strong> ${cTask.taskName} </p>
                <p> <strong>Assigned to: </strong>${cTask.assignee} </p>
                <p> <strong>Status: </strong>${cTask.status} </p>`;
        const postButtonBody=`<hr /> 
                <p> To modify status or delete the task go to the Manage Tasks Page </p> 
            </div>
        </div>`;
        modalContBody = cTask.status!=="done" ? 
            preButtonBody
            + `<button type='button' class='btn btn-primary modalBtn' id='${cTask.id}'> Mark as Done </button>`
            + postButtonBody :
            preButtonBody 
            + `<button type='button' class='btn btn-primary modalBtn d-none' id='${cTask.id}'> Mark as Done </button>`
            + postButtonBody ;
        const modalCont=modalContHeader+modalContBody+modalContFooter;
        taskModalInstance.setContent(modalCont);
    }; //end updateModalBody function 
    // add an event listener for double clicks on the list of tasks
    document.querySelector("#taskTable").addEventListener("dblclick",event=>
    {     
        const element = event.target.closest('.taskTableRow'); 
        const id = Number(element.getAttribute("id"));
        updateModalBody(id);
        //add an event listener for the modal 'mark as done' button
        document.querySelector(".modalBtn").addEventListener("click",event=>{
            const element = event.target;
            const id2 = Number(element.getAttribute("id"));
            //modify task status in store
            store.modifyTaskStatus(id2,"done");
            // disable the 'mark as done' button
            element.setAttribute("disabled","");
            //toggle off the modal
            taskModalInstance.toggle();
            //refresh the task list to re-render the list on page
            this.renderTask();
        });//end event listener for the modal 'mark as done' button
        //turn on the modal 
        taskModalInstance.toggle();
    });//end event listener for the double click on list of tasks
}//end initModal()

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