const pizzaIngredients = document.getElementById('pizza-ingredients');
// const pizzaCost = document.getElementById('pizza-cost')

const data = [
    {
        name: 'meat',
        ingredients: [
            {name: 'chicken', price: 3, count: 0},
            {name: 'beef', price: 5, count: 0},
            {name: 'salami', price: 4, count: 0}
    ]
    },
    {
        name: 'vegetables',
        ingredients: [
            {name: 'paprica', price: 3, count: 0},
            {name: 'onion', price: 1, count: 0},
            {name: 'tomato', price: 1.6, count: 0},

        ]
    },
    {
        name: 'see fruits',
        ingredients: [
            {name: 'tuńczyk', price: 2, count: 0},
            {name: 'małże', price: 2, count: 0},
            {name: 'marynowane ośmiorniczki', price: 2, count: 0},
            {name: 'łosoś', price: 2, count: 0}
        ]
    }
];

// Pizza ingredients with current price
const pizzaCost = [];

function entireCost() {
   pizzaCost.map( price => {
    //    console.log(price)
       let priceArray = Object.values(price.price);
       console.log(priceArray)
       return priceArray;
    })

    // console.log(pizzaPrice);
}

function addIngredient(ingredient, ingredientsElementCount, ingredientsElementCost) {
    let ingredientPlus = ++ingredient.count;
    ingredientsElementCount.innerText = ingredientPlus;
    let ingredientPrice = ingredientPlus * ingredient.price;
    ingredientsElementCost.innerText = ingredientPrice;

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

function cutIngredient(ingredient, ingredientsElementCount, ingredientsElementCost) {
    let ingredientMinus = --ingredient.count;
    ingredientsElementCount.innerText = ingredientMinus;
    if(ingredientsElementCount.innerText <= 0) {
        ingredient.count = 0;
        ingredientsElementCount.innerText = 0;
    }
    let ingredientPrice = ingredientMinus * ingredient.price;
    ingredientsElementCost.innerText = ingredientPrice;
    console.log(ingredientMinus)

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

}

function createIngrediensGroup(group) {

    let groupIngredients = document.createElement('ul');
    groupIngredients.innerText = group.name;
    pizzaIngredients.appendChild(groupIngredients)

    group.ingredients.forEach( ingredient => {
        let ingredientsElement = document.createElement('div');
        let ingredientsElementName = document.createElement('li')
        let ingredientsElementPlus = document.createElement('button');
        let ingredientsElementMinus = document.createElement('button');
        let ingredientsElementCount = document.createElement('p');
        let ingredientsElementPrice = document.createElement('p');
        let ingredientsElementCost = document.createElement('p');

        ingredientsElementName.innerText = ingredient.name;
        ingredientsElementPlus.innerText = '+';
        ingredientsElementMinus.innerText = '-';
        ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;
        ingredientsElementPrice.innerText = `Price for one: ${ingredient.price}`;
        ingredientsElementCost.innerText = 0;
        ingredientsElementCost.classList.add('ingredientsElementCost');

        ingredientsElement.appendChild(ingredientsElementPlus);
        ingredientsElement.appendChild(ingredientsElementMinus);
        ingredientsElement.appendChild(ingredientsElementName);
        ingredientsElement.appendChild(ingredientsElementCount);
        ingredientsElement.appendChild(ingredientsElementPrice);
        ingredientsElement.appendChild(ingredientsElementCost);

        groupIngredients.appendChild(ingredientsElement);

        
        ingredientsElementPlus.addEventListener('click', e => {
            addIngredient(ingredient, ingredientsElementCount, ingredientsElementCost);
        });

        ingredientsElementMinus.addEventListener('click', e => {
            cutIngredient(ingredient, ingredientsElementCount, ingredientsElementCost);
        });

        
    })
}

function ingredientsGenerator() {
    

    data.forEach( group => {
        createIngrediensGroup(group);
        
    })
}

ingredientsGenerator();
