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
        "web and mobile application development",
    ],
    "electrical and computer engineering": null
}

const optionSelectDiv = document.getElementById("optionSelect");
const majorSelect = document.getElementById("majorSelect");
const goButton = document.getElementById("goButton");

// Ensure form is reset on refresh
majorSelect.selectedIndex = 0;
goButton.disabled = true;
let selectedMajor = majorSelect.value;
let selectedOption = null

for (let major in majors) {
    const option = document.createElement('option');
    option.text = major;
    option.value = major;
    majorSelect.add(option);
}

majorSelect.addEventListener('change', () => {
    goButton.disabled = true;
    selectedMajor = majorSelect.value;
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
        optionForm.addEventListener('change', () => { 
            selectedOption = optionForm.value
            goButton.disabled = false
        })
    }
    else
        goButton.disabled = false;
});

async function requestData(major) {
    try {
        const response = await fetch('/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(major)
        });

        if (!response.ok) {
            throw new Error('Request failed.');
        }

        const result = await response.json();
        console.log('Received data:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

goButton.addEventListener('click', () => {
    requestData({selectedMajor, selectedOption});
})
