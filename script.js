const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const progress = document.querySelector("#progress");

const age = document.querySelector("#age");
const target = document.querySelector("#target");
const time = document.querySelector("#time");
const routine = document.querySelector("#routine");

const notesInput = document.querySelector("#notesInput");
const saveNotesBtn = document.querySelector("#saveNotesBtn");
const noteStatus = document.querySelector("#noteStatus");

const thought = document.querySelector("#thought");
const thoughtBtn = document.querySelector("#thoughtBtn");

const calendarBody = document.querySelector("#calendar-body");
const monthYear = document.querySelector("#month-year");

let tasks = JSON.parse(localStorage.getItem("disciplineTasks")) || [
    { text: "Wake up", completed: false },
    { text: "Exercise", completed: false },
    { text: "Breakfast", completed: false },
    { text: "Work/Study", completed: false },
    { text: "Lunch", completed: false },
    { text: "Work/Study", completed: false },
    { text: "Dinner", completed: false },
    { text: "Relaxation", completed: false },
    { text: "Sleep", completed: false }
];

function saveTasks() {
    localStorage.setItem("disciplineTasks", JSON.stringify(tasks));
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    progress.textContent =
        "Progress: " + completedTasks + " / " + tasks.length + " completed";
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Complete " + task.text);

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";
        deleteBtn.setAttribute("aria-label", "Delete " + task.text);

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateProgress();
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function savePreferences() {
    localStorage.setItem("disciplineAge", age.value);
    localStorage.setItem("disciplineTarget", target.value);
    localStorage.setItem("disciplineTime", time.value);
    localStorage.setItem("disciplineRoutine", routine.value);
}

function loadPreferences() {
    const savedAge = localStorage.getItem("disciplineAge");
    const savedTarget = localStorage.getItem("disciplineTarget");
    const savedTime = localStorage.getItem("disciplineTime");
    const savedRoutine = localStorage.getItem("disciplineRoutine");

    if (savedAge) {
        age.value = savedAge;
    }

    if (savedTarget) {
        target.value = savedTarget;
    }

    if (savedTime) {
        time.value = savedTime;
    }

    if (savedRoutine) {
        routine.value = savedRoutine;
    }
}

age.addEventListener("change", savePreferences);
target.addEventListener("change", savePreferences);
time.addEventListener("change", savePreferences);
routine.addEventListener("change", savePreferences);

loadPreferences();
displayTasks();

const savedNotes = localStorage.getItem("disciplineNotes");

if (savedNotes) {
    notesInput.value = savedNotes;
}

saveNotesBtn.addEventListener("click", () => {
    localStorage.setItem("disciplineNotes", notesInput.value);
    noteStatus.textContent = "Notes saved successfully.";
});

const thoughts = [
    "Discipline is the bridge between goals and accomplishment.",
    "Small steps every day create big results.",
    "Success starts with consistency.",
    "Focus on progress, not perfection.",
    "Your future is created by what you do today.",
    "Do something today that your future self will thank you for.",
    "Consistency is more powerful than motivation.",
    "Every day is a new opportunity to improve."
];

thoughtBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * thoughts.length);
    thought.textContent = thoughts[randomIndex];
});

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const today = currentDate.getDate();

const monthName = currentDate.toLocaleString("default", {
    month: "long"
});

monthYear.textContent = monthName + " " + year;

const firstDay = new Date(year, month, 1).getDay();
const totalDays = new Date(year, month + 1, 0).getDate();

let row = document.createElement("tr");

for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement("td");
    row.appendChild(cell);
}

for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("td");

    cell.textContent = day;

    if (day === today) {
        cell.classList.add("today");
    }

    row.appendChild(cell);

    if ((firstDay + day) % 7 === 0) {
        calendarBody.appendChild(row);
        row = document.createElement("tr");
    }
}

if (row.children.length > 0) {
    calendarBody.appendChild(row);
}