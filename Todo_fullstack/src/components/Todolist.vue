<template>
    <div class="todolist">
        <body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form>
        <h3>ToDo-List</h3>
        <div class="row">
            <input type="text" id="inputbox" placeholder="Add your text">
            <button id="add-task-button">Add</button>
        </div>
        <ul id="list-container">
            
            <!-- <li class="checkbox">Task 1<input type="checkbox" name="" id="" class="check"></li> -->
            <!-- <li>Task 2</li>
             <li>Task 3</li> -->
        </ul>
    </form>
    
</body>
    </div>
</template>

<script setup>
class Task {
    constructor(name) {
        this.name = name;
        this.checkebox = false; // pour suivre si la tâche est terminée
    }
}

class TodoList {
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }

    addTask(name) {
        const task = new Task(name);
        this.tasks.push(task); // Supprime la tâche à l'index donné
        this.saveTasks(); // Sauvegarde les tâches
        this.render(); // Met à jour l'affichage
    }

    toggleTask(index) {
        this.tasks[index].checked = !this.tasks[index].checked;
        this.saveTasks();
        this.render();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.render();
    }

    editTask(index, newName) {
        this.tasks[index].name = newName;
        this.saveTasks();
        this.render();
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")); // Charge les tâches du stockage local
        if (storedTasks) {
            this.tasks = storedTasks.map(task => new Task(task.name, task.checked));
        }
        this.render();
    }

    render() {
        const listContainer = document.getElementById("list-container");
        listContainer.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            const li = document.createElement("li");
            li.textContent = task.name;
            // li.innerHTML = `
            // <input type="checkbox" class="check" />
            // <span>${task.name}</span>
            // `;
            if (task.checked) {
                li.classList.add("checked");
            }
            const span = document.createElement("span");
            span.innerHTML = "\u00d7"; // caractère de suppression
            span.onclick = () => this.removeTask(index);
            li.appendChild(span);

            // Ajout de la possibilité de modifier la tâche
            li.onclick = () => {
                const newName = prompt("Modifier la tâche:", task.name);
                if (newName) {
                    this.editTask(index, newName);
                }
            };

            listContainer.appendChild(li);
        });
    }
}

const todoList = new TodoList();

const inputBox = document.getElementById("input-box");
document.getElementById("add-task-button").onclick = () => {
    if (inputBox.value) {
        todoList.addTask(inputBox.value);
        inputBox.value = '';
    } else {
        alert("Vous devez écrire quelque chose !");
    }
};
</script>

<style scoped>
.todolist {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #2d275c;
}

.background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

.background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}

.shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
}

.shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
}

form {
    height: 520px;
    width: 400px;
    background-color: rgba(238, 237, 237, 0.692);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
}

form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    color: #fff;
}

input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    margin-top: 8px;
    font-size: 14px;
    color: #000;
    padding: 10px;
}

button {
    border: none;
    outline: none;
    padding: 16px 50px;
    background: linear-gradient(to right, #ff512f, #f09819);
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border-radius: 40px;
}

ul {
    margin-top: 30px;
    padding: 0;
    list-style: none;
}

ul li {
    background-color: rgba(255, 255, 255, 0.07);
    padding: 12px 8px;
    border-radius: 5px;
    margin-bottom: 10px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.completed {
    text-decoration: line-through;
    color: #ccc;
}

.delete-btn {
    color: #ff512f;
    cursor: pointer;
}
</style>