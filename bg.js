const stages = [
    {
        question: "What bodies of wine do you like?",
        options: ["Light-bodied", "Medium-bodied", "Full-bodied"]
    },
    {
        question: "What types of wine do you like?",
        options: ["Red", "Rose", "White", "Sparkling", "Blend"]
    },
    {
        question: "What sweetness levels do you like?",
        options: ["Absolute Dry", "Very Dry", "Dry", "Semi-Dry", "Sweet"]
    },
    {
        question: "What notes do you like in wine?",
        options: ["Apple", "Pear", "Orange", "Gooseberry", "Citrus", "Floral", "Spice", "Tropical", "Berries", "Butter", "Oak", "Strawberry", "Cherry", "Plum", "Peppercorn", "Raspberry", "Mushroom", "Dark Chocolate", "Vanilla", "Honey", "Apricot", "Peach", "Lychee", "Toasty", "Mineral", "Earthy", "Pipe Tobacco", "Cranberry"]
    }
]

const wine_list = [
    { name: "Brut Sparkling Wine", tags:["Semi-Dry", "Sparkling", "White", "Apple", "Melon", "Citrus", "Light-bodied"]},
    { name: "Aligote", tags: ["Very Dry", "White", "Apple", "Pear", "Light-bodied"]},
    { name: "Sauvingnon Blanc", tags: ["Very Dry", "White", "Gooseberry", "Citrus", "Light-bodied"]},
    { name: "Gewurztraminer", tags: ["Very Dry", "White", "Orange", "Lychee", "Floral", "Full-bodied", "Spice", "Tropical"]},
    { name: "Barrel Fermented Chardonnay", tags: ["Absolute Dry", "White", "Berries", "Butter", "Oak", "Full-bodied"]},
    { name: "Rose", tags: ["Dry", "Strawberry", "Rose", "Cranberry", "Light-bodied"]},
    { name: "Gamay Noir", tags: ["Very Dry", "Red", "Cherry", "Plum", "Berries", "Spice", "Medium-bodied"]},
    { name: "Gamay Noir 'Droit'", tags: ["Very Dry", "Red", "Peppercorn", "Cherry", "Plum", "Berries", "Spice", "Medium-bodied"]},
    { name: "Atelier", tags: ["Dry", "Red", "Blend", "Plum", "Berries", "Spice", "Medium-bodied"]},
    { name: "Estate Pinot Noir", tags: ["Very Dry", "Red", "Strawberry", "Raspberry", "Floral", "Mushroom", "Medium-bodied"]},
    { name: "Estate Cabernet Sauvignon", tags: ["Very Dry", "Red", "Oak", "Cherry", "Dark Chocolate", "Spice", "Vanilla", "Full-bodied"]},
    { name: "Cabernet Merlot", tags: ["Very Dry", "Red", "Blend", "Oak", "Dark Chocolate", "Raspberry", "Full-bodied"]},
    { name: "Vidal Icewine", tags: ["Sweet", "White", "Honey", "Apricot", "Peach", "Lychee", "Full-bodied"]},
    { name: "Rose Sparkling Wine", tags: ["Semi-Dry", "Sparkling", "Cranberry", "Floral", "Rose", "Strawberry", "Light-bodied"]},
    { name: "Blanc de Blancs Sparkling Wine", tags: ["Absolute Dry", "Sparkling", "White", "Vanilla", "Citrus", "Toasty"]},
    { name: "'Old Vines' Riesling", tags: ["Sweet", "White", "Citrus", "Mineral", "Full-bodied"]},
    { name: "'Old Vines' Pinot Noir", tags: ["Very Dry", "Red", "Raspberry", "Strawberry", "Mushroom", "Earthy", "Spice", "Medium-bodied"]},
    { name: "'Old Vines' Cabernet-Merlot", tags: ["Very Dry", "Red", "Oak", "Peppercorn", "Blend", "Cherry", "Raspberry", "Medium-bodied"]},
    { name: "Fume Blanc", tags: ["Absolute Dry", "White", "Citrus", "Oak", "Tropical", "Full-bodied"]},
    { name: "St. Davids Bench Chardonnay", tags: ["Very Dry", "White", "Oak", "melon", "Spice", "Berries", "Mineral", "Full-bodied"]},
    { name: "Paul Bosc Chardonnay", tags: ["Very Dry", "White", "Oak", "Butter", "Citrus", "melon", "Full-bodied"]},
    { name: "Paul Bosc Pinot Noir", tags: ["Very Dry", "Red", "Strawberry", "Raspberry", "Floral", "Earthy", "Full-bodied"]},
    { name: "St. Davids Bench Merlot", tags: ["Very Dry", "Red", "Cherry", "Plum", "Dark Chocolate", "Full-bodied"]},
    { name: "Cabernet Franc", tags: ["Very Dry", "Red", "Oak", "Raspberry", "Peppercorn", "Pipe Tobacco", "Full-bodied"]},
    { name: "St. Davids Bench Cabernet Sauvignon", tags: ["Very Dry", "Red", "Oak", "Plum", "Cherry", "Dark Chocolate", "Peppercorn", "Full-bodied"]},
    { name: "Equuleus", tags: ["Very Dry", "Red", "Oak", "Berries", "Dark Chocolate", "Blend", "Full-bodied"]},
    { name: "Cabernet Icewine", tags: ["Sweet", "Red", "Strawberry", "Cranberry", "Full-bodied"]}
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
    console.log("User selected tags:", tags);

    const matches = wine_list.map(wine => {
        const matchCount = wine.tags.filter(tag => {
            const isMatch = tags.includes(tag);
            console.log(`Checking if user tag "${tag}" is in wine "${wine.name}": ${isMatch}`);
            return isMatch;
        }).length;

        const matchPercentage = (matchCount / wine.tags.length) * 100;
        console.log(`Wine "${wine.name}" match count: ${matchCount}, match percentage: ${matchPercentage.toFixed(2)}%`);

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

    console.log("Top matches:", topMatches);
}

// Load the first stage
loadStage(currentStage);