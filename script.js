document.addEventListener('DOMContentLoaded', function() {
    const ageInput = document.getElementById('age');
    const decrementButton = document.getElementById('decrement');
    const incrementButton = document.getElementById('increment');
    const lifeImage = document.getElementById('life-image');
    const characteristicText = document.getElementById('characteristic-text');
    const haveKidButton = document.getElementById('have-kid-btn'); // Get the "Have a Kid" button

    let hasKids = false; // Variable to track whether the person has kids
    let kidAge = 0; // Variable to track the age of the kid
    let prevAge = 0; // Variable to store the previous age
    let userHadKidAge = 150;
    // Function to update the displayed image and characteristics based on age
    function updateDisplay(age) {
        let userImageUrl = '';
        let babyImageUrl = '';
        let characteristic = '';
        let babyCharacteristic = '';

        if (age <= 18) {
            userImageUrl = `images/${age}.jpg`;
            characteristic = 'You are a child.';
        }else if (age <= 19) {
            userImageUrl = `images/${age}.jpg`;
            characteristic = 'You are a teenager.';
        } else if (age <= 25) {
            userImageUrl = `images/${age}.jpg`;
            characteristic = 'You are an adult.';
        } else if (age <= 55) {
            userImageUrl = 'images/adult.jpg';
            characteristic = 'You are an adult.';
        } else {
            userImageUrl = 'images/senior.jpg';
            characteristic = 'You are a senior.';
        }

        if (age >= userHadKidAge && !hasKids) { // Check if the person turns 25 and doesn't have kids yet
            hasKids = true;
            kidAge = 0; // Reset kid's age to 0 when the person turns 25
            babyImageUrl = getBabyImageUrl(kidAge); // Get baby's image URL based on age

           // babyImageUrl = `images/${kidAge}.jpg`; // Baby starts as a newborn
            babyCharacteristic = `Your kid is a newborn (Age: ${kidAge} year(s)).`;
            overlayBabyImage(babyImageUrl); // Overlay baby image
            updateKidAge(); // Start incrementing the kid's age

        }

        if (age > userHadKidAge && hasKids) { // Increment kid's age if person has kids and age is over 25
            babyImageUrl = getBabyImageUrl(kidAge); // Get baby's image URL based on age
            overlayBabyImage(babyImageUrl); // Overlay baby image

            babyCharacteristic = `Your kid is ${getCharacteristic(kidAge)} (Age: ${kidAge} year(s)).`; // Get baby's characteristic based on age
            updateKidAge(); // Start incrementing the kid's age

        }

        if (age < userHadKidAge && hasKids) { // Reset kid's age if person's age is less than 25 and they have kids
            hasKids = false;
            kidAge = 0;
            removeBabyImage(); // Remove baby image when newborn is gone
            updateKidAge(); // Start incrementing the kid's age

        }

        lifeImage.src = userImageUrl;
        characteristicText.innerHTML = `${characteristic}<br>${babyCharacteristic}`; // Display both user and baby characteristics
    }

    // Function to overlay baby image on top of user image
    function overlayBabyImage(babyImageUrl) {
        const babyImage = new Image();
        babyImage.src = babyImageUrl;
        babyImage.classList.add('baby-image');
        lifeImage.parentNode.insertBefore(babyImage, lifeImage.nextSibling);
    }

    // Function to remove baby image
    function removeBabyImage() {
        const babyImage = document.querySelector('.baby-image');
        if (babyImage) {
            babyImage.parentNode.removeChild(babyImage);
        }
    }

    // Function to get baby's image URL based on age
    function getBabyImageUrl(age) {
        if (age <=25) {
            return `images/${age}.jpg`; // Baby
        } else if (age <= 55) {
            return 'images/adult.jpg'; // Toddler
        } 

        return 'images/senior.jpg'; 
    }

    // Function to get baby's characteristic based on age
    function getCharacteristic(age) {
        if (age <= 2) {
            return 'newborn'; // Newborn
        } else if (age <= 6) {
            return 'toddler'; // Toddler
        } else if (age <= 12) {
            return 'child'; // Child
        }else if (age <= 18) {
            return 'teen'; // Child
        }else if (age <= 55) {
            return 'adult'; // Child
        }
        return 'senior'; // Child
    }

// Function to update the kid's age and display it
function updateKidAge() {
    setInterval(function() {
        if (hasKids) {
            if (ageInput.value > prevAge) { // Increment kid's age only if user's age has incremented
                if (ageInput.value === userHadKidAge) {
                    kidAge = 0; // Reset kid's age to 0 if user's age is 25
                } else {
                    kidAge++; // Increment kid's age
                }
            } else if (ageInput.value < prevAge && ageInput.value >= userHadKidAge) { // Decrement kid's age if user's age has decremented and is 25 or above
                kidAge--; // Decrement kid's age
            }
            prevAge = ageInput.value;
            updateDisplay(ageInput.value); // Update display to reflect the age change
        }
    }, 1000); // Update every second
}
    // Event listener for the "Have a Kid" button
    haveKidButton.addEventListener('click', function() {
        if (!hasKids) {
            hasKids = true; // Set hasKids to true
            userHadKidAge = parseInt(ageInput.value); // Save the user's current age
            kidAge = 0; // Reset kid's age to 0
            updateDisplay(ageInput.value); // Update the display
            haveKidButton.disabled = true; // Disable the "Have a Kid" button after it's clicked

        }
    });
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
