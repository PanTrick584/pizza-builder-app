const pizzaIngredients = document.getElementById('pizza-ingredients');
const pizzaPriceElement = document.getElementById('pizza-cost')

const data = [
    {
        name: 'meat',
        ingredients: [
            {name: 'chicken', price: 3, count: 0},
            {name: 'beef', price: 5, count: 0},
            {name: 'salami', price: 4, count: 0},
            {name: 'boczek', price: 2.8, count: 0},
            {name: 'szynka parmeńska', price: 4.8, count: 0}
    ]
    },
    {
        name: 'vegetables',
        ingredients: [
            {name: 'pepper', price: 2.1, count: 0},
            {name: 'onion', price: 0.8, count: 0},
            {name: 'tomato', price: 1.6, count: 0},
            {name: 'maize', price: 1.2, count: 0},

        ]
    },
    {
        name: 'see fruits',
        ingredients: [
            {name: 'tuńczyk', price: 2, count: 0},
            {name: 'małże', price: 2, count: 0},
            {name: 'marynowane ośmiorniczki', price: 2, count: 0},
            {name: 'łosoś', price: 4.6, count: 0}
        ]
    }
];

// Array of Pizza ingredients with current price
const pizzaCost = [];
//Reducer for final price
function reducePrice(finalPrice) {
    
    let reducePrice = finalPrice.reduce(( sum, num ) => sum + num);
    pizzaPriceElement.innerText = `Cost: ${reducePrice} + 10 za ciasto = ${reducePrice + 10}`;
}
// Almost final price function
function entireCost() {
   let finalPrice = pizzaCost.map( price => {
       let priceArray = Object.values(price);
       let filteredPrice = priceArray.find( el => typeof el === 'number')
       return filteredPrice;
    })
    console.log(`Cost: ${finalPrice}`)
    reducePrice(finalPrice);
};
// Add ingredients to the pizzaCost array
function addIngredient(ingredient, ingredientsElementCount, ingredientsElementCost) {
    let ingredientPlus = ++ingredient.count;
    ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;

    let ingredientPrice = ingredientPlus * ingredient.price;
    ingredientsElementCost.innerText = `Entire price: ${ingredientPrice}`;

    let findPrice = pizzaCost.find(el => el.name === ingredient.name);
    if( pizzaCost.length === 0){
        pizzaCost.push({name: ingredient.name, price: ingredientPrice});
    }else 
    if(findPrice){
        findPrice.price = ingredientPrice;
    }else {
        pizzaCost.push({name: ingredient.name, price: ingredientPrice});
    }

    console.log(pizzaCost);
    entireCost();

};
// Remove ingredients from the pizzaCost array
function cutIngredient(ingredient, ingredientsElementCount, ingredientsElementCost) {
    let ingredientMinus = --ingredient.count;
    ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;
    // Statement for no negative values of ingredients quantity or price
    if(ingredientMinus <= 0) {
        ingredient.count = 0;
        ingredientMinus = 0;
        ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;
    }

    let ingredientPrice = ingredientMinus * ingredient.price;
    ingredientsElementCost.innerText = `Entire price: ${ingredientPrice}`;
    console.log(ingredientMinus)
    //Push single ingredient to pizzaCost array and decrease its price when clicked
    let findPrice = pizzaCost.find(el => el.name === ingredient.name);
    if( pizzaCost.length === 0){
        pizzaCost.push({name: ingredient.name, price: ingredientPrice});
    }else 
    if(findPrice){
        findPrice.price = ingredientPrice;
    }else {
        pizzaCost.push({name: ingredient.name, price: ingredientPrice});
    }
    entireCost();

};
// Create ingredients lists with functionality
function createIngrediensGroup(group) {
    // Create ingredients main group
    let groupIngredients = document.createElement('ul');
    groupIngredients.classList.add('groupIngredients')
    groupIngredients.innerText = group.name.toUpperCase();
    pizzaIngredients.appendChild(groupIngredients)

    group.ingredients.forEach( ingredient => {
        // Create DOM elements for ingredients list
        let ingredientsElement = document.createElement('div');
        let ingredientsElementName = document.createElement('li')
        let ingredientsElementPlus = document.createElement('button');
        let ingredientsElementMinus = document.createElement('button');
        let ingredientsElementCount = document.createElement('p');
        let ingredientsElementPrice = document.createElement('p');
        let ingredientsElementCost = document.createElement('p');

        ingredientsElement.classList.add('ingredientsElement')

        ingredientsElementName.innerText = ingredient.name.toUpperCase();
        ingredientsElementPlus.innerText = '+';
        ingredientsElementMinus.innerText = '—';
        ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;
        ingredientsElementPrice.innerText = `Single price: ${ingredient.price}`;
        ingredientsElementCost.innerText = `Entire price: ${ingredient.count}`;
        ingredientsElementCost.classList.add('ingredientsElementCost');

        ingredientsElement.appendChild(ingredientsElementName);
        ingredientsElement.appendChild(ingredientsElementPlus);
        ingredientsElement.appendChild(ingredientsElementMinus);
        ingredientsElement.appendChild(ingredientsElementCount);
        ingredientsElement.appendChild(ingredientsElementPrice);
        ingredientsElement.appendChild(ingredientsElementCost);

        groupIngredients.appendChild(ingredientsElement);

        // Event to add clicked ingredient to pizza
        ingredientsElementPlus.addEventListener('click', e => {
            addIngredient(ingredient, ingredientsElementCount, ingredientsElementCost);
        });
        // Event to remove clicked ingredient from pizza
        ingredientsElementMinus.addEventListener('click', e => {
            cutIngredient(ingredient, ingredientsElementCount, ingredientsElementCost);
        });

        
    })
}
// Generator for ingredients list
function ingredientsGenerator() {
    
    data.forEach( group => {
        createIngrediensGroup(group);
    })
}

ingredientsGenerator();
