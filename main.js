const todoInput = document.querySelector(".todo-input");        
const todoButton = document.querySelector(".todo-button");
const todoUl = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")     
todoButton.addEventListener("click", addToDo);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos)



function saveLocalTodo(todo){
    let todos; 
   if(localStorage.getItem("todos") === null){
      todos = [];
   }
   else{
       todos = JSON.parse(localStorage.getItem("todos"));  
    }   
      todos.push(todo) 
   localStorage.setItem("todos", JSON.stringify(todos))
   }

function addToDo(event){
    event.preventDefault()
     
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); 
   
    const todoLi = document.createElement("li");
    todoLi.innerText = todoInput.value;
                    

    todoLi.classList.add("todo-item");           
          
    todoDiv.appendChild(todoLi); 
    todoInput.value = "";  
    const todoTick = document.createElement("button");        
    todoTick.innerHTML =" <i class='fas fa-check'></i>";
    todoTick.classList.add("complete-btn");                         
    todoDiv.appendChild(todoTick);       

    const todoTrash = document.createElement("button");       
    todoTrash.innerHTML =" <i class='fas fa-trash'></i>";      
    todoTrash.classList.add("trash-btn");                
    todoDiv.appendChild(todoTrash);       
    todoUl.appendChild(todoDiv); 
    saveLocalTodo(todoInput.value);                      
}

todoUl.addEventListener("click", deleteCompleteTodo)

function deleteCompleteTodo(event){
const item =event.target;
if(item.classList[0]==="trash-btn"){
    const todo = item.parentElement;
    removeLocalTodo(todo)
    todo.remove();
}
else if(item.classList[0]==="complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");             
}
}

function removeLocalTodo(todo){
    let todos; 
   if(localStorage.getItem("todos") === null){
      todos = [];
   }
   else{
       todos = JSON.parse(localStorage.getItem("todos"));  
   }
   const todoIndex = todo.children[0].innerText;
   console.log(todoIndex);
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos))
}
function filterTodo(event){
    const todos = todoUl.childNodes;
    todos.forEach(todo => {
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

function getTodos(){
    let todos; 
   if(localStorage.getItem("todos") === null){
      todos = [];
   }
   else{
       todos = JSON.parse(localStorage.getItem("todos"));  
   }
   todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); 
   
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
                    

    todoLi.classList.add("todo-item");           
          
    todoDiv.appendChild(todoLi);  
    const todoTick = document.createElement("button");        
    todoTick.innerHTML =" <i class='fas fa-check'></i>";
    todoTick.classList.add("complete-btn");                         
    todoDiv.appendChild(todoTick);       

    const todoTrash = document.createElement("button");       
    todoTrash.innerHTML =" <i class='fas fa-trash'></i>";      
    todoTrash.classList.add("trash-btn");                
    todoDiv.appendChild(todoTrash);       
    todoUl.appendChild(todoDiv);    
   })
}