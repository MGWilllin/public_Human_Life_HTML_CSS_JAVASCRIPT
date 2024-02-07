document.addEventListener('DOMContentLoaded', function() {
    const ageInput = document.getElementById('age');
    const decrementButton = document.getElementById('decrement');
    const incrementButton = document.getElementById('increment');
    const lifeImage = document.getElementById('life-image');
    const characteristicText = document.getElementById('characteristic-text');
    let hasKids = false; // Variable to track whether the person has kids
    let kidAge = 0; // Variable to track the age of the kid

    // Function to update the displayed image and characteristics based on age
    function updateDisplay(age) {
        let imageUrl = '';
        let characteristic = '';

        if (age <= 12) {
            imageUrl = 'images/child.jpg';
            characteristic = 'You are a child.';
        } else if (age <= 19) {
            imageUrl = 'images/teen.jpg';
            characteristic = 'You are a teenager.';
        } else if (age <= 64) {
            imageUrl = 'images/adult.jpg';
            characteristic = 'You are an adult.';
        } else {
            imageUrl = 'images/senior.jpg';
            characteristic = 'You are a senior.';
        }

        if (age >= 25 && !hasKids) { // Check if the person turns 25 and doesn't have kids yet
            hasKids = true;
            imageUrl = 'images/newborn.jpg'; // Update image to show adult with kid
            characteristic = 'You have kids now!'; // Update characteristic text
        }

        if (ageInput.value > 25 && hasKids) { // Increment kid's age if person has kids and age is over 25
            kidAge++;
            characteristic = `You have kids now! Your kid is ${kidAge} year(s) old.`;
        }

        if (age < 25 && hasKids) { // Reset kid's age if person's age is less than 25 and they have kids
            hasKids = false;
            kidAge = 0;
        }

        lifeImage.src = imageUrl;
        characteristicText.textContent = characteristic;
    }

    // Initial display based on default age value
    updateDisplay(ageInput.value);

    // Event listener for decrement button
    decrementButton.addEventListener('click', function() {
        if (ageInput.value > 1) {
            ageInput.value--;
            updateDisplay(ageInput.value);
        }
    });

    // Event listener for increment button
    incrementButton.addEventListener('click', function() {
        if (ageInput.value < 100) {
            ageInput.value++;
            updateDisplay(ageInput.value);
        }
    });
});
