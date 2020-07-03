const pizzaIngredientsDOM = document.getElementById('ingredients');
const pizzaPriceDOM = document.getElementById('cost');
const pizzaBuilderDOM = document.getElementById('builder__pizza');

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
        let pizzaBuilderCell = document.createElement('div');
        pizzaBuilderCell.setAttribute('id', elementID);
        pizzaBuilderCell.classList.add('builder__pizza-cell');
        pizzaBuilderDOM.appendChild(pizzaBuilderCell);
    }
};
// Array of Pizza ingredients with current price
const pizzaCost = [];
//Reducer for final price
// function reducePrice(finalPrice) {
//     let reducePrice = finalPrice.reduce(( sum, num ) => sum + num);
//     pizzaPriceElement.innerText = `Cost: ${reducePrice} + 10 za ciasto = ${reducePrice + 10}`;
// }

// function pizzaBuilderAddPhoto(ingredient) {
//     let pizzaBuilderElementAll = document.querySelectorAll('.pizza-builder-element');
//     let num = Math.floor(Math.random() * pizzaBuilderElementAll.length);
//     pizzaBuilderElementAll.forEach( el => {

//         if(num === parseFloat(el.id)){
//             el.style.backgroundImage = `url(${ingredient.picture})`;
//         }
//     })
// }
// Almost final price function
// function entireCost() {
//    let finalPrice = pizzaCost.map( price => {
//        let priceArray = Object.values(price);
//        let filteredPrice = priceArray.find( el => typeof el === 'number')
//        return filteredPrice;
//     })
//     console.log(`Cost: ${finalPrice}`)
//     reducePrice(finalPrice);
// };
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
function updateEntireCost() {
    let sum = Array.from(Object.values(pizzaBuilder)).map( num => {
       return num.cost;
    }).reduce( (sum, num) => {
       return sum + num
     }, 0);
    pizzaPriceDOM.innerHTML = `Cost: ${sum} + 10 za ciasto`;
}

function updatePizzaCost(btn) {
    let name = btn.dataset.name;
    let btnClass = btn.classList[1];
    if(btnClass === "ingredients__container-addBtn"){
        for(key in pizzaBuilder) {
            if(name === pizzaBuilder[key].name) {
                pizzaBuilder[key].amount++;
                pizzaBuilder[key].cost = pizzaBuilder[key].price * pizzaBuilder[key].amount;
                console.log(pizzaBuilder[key].amount, pizzaBuilder[key]);
                updateIngredientData(name);
                console.log(pizzaBuilder)
                updateEntireCost();
            }
        }
    } else {
        for(key in pizzaBuilder) {
            if(name === key) {
                pizzaBuilder[key].amount--;
                pizzaBuilder[key].cost = pizzaBuilder[key].cost - pizzaBuilder[key].price;
                console.log(pizzaBuilder[key].amount, pizzaBuilder[key]);
                updateIngredientData(name);
                updateEntireCost();
            }
        }
    }
}

function getButtons(name) {

    let addBtn = document.querySelectorAll('.ingredients__container-addBtn');
    addBtn.forEach( btn => {
        let btnName = btn.dataset.name;
        if(btnName === name) {
            btn.addEventListener("click", () => {
                updatePizzaCost(btn); 
            })
        }
    });

    let removeBtn = document.querySelectorAll('.ingredients__container-removeBtn');

    removeBtn.forEach( btn => {
        let btnName = btn.dataset.name;
        if(btnName === name) {
            btn.addEventListener("click", () => {
                updatePizzaCost(btn); 
            })
        }
    });
}

function addIngredientData(name) {
    for( key in pizzaBuilder) {
        if(name === pizzaBuilder[key].name) {
            console.log(pizzaBuilder[key].amount)
            pizzaBuilder[key].amount++;
            pizzaBuilder[key].cost = pizzaBuilder[key].price * pizzaBuilder[key].amount;
            console.log(pizzaBuilder)
            updateIngredientData(name);
        }
    }
}
function changeBtn(name, ingredient) {

    let startBtn = document.querySelectorAll('.ingredients__container-btn');
    startBtn.forEach( btn => {
        let ingItem = document.querySelectorAll(".ingredients__container-item");
        if(btn.dataset.name === name) {
            btn.style.display = "none";
            ingItem.forEach( ing => {
                if(ing.dataset.name === name) {
                    ing.innerHTML = 
                        `<h1>${ingredient.name.toUpperCase()}</h1>
                            <div class="ingredients__container-box">
                                <button class="btn ingredients__container-addBtn" data-name="${ingredient.name}">+</button>
                                <button class="btn ingredients__container-removeBtn" data-name="${ingredient.name}">-</button>
                            </div>
                            <div class="ingredients__container-box">
                                <p class="pQuantity" data-name="${ingredient.name}">Quantity: 0</p>
                                <p>Price: ${ingredient.price}</p>
                                <p class="pCost" data-name="${ingredient.name}">Entire cost: 0</p>
                            </div>
                        `;
                }
            })
        }
    });
    getButtons(name);
}

function updateIngredientData(name) {
    let pQuantity = document.querySelectorAll('.pQuantity');
    let pCost = document.querySelectorAll('.pCost');
    
    pQuantity.forEach( p => {
        for(key in pizzaBuilder) {
            if(name === p.dataset.name){
                p.innerHTML = `Quantity: ${pizzaBuilder[name].amount}`
            }
        }
        
    });
    pCost.forEach( p => {
        if(name === p.dataset.name){
            p.innerHTML = `Entire cost: ${pizzaBuilder[name].cost}`
        }
    })
};


function checkEvents(data) {
    // Event to add clicked ingredient to pizza
    let startBtn = document.querySelectorAll('.ingredients__container-btn');
    startBtn.forEach( btn =>  {
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
                        changeBtn(name, ingredient);
                        updateIngredientData(name);
                        updateEntireCost();
                    }
                })
            })
        });
    });
}

// Create ingredients lists
function createIngrediensGroup(data) {

    data.forEach( group => {
        // Create ingredients group
        let ingredientsGroup = document.createElement("div");
        ingredientsGroup.classList.add("ingredients__group");
        // header
        let ingredientsHeader = document.createElement("h1");
        ingredientsHeader.classList.add("heading-two");
        ingredientsHeader.classList.add("ingredients__group-header");
        ingredientsHeader.innerHTML = `${group.name}`;
        // container
        let ingredientsContainer = document.createElement("div");
        ingredientsContainer.classList.add("ingredients__container");

        //Group render
        ingredientsGroup.appendChild(ingredientsHeader);
        ingredientsGroup.appendChild(ingredientsContainer);
            //Ingredients render
            group.ingredients.forEach( ingredient => {
                let ingredientItem = document.createElement('div');
                ingredientItem.classList.add('ingredients__container-item');
                ingredientItem.dataset.name = ingredient.name;
                ingredientItem.innerHTML += `
                <h1 class="ingredients__container-h1">${ingredient.name}</h1>
                <div class="ingredients__container-box">
                    <p class="ingredients__container-price">Price: ${ingredient.price}</p>
                    <button class="btn ingredients__container-btn" data-name="${ingredient.name}">add</button>
                    
                </div>
                
                
                `;
                ingredientsContainer.appendChild(ingredientItem);
            });

        pizzaIngredientsDOM.appendChild(ingredientsGroup);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    getData()
    .then( data => {
        createIngrediensGroup(data);
        checkEvents(data);
    });
    pizzaBuilderGenerator(99);

});
