const main = document.getElementById("main");
const form = document.getElementById("input_form");
const button = document.getElementById("btn");
const task = document.getElementById("task_name");
const date_and_time = document.getElementById("time_and_date");
const input = document.getElementsByClassName("input");

function add_element_to_screen(task_value, date_and_time_value) {
  let task_wrapper = document.createElement("div");
  let btn_wrapper = document.createElement("div");

  let task_element = document.createElement("p");
  let date_and_time_element = document.createElement("p");
  let edit = document.createElement("button");
  let remove = document.createElement("button");

  task_wrapper.id = "task_wrapper";
  btn_wrapper.id = "btn_wrapper";

  // adding the values to the element
  task_element.textContent = task_value;
  date_and_time_element.textContent = date_and_time_value;
  edit.textContent = "Edit";
  remove.textContent = "remove";

  edit.id = "edit";
  remove.id = "remove";

  btn_wrapper.appendChild(edit);
  btn_wrapper.appendChild(remove);

  task_wrapper.appendChild(task_element);
  task_wrapper.appendChild(date_and_time_element);
  task_wrapper.appendChild(btn_wrapper);

  main.appendChild(task_wrapper);

  // removing the values in the input field
  for (i in input) {
    input[i].value = "";
  }
}

function add_task() {
  let task_value = task.value;
  let date_and_time_value = date_and_time.value;

  // to not add the task if all the required filed are not filed in
  if (task_value == "" || date_and_time_value == "") {
    return;
  }

  add_element_to_screen(task_value, date_and_time_value);
}

function edit_task(element) {
  const task_wrapper = element.closest("#task_wrapper");

  const task_element = task_wrapper.querySelector("p:nth-child(1)");
  const date_and_time_element = task_wrapper.querySelector("p:nth-child(2)");
  const btn_wrapper = task_wrapper.querySelector("#btn_wrapper");

  const current_task = task_element.textContent;
  const current_datetime = date_and_time_element.textContent;

  const task_input = document.createElement("input");
  task_input.type = "text";
  task_input.value = current_task;
  task_input.className = "edit-input";

  const datetime_input = document.createElement("input");
  datetime_input.type = "datetime-local";
  datetime_input.value = current_datetime;
  datetime_input.className = "edit-input";

  const save_button = document.createElement("button");
  save_button.textContent = "Save";
  save_button.id = "edit";
  save_button.style.backgroundColor = "rgb(159, 159, 244)";

  while (task_wrapper.firstChild) {
    task_wrapper.removeChild(task_wrapper.firstChild);
  }

  const new_btn_wrapper = document.createElement("div");
  new_btn_wrapper.id = "btn_wrapper";

  new_btn_wrapper.appendChild(save_button);

  task_wrapper.appendChild(task_input);
  task_wrapper.appendChild(datetime_input);
  task_wrapper.appendChild(new_btn_wrapper);

  task_input.focus();

  save_button.onclick = function () {
    const new_task_element = document.createElement("p");
    new_task_element.textContent = task_input.value;

    const new_datetime_element = document.createElement("p");
    new_datetime_element.textContent = datetime_input.value;

    const edit_btn = document.createElement("button");
    edit_btn.textContent = "Edit";
    edit_btn.id = "edit";

    const remove_btn = document.createElement("button");
    remove_btn.textContent = "remove";
    remove_btn.id = "remove";

    const restored_btn_wrapper = document.createElement("div");
    restored_btn_wrapper.id = "btn_wrapper";
    restored_btn_wrapper.appendChild(edit_btn);
    restored_btn_wrapper.appendChild(remove_btn);

    while (task_wrapper.firstChild) {
      task_wrapper.removeChild(task_wrapper.firstChild);
    }

    task_wrapper.appendChild(new_task_element);
    task_wrapper.appendChild(new_datetime_element);
    task_wrapper.appendChild(restored_btn_wrapper);
  };
}

function remove_task(Element) {
  const task = Element.parentElement.parentElement;
  task.parentNode.removeChild(task);
}

document.addEventListener("click", function (event) {
  if (event.target.matches("#btn")) {
    add_task();
  } else if (event.target.matches("#edit")) {
    const clicked_element = event.target;
    edit_task(clicked_element);
  } else if (event.target.matches("#remove")) {
    const clicked_element = event.target;

    remove_task(clicked_element);
  }
});
