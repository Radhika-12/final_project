/* 
    JWD Web Developer Program 
    Project: Final Project
    Sprint: 2
    Task: 6
    Author: Vineet W. Singh 
    Start Date: 16/12/2020
    Date of last edit: 17/12/2020
    Date of last review:
*/

//class definition of Task
class Task {
    constructor(projectName, taskName, desc, assignee, status, dueDate){
        this._id = 0;
        this._projectName=projectName;
        this._taskName=taskName;
        this._desc=desc;
        this._assignee=assignee;
        this._status=status;
        this._dueDate=dueDate;
    }
    //setters
    set id(pId){
        this._id=pId;
    }

    set status(pStatus) {
        this._status=pStatus;
    }
    //getters
    get id() {return(this._id);}

    get projectName() {return(this._projectName);}

    get taskName() {return(this._taskName);}

    get desc() {return(this._desc);}

    get assignee() {return(this._assignee);}

    get status() {return(this._status);}

    get dueDate() {return(this._dueDate);}

    get allData(){
        return([this._id,this._projectName,this._taskName,this._desc,this._assignee,this._status,this._dueDate]);
    }
}

// Taskmanager is the class used to store the taskList array
class TaskManager{ 
    constructor(){
            // last Id 
            this._lastId=0;
            // array of tasks
            this._taskList=[];
    }

    //return the taskList
    get taskList() {
        return(this._taskList);
    }

    //add a new task to the task list
    addTask(projectName, taskName, desc, assignee, status, dueDate){
        const vTask = new Task(projectName, taskName, desc, assignee, status, dueDate);
        vTask.id = this._lastId + 1;
        this._taskList.push(vTask);
        this._lastId++;
    }

    //modify the status in a task
    modifyTask(pId,pStatus){
        // get the right node
        const vTask=this._taskList[this._taskList.findIndex(ele=>ele.id===pId)];
        //modify status by calling setter;
        vTask.status=pStatus;
    }

    //delete a task from the list
    deleteTask(pId){
        //remove the entry with the given id from the array
        delete this._taskList[this._taskList.findIndex(ele=>ele.id===pId)];
    }

    //store to local storage
    persistData(){}

    //restore from local storage
    restoreData(){}
}

 //store that acts as a task manager.
const store = new TaskManager();




