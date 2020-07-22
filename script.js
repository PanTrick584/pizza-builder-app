const pizzaIngredientsDOM = document.getElementById('ingredients');
const pizzaPriceDOM = document.getElementById('cost');
const pizzaBuilderDOM = document.getElementById('builder__pizza');
// POPUP DOM
const popup = document.getElementById("popup");
const popupOpen = document.getElementById("popupBtn");
const popupClose = document.getElementById("popupBtnClose");
const popupContainerDOM = document.getElementById("popupContainer");
//DISPLAY
const headerDOM = document.getElementById("header");
const headerBtnDom = document.getElementById("headerBtn");

async function getData() {
    let res = await fetch('./data.json');
    let doc = await res.json();
    let data = doc.data;
    return data;
};
//DOM DISPLAYS

function displayHeader() {
    headerBtnDom.addEventListener('click', () => {
        headerDOM.style.display = "none";
    })
}
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

function showIngredient(name) {
    let cell = document.querySelectorAll(".builder__pizza-cell");
    let num = Math.floor(Math.random() * cell.length);
    
    cell.forEach( (cell, id) => {
        cell.style.color = "#cb3b3b"
       num === id ? cell.style.backgroundImage = `url("https://pngimg.com/uploads/trollface/trollface_PNG28.png")` : "";
    })
    
}

function updateEntireCost() {
    let sum = Array.from(Object.values(pizzaBuilder)).map( num => {
       return num.cost;
    }).reduce( (sum, num) => {
       return sum + num
     }, 0);
    pizzaPriceDOM.innerHTML = `Cost: ${parseFloat(sum.toFixed(2))} + 10 za ciasto`;
    
}

function updatePizzaCost(btn) {
    let name = btn.dataset.name;
    let btnClass = btn.classList[1];
    if(btnClass === "item__box-end--addBtn"){
        for(key in pizzaBuilder) {
            if(name === pizzaBuilder[key].name) {
                pizzaBuilder[key].amount++;
                pizzaBuilder[key].cost = pizzaBuilder[key].price * pizzaBuilder[key].amount;
                updateIngredientData(name);
                updateEntireCost();
                showIngredient(name);
            }
        }
    } else {
        for(key in pizzaBuilder) {
            if(name === key && pizzaBuilder[key].amount > 0) {
                pizzaBuilder[key].amount--;
                pizzaBuilder[key].cost = pizzaBuilder[key].cost - pizzaBuilder[key].price;
                updateIngredientData(name);
                updateEntireCost();
            }
        }
    }
}

function getButtons(name) {

    let addBtn = document.querySelectorAll('.item__box-end--addBtn');
    addBtn.forEach( btn => {
        let btnName = btn.dataset.name;
        if(btnName === name) {
            btn.addEventListener("click", () => {
                updatePizzaCost(btn); 
            })
        }
    });

    let removeBtn = document.querySelectorAll('.item__box-end--removeBtn');

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
            pizzaBuilder[key].amount++;
            pizzaBuilder[key].cost = pizzaBuilder[key].price * pizzaBuilder[key].amount;
            updateIngredientData(name);
        }
    }
}
function changeBtn(name, ingredient) {

    let startBtn = document.querySelectorAll('.item__box-start--btn');
    startBtn.forEach( btn => {
        let ingItem = document.querySelectorAll(".item");
        if(btn.dataset.name === name) {
            let popupItem = document.createElement("div");
            popupItem.classList.add('item__container')
            ingItem.forEach( ing => {
                if(ing.dataset.name === name) {
                    popupItem.innerHTML = 
                        `<h1 class="item__header">${ingredient.name.toUpperCase()}</h1>
                        <div class="item__box-end">
                            <p class="item__box-end--quantity" data-name="${ingredient.name}">Quantity: 0</p>
                            <p>Price: ${ingredient.price}</p>
                            <p class="item__box-end--cost" data-name="${ingredient.name}">Entire cost: 0</p>
                        </div>
                        <div class="item__box-end">
                            <button class="btn item__box-end--addBtn" data-name="${ingredient.name}">+</button>
                            <button class="btn item__box-end--removeBtn" data-name="${ingredient.name}">-</button>
                            <button class="btn item__box-end--clearBtn" data-name="${ingredient.name}">remove</button>
                        </div>
                        `;
                }
                popupContainerDOM.appendChild(popupItem);
            })
        }
    });
    getButtons(name);
}

