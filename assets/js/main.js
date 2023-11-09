/**
 * Os Comentários adicionados servem apenas como base de estudo
 * Não sendo necessários para a comprensão da lógica,
 * pois os recursos adotados se baseam no que está descrito no livro Clean code
 */

let formTaskClass = document.querySelector('#formTask');
let mainTask = document.querySelector('main');
let checkedClass = document.querySelector('.checked');

let tasks = [];

window.onload = (event) => {
  tasks = JSON.parse(localStorage.getItem('list'));

  console.log(tasks);
  for(index in tasks) {
    let taskLocal = tasks[index];

    let checkbox = _createCheckBoxForTask(taskLocal.id, taskLocal.isChecked);
    let paragraph = _createParagraphForTask(taskLocal.taskText);
    let buttonDelete = _createButtonOfDeleteForTask(taskLocal.id);
    
    let divTask = _createDivForTask(taskLocal.id);
    
    _appendChildDiv(divTask, checkbox, paragraph, buttonDelete);

    if(taskLocal.isChecked) {
      checkedClass.appendChild(divTask);
    } else {
      mainTask.appendChild(divTask);
    }
    
  }
}

//Adiconar uma nova task
formTaskClass.addEventListener('submit', (event) => {
  event.preventDefault();
  let inputTask = event.target.querySelector('#inputTextTask');
  let taskValue = inputTask.value;

  tasks = tasks == null ? [] : tasks;

  idGerado = _createIdTaskIncremented();
  
  tasks.push({
    id: idGerado,
    taskText: taskValue,
    isChecked: false
  });

  localStorage.setItem('list', JSON.stringify(tasks));

  let checkbox = _createCheckBoxForTask(idGerado, false);
  let paragraph = _createParagraphForTask(taskValue);
  let buttonDelete = _createButtonOfDeleteForTask(idGerado);

  let divTask = _createDivForTask(idGerado);

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

    for(i in tasks) {
      task = tasks[i];
      if (task.id == id) {
        task.isChecked = true;
        tasks.splice(i, 1, task);
      }
    }
  } else {
    mainTask.appendChild(task);

    for(i in tasks) {
      task = tasks[i];
      if (task.id == id) {
        task.isChecked = false;
        tasks.splice(i, 1, task);
      }
    }
  }
  localStorage.setItem('list', JSON.stringify(tasks));
}

const _deletarTask = (event) => {
  if (!_isContainsClassName(event ,'deleteTask')) return;

  const confirm = window.confirm('Você deseja realmente apagar essa tarefa ?');
  if (!confirm) return ;
  
  let idTask = _getIdTask(event);
  let task = document.getElementById(`task-${idTask}`);
  task.remove();

  for(i in tasks) {
    task = tasks[i];
    if (task.id == idTask) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem('list', JSON.stringify(tasks));
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

const _createDivForTask = (idGerado) => {
  let div = _createElement('div');

  div.setAttribute('id', `task-${idGerado}`);

  return div;
}

const _createButtonOfDeleteForTask = (idGerado) => {
  let button = _createElement('button');

  button.setAttribute('id', `delete-${idGerado}`)

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

const _createCheckBoxForTask = (idGerado, isChecked) => {
  let inputElement = _createElement('input');
  inputElement.setAttribute('id', `checked-${idGerado}`)
  inputElement.checked = isChecked;
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
