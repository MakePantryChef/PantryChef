
var ingredientsString = ""; // Initialize the string to store ingredients
var promptString = "I have a list of ingredients in my pantry that I want to cook with. You don't have to use all ingredients but I want a detailed recipe that uses the ingredients in my pantry. You may assume that I have kitchen basics such as common household spices. In my pantry, I have" + ingredientsString; // Initialize the string to store the prompt

const {
    FunctionDeclarationSchemaType,
    HarmBlockThreshold,
    HarmCategory,
    VertexAI
} = require('@google-cloud/vertexai');
    
    const project = 'single-ripsaw-419902';
    const location = 'us-central1';
    const textModel =  'gemini-1.0-pro';
    const visionModel = 'gemini-1.0-pro-vision';
    
    const vertexAI = new VertexAI({project: project, location: location});
    
  // Instantiate Gemini models
    const generativeModel = vertexAI.getGenerativeModel({
        model: textModel,
        // The following parameters are optional
        // They can also be passed to individual content generation requests
        safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
        generationConfig: {maxOutputTokens: 256},
        });
    
    const generativeVisionModel = vertexAI.getGenerativeModel({
        model: visionModel,
    });
    
    const generativeModelPreview = vertexAI.preview.getGenerativeModel({
        model: textModel,
    });

async function streamGenerateContent() {
    const request = {
        contents: [{role: 'user', parts: [{text: promptString}]}],
    };
    const streamingResult = await generativeModel.generateContentStream(request);
    for await (const item of streamingResult.stream) {
        console.log('stream chunk: ', JSON.stringify(item));
    }
    const aggregatedResponse = await streamingResult.response;
    console.log('aggregated response: ', JSON.stringify(aggregatedResponse));
};
    
function addIngredient() {
    var ingredient = document.getElementById("ingredientInput").value;
    var listItem = document.createElement("li");
    listItem.textContent = ingredient;

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";
    removeButton.onclick = function() {
        listItem.remove();
        ingredientsString = ingredientsString.replace(ingredient + ", ", ""); // Remove the ingredient from the string
    };

    listItem.appendChild(removeButton);
    document.getElementById("ingredientList").appendChild(listItem);
    document.getElementById("ingredientInput").value = "";

    ingredientsString += ingredient + ", "; // Append the ingredient to the string
}