function updateIngredientData(name) {
    let pQuantity = document.querySelectorAll('.item__box-end--quantity');
    let pCost = document.querySelectorAll('.item__box-end--cost');
    
    pQuantity.forEach( p => {
        for(key in pizzaBuilder) {
            if(name === p.dataset.name){
                p.innerHTML = `Quantity: ${pizzaBuilder[name].amount}`
            }
        }
        
    });
    pCost.forEach( p => {
        if(name === p.dataset.name){
            p.innerHTML = `Entire cost: ${ parseFloat(pizzaBuilder[name].cost.toFixed(2))}`
           
        }
    })
};

// function popupBasket() {

//     let item = "";
//     for( key in pizzaBuilder) {
//         if(pizzaBuilder[key].amount > 0) {
//             item += 
//             `
//                 <div class="popup__container-item">
//                     <h1>${pizzaBuilder[key].name}</h1>
//                     <p>Price: ${pizzaBuilder[key].cost}</p>
//                     <button class="btn popup__container-btn">remove</button>
//                 </div>
//             `
//             popupContainerDOM.innerHTML = item;
//         }
        
//     }
// }

function deactivateButton(btn) {

    btn.parentElement.parentElement.innerHTML = "in basket";
    // let grandParent = parent.parentElement;
    // console.log(grandParent);
    // 
}

function checkEvents(data) {
    // Event to add clicked ingredient to pizza
    let startBtn = document.querySelectorAll('.item__box-start--btn');
    startBtn.forEach( btn =>  {
        let name = btn.dataset.name;
        btn.addEventListener('click', () => {
            data.forEach( group => {
                group.ingredients.forEach( ingredient => {
                    if(name === ingredient.name) {
                        pizzaBuilder[name] = {};
                        pizzaBuilder[name].name = ingredient.name;
                        pizzaBuilder[name].amount = 1;
                        pizzaBuilder[name].price = ingredient.price;
                        pizzaBuilder[name].cost = pizzaBuilder[name].price * pizzaBuilder[name].amount;
                        changeBtn(name, ingredient);
                        updateIngredientData(name);
                        updateEntireCost();
                        showIngredient(name);
                        deactivateButton(btn);
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
        let ingredientsHeader = document.createElement("div");
        // let ingredientsHeaderH1 = document.createElement("h1");
        let ingredientsHeaderBtn = document.createElement("button");
        ingredientsHeaderBtn.classList.add("ingredients__group-btn");
        // ingredientsHeaderH1.classList.add("ingredients__group-h1");
        // ingredientsHeaderH1.classList.add("heading-two");
        ingredientsHeader.classList.add("ingredients__group-header");
        ingredientsHeaderBtn.innerHTML = `<span>&#x290B;</span>${group.name}<span>&#x290B;</span>`;
        //header
        // ingredientsHeader.appendChild(ingredientsHeaderH1);
        ingredientsHeader.appendChild(ingredientsHeaderBtn);
        
        // container
        let ingredientsContainer = document.createElement("div");
        ingredientsContainer.classList.add("ingredients__container");

        //Group render
        ingredientsGroup.appendChild(ingredientsHeader);
        ingredientsGroup.appendChild(ingredientsContainer);
            //Ingredients render
            group.ingredients.forEach( ingredient => {
                let ingredientItem = document.createElement('div');
                ingredientItem.classList.add('item');
                ingredientItem.dataset.name = ingredient.name;
                ingredientItem.innerHTML += `
                <h1 class="item__header">${ingredient.name}</h1>
                <div class="item__box-start">
                    <p class="item__box-start--price">Price: ${ingredient.price}</p>
                </div>
                <div class="item__box-start">
                    <button class="btn item__box-start--btn" data-name="${ingredient.name}">add</button>
                </div>
                `;
                ingredientsContainer.appendChild(ingredientItem);
            });

        pizzaIngredientsDOM.appendChild(ingredientsGroup);
    });
}
// Events
popupBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    // popupBasket();
});
popupClose.addEventListener("click", () => {
    popup.style.display = "none";
})


document.addEventListener('DOMContentLoaded', () => {

    getData()
    .then( data => {
        createIngrediensGroup(data);
        checkEvents(data);
    });
    pizzaBuilderGenerator(99);
    displayHeader();

});
