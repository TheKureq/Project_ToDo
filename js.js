let todoInput
let errorInfo
let addBtn
let ulList
let newTodo

let popup
let popupInput
let popupInfo
let popupAddBtn
let popupCloseBtn
let todoToEdit

const main = () => {

    //initialization
    prepareDOMElements();
    prepareDOMEvents();

}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');
    popup = document.querySelector('.popup')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTodo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    todoInput.addEventListener('keyup', enterKeyCheck);
}

const addNewTodo = () => {
    if (todoInput.value !== '') {
        console.log('ok')
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createToolsArea()
        ulList.append(newTodo)

        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania!'
    }
}

const createToolsArea = () => {
    const toolsArea = document.createElement('div')
    toolsArea.classList.add('tools')

    const compBtn = document.createElement('button')
    compBtn.classList.add('complete')
    compBtn.textContent = '✅'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const delBtn = document.createElement('button')
    delBtn.classList.add('delete')
    delBtn.textContent = '❌'

    toolsArea.append(compBtn, editBtn, delBtn);
    newTodo.append(toolsArea)
}

const checkClick = e => {
    if(e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    }
    else if(e.target.classList.contains('edit')) {
        editTodo(e)
    }
    else if(e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = e => {
    popup.style.display = 'flex'
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent;
}

const closePopup = () => {
    popup.style.display = 'none'
}

const changeTodoText = () => {
    if(popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value;
        closePopup();
    }
}

const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodos = document.querySelectorAll('li')
    if (allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście'
    }
}

const enterKeyCheck = e => {
    if(e.key === 'Enter'){
        addNewTodo()
    }
}


document.addEventListener('DOMContentLoaded', main);


