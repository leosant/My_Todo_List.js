/**
 * Os Comentários adicionados servem apenas como base de estudo
 * Não sendo necessários para a comprensão da lógica,
 * pois os recursos adotados se baseam no que está descrito no livro Clean code
 */

let formTaskClass = document.querySelector('#formTask');
let mainTask = document.querySelector('main');
let checkedClass = document.querySelector('.checked');

let tasks = [];

//Adiconar uma nova task
formTaskClass.addEventListener('submit', (event) => {
  event.preventDefault();
  let inputTask = event.target.querySelector('#inputTextTask');
  let taskValue = inputTask.value;

  tasks.push({
    id: tasks.length + 1,
    taskText: taskValue
  });

  let checkbox = _createCheckBoxForTask();
  let paragraph = _createParagraphForTask(taskValue);
  let buttonDelete = _createButtonOfDeleteForTask();

  let divTask = _createDivForTask();

  _appendChildDiv(divTask, checkbox, paragraph, buttonDelete);

  mainTask.appendChild(divTask);

  inputTask.value = '';
});

//Escutar qualquer evento de click
document.addEventListener('click', (event) => {
  _deletarTask(event);
  _checkarTask(event);
});

const _checkarTask = (event) => {
  if (!_isContainsClassName(event, 'isCheck')) return;

  let isChecked = event.target.checked;

  let id = _getIdTask(event);
  let task = document.getElementById(`task-${id}`);

  if (isChecked) {
    checkedClass.appendChild(task);
  } else {
    mainTask.appendChild(task);
  }
}

const _deletarTask = (event) => {
  if (!_isContainsClassName(event ,'deleteTask')) return;

  let idTask = _getIdTask(event);
  let task = document.getElementById(`task-${idTask}`);
  task.remove();
}

const _getIdTask = (event) => {
  return event.target.id.split('-')[1];
}

const _isContainsClassName = (event, className) => event.target.classList.contains(className);

const _appendChildDiv = (tagDiv,...elements) => {
  for (value of elements) {
    tagDiv.appendChild(value);
  }
}

const _createDivForTask = () => {
  let div = _createElement('div');

  div.setAttribute('id', `task-${_createIdTaskIncremented()}`);

  return div;
}

const _createButtonOfDeleteForTask = () => {
  let button = _createElement('button');

  button.setAttribute('id', `delete-${_createIdTaskIncremented()}`)

  _addClassList(button, 'paragrafoTask', 'deleteTask');

  button.innerText = 'Deletar'
  return button;
}

const _createParagraphForTask = (taskText) => {
  let paragraph = _createElement('p');

  // paragraph.setAttribute('id', _createIdTaskIncremented());
  _addClassList(paragraph, 'paragrafoTask');

  paragraph.innerText = taskText;
  return paragraph;
}

const _createCheckBoxForTask = () => {
  let inputElement = _createElement('input');
  inputElement.setAttribute('id', `checked-${_createIdTaskIncremented()}`)
  inputElement.type = 'checkbox';

  _addClassList(inputElement, 'paragrafoTask', 'isCheck');

  return inputElement;
};

const _addClassList = (element, ...ClassNames) => {
  for (value of ClassNames) {
    element.classList.add(value);
  }
}

const _createIdTaskIncremented = () => tasks.length + 1;

const _createElement = (elementTypeName) => {
  return document.createElement(elementTypeName);
}
