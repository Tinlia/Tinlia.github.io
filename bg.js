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

const wine_list = [
    { name: "Brut Sparkling Wine", tags:["semi-dry", "sparkling", "white", "apple", "melon", "citrus", "light-bodied"]},
    { name: "Aligote", tags: ["very dry", "white", "apple", "pear", "light-bodied"]},
    { name: "Sauvingnon Blanc", tags: ["very dry", "white", "gooseberry", "citrus", "light-bodied"]},
    { name: "Gewurztraminer", tags: ["very dry", "white", "orange", "lychee", "floral", "full-bodied", "spice", "tropical"]},
    { name: "Barrel Fermented Chardonnay", tags: ["absolute dry", "white", "berries", "butter", "oak", "full-bodied"]},
    { name: "Rose", tags: ["dry", "strawberry", "rose", "cranberry", "light-bodied"]},
    { name: "Gamay Noir", tags: ["very dry", "red", "cherry", "plum", "berries", "spice", "medium-bodied"]},
    { name: "Gamay Noir 'Droit'", tags: ["very dry", "red", "peppercorn", "cherry", "plum", "berries", "spice", "medium-bodied"]},
    { name: "Atelier", tags: ["dry", "red", "blend", "plum", "berries", "spice", "medium-bodied"]},
    { name: "Estate Pinot Noir", tags: ["very dry", "red", "strawberry", "raspberry", "floral", "mushroom", "medium-bodied"]},
    { name: "Estate Cabernet Sauvignon", tags: ["very dry", "red", "oak", "cherry", "dark chocolate", "spice", "vanilla", "full-bodied"]},
    { name: "Cabernet Merlot", tags: ["very dry", "red", "blend", "oak", "dark chocolate", "raspberry", "full-bodied"]},
    { name: "Vidal Icewine", tags: ["very sweet", "white", "honey", "apricot", "peach", "lychee", "full-bodied"]},
    { name: "Rose Sparkling Wine", tags: ["semi-dry", "sparkling", "cranberry", "floral", "rose", "strawberry", "light-bodied"]},
    { name: "Blanc de Blancs Sparkling Wine", tags: ["absolute dry", "sparkling", "white", "vanilla", "citrus", "toasty"]},
    { name: "'Old Vines' Riesling", tags: ["sweet", "white", "citrus", "mineral", "full-bodied"]},
    { name: "'Old Vines' Pinot Noir", tags: ["very dry", "red", "raspberry", "strawberry", "mushroom", "earthy", "spice", "medium-bodied"]},
    { name: "'Old Vines' Cabernet-Merlot", tags: ["very dry", "red", "oak", "peppercorn", "blend", "cherry", "raspberry", "medium-bodied"]},
    { name: "Fume Blanc", tags: ["absolute dry", "white", "citrus", "oak", "tropical", "full-bodied"]},
    { name: "St. Davids Bench Chardonnay", tags: ["very dry", "white", "oak", "melon", "spice", "berries", "mineral", "full-bodied"]},
    { name: "Paul Bosc Chardonnay", tags: ["very dry", "white", "oak", "butter", "citrus", "melon", "full-bodied"]},
    { name: "Paul Bosc Pinot Noir", tags: ["very dry", "red", "strawberry", "raspberry", "floral", "earthy", "full-bodied"]},
    { name: "St. Davids Bench Merlot", tags: ["very dry", "red", "cherry", "plum", "dark chocolate", "full-bodied"]},
    { name: "Cabernet Franc", tags: ["very dry", "red", "oak", "raspberry", "peppercorn", "pipe tobacco", "full-bodied"]},
    { name: "St. Davids Bench Cabernet Sauvignon", tags: ["very dry", "red", "oak", "plum", "cherry", "dark chocolate", "peppercorn", "full-bodied"]},
    { name: "Equuleus", tags: ["very dry", "red", "oak", "berries", "dark chocolate", "blend", "full-bodied"]},
    { name: "Cabernet Icewine", tags: ["very sweet", "red", "strawberry", "cranberry", "full-bodied"]}
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
            <button id="next" onclick="nextStage()">Next</button>
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
        button.style.backgroundColor = '#656b71';
        removeTag(option);
    } else {
        button.classList.add('selected');
        button.style.backgroundColor = '#2b6fee';
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
        displayResults();
    }
}

function displayResults() {
    const matches = wine_list.map(wine => {
        const matchCount = wine.tags.filter(tag => tags.includes(tag)).length;
        const matchPercentage = (matchCount / wine.tags.length) * 100;
        return { name: wine.name, matchPercentage };
    });

    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    const topMatches = matches.slice(0, 3);

    quizContainer.innerHTML = `
        <div class="question">Thank you for completing the quiz! Here are your top wine matches:</div>
        <ul>
            ${topMatches.map(match => `<li>${match.name}: ${match.matchPercentage.toFixed(2)}% match</li>`).join('')}
        </ul>
    `;

    console.log(tags);
}

// Load the first stage
loadStage(currentStage);