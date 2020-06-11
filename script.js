const pizzaIngredients = document.getElementById('pizza-ingredients');
const pizzaPriceElement = document.getElementById('pizza-cost');
const pizzaBuilderContainer = document.getElementById('pizza-builder-container');

async function getData() {
    let res = await fetch('./data.json');
    let doc = await res.json();
    let data = doc.data;
    return data;
};
// ADDED PIZZA INGREDIENTS
const pizzaBuilder = {};

function pizzaBuilderGenerator(elements) {
    let elementID = 0;
    for( let i = 0; i <= elements; i++){
        ++elementID;
        let pizzaBuilderElement = document.createElement('div');
        pizzaBuilderElement.setAttribute('id', elementID);
        pizzaBuilderElement.classList.add('pizza-builder-element');
        pizzaBuilderContainer.appendChild(pizzaBuilderElement);
    }
};
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
// function addIngredient(ingredient, ingredientsElementCount, ingredientsElementCost) {
//     let ingredientPlus = ++ingredient.count;
//     ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;

//     let ingredientPrice = ingredientPlus * ingredient.price;
//     ingredientsElementCost.innerText = `Entire price: ${ingredientPrice}`;

//     let findPrice = pizzaCost.find(el => el.name === ingredient.name);
//     if( pizzaCost.length === 0){
//         pizzaCost.push({name: ingredient.name, price: ingredientPrice});
//     }else 
//     if(findPrice){
//         findPrice.price = ingredientPrice;
//     }else {
//         pizzaCost.push({name: ingredient.name, price: ingredientPrice});
//     }

//     console.log(pizzaCost);
//     entireCost();
//     pizzaBuilderAddPhoto(ingredient);

// };
// // Remove ingredients from the pizzaCost array
// function cutIngredient(ingredient, ingredientsElementCount, ingredientsElementCost) {
//     let ingredientMinus = --ingredient.count;
//     ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;
//     // Statement for no negative values of ingredients quantity or price
//     if(ingredientMinus <= 0) {
//         ingredient.count = 0;
//         ingredientMinus = 0;
//         ingredientsElementCount.innerText = `Quantity: ${ingredient.count}`;
//     }

//     let ingredientPrice = ingredientMinus * ingredient.price;
//     ingredientsElementCost.innerText = `Entire price: ${ingredientPrice}`;
//     console.log(ingredientMinus)
//     //Push single ingredient to pizzaCost array and decrease its price when clicked
//     let findPrice = pizzaCost.find(el => el.name === ingredient.name);
//     if( pizzaCost.length === 0){
//         pizzaCost.push({name: ingredient.name, price: ingredientPrice});
//     }else 
//     if(findPrice){
//         findPrice.price = ingredientPrice;
//     }else {
//         pizzaCost.push({name: ingredient.name, price: ingredientPrice});
//     }
//     entireCost();

// };
function updateIngredientData(name) {
    let pQuantity = document.querySelectorAll('.pQuantity');
    let pCost = document.querySelectorAll('.pCost');

    pQuantity.forEach( p => {
        if(name === p.dataset.name){
            p.innerHTML = `Quantity: ${pizzaBuilder[name].amount}`
        }
    });
    pCost.forEach( p => {
        if(name === p.dataset.name){
            p.innerHTML = `Entire cost: ${pizzaBuilder[name].cost}`
        }
    })
}

function checkEvents(data) {
    // Event to add clicked ingredient to pizza
    let addBtn = document.querySelectorAll('.addBtn');
    addBtn.forEach( btn =>  {
        let name = btn.dataset.name;
        btn.addEventListener('click', () => {
            data.forEach( group => {
                group.ingredients.forEach( ingredient => {
                    if(name === ingredient.name) {
                        console.log(ingredient.name)
                        pizzaBuilder[name] = {};
                        pizzaBuilder[name].name = ingredient.name;
                        pizzaBuilder[name].amount = 1;
                        pizzaBuilder[name].price = ingredient.price;
                        pizzaBuilder[name].cost = pizzaBuilder[name].price * pizzaBuilder[name].amount;
                        updateIngredientData(name);
                        console.log(pizzaBuilder);
                    }
                })
            })
        });
    });
    //     // Event to remove clicked ingredient from pizza
    //     ingredientsElementMinus.addEventListener('click', e => {
    //         cutIngredient(ingredient, ingredientsElementCount, ingredientsElementCost);
    //     });
}

// Create ingredients lists
function createIngrediensGroup(data) {
    data.forEach( group => {
        // Create ingredients main group
        let block = document.createElement('div');
        block.classList.add('blockIngredients');
        block.innerHTML = `<h1>${group.name.toUpperCase()}</h1>`;
        pizzaIngredients.appendChild(block);

        group.ingredients.forEach( ingredient => {
            let ingredientDOM = document.createElement('div');
            ingredientDOM.classList.add('ingredientsElement');
            ingredientDOM.innerHTML += `
            <h1>${ingredient.name.toUpperCase()}</h1>
            <button class="addBtn" data-name="${ingredient.name}">+</button>
            <button class="removeBtn" data-name="${ingredient.name}">-</button>
            <p class="pQuantity" data-name="${ingredient.name}">Quantity: 0</p>
            <p>Single price: ${ingredient.price}</p>
            <p class="pCost" data-name="${ingredient.name}">Entire cost: 0</p>
            `;
            block.appendChild(ingredientDOM);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {

    getData()
    .then( data => {
        createIngrediensGroup(data);
        checkEvents(data);
    });
    pizzaBuilderGenerator(48);

});
