var addButton = document.getElementById('addButton');
var removeButton = document.getElementById('removeButton');
var ingredientInput = document.getElementById('ingredientInput');
var ingredientList = document.getElementById('ingredientList');
var generateButton = document.getElementById('generateButton');
var ingredients = [];

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
        ingredients.push(ingredient);
        ingredientInput.value = '';
    }
});

var removeButtonToggle = false;
removeButton.addEventListener('click', function() {
    var removeButtons = document.getElementsByClassName('remove-button');
    for (var i = 0; i < removeButtons.length; i++) {
        if (removeButtonToggle) {
            removeButtons[i].style.display = 'none';
        } else {
            removeButtons[i].style.display = 'inline-block';
        }
    }
    removeButtonToggle = !removeButtonToggle;
});

ingredientList.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-button')) {
        var listItem = event.target.parentNode;
        const ingredient = listItem.textContent;
        ingredientList.removeChild(listItem);
    }
    
});

generateButton.addEventListener('click', async() => {
    const ingredientString = Array.from(ingredientList.children)
        .map(item => item.textContent.split('Remove')[0].trim())
        .join(', ');

    const outputBox = document.getElementById("output-box")

    const response = await fetch(
        'https://noggin.rea.gent/prickly-otter-9071',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_q4avjj0so5rv36g92lhca3yjexnp6oe222rn_ngk',
        },
        body: JSON.stringify({
            // fill variables here.
            "ingredients": ingredientString,
        }),
        }
    ).then(response => response.text());

    outputBox.value = response;
})