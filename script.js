const apiURL = 'http://localhost:3000/todos';

const todoList = document.getElementById('todo-list');
const newTodoForm = document.getElementById('new-todo-form');
const newTodoInput = document.getElementById('new-todo-input');

async function fetchTodos() {
    const response = await fetch(apiURL);
    const todos = await response.json();

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
            <span>${todo.task}</span>
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="editTodo(${todo.id}, '${todo.task}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

newTodoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newTodo = {
        task: newTodoInput.value,
        completed: false
    };

    await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    });

    newTodoInput.value = '';
    fetchTodos();
});

async function deleteTodo(id) {
    await fetch(`${apiURL}/${id}`, {
        method: 'DELETE'
    });

    fetchTodos();
}

async function editTodo(id, oldTask) {
    const newTask = prompt("Edit task:", oldTask);

    if (!newTask || newTask.trim() === '') {
        return;
    }

    await fetch(`${apiURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
    });

    fetchTodos();
}

fetchTodos();