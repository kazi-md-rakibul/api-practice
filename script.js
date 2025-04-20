function connect(){
  var searchTerm = document.getElementById("searchBox").value
  var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`

  fetch(url)
  .then(res=> res.json())
  .then(data => showInBrowser(data))
}

function showInBrowser(data){
  var oldContent = document.getElementById("displayArea");
  oldContent.innerHTML = "";
  
  if (!data.meals) {
    oldContent.innerHTML = "<h3>No meals found. Try another search.</h3>";
    return;
  }

  for (var a = 0; a < data.meals.length; a++){
    var meal = data.meals[a];
    
    // Get first 5 ingredients
    var ingredientsHTML = "";
    for (var i = 1; i <= 5; i++) {
      if (meal["strIngredient" + i] && meal["strIngredient" + i].trim() !== "") {
        ingredientsHTML += `<span class="ingredient-tag">${meal["strIngredient" + i]}</span>`;
      }
    }
    
    var newDiv = document.createElement("div");
    newDiv.className = "meal-card";
    newDiv.innerHTML = `
      <img src="${meal.strMealThumb}" class="meal-img">
      <div class="meal-info">
        <h3 class="meal-title">${meal.strMeal}</h3>
        <span class="meal-category">${meal.strCategory || ''}</span>
        <span class="meal-area">${meal.strArea || ''}</span>
        
        <div class="meal-ingredients">
          <h4>Key Ingredients:</h4>
          <div class="ingredients-list">
            ${ingredientsHTML}
          </div>
        </div>
        
        <a href="${meal.strYoutube}" target="_blank" class="view-recipe">View Recipe</a>
      </div>
    `;
    
    oldContent.appendChild(newDiv);
  }
}