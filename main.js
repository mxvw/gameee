let tasks = [];
let nestedQuestGroups = [];

const input = document.querySelector('.game_input');
const select = document.querySelector('.game_select');
const addBtn = document.querySelector('.game_add');
const taskList = document.querySelector('.game_list');

const statsList = document.querySelector('.stats_list');

function normalizeTitle(raw) {
    let t = raw.trim();


    if (t.length > 50) t = t.slice(0, 50) + "...";

    return t;
}

function createTaskObject(title, difficulty) {
    return {
        id: Date.now() + Math.floor(Math.random() * 999),
        title,
        difficulty,
        completed: false
    };
}

function addTask() {
    const rawTitle = input.value.trim();

    if (rawTitle.length === 0) {
        alert("Enter information.");
        return;
    }

    const title = normalizeTitle(rawTitle);
    const diff = select.value;

    const obj = createTaskObject(title, diff);

    tasks.push(obj);

    input.value = "";
    renderTasks();
    countStats();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    countStats();
}

function toggleComplete(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return;
    tasks[idx].completed = !tasks[idx].completed;
    renderTasks();
    countStats();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(item => {

        const card = document.createElement("div");
        card.className = "game_card";

        let colorClass = "";
        switch (item.difficulty) {
            case "easy": colorClass = "easy"; break;
            case "medium": colorClass = "medium"; break;
            case "hard": colorClass = "hard"; break;
        }

        card.innerHTML = `
            <div class="check">
                <label class="cl-checkbox">
                    <input type="checkbox" ${item.completed ? "checked" : ""} data-id="${item.id}">
                    <span></span>
                </label>
            </div>

            <div class="title">
                <h3>${item.title}</h3>
                <p>Id: ${item.id}</p>
            </div>

            <div class="select">
                <p class="${colorClass}">${item.difficulty}</p>
            </div>

            <div class="delete">
                <button data-id="${item.id}">Delete</button>
            </div>
        `;

        card.querySelector("input").addEventListener("change", (e) => {
            toggleComplete(Number(e.target.dataset.id));
        });

        card.querySelector("button").addEventListener("click", (e) => {
            deleteTask(Number(e.target.dataset.id));
        });

        taskList.appendChild(card);
    });
}

function countStats() {
    const total = tasks.length;
    const hardCount = tasks.filter(t => t.difficulty === "hard").length;
    const easyCount = tasks.filter(t => t.difficulty === "easy").length;
    const completedCount = tasks.filter(t => t.completed).length;

    const flatCount = [tasks, ...nestedQuestGroups].flat().length;

    statsList.innerHTML = `
        <li>Total quests: ${total}</li>
        <li>Hard quests: ${hardCount}</li>
        <li>Easy quests: ${easyCount}</li>
        <li>Completed quests: ${completedCount}</li>
        <li>Nested (flat) opened count: ${flatCount}</li>
    `;
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

tasks.push(createTaskObject("find the sword", "hard"));
tasks.push(createTaskObject("gather herbs", "easy"));
tasks.push(createTaskObject("talk to guard", "medium"));

renderTasks();
countStats();
const loadingScreen = document.querySelector('.loading_screen');
const siteContent = document.querySelector('.header');

const leftBox = document.querySelector('.box');
const rightStats = document.querySelector('.game_stats');
const topGameBox = document.querySelector('.game_box');

siteContent.style.display = "none";

window.addEventListener("load", () => {

    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.pointerEvents = "none";

        siteContent.style.display = "block";

        setTimeout(() => {

            topGameBox.classList.add('show');
            leftBox.classList.add('show');
            rightStats.classList.add('show');

        }, 300);

    }, 1000);
});
