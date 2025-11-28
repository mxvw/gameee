const form = document.querySelector(".game_form");
const list = document.querySelector(".game_list");
const select = document.querySelector(".game_select");
const input = document.querySelector(".game_input");

const pattern = /^(?=.*\d)[A-Z][A-Za-z\d]{0,11}$/;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = form['input'].value.trim();
    const select = form['select'].value;

    const user = {
        username: input,
        select: select
    }

    const inputValue = input;
    const value = select;

    if (!pattern.test(inputValue)) {
        alert("Invalid input! \n- Bosh harf katta bo'lishi kerak\n- Kamida 1 raqam bo'lishi kerak\n- 12 ta belgidan ko'p bo'lmasligi kerak");
        return;
    }
    if (!inputValue) {
        alert("Enter information.");
        return;
    }

    list.innerHTML += `
        <div class="game_card">
            <input type="checkbox" class="ui-checkbox">
            <div class="title">
                <h3>${inputValue.length > 12 ? inputValue.slice(0, 12) : inputValue}</h3>
                <p>comentary</p>
            </div>
            <div class="select">
                <p>${value}</p>
            </div>
            <div class="delete">
                <button>Delete</button>
            </div>
        </div>
    `;

    input.value = "";
});

list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent === "Delete") {
        const card = e.target.closest(".game_card");
        if (card) {
            card.remove();
        }
    }
});
