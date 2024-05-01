
var promptString = "I have a list of ingredients in my pantry that I want to cook with. You don't have to use all ingredients but I want a detailed recipe that uses the ingredients in my pantry. You may assume that I have kitchen basics such as common household spices. In my pantry, I have"; // Initialize the string to store the prompt

document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById('addButton');
    var removeButton = document.getElementById('removeButton');
    var ingredientInput = document.getElementById('ingredientInput');
    var ingredientList = document.getElementById('ingredientList');
    var generateButton = document.getElementById('generateButton');
    var ingredientString = '';

    addButton.addEventListener('click', function() {
        var ingredient = ingredientInput.value;
        if (ingredient) {
            var listItem = document.createElement('li');
            listItem.textContent = ingredient;
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            listItem.appendChild(removeButton);
            ingredientList.appendChild(listItem);
            ingredientString += ingredient + ',';
            ingredientInput.value = '';
        }
    });

    removeButton.addEventListener('click', function() {
        var removeButtons = document.getElementsByClassName('remove-button');
        for (var i = 0; i < removeButtons.length; i++) {
            removeButtons[i].style.display = 'inline-block';
        }
    });

    ingredientList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-button')) {
            var listItem = event.target.parentNode;
            var ingredient = listItem.textContent;
            ingredientList.removeChild(listItem);
            ingredientString = ingredientString.replace(ingredient + ',', '');
        }
    });

    generateButton.addEventListener('click', async function() {
        // Your code to generate the recipe using the ingredientString
        // You can use the promptString and ingredientString to generate the recipe
    });
});