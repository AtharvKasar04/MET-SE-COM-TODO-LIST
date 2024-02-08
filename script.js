let addTodoBtn = document.querySelector("#addTodoButton");
let todo_Popup = document.querySelector(".popupTODO");
let save_Btn = document.querySelector("#saveBtn");
let cancel_Btn = document.querySelector("#cancelBtn");

// Showing popup
addTodoBtn.addEventListener("click", () => {
    todo_Popup.classList.add("showPopup");
    todo_Popup.classList.remove("closePopup")
})

// Hiding popup
save_Btn.addEventListener("click", () => {
    todo_Popup.classList.remove("showPopup");
    todo_Popup.classList.add("closePopup");
})

cancel_Btn.addEventListener("click", () => {
    todo_Popup.classList.remove("showPopup");
    todo_Popup.classList.add("closePopup");
})

// TODO list data retrieve from input fields logic
let todo_name = document.querySelector("#todoName");
let todo_description = document.querySelector("#todoDescription");
let todo_priority = document.querySelector("#todoPriority");
let taskList = document.querySelector(".taskList");
// let list = [];

save_Btn.addEventListener("click", () => {

    let uniqueId = Date.now();

    let todoData = {
        name: todo_name.value,
        description: todo_description.value,
        priority: todo_priority.value,
        uId: uniqueId
    }

    let todos = localStorage.getItem("todos");
    todos = todos === null ? [] : JSON.parse(todos);
    console.log(todos);

    todos.unshift(todoData);

    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(todoData)
    window.location.reload();
});



// Logic for to fetch todos from the local storage and displaying it
let fetchedTodos = localStorage.getItem('todos');
// console.log(fetchedTodos)

fetchedTodos = JSON.parse(fetchedTodos);
// console.log(fetchedTodos)
// console.log(fetchedTodos.length)


// logic to check if number of todos is 0, if it is then display as "no tasks" else show all the other tasks!
if (fetchedTodos === null || fetchedTodos.length === 0){
    taskList.innerHTML = "<p>Hurray! You have no tasks :)</p>";
} else {
let newList = fetchedTodos.map((value) => {
    // console.log(value.name, value.description, value.priority)

    // Priority
    let mark;
    if (value.priority === "high") {
        mark = "!!!";
    } else if (value.priority === "medium") {
        mark = "!!"
    } else if (value.priority === "low") {
        mark = "!"
    }

    // Background color of priority
    let bgCol;
    if (mark === "!!!") {
        bgCol = "#EA3D2F";
    } else if (mark === "!!") {
        bgCol = "#367BF5";
    } else if (mark === "!") {
        bgCol = "#2FA84F";
    }

    return `

                <div class="task">   
                    <div class="taskDetails">
                        <h4>${value.name}<span class="priorityMark" style="background-color: ${bgCol};">${mark}</span></h4>
                        
                        <p>${value.description}</p>
                    </div>

                        <a href="#" id="${value.uId}" class="deleteButton"><img src="./images/delete_icon2.png"></a>

                </div>
        `
})

taskList.innerHTML = newList.join(" "); 
}

// Delete Todo Task logic

let deleteButton = document.querySelectorAll(".deleteButton");
let button_Id;

delBtn = deleteButton.forEach(function (button) {

    button.addEventListener('click', function() {
        
        // console.log(button)
        button_Id = button.getAttribute("Id");
        // console.log(button_Id);
        let arrrayOfButton = JSON.parse(localStorage.getItem("todos"));

        arrrayOfButton = arrrayOfButton.filter(object => Number(object.uId) !== Number(button_Id));

        localStorage.setItem('todos', JSON.stringify(arrrayOfButton));

        window.location.reload();
    });
});
