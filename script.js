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
function updateDisplay(person, lifeImage, characteristicText, ageInput, depth = 0) {
    let imageUrl = person.getImageUrl();
    let characteristic = person.getCharacteristic();
    let prefix = ' '.repeat(depth * 2); // Indentation based on depth

    // Update the image and characteristic for the person
    if (depth === 0) {
        lifeImage.src = imageUrl;
        characteristicText.innerHTML = `${prefix}You are ${characteristic} (Age: ${person.age})`;
        ageInput.value = person.age; // Update the age input field
    } else {
        characteristicText.innerHTML += `<br>${prefix}Your child is ${characteristic} (Age: ${person.age})`;
        let childImage = document.createElement('img'); // Create a new img element for the child
        childImage.src = imageUrl; // Set the source of the child's image
        lifeImage.after(childImage); // Insert the child's image after the parent's image
    }

    // If the person has a child, update the display for the child
    if (person.child) {
        updateDisplay(person.child, lifeImage, characteristicText, ageInput, depth + 1);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const ageInput = document.getElementById('age');
    const decrementButton = document.getElementById('decrement');
    const incrementButton = document.getElementById('increment');
    const lifeImage = document.getElementById('life-image');
    const characteristicText = document.getElementById('characteristic-text');
    const haveKidButton = document.getElementById('have-kid-btn'); // Get the "Have a Kid" button

    // Event listener for the "Have a Kid" button
    haveKidButton.addEventListener('click', function() {
        if (!person.child) {
            person.haveChild();
            updateDisplay(person, lifeImage, characteristicText, ageInput);
        }
    });

    // Event listener for decrement button
    decrementButton.addEventListener('click', function() {
        if (person.age > 0) {
            person.age--;
            updateDisplay(person, lifeImage, characteristicText, ageInput);
        }
    });

    // Event listener for increment button
    incrementButton.addEventListener('click', function() {
        if (person.age < 100) {
            person.incrementAge();
            updateDisplay(person, lifeImage, characteristicText, ageInput);
        }
    });

    // Initial display setup
    updateDisplay(person, lifeImage, characteristicText, ageInput);
});