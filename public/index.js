// We probably want to fetch this in the future
let majors = {
    "business": [
        "dean's academy",
        "digital marketing",
        "family business",
        "hospitality management",
        "innovation and entrepreneurship",
        "international business",
        "marketing",
        "merchandising management",
        "retail management",
        "sports business",
        "supply chain and logistics management",
    ],
    "computer science": [
        "artificial intelligence",
        "bioinformatics",
        "build your own",
        "business and entrepreneurship",
        "cybersecurity",
        "data science",
        "human-computer interaction",
        "robot intelligence",
        "simulation and game programming",
        "systems",
        "web and mobile application development ",
    ],
    "electrical and computer engineering": null
}

const optionSelectDiv = document.getElementById("optionSelect");
const majorSelect = document.getElementById("majorSelect");
const goButton = document.getElementById("goButton");

for (let major in majors) {
    const option = document.createElement('option');
    option.text = major;
    option.value = major;
    majorSelect.add(option);
}

majorSelect.addEventListener('change', () => {
    goButton.disabled = true;
    const selectedMajor = majorSelect.value;
    while (optionSelectDiv.firstChild) {
        optionSelectDiv.removeChild(optionSelectDiv.firstChild);
    }
    if (majors[selectedMajor]) {
        const optionForm = document.createElement('select');
        const empty = document.createElement('option');
        empty.disabled = true
        empty.textContent = "select an option";
        empty.defaultSelected = true
        optionForm.appendChild(empty);

        majors[selectedMajor].forEach((optionValue) => {
            const optionElement = document.createElement('option');
            optionElement.value = optionValue;
            optionElement.textContent = optionValue;
            optionForm.appendChild(optionElement);
        });

        optionSelectDiv.appendChild(optionForm);
    }
    else
        goButton.disabled = false;
});
