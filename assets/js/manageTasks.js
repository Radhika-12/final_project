 
//store that acts as a task manager.
const store = new TaskManager();
store.restoreData();

function main() {
    renderCards();
    let taskChange=false;
    let vStatus;
   //set up event listener on the select 
    document.querySelectorAll(".task-card").forEach(ele=>{
        //for each card setup an event listeners on select and delete buttons
        const cardBtn = ele.querySelector('.delBtn');
        cardBtn.addEventListener("click",eve=>{
            console.log("removing card");
            console.log(cardBtn.getAttribute("id").split('_')[1]);
            //get the id 
            let vId=Number(cardBtn.getAttribute("id").split('_')[1]);
            store.deleteTask(vId);
            renderCards();
        });
        const cardSel = ele.querySelector('.cardSelect');
        cardSel.addEventListener("change",eve=>{
            console.log("changing status");
            console.log(cardSel.getAttribute("id"));
            let vId=Number(cardSel.getAttribute("id").split('_')[1]);
            store.modifyTaskStatus(vId,cardSel.value);
            if (cardSel.value==="done") {
                ele.querySelector(`#btn_${vId}`).removeAttribute("disabled");
            }
            else {
                ele.querySelector(`#btn_${vId}`).setAttribute("disabled","");
            }
        });
    });
} 


function renderCards() {
    //prepare & display card row
    const taskCardRow=document.querySelector("#cardRow");
    //delete existing cards
    //check if row has any cards - if so delete all of them
    if (taskCardRow!=null){
        while(taskCardRow.hasChildNodes()) 
            taskCardRow.removeChild(taskCardRow.firstChild);
    }
    const cardRow = document.querySelector("#cardRow");
    //for each task make a card and display it
    let ctr=0;
    store.taskList.forEach(ele => {
        //create a col to hold the card
        const cardCol=document.createElement("DIV");
        cardCol.classList.add("col-md4");
        //create a card
        const card=document.createElement("DIV");
        card.classList.add("card","task-card");
        //add card body
        const cardBody=document.createElement("DIV");
        cardBody.classList.add("card-body");
        //create a card title
        const cardTitle=document.createElement("H5");
        cardTitle.classList.add("card-title","text-center");
        const cardTitleText=document.createTextNode(`Task No. ${++ctr}`);
        // add text in title
        cardTitle.appendChild(cardTitleText);
        // add title to catd
        cardBody.appendChild(cardTitle);
        //start a loop to process all values of the task
        let vId=0;
        for (prop in ele.allData){
            if (prop==="ID"){
                vId=ele.allData[prop];
            }
            // start a new row
            const cardPropRow=document.createElement("DIV");
            cardPropRow.classList.add("row");
            // start column 1 
            const cardPropRowCol1=document.createElement("DIV");
            cardPropRowCol1.classList.add("col-5");
            // start property name to col as a strong title
            const cardPropRowCol1Tl=document.createElement("P");
            cardPropRowCol1Tl.classList.add("card-text");
            const cardPropRowCol1TlBld=document.createElement("STRONG");
            // start title contents
            const cardPropRowCol1TlBldCt=document.createTextNode(prop);
            //add all to col
            cardPropRowCol1TlBld.appendChild(cardPropRowCol1TlBldCt);
            cardPropRowCol1Tl.appendChild(cardPropRowCol1TlBld);
            cardPropRowCol1.appendChild(cardPropRowCol1Tl);
            // add col to row
            cardPropRow.appendChild(cardPropRowCol1);
            // start column 2 to card row
            const cardPropRowCol2=document.createElement("DIV");
            cardPropRowCol2.classList.add("col-7");
            // add contents to col 
            var cardPropRowCol2El;
            if (prop==="Status"){
                //add a drop down select list as an element 
                cardPropRowCol2El=document.createElement("SELECT");
                cardPropRowCol2El.setAttribute("id",prop+'_'+vId);
                cardPropRowCol2El.setAttribute("name",prop+'_'+vId);
                cardPropRowCol2El.classList.add("cardSelect");
                const options=["to do","in progress","review","done"];
                options.forEach(el2=>{
                    //make an option element for each option and add it to the select
                    const cardPropRowCol2ElOpt = document.createElement("OPTION");
                    cardPropRowCol2ElOpt.setAttribute("value",el2);
                    const cardPropRowCol2ElOptCt=document.createTextNode(el2.toUpperCase());
                    cardPropRowCol2ElOpt.appendChild(cardPropRowCol2ElOptCt);
                    cardPropRowCol2El.appendChild(cardPropRowCol2ElOpt);
                });
                cardPropRowCol2El.value=ele.allData[prop];
            } else{
                cardPropRowCol2El=document.createElement("P");
                cardPropRowCol2El.classList.add("card-text");
                const cardPropRowCol2ElCt=document.createTextNode(ele.allData[prop]);
                //add to col
                cardPropRowCol2El.appendChild(cardPropRowCol2ElCt);
            }             
            cardPropRowCol2.appendChild(cardPropRowCol2El);
            // add col to row
            cardPropRow.appendChild(cardPropRowCol2);
            // add row to card body
            cardBody.appendChild(cardPropRow);
            //add a horizontal line
            const hr=document.createElement("HR");
            cardBody.appendChild(hr);

        }
        // add a delete button to the body
        const cardDelRow=document.createElement("DIV");
        cardDelRow.classList.add("row");
        //make a col for the row
        const cardDelRowCol=document.createElement("DIV");
        cardDelRowCol.classList.add("col-12","d-flex","justify-content-center");
        // make a delete button for the col
        const cardDelRowColBtn=document.createElement("BUTTON");
        cardDelRowColBtn.classList.add("btn","btn-danger","delBtn");
        cardDelRowColBtn.setAttribute("id",`btn_${vId}`);
        if (ele.allData["Status"]!== "done"){
            cardDelRowColBtn.setAttribute("disabled","");
        }
        //add text to button
        const  cardDelRowColBtnLbl=document.createTextNode("Delete Task");
        cardDelRowColBtn.appendChild(cardDelRowColBtnLbl);
        //add button to column
        cardDelRowCol.appendChild(cardDelRowColBtn);
        //add column to row
        cardDelRow.appendChild(cardDelRowCol);
        //add row to card body
        cardBody.appendChild( cardDelRow);
        // add the card body to the card
        card.appendChild(cardBody);
        cardCol.appendChild(card);
        cardRow.appendChild(cardCol);
    });
}