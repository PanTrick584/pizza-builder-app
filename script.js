const pizzaIngredients = document.getElementById('pizza-ingredients');
const pizzaPriceElement = document.getElementById('pizza-cost');
const pizzaBuilderContainer = document.getElementById('pizza-builder-container');

const data = [
    {
        name: 'meat',
        ingredients: [
            {name: 'chicken', picture: 'https://cdn.pixabay.com/photo/2017/02/01/00/02/drumstick-2028375_1280.png', price: 3, count: 0},
            {name: 'beef' , picture: 'https://cdn.pixabay.com/photo/2014/12/21/23/24/spare-ribs-575310_1280.png', price: 5, count: 0},
            {name: 'salami', picture: 'https://cdn.pixabay.com/photo/2016/10/16/16/32/sausage-1745701_1280.png', price: 4, count: 0},
            {name: 'boczek', picture: 'https://cdn.pixabay.com/photo/2014/12/21/23/25/bacon-575334_1280.png', price: 2.8, count: 0},
            {name: 'szynka parmeńska', picture: 'https://cdn.pixabay.com/photo/2012/04/13/11/31/ham-31982_1280.png', price: 4.8, count: 0}
    ]
    },
    {
        name: 'vegetables',
        ingredients: [
            {name: 'pepper', picture: 'https://cdn.pixabay.com/photo/2012/04/13/21/00/bell-pepper-33623_1280.png', price: 2.1, count: 0},
            {name: 'onion', picture: 'https://cdn.pixabay.com/photo/2013/07/13/13/49/onion-161611_1280.png', price: 0.8, count: 0},
            {name: 'tomato', picture: 'https://cdn.pixabay.com/photo/2016/06/14/15/02/vector-1456768_1280.png', price: 1.6, count: 0},
            {name: 'maize', picture: 'https://cdn.pixabay.com/photo/2013/07/13/01/22/corn-155613_1280.png', price: 1.2, count: 0},

        ]
    },
    {
        name: 'see fruits',
        ingredients: [
            {name: 'tuńczyk', picture: 'https://cdn.pixabay.com/photo/2016/10/25/07/47/fish-1768103_1280.png', price: 2, count: 0},
            {name: 'małże', picture: 'https://cdn.pixabay.com/photo/2014/04/03/11/36/shell-311976_1280.png', price: 2, count: 0},
            {name: 'marynowane ośmiorniczki', picture: 'https://cdn.pixabay.com/photo/2016/06/15/19/00/octopus-1459684_1280.png', price: 2, count: 0},
            {name: 'łosoś', picture: 'https://cdn.pixabay.com/photo/2016/04/01/08/57/animal-1299070_1280.png', price: 4.6, count: 0}
        ]
    }
];

// PIZZA CONTAINER
const pizzaBuilder = [];

function pizzaBuilderGenerator(elements) {

    
    let count = 0;
    for( let i = 0; i <= elements; i++){
        
        ++count;
        let pizzaBuilderElement = document.createElement('div');
        pizzaBuilderElement.setAttribute('id', count);
        pizzaBuilderElement.classList.add('pizza-builder-element');

        pizzaBuilderContainer.appendChild(pizzaBuilderElement);
    }
}


// Array of Pizza ingredients with current price
const pizzaCost = [];
//Reducer for final price
function reducePrice(finalPrice) {
    
    let reducePrice = finalPrice.reduce(( sum, num ) => sum + num);
    pizzaPriceElement.innerText = `Cost: ${reducePrice} + 10 za ciasto = ${reducePrice + 10}`;
}

function pizzaBuilderAddPhoto(ingredient) {

    
    let pizzaBuilderElementAll = document.querySelectorAll('.pizza-builder-element');

    let num = Math.floor(Math.random() * pizzaBuilderElementAll.length);
    pizzaBuilderElementAll.forEach( el => {

        if(num === parseFloat(el.id)){
            el.style.backgroundImage = `url(${ingredient.picture})`;
        }
    })
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
    pizzaBuilderAddPhoto(ingredient);

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

pizzaBuilderGenerator(48);
ingredientsGenerator();
