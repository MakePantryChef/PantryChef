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
        removeButton.textContent = 'X';
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

const outputBox = document.getElementById("output-box");
const loadingScreen = document.getElementById('loading-screen');
outputBox.style.visibility = "hidden";

generateButton.addEventListener('click', async() => {
    loadingScreen.style.visibility = 'visible';
    if (ingredients.length > 0) {
        const ingredientString = Array.from(ingredientList.children)
            .map(item => item.textContent.split('X')[0].trim())
            .join(', ');

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
        const textArray = response.split("Ingredients");
        const dishName = textArray[0];
        var img = document.createElement('img');
        img.src = `https://noggin.rea.gent/upper-leopard-9184?key=rg_v1_utr7aba076ighlle108pv6ywmygpvscv001i_ngk&food=${dishName}`;
        img.width = 500;
        img.height = 500;
        var container = document.getElementById("imageContainer");
        container.appendChild(img);

        outputBox.style.visibility = "visible";
        loadingScreen.style.visibility = 'hidden';
    } else {
        loadingScreen.style.visibility = 'hidden';
        alert("Error: Ingredients list is empty")
    }
    
})