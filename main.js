const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");      
const select = document.querySelector(".select");        

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemoveTodo)
select.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)        
console.log(todoList)

function addTodo(event){
    event.preventDefault();
    if(todoInput.value === ""){
        alert("write a task")
    }else{
const divTodo = document.createElement("div"); 
divTodo.classList.add("todo");               
const liTodo = document.createElement("li"); 
liTodo.innerText = todoInput.value; 
// console.log(todoInput.value)
saveLocalTodo(todoInput.value);
liTodo.classList.add("todo-item")
divTodo.appendChild(liTodo);
todoInput.value = "";              
             

const checkButton = document.createElement("button");      
checkButton.innerHTML = "<i class='fas fa-check'></i>";        
checkButton.classList.add("complete-btn");

const trashButton = document.createElement("button");
trashButton.innerHTML ="<i class='fas fa-trash'></i>"     
trashButton.classList.add("trash-btn");

divTodo.appendChild(checkButton);  
divTodo.appendChild(trashButton);

        
         
todoList.appendChild(divTodo);          
      
}
}
function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function checkRemoveTodo(event){
    const item = event.target;
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement; 
        removeLocalTodo(todo);             
        todo.remove();      
    }
    else if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;                
        todo.classList.toggle("completed")
    }
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo =>{
    const divTodo = document.createElement("div"); 
divTodo.classList.add("todo");               
const liTodo = document.createElement("li"); 
liTodo.innerText = todo;       
liTodo.classList.add("todo-item")
divTodo.appendChild(liTodo);            
             

const checkButton = document.createElement("button");      
checkButton.innerHTML = "<i class='fas fa-check'></i>";        
checkButton.classList.add("complete-btn");
// const todoss = checkButton.parentElement;                
// todoss.classList.toggle("completed")        
    // checkButton.classList.toggle("completed")

const trashButton = document.createElement("button");
trashButton.innerHTML ="<i class='fas fa-trash'></i>"     
trashButton.classList.add("trash-btn");

divTodo.appendChild(checkButton);  
divTodo.appendChild(trashButton);       
todoList.appendChild(divTodo);  
})}      

function removeLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
           todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;        
    todos.splice(todos.indexOf(todoIndex),1);       
    localStorage.setItem("todos", JSON.stringify(todos)) 
}
function filterTodo(event){
    const todos = todoList.childNodes;         
    todos.forEach(todo =>{
        switch(event.target.value){
            case "all":
                todo.style.display = "flex"; 
                break;
                case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";        
                }
                break;
                case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";
                }
                else{
                    todo.style.display = "flex";        
                }
                break;
        }
    })
   }
