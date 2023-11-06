/**
 * Os Comentários adicionado servem apenas como base de estudo
 * Não sendo necessários para a comprensão da lógica,
 * pois os recursos adotados se baseam no que está descrito no livro Clean code
 */

let formTaskClass = document.querySelector('#formTask');
let mainTask = document.querySelector('main');
let checkedClass = document.querySelector('.checked');

const tasks = [];

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
  console.log('task objeto: ', tasks);
})

//Escutar qualquer evento de click
document.addEventListener('click', (event) => {
  //Deletar task
  if (event.target.classList.contains('deleteTask')) {
    let id = event.target.id.split('-');
    let task = document.getElementById(`task-${id[1]}`);
    task.remove();
  }

  //checkar task
  if (event.target.classList.contains('isCheck')) {
    console.log('cliquei no checked')
    let id = event.target.id.split('-');
    let task = document.getElementById(`task-${id[1]}`);
    checkedClass.appendChild(task);
  }
})

const _appendChildDiv = (tagDiv,...elements) => {
  for (value of elements) {
    tagDiv.appendChild(value);
  }
}

const _createDivForTask = () => {
  let div = _createElement('div');

  div.setAttribute('id', `task-${_getIncrementIdTask()}`);

  return div;
}

const _createButtonOfDeleteForTask = () => {
  let button = _createElement('button');

  button.setAttribute('id', `delete-${_getIncrementIdTask()}`)

  _addClassList(button, 'paragrafoTask', 'deleteTask');

  button.innerText = 'Deletar'
  return button;
}

const _createParagraphForTask = (taskText) => {
  let paragraph = _createElement('p');

  _addClassList(paragraph, 'paragrafoTask');

  paragraph.innerText = taskText;
  return paragraph;
}

const _createCheckBoxForTask = () => {
  let inputElement = _createElement('input');
  inputElement.setAttribute('id', `checked-${_getIncrementIdTask()}`)
  inputElement.type = 'checkbox';

  _addClassList(inputElement, 'paragrafoTask', 'isCheck');

  return inputElement;
};

const _addClassList = (element, ...ClassNames) => {
  for (value of ClassNames) {
    element.classList.add(value);
  }
}

const _getIncrementIdTask = () => tasks.length + 1;

const _createElement = (elementTypeName) => {
  return document.createElement(elementTypeName);
}
