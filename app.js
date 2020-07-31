// TODO:
// implement local storage
// implement trash(delete) todo functionality
// implement , when click on complete todo icon then there should be cross line on the tpodo
// make it beautiful





//Selectors
const todoInput = document.querySelector('.list-input');
const todoButton = document.querySelector('.list-button');
const todoList = document.querySelector('.list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
  //Prevent form from submitting
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement('li');
  const inputText = todoInput.value;
  newTodo.innerText = inputText;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //ADD TODO TO localStorage
  saveLocalTodos(todoInput.value);
   // Check button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
   // Trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

todoList.appendChild(todoDiv);
//Clear todo input value
todoInput.value = "";
}

function deleteCheck(e){
  // To check what I am clicking on: console.log(e.target);
  const item = e.target;
  if(item.classList[0] === "trash-btn"){
  // with this we are actually deleting the button and not todo-items
  //  item.remove();
  const todo = item.parentElement;
  //Animation
  todo.classList.add("fall");
  removeLocalTodos(todo);
  //this function is used to remove element after execution of animation
  todo.addEventListener('transitionend',function(){
    todo.remove();
  });
  // todo.remove();
  }
//Check mark
  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

}
function filterTodo(e){
  // console.log(e.target.value);
  const todos = todoList.childNodes;
  todos.forEach((todo) => {


        //check for undefined values and skips then and only apply the switch statement on nodes with properties
      if (todo.classList !== undefined) {
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
            case "uncompleted":
              if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
              break;
          default:
            break;
        }
      }
      return;
    });
}
function saveLocalTodos(todo){
  //Check--HEY Do I already have thing in there ?
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos")); //parse back to array
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos")); //parse back to array
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    const inputText = todo;
    newTodo.innerText = inputText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
     // Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
     // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  });

}
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos")); //parse back to array
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos", JSON.stringify(todos));
}



//todoList.innerHTML += `
//<div>
//<li class="todo-item">
//${inputText}
//</li>
//<button class="complete-btn"><i class="fas fa-check"></i></button>
//<button ="complete-btn"><i class="fas fa-trash"></i></button>
//</div>
//  `
