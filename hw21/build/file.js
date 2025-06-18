"use strict";

$(document).ready(function () {
  var $input = $(".form__input.js--form__input");
  var $btnAdd = $(".form__btn");
  var $ul = $(".js--todos-wrapper");
  var tasks = JSON.parse(localStorage.getItem("task")) || [];
  function createLiTasks(task) {
    var $li = $("<li>").addClass("todo-item");
    var $inputCheckBox = $("<input>").attr("type", "checkbox").attr("data-name", "checkbox").prop("checked", task.done);
    var $span = $("<span>").addClass("todo-item__description").text(task.text);
    if (task.done) {
      $span.addClass("cross-line");
    }
    var $btnDelete = $("<button>").addClass("todo-item__delete").attr("data-name", "delete").text("Видалити");
    $li.append($inputCheckBox, $span, $btnDelete);
    $ul.append($li);
    $ul.on("click", function (event) {
      var $target = $(event.target);
      var targetBtnAttribute = $target.attr("data-name");
      if (targetBtnAttribute === "delete") {
        return;
      }
      if ($target.closest(".todo-item").length && targetBtnAttribute !== "checkbox") {
        var taskText = $target.closest(".todo-item").find(".todo-item__description").text();
        $("#taskModal .modal-body").text(taskText);
        var modal = new bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
      }
    });
  }
  tasks.forEach(function (task) {
    return createLiTasks(task);
  });
  $btnAdd.on("click", function (event) {
    event.preventDefault();
    var value = $input.val().trim();
    if (value) {
      var newTask = {
        text: value,
        done: false
      };
      createLiTasks(newTask);
      tasks.push(newTask);
      localStorage.setItem("task", JSON.stringify(tasks));
      $input.val("");
    }
  });
  $ul.on("click", function (event) {
    var targetBtnAttribute = $(event.target).attr("data-name");
    var currentBtn = event.target;
    if (targetBtnAttribute === "delete") {
      var currentSpan = $(currentBtn).closest(".todo-item").find(".todo-item__description")[0];
      $(currentBtn).closest(".todo-item").remove();
      for (var i = 0; i < tasks.length; i++) {
        if (currentSpan.textContent === tasks[i].text) {
          tasks.splice(i, 1);
          localStorage.setItem("task", JSON.stringify(tasks));
          break;
        }
      }
    } else if (targetBtnAttribute === "checkbox") {
      var _currentSpan = $(currentBtn).closest(".todo-item").find(".todo-item__description")[0];
      var taskFind = tasks.find(function (task) {
        return task.text === _currentSpan.textContent;
      });
      if (taskFind) {
        taskFind.done = currentBtn.checked;
        localStorage.setItem("task", JSON.stringify(tasks));
      }
      if (currentBtn.checked) {
        $(_currentSpan).addClass("cross-line");
      } else {
        $(_currentSpan).removeClass("cross-line");
      }
    }
  });
});