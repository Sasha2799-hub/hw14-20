$(document).ready(function () {
  const $input = $(".form__input.js--form__input");
  const $btnAdd = $(".form__btn")
  const $ul = $(".js--todos-wrapper");

  let tasks = JSON.parse(localStorage.getItem("task")) || [];

function createLiTasks(task) {
  const $li = $('<li>').addClass('todo-item');

  const $inputCheckBox = $('<input>')
    .attr('type', 'checkbox')
    .attr('data-name', 'checkbox')
    .prop('checked', task.done);

  const $span = $('<span>')
    .addClass('todo-item__description')
    .text(task.text);

  if (task.done) {
    $span.addClass('cross-line');
  }

  const $btnDelete = $('<button>')
    .addClass('todo-item__delete')
    .attr('data-name', 'delete')
    .text('Видалити');

  $li.append($inputCheckBox, $span, $btnDelete);
  $ul.append($li);
}

  tasks.forEach(task => createLiTasks(task));

  $btnAdd.on("click", function (event) {
    event.preventDefault();
    const value = $input.val().trim();

    if (value) {
      const newTask = { text: value, done: false };
      createLiTasks(newTask);
      tasks.push(newTask);
      localStorage.setItem("task", JSON.stringify(tasks));
      $input.val(""); 
    }
  });
  $ul.on('click', function (event) {
  const targetBtnAttribute = $(event.target).attr('data-name');
  const currentBtn = event.target;

  if (targetBtnAttribute === 'delete') {
    const currentSpan = $(currentBtn)
      .closest('.todo-item')
      .find('.todo-item__description')[0];

    $(currentBtn).closest('.todo-item').remove()

    for (let i = 0; i < tasks.length; i++) {
      if (currentSpan.textContent === tasks[i].text) {
        tasks.splice(i, 1)
        localStorage.setItem('task', JSON.stringify(tasks));
        break;
      }
    }

  } else if (targetBtnAttribute === 'checkbox') {
    const currentSpan = $(currentBtn)
      .closest('.todo-item')
      .find('.todo-item__description')[0]

    const taskFind = tasks.find(function (task) {
      return task.text === currentSpan.textContent;
    });

    if (taskFind) {
      taskFind.done = currentBtn.checked;
      localStorage.setItem('task', JSON.stringify(tasks))
    }

    if (currentBtn.checked) {
      $(currentSpan).addClass('cross-line');
    } else {
      $(currentSpan).removeClass('cross-line');
    }
  }
});
});


