const stages = [
    {
        question: "What body of wine do you like?",
        options: ["Light", "Medium", "Full"]
    },
    {
        question: "What type of wine do you like?",
        options: ["Red", "Rose", "White", "Sparkling"]
    },
    {
        question: "What sweetness of wine do you like?",
        options: ["Absolute Dry", "Very Dry", "Dry", "Semi-Dry", "Sweet"]
    },
    {
        question: "What notes do you like in wine?",
        options: ["Apple", "Pear", "Orange", "Gooseberry", "Citrus", "Floral", "Spice", "Tropical", "Berries", "Butter", "Oak", "Strawberry", "Cherry", "Plum", "Peppercorn", "Raspberry", "Mushroom", "Dark Chocolate", "Vanilla", "Honey", "Apricot", "Peach", "Lychee", "Toasty", "Mineral", "Earthy", "Pipe Tobacco", "Cranberry"]
    }
];

let tags = []

let currentStage = 0;
const quizContainer = document.getElementById('quiz');

function loadStage(stageIndex) {
    const stage = stages[stageIndex];
    quizContainer.innerHTML = `
        <div class="question">${stage.question}</div>
        <div class="options">
            ${stage.options.map(option => `<button class="quizbutton" id="${option}">${option}</button>`).join('')}
            <button onclick="nextStage()">Next</button>
        </div>
    `;

    stage.options.forEach(option => {
        const button = document.getElementById(option);
        button.addEventListener('click', () => toggleOption(button, option));
    });
}

function toggleOption(button, option) {
    if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        button.style.backgroundColor = 'grey';
        removeTag(option);
    } else {
        button.classList.add('selected');
        button.style.backgroundColor = 'blue';
        addTag(option);
    }
}

function addTag(tag) {
    tags.push(tag.toString());
}

function removeTag(tag) {
    tags = tags.filter(t => t !== tag);
}

function nextStage() {
    currentStage++;
    if (currentStage < stages.length) {
        loadStage(currentStage);
    } else {
        quizContainer.innerHTML = `<div class="question">Thank you for completing the quiz!</div>`;
        console.log(tags);
    }
}

// Load the first stage
loadStage(currentStage);