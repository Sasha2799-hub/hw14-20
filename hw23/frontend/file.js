const input = document.querySelector('.form__input.js--form__input');
const btnAdd = document.querySelector('.form__btn');
const ul = document.querySelector('.js--todos-wrapper');

let tasks = [];

fetch('http://localhost:8080/todos')
  .then(res => res.json())
  .then(data => {
    tasks = data;
    tasks.forEach(task => createLiTasks(task));
  })
  .catch(error => console.error('Error:', error));

function createLiTasks(task) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.dataset.id = task._id; 
  ul.appendChild(li);

  const inputCheckBox = document.createElement('input');
  inputCheckBox.setAttribute('type', 'checkbox');
  inputCheckBox.setAttribute('data-name', 'checkbox');
  inputCheckBox.checked = task.done;
  li.appendChild(inputCheckBox);

  const span = document.createElement('span');
  span.classList.add('todo-item__description');
  span.textContent = task.text;
  if (task.done) {
    span.classList.add('cross-line');
  }
  li.appendChild(span);

  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'Видалити';
  btnDelete.classList.add('todo-item__delete');
  btnDelete.setAttribute('data-name', 'delete');
  li.appendChild(btnDelete);

  input.value = '';
}

btnAdd.addEventListener('click', function (event) {
  event.preventDefault();
  const value = input.value.trim();

  if (value) {
    const newTask = { text: value, done: false };

    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(taskFromServer => {
        tasks.push(taskFromServer);
        createLiTasks(taskFromServer);
      })
      .catch(error => console.error('POST Error:', error));
  }
});


ul.addEventListener('click', function (event) {
  const currentBtn = event.target;
  const action = currentBtn.getAttribute('data-name');
  const li = currentBtn.closest('.todo-item');
  const id = li.dataset.id;
  const span = li.querySelector('.todo-item__description');

  if (action === 'delete') {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        li.remove();
        tasks = tasks.filter(t => t._id !== id);
      })
      .catch(error => console.error('DELETE Error:', error));
  }

  if (action === 'checkbox') {
    const checkbox = currentBtn;
    const done = checkbox.checked;

    fetch(`http://localhost:8080/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ done })
    })
      .then(() => {
        if (done) {
          span.classList.add('cross-line');
        } else {
          span.classList.remove('cross-line');
        }

        const updatedTask = tasks.find(t => t._id === id);
        if (updatedTask) {
          updatedTask.done = done;
        }
      })
      .catch(error => console.error('PUT Error:', error));
  }
});
