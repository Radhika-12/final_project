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

    static fieldNames = ["ID","Project","Task","Desc","Assignee","Status","Due Date"];
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
                "Due Date":this._dueDate
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

    getTaskHeaders() {return(Task.fieldNames);}

    getTaskById(pId){
        return(this._taskList[this._taskList.findIndex(ele=>ele.id===pId)]);
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
    }

    //store to local storage
    persistData(){}

    //restore from local storage
    restoreData(){
        const data = [{"ID": 1,
            "Project":"Final Project",
            "Task":"Make a wireframe",
            "Desc":"Start the project by making a wireframe",
            "Assignee":"Radhika",
            "Status":"done",
            "Due Date":"2020-11-12"
            },
            {"ID": 2,
            "Project":"Final Project",
            "Task":"Make index.html",
            "Desc":"Start implementing the project by coding html files",
            "Assignee":"Radhika",
            "Status":"done",
            "Due Date":"2020-11-30"
            },
            {"ID": 3,
            "Project":"Final Project",
            "Task":"Make index.js",
            "Desc":"write javascript to validate form",
            "Assignee":"Vineet",
            "Status":"done",
            "Due Date":"2020-12-10"
            },
            {"ID": 4,
            "Project":"Final Project",
            "Task":"Make taskManager class",
            "Desc":"Make task objects that can be manipulated by Task class",
            "Assignee":"Vineet",
            "Status":"in progress",
            "Due Date":"2020-12-18"
            }, 
            {"ID": 5,
            "Project":"Final Project",
            "Task":"Manage tasks",
            "Desc":"Make changes to the tasks be reflected in the stored data",
            "Assignee":"Vineet",
            "Status":"to do",
            "Due Date":"2020-12-18"
            }
        ];
        data.forEach(ele=>this.addTask(ele["Project"], ele["Task"],ele["Desc"],ele["Assignee"],ele["Status"],ele["Due Date"]));
    }
}





