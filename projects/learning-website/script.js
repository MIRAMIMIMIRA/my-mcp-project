// ── Tab navigation ──────────────────────────────────────────────
const navBtns = document.querySelectorAll('.nav-btn');
const tabs    = document.querySelectorAll('.tab');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ── Todos ───────────────────────────────────────────────────────
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const list  = document.getElementById('todo-list');
  const empty = document.getElementById('todo-empty');
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');

    const checkbox = document.createElement('input');
    checkbox.type    = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const del = document.createElement('button');
    del.className   = 'delete-btn';
    del.textContent = '✕';
    del.title       = 'Delete task';
    del.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.append(checkbox, text, del);
    list.appendChild(li);
  });

  empty.style.display = todos.length === 0 ? 'block' : 'none';
}

document.getElementById('todo-add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const input = document.getElementById('todo-input');
  const text  = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  saveTodos();
  renderTodos();
  input.value = '';
  input.focus();
}

renderTodos();

// ── Notes ───────────────────────────────────────────────────────
let notes = JSON.parse(localStorage.getItem('notes') || '[]');

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  const list  = document.getElementById('notes-list');
  const empty = document.getElementById('notes-empty');
  list.innerHTML = '';

  notes.forEach((note, index) => {
    const card = document.createElement('div');
    card.className = 'note-card';

    const title = document.createElement('h3');
    title.textContent = note.title || 'Untitled';

    const body = document.createElement('p');
    body.textContent = note.body;

    const footer = document.createElement('div');
    footer.className = 'note-footer';

    const del = document.createElement('button');
    del.className   = 'delete-btn';
    del.textContent = '✕ Delete';
    del.style.fontSize = '0.8rem';
    del.addEventListener('click', () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    footer.appendChild(del);
    card.append(title, body, footer);
    list.appendChild(card);
  });

  empty.style.display = notes.length === 0 ? 'block' : 'none';
}

document.getElementById('note-add-btn').addEventListener('click', addNote);

function addNote() {
  const titleInput = document.getElementById('note-title');
  const bodyInput  = document.getElementById('note-body');
  const body       = bodyInput.value.trim();
  if (!body) return;

  notes.push({ title: titleInput.value.trim(), body });
  saveNotes();
  renderNotes();
  titleInput.value = '';
  bodyInput.value  = '';
  titleInput.focus();
}

renderNotes();

// ── Counter ─────────────────────────────────────────────────────
let count = parseInt(localStorage.getItem('count') || '0', 10);

const display    = document.getElementById('count-display');
const counterMsg = document.getElementById('counter-msg');

function updateDisplay() {
  display.textContent = count;
  localStorage.setItem('count', count);

  if (count > 0)       counterMsg.textContent = 'Keep going!';
  else if (count < 0)  counterMsg.textContent = "Going negative...";
  else                 counterMsg.textContent = '';
}

function bump() {
  display.classList.remove('bump');
  void display.offsetWidth;
  display.classList.add('bump');
  setTimeout(() => display.classList.remove('bump'), 120);
}

document.getElementById('increment-btn').addEventListener('click', () => {
  count++;
  bump();
  updateDisplay();
});

document.getElementById('decrement-btn').addEventListener('click', () => {
  count--;
  bump();
  updateDisplay();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

updateDisplay();
