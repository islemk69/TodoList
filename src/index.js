
const ul = document.querySelector("ul");
const input = document.querySelector("form > input");
const form = document.querySelector("form");

form.addEventListener("submit", event => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
    displayTodo();
})


let todos = [
    {
        text: "hello wolrd",
        done: true,
        editMode: false
    },
    {
        text: "todo not done",
        done: false,
        editMode: true,
    }
];

const displayTodo = () => {
    const todoNode = todos.map((todo, index) => {
        if (todo.editMode)
            return createTodoEditElement(todo, index);
        else
            return createTodoElement(todo, index);
    })
    ul.innerHTML = ""
    ul.append(...todoNode)
}


const createTodoElement = (todo, index) => {
    const buttonDelete = document.createElement("button")
    const li = document.createElement("li");
    buttonDelete.innerHTML = "Supprimer"
    const buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit"
    li.innerHTML = `
        <span class="todo ${todo.done ? "done" : ""}"></span>
        <p>${todo.text}</p>
    `
    li.addEventListener("click", event => {
        toogleTodo(index);
    })
    buttonDelete.addEventListener("click", event => {
        event.stopPropagation();
        deleteTodo(index);
    })
    buttonEdit.addEventListener("click", event => {
        event.stopPropagation();
        toogleEditMode(index);
    })
    li.append(buttonEdit, buttonDelete);
    return li
}

const createTodoEditElement = (todo, index) => {
    const li = document.createElement("li");
    const buttonCancel = document.createElement("button");
    const buttonSave = document.createElement("button");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;
    buttonCancel.innerHTML = "Cancel";
    buttonSave.innerHTML = "Save";

    buttonCancel.addEventListener("click", event => {
        event.stopPropagation();
        toogleEditMode(index);
    })
    buttonSave.addEventListener("click", event => {
        editTodo(index, editInput);
    })
    li.append(editInput, buttonCancel, buttonSave);
    return li;
}

const addTodo = value => {
    todos.push({
        text: value,
        done: false
    })
}

const deleteTodo = index => {
    todos.splice(index, 1);
    displayTodo();
}

const toogleTodo = index => {
    todos[index].done = !todos[index].done;
    displayTodo();
}

const toogleEditMode = index => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

const editTodo = (index, input) => {
    todos[index].text = input.value;
    todos[index].editMode = false;
    displayTodo();
}

displayTodo();