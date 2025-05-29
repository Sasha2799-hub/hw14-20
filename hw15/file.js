const input = document.querySelector('.form__input.js--form__input')
const btnAdd = document.querySelector('.form__btn')
const ul = document.querySelector('.js--todos-wrapper')

let tasks = JSON.parse(localStorage.getItem('task')) || []

function createLiTasks(task) {
    const li = document.createElement('li')
    ul.appendChild(li)
    li.classList.add('todo-item')

    const inputCheckBox = document.createElement('input')
    li.appendChild(inputCheckBox)
    inputCheckBox.setAttribute('data-name', 'checkbox')
    inputCheckBox.setAttribute('type', 'checkbox')
    inputCheckBox.checked = task.done

    const span = document.createElement('span')
    span.classList.add('todo-item__description')
    li.appendChild(span)
    span.textContent = task.text;

    if (task.done) {
        span.classList.add('cross-line');
    }

    const btnDelete = document.createElement('button')
    btnDelete.classList.add('todo-item__delete')
    li.appendChild(btnDelete);
    btnDelete.textContent = "Видалити"
    btnDelete.setAttribute('data-name', 'delete')
    input.value = "";
}

tasks.forEach(task => {
    createLiTasks(task);
});

btnAdd.addEventListener('click', function (event) {
    event.preventDefault()

    const value = input.value

    if (value) {
        const newTask = { text: value, done: false }
        createLiTasks(newTask)
        tasks.push(newTask)
        localStorage.setItem('task', JSON.stringify(tasks))
    }
});

ul.addEventListener('click', function (event) {
    const targetBtnAttribute = event.target.getAttribute('data-name')
    const currentBtn = event.target

    if (targetBtnAttribute === 'delete') {
        const currentSpan = currentBtn.closest('.todo-item').querySelector('.todo-item__description');
        currentBtn.closest('.todo-item').remove()
        for (let i = 0; i < tasks.length; i++) {
            if (currentSpan.textContent === tasks[i].text) {
                tasks.splice(i, 1);
                localStorage.setItem('task', JSON.stringify(tasks))
                break;
            }
        }
    } else if (targetBtnAttribute === 'checkbox') {
        const currentSpan = currentBtn.closest('.todo-item').querySelector('.todo-item__description');
        const taskFind = tasks.find(task => task.text === currentSpan.textContent)
        console.log(taskFind);
        
        if (taskFind) {
            taskFind.done = currentBtn.checked
            localStorage.setItem('task', JSON.stringify(tasks))
        }

        if (currentBtn.checked) {
            currentSpan.classList.add('cross-line')
        } else {
            currentSpan.classList.remove('cross-line')
        }
    }
});
