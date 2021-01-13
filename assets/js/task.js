/* 
    JWD Web Developer Program 
    Project: Final Project
    Sprint: 4
    Task: 9
    Author: Vineet W. Singh 
    Start Date: 16/12/2020
    Date of last edit: 13/1/21
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

    static fieldNames = ["ID","Project","Task","Desc","Assignee","Status","Due"];
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
        return({"ID": this._id,
                "Project":this._projectName,
                "Task":this._taskName,
                "Desc":this._desc,
                "Assignee":this._assignee,
                "Status":this._status,
                "Due":this._dueDate
        });
    }

    toJSON(){
        return({ID: this._id,
                Project:this._projectName,
                Task:this._taskName,
                Desc:this._desc,
                Assignee:this._assignee,
                Status:this._status,
                Due:this._dueDate
        });
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

    //return all task field names
    getTaskHeaders() {return(Task.fieldNames);}

    //get a particular task by using it's id
    getTaskById(pId){
        return(this._taskList[this._taskList.findIndex(ele=>ele.id===pId)]);
    }

    //return no of tasks in taskList
    getNoOfTasks(){
        return this._taskList.length;
    }

    //add a new task to the task list
    addTask(projectName, taskName, desc, assignee, status, dueDate){
        const vTask = new Task(projectName, taskName, desc, assignee, status, dueDate);
        vTask.id = this._lastId + 1;
        this._taskList.push(vTask);
        this._lastId++;
    }

    //modify the status in a task
    modifyTaskStatus(pId,pStatus){
        // get the right node
        const vTask=this._taskList[this._taskList.findIndex(ele=>ele.id===pId)];
        //modify status by calling setter;
        vTask.status=pStatus;
    }

    //delete a task from the list
    deleteTask(pId){
        //remove the entry with the given id from the array
        delete this._taskList[this._taskList.findIndex(ele=>ele.id===pId)];
        this._taskList=this._taskList.flat();
    }

    //delete all stored tasks
    deleteAllTasks(){
        //reinitalise taskList array
        this._lastId=0;
        this._taskList=[];
        localStorage.clear();
    }
    
    //store to local storage
    persistData(){
        localStorage.clear();
        const taskListJSON=JSON.stringify(this._taskList);
        localStorage.setItem('tasks', taskListJSON);
    }

    //restore from local storage
    restoreData(type){
        try{ 
            if (type==="localStorage"){
                this._lastId=0;
                this._taskList=[];
                let tasks=localStorage.getItem('tasks');
                if(tasks!=null){
                    console.log(tasks);
                    //load data into local list of tasks
                    const taskList=JSON.parse(tasks);
                    taskList.forEach(ele=>{
                            if (ele!=null) this.addTask(ele["Project"], ele["Task"],ele["Desc"],ele["Assignee"],ele["Status"],ele["Due"]);
                        }
                    );
                }
            }
            else if (type==="testData"){
                // use the following test data to test the form
                const data = [
                    {"ID": 1,
                    "Project":"Final Project",
                    "Task":"Make a wireframe",
                    "Desc":"Start the project by making a wireframe",
                    "Assignee":"Radhika",
                    "Status":"done",
                    "Due":"2020-11-12"
                    },
                    {"ID": 2,
                    "Project":"Final Project",
                    "Task":"Make index.html",
                    "Desc":"Start implementing the project by coding html files",
                    "Assignee":"Radhika",
                    "Status":"done",
                    "Due":"2020-11-30"
                    },
                    {"ID": 3,
                    "Project":"Final Project",
                    "Task":"Make index.js",
                    "Desc":"write javascript to validate form",
                    "Assignee":"Vineet",
                    "Status":"done",
                    "Due":"2020-12-10"
                    },
                    {"ID": 4,
                    "Project":"Final Project",
                    "Task":"Make taskManager class",
                    "Desc":"Make task objects that can be manipulated by Task class",
                    "Assignee":"Vineet",
                    "Status":"in progress",
                    "Due":"2020-12-18"
                    }, 
                    {"ID": 5,
                    "Project":"Final Project",
                    "Task":"Manage tasks",
                    "Desc":"Make changes to the tasks be reflected in the stored data",
                    "Assignee":"Vineet",
                    "Status":"to do",
                    "Due":"2020-12-18"
                    }
                ];
                data.forEach(ele=>this.addTask(ele["Project"], ele["Task"],ele["Desc"],ele["Assignee"],ele["Status"],ele["Due"]));
                //this.persistData();
            }
            else {
                throw("Unrecognised option used in calling restoreData function");
            }
        }
        catch(error){
            console.log(error);
            throw("error in setting test or restoring data");
        }
    }
}





