/* 
    JWD Web Developer Program 
    Project: Final Project
    Sprint: 2
    Task: 4
    Author: Vineet W. Singh 
    Start Date: 10/12/2020
    Date of last edit: 10/12/2020
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
    document.getElementById("dDate").setAttribute("min", cDate);
    document.getElementById("dDate").setAttribute("value", cDate);
    //add event listener
    form.addEventListener('submit', event => {
        event.preventDefault();
        form.classList.add('was-validated');
    }, false);
};

