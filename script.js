// Define a Person class
class Person {
    constructor(age) {
        this.age = age;
        this.child = null;
    }

    // Method to have a child
    haveChild() {
        this.child = new Person(0);
    }

    // Method to increment age
    incrementAge() {
        this.age++;
        if (this.child) {
            this.child.incrementAge();
        }
    }

    // Method to get image URL based on age
    getImageUrl() {
        if (this.age <= 25) {
            return `images/${this.age}.jpg`;
        } else if (this.age <= 55) {
            return 'images/adult.jpg';
        }
        return 'images/senior.jpg';
    }


        // Method to get the last person in the tree (the person who doesn't have a child yet)
        getLastPerson() {
            if (this.child) {
                return this.child.getLastPerson();
            }
            return this;
        }

    // Method to get characteristic based on age
    getCharacteristic() {
        if (this.age <= 2) {
            return 'newborn';
        } else if (this.age <= 6) {
            return 'toddler';
        } else if (this.age <= 12) {
            return 'child';
        } else if (this.age <= 18) {
            return 'teen';
        } else if (this.age <= 55) {
            return 'adult';
        }
        return 'senior';
    }
}

// Initialize the first person
let person = new Person(0);

// Function to update display
function updateDisplay(person, parentDiv, depth = 0) {
    let imageUrl = person.getImageUrl();
    let characteristic = person.getCharacteristic();
    let prefix = ' '.repeat(depth * 2); // Indentation based on depth

    // Create a new div for the person
    let personDiv = document.createElement('div');
    personDiv.className = 'person-div'; // Add this line
    personDiv.style.marginLeft = `${depth * 20}px`; // Indentation based on depth

    // Create an img element for the person
    let img = document.createElement('img');
    img.src = imageUrl;

    // Create a p element for the characteristic
    let p = document.createElement('p');
    p.textContent = `${prefix}This person is ${characteristic} (Age: ${person.age})`;

    // Append the img and p elements to the person's div
    personDiv.appendChild(img);
    personDiv.appendChild(p);

    // Append the person's div to the parent's div
    parentDiv.appendChild(personDiv);

    // If the person has a child, update the display for the child
    if (person.child) {
        updateDisplay(person.child, personDiv, depth + 1);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const ageInput = document.getElementById('age');
    const decrementButton = document.getElementById('decrement');
    const incrementButton = document.getElementById('increment');
    const treeDiv = document.getElementById('tree'); // Get the div for the generational tree
    const haveKidButton = document.getElementById('have-kid-btn'); // Get the "Have a Kid" button

    // Event listener for the "Have a Kid" button
    haveKidButton.addEventListener('click', function() {
        let lastPerson = person.getLastPerson(); // Get the last person in the tree
        if (!lastPerson.child) {
            lastPerson.haveChild();
            updateDisplay(lastPerson.child, treeDiv, lastPerson.age);
        }
    });

    // Event listener for decrement button
    decrementButton.addEventListener('click', function() {
        if (person.age > 0) {
            person.age--;
            ageInput.value = person.age; // Update the age input field
            treeDiv.innerHTML = ''; // Clear the generational tree
            updateDisplay(person, treeDiv);
        }
    });
    

    // Event listener for increment button
    incrementButton.addEventListener('click', function() {
        if (person.age < 100) {
            person.incrementAge();
            ageInput.value = person.age; // Update the age input field
            treeDiv.innerHTML = ''; // Clear the generational tree
            updateDisplay(person, treeDiv);
        }
    });

    // Initial display setup
    updateDisplay(person, treeDiv);
});