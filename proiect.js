let element = document.getElementById("mainBox");
let arrowDown = document.getElementById("arr");
let foots = document.getElementById("foot");
let textInput = '';
let node = document.getElementById("listOfTodos");
let arrayList = [];
let markList = [];
let activeList = [];
let counter = document.getElementById("ctr");

let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");

let allCheck = 0;
let activeCheck = 0;
let completedCheck = 0;

document.onkeypress = function(EnterData){
    let key = EnterData.keyCode;
    //let textInput;

    if (key === 13) {   

        textInput = element.value;
        element.innerText = textInput; 

        if(textInput) {
            addDiv(textInput);
            // markall visible
            arr.classList.add("visibleArrow");
            arr.classList.remove("arrow");
            // footer visible
            foots.classList.add("footerVisible");
            foots.classList.remove("footer");
            document.getElementById("mainBox").value = '';
        } 

    }
    
}

function clickedALL (){
    console.log('all');
    arrayList.forEach(element => {
        element.classList.remove('hideTodo');
    });
    allCheck = 1;
    activeCheck = 0;
    completedCheck = 0;
}
 
function clickedActive (){
    activeList.forEach(element => {
        element.classList.remove('hideTodo');
    });
    markList.forEach(element => {
        element.classList.add('hideTodo');
    });
    activeCheck = 1;
    completedCheck = 0;
}
function clickedCompleted (){
    activeCheck = 0;
    completedCheck = 1;

    activeList.forEach(element => {
        element.classList.add('hideTodo');
    });
    markList.forEach(element => {
        element.classList.remove('hideTodo');
    });
    
}
let magie = 0;
function markAllCompleted (){
    magie++;
    console.log(magie);
    if (magie % 2 == 0) {
        arrowDown.classList.remove("arrowOpac");
        arrayList.forEach(element => {
            element.children[0].children[0].src = "panorama_fish_eye-24px.svg";
            element.children[0].children[1].classList.remove("markedList");
            if (activeCheck == 1) {
                element.classList.remove("hideTodo");
            }
        });
        markList = [];
        counter.innerHTML = arrayList.length;
        clearAll.classList.remove("clearButtonVisible");
        
    } else {
        arrowDown.classList.add("arrowOpac");
        clearAll.classList.add("clearButtonVisible");
        markList = [];
        arrayList.forEach(element => {
            element.children[0].children[0].src = "check_circle_outline-24px.svg";
            element.children[0].children[1].classList.add("markedList");
            if (activeCheck == 1) {
                element.classList.add("hideTodo");
                counter = 0;
            }
            markList.push(element);
        });
        counter.innerHTML = 0;
    }

}

all.addEventListener('click', clickedALL);
active.addEventListener('click',clickedActive);
completed.addEventListener('click',clickedCompleted);
arrowDown.addEventListener('click',markAllCompleted);



let clearAll = document.querySelector(".clearButton");
function removeAll(){

    markList.forEach(element => { 
        arrayList = arrayList.filter((e) => {
            return e.getAttribute('id') != element.getAttribute('id');
        });
        element.remove();
    });
    markList = [];

    if (arrayList.length == 0) {
        arr.classList.remove("visibleArrow");
        arr.classList.add("arrow");
        foots.classList.add("footer");
        foots.classList.remove("footerVisible");
        clearAll.classList.remove("clearButtonVisible");
    }
}

clearAll.addEventListener('click',removeAll);


function imageChange(e) {
     
    if (e.target.src.match("panorama_fish_eye-24px.svg")) {
        e.target.src = "check_circle_outline-24px.svg";
        e.target.parentNode.children[1].classList.add("markedList");
        if (markList.length == 0) {
            clearAll.classList.add("clearButtonVisible");
        }
        if (arrayList.length == 0) {
            arr.classList.remove("visibleArrow");
            arr.classList.add("arrow");
            foots.classList.add("footer");
            foots.classList.remove("footerVisible");
        }
        activeList = activeList.filter((pipi) => {
            return pipi.getAttribute('id') != e.target.parentNode.parentNode.getAttribute('id');
        }); 
        markList.push(e.target.parentNode.parentNode);
        if (activeCheck == 1) {
            e.target.parentNode.parentNode.classList.add("hideTodo");
        }
        counter.innerHTML = arrayList.length - markList.length;
    }
    else {
        e.target.src = "panorama_fish_eye-24px.svg";
        if (markList.length == 1) {
            clearAll.classList.remove("clearButtonVisible");
        }
        activeList.push(e.target.parentNode.parentNode);
        markList = markList.filter((pipi) => {
            return pipi.getAttribute('id') != e.target.parentNode.parentNode.getAttribute('id');
        }); 
        if (completedCheck == 1) {
            e.target.parentNode.parentNode.classList.add("hideTodo");
        }
        e.target.parentNode.children[1].classList.remove("markedList");
        counter.innerHTML = arrayList.length - markList.length;
    }

   
}

function removeButton(e) {

    arrayList = arrayList.filter((pipir) => {
        return pipir.getAttribute('id') != e.target.parentNode.parentNode.getAttribute('id');
    }); 
    markList = markList.filter((pipir) => {
        return pipir.getAttribute('id') != e.target.parentNode.parentNode.getAttribute('id');
    });
    activeList = activeList.filter((pipi) => {
        return pipi.getAttribute('id') != e.target.parentNode.parentNode.getAttribute('id');
    });

    e.target.parentNode.parentNode.remove();
    counter.innerHTML = arrayList.length - markList.length;
    if (arrayList.length == 0) {
        arr.classList.remove("visibleArrow");
        arr.classList.add("arrow");
        foots.classList.add("footer");
        foots.classList.remove("footerVisible");
        clearAll.classList.remove("clearButtonVisible");
    }
    if (markList.length  == 0) {
        clearAll.classList.remove("clearButtonVisible");
    }
}
function changeContent(e){
  

}


function addDiv(textInputs) {

   let newLi = document.createElement("li");
   let newDiv = document.createElement("div");
   let newImg = document.createElement("img");
   let newLabel = document.createElement("label");
   let newButton = document.createElement("button");

   newButton.classList.add("remove");
   newButton.addEventListener('click', removeButton)

   newImg.classList.add("markCheck");
   newImg.setAttribute("src","panorama_fish_eye-24px.svg");
   newImg.setAttribute("id","unchecked");
   newImg.addEventListener('click', imageChange);

   
   newLabel.innerHTML = textInputs;
   
   newDiv.addEventListener('dblclick',changeContent);
   newDiv.classList.add("showTodos");
   newDiv.appendChild(newImg);
   newDiv.appendChild(newLabel);
   newDiv.appendChild(newButton);
    
   newLi.classList.add("taskList");
   if (completedCheck == 1) {
       newLi.classList.add("hideTodo");
   }
   newLi.appendChild(newDiv);
   node.appendChild(newLi);

    if (arrayList.length == 0) {
        newLi.setAttribute("id",arrayList.length);
    }
    else {
        newLi.setAttribute("id",parseInt(arrayList[arrayList.length - 1].id) + 1);
        
    }
    arrayList.push(newLi);
    activeList.push(newLi);
    
    counter.innerHTML = arrayList.length - markList.length;
}
