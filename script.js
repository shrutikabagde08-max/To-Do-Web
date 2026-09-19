const checkboxes = document.querySelectorAll('.list input[type="checkbox"]');
const cards = document.querySelectorAll('.card');
const targetCard = cards[1];

const targetOptions = targetCard.querySelectorAll('p');
const links = document.querySelectorAll("nav a");



checkboxes.forEach((checkbox) => {

    checkbox.addEventListener('change', () => {

        const text = checkbox.parentElement;

        if (checkbox.checked) {

            text.style.textDecoration = 'line-through';
            text.style.color = '#176b5b';

        } else {

            text.style.textDecoration = 'none';
            text.style.color = '';

        }

        saveTasks();
    });
});


function saveTasks() {

    const tasks = [];

    checkboxes.forEach((checkbox) => {

        tasks.push(checkbox.checked);

    });

    localStorage.setItem(
        'disciplineTasks',
        JSON.stringify(tasks)
    );
}


function loadTasks() {

    const savedTasks =
        JSON.parse(localStorage.getItem('disciplineTasks'));

    if (!savedTasks) {
        return;
    }

    checkboxes.forEach((checkbox, index) => {

        checkbox.checked = savedTasks[index];

        if (checkbox.checked) {

            checkbox.parentElement.style.textDecoration =
                'line-through';

            checkbox.parentElement.style.color =
                '#176b5b';
        }
    });
}


loadTasks();




targetOptions.forEach((option) => {

    option.addEventListener('click', () => {

        targetOptions.forEach((item) => {

            item.style.fontWeight = 'normal';
            item.style.color = '';

        });

        option.style.fontWeight = 'bold';
        option.style.color = '#176b5b';

    });

});




links.forEach((link) => {

    link.addEventListener('click', (event) => {

        event.preventDefault();

        const targetId = link.getAttribute("href");

        const targetSection =
            document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });

    });

});





const calendarBody = document.querySelector("#calendar-body");
const monthYear = document.querySelector("#month-year");

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

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

    row.appendChild(cell);

    if ((firstDay + day) % 7 === 0) {
        calendarBody.appendChild(row);
        row = document.createElement("tr");
    }
}


if (row.children.length > 0) {
    calendarBody.appendChild(row);
}
const thought = document.querySelector("#thought");
const thoughtBtn = document.querySelector("#thoughtBtn");

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

    const randomIndex = Math.floor(
        Math.random() * thoughts.length
    );

    thought.textContent = thoughts[randomIndex];

});