const ingredientsContainerDOM = document.getElementById('ingredientsContainer');
const ingredientsHeaderDOM = document.getElementById('ingredientsHeader');
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
// HAMBURGER MENU
const hamburgerDOM = document.querySelector('#hamburger');
const hamburgerUlDOM = document.querySelector('#hamburgerUl');

//SANDBOX
const sandBox = document.querySelector('#sandBox');
//FOOTER
const footer = document.querySelector('#footer');

// PROMISE
async function getData( ) {
    let res = await fetch('./data.json');
    let doc = await res.json();
    let data = doc.data;    
    return data;
};

//GLOBAL VARIABLE
let PIZZA_STATUS = [];
console.log(PIZZA_STATUS)
let CELL_ARRAY = [];
let BOOK_CELL = [];
// GENERATE PIZZA GRID
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

// APPEND HAMBURGER MENU
const hamburger = () => {
    if( hamburgerUlDOM.classList.contains('visible')) {
        hamburgerUlDOM.style.marginRight = "-100rem"
        hamburgerUlDOM.classList.remove('visible')
    } else {
        hamburgerUlDOM.classList.add('visible')
        hamburgerUlDOM.style.marginRight = '-3rem';

    }
}

//APPEND PIZZA STATUS
const pizzaStatusHandler = ( data ) => {
    data.forEach( ingredients => {
        ingredients.ingredients.forEach( ingredient => {
            let ing = {
                section: ingredients.name,
                name: ingredient.name,
                picture: ingredient.picture,
                price: ingredient.price,
                amount: ingredient.count,
                totalPrice: 0
            }
            PIZZA_STATUS.push(ing);
        })
        
    })
    buildPizzaSections();
}

//Basket with ingredients
const popupBasket = () => {
    let addedIng = PIZZA_STATUS.filter( ing => {
        return ing.amount !== 0;
    })
    console.log(addedIng)
    let el = '';
    const basketIng = addedIng.map( ing => {
       return el = `
        <div class="basket__element">
            <div class="basket__element-img">
                <img src="${ing.picture}" />
            </div>
            <p class="basket__element-amount">
               Ilość: ${ing.amount}
            </p>
            <p class="basket__element-price">
               Kwota: ${ing.totalPrice}
            </p>
            <button data-name="${ing.name}" class="basket__element-delete">Zrezygnuj</button>
        </div>
        ` ;
    });
    popupContainerDOM.innerHTML = [...basketIng].join('');

    let basketBtn = document.querySelectorAll('.basket__element-delete')
    .forEach( btn => {
        btn.addEventListener( 'click', () => {
           let filteredIng = PIZZA_STATUS.filter( ing => {
               if(ing.name === btn.dataset.name ) {
                   ing.totalPrice = 0;
                   ing.amount = 0;
                   return ing
               }
               return ing;
           });
           PIZZA_STATUS = filteredIng;
           popupBasket();
           showIngredient(btn.dataset.name, btn);
           updatePizzaCost(btn);
        })
    })
}
//TRANSFORM
const activeClass = ( con, btn ) => {
    // btn.classList.add('active');
    if( con.classList.contains('off__down')) {
        con.classList.remove('off__down');
        con.classList.add('on__down');
    } else {
        con.classList.add('off__down');
        con.classList.remove('on__down');
    }
}
// CATCH BUTTON FOR TRANSFORMING HTML
const catchSectionBtn = () => {
    const containers = document.querySelectorAll('.ingredients__container');
    const sectionBtn = document.querySelectorAll('.ingredients__header-btn').forEach( btn => {
               btn.addEventListener( 'click', () => {
               containers.forEach( con => {
                   let btnN = btn.dataset.name;
                   let conN = con.dataset.name;   
                   if( btnN == conN ){
                       activeClass( con, btn );
                    //    btn.classList.remove('active');
                   } 
                   else {
                        con.classList.add('off__down');
                        con.classList.remove('on__down');
                        // btn.classList.add('active');
                   }
               })
            } )
        })
}
// BIULD SINGLE INGREDIENT
const buildPizzaIngredients = ( name ) => {
    let el = '';
    let elArr = PIZZA_STATUS.map( ing => {
        let ingredient = ing.section;
        if( ingredient === name) {
            el =` 
            <div class="item">
                <div class="item__box-p">
                    <h1 class="item__header">${ing.name.toUpperCase()}</h1>
                    <div class="item__img" style="background-image: url(./${ing.picture});"></div>
                
                </div>
                
                <div class="item__box-p">
                    <p class="item__box-p--price" data-name="${ing.name}">Cena: ${ing.price}</p>
                    <p class="item__box-p--price amount" data-name="${ing.name}">Ilość: ${ing.amount}</p>
                    <p class="item__box-p--price totalPrice" data-name="${ing.name}">Całość: ${ing.totalPrice}</p>
                </div>
                <div class="item__box-btn">
                    <button class="btn item__btn-add" data-name="${ing.name}">+</button>
                    <button class="btn item__btn-remove" data-name="${ing.name}">-</button>
                    <button class="btn item__btn-delete" data-name="${ing.name}">x</button>
                </div>
            </div>`;
            return el;
        }
        
    }).filter( el => el !== undefined);
    return elArr;
}
// BUILD SECTIONS
const buildPizzaSections = ( ) => {
    let key = 'section';
    let header = '';
    let container = '';
    [...new Map( PIZZA_STATUS.map( ing => 
        [ing[key], ing])).values()]
        .forEach( section => {
            let name = section.section;
            header += 
            `<h1 class="ingredients__header-h1">
                    <button class="btn ingredients__header-btn " data-name="${name}" >${name}</button>
            </h1>
                `;
            container +=
             `<div class="ingredients__container off__down" data-name="${name}" >
                ${[...buildPizzaIngredients( name )].join(" ")}
            </div>`;
            ingredientsHeaderDOM.innerHTML = header;
            ingredientsContainerDOM.innerHTML = container;
    });
    catchSectionBtn();
    getButtons();
}

function getButtons(name) {

    let addBtn = document.querySelectorAll('.item__btn-add');
    addBtn.forEach( btn => {
        let btnName = btn.dataset.name;
        btn.addEventListener("click", () => {
            updatePizzaCost(btn); 
        })
    });

    let removeBtn = document.querySelectorAll('.item__btn-remove');

    removeBtn.forEach( btn => {
        let btnName = btn.dataset.name;
            btn.addEventListener("click", () => {
                updatePizzaCost(btn); 
            })
    });

    let deleteBtn = document.querySelectorAll('.item__btn-delete');
    deleteBtn.forEach( btn => {
        let btnName = btn.dataset.name;
        btn.addEventListener("click", () => {
            updatePizzaCost(btn); 
        })
    })
}

function showIngredient(name, btn) {
    let cell = document.querySelectorAll(".builder__pizza-cell");
    const num =  Math.floor(Math.random() * cell.length);

    //check if numbers ale always different
    
    let checkCell = BOOK_CELL.find( el => {
            let n = parseInt(el);
            console.log(n, num)
            if( num === n) {
                return el
            }
    });
    checkCell ? console.log('identyczne') : console.log('różne');
    console.log(checkCell)
    console.log(BOOK_CELL)

    if(btn.classList.contains('item__btn-add')) {
        cell.forEach( (cell, id) => {
            let picture = "";
            PIZZA_STATUS.forEach( ing => {
                if(ing.name === name) {
                    picture = ing.picture;
                }
            });
            if( num === id ) {
                cell.style.backgroundImage = `url("${picture}")`;
                cell.dataset.name = name;
                CELL_ARRAY.push({id: id+1, name: name});
                BOOK_CELL.push(cell.id);
                console.log(BOOK_CELL)
            }
        }); 
    } else if(btn.classList.contains('item__btn-remove')){
            let removeCell = CELL_ARRAY.find( pic => { 
               return pic.name === name; 
            })
            cell.forEach( el => {
                let deletedNum = parseInt(el.id)
                if( deletedNum === removeCell.id) {
                    el.style.backgroundImage = "";
                };
            })
            let removeArray = CELL_ARRAY.filter( el => {
                return el.id !== removeCell.id
            });
            CELL_ARRAY = removeArray;
            let removeBook = BOOK_CELL.filter( el => {
                let bookNum = parseInt(el);
                console.log(typeof el, typeof removeCell.id)
                return bookNum !== removeCell.id
            });
            BOOK_CELL = removeBook;
            console.log(BOOK_CELL)
    } else {
        let deleteCell = CELL_ARRAY.filter( pic => {
            return pic.name !== name;
        })
        CELL_ARRAY = deleteCell;

        let deleteNum = CELL_ARRAY.map( el => {return (el.id).toString()});

        BOOK_CELL = deleteNum;
        console.log(CELL_ARRAY, BOOK_CELL)
        cell.forEach( cell => {
            if(cell.dataset.name === name) {
                cell.style.backgroundImage = "";
            };
        });
    }
}

function updateEntireCost() {
    let sum = PIZZA_STATUS.map( num => {
       return num.totalPrice;
    }).reduce( (sum, num) => {
       return sum + num
     }, 0);
    pizzaPriceDOM.innerHTML = `koszt: ${parseFloat(sum.toFixed(2))} + 10 za ciasto`;
    
}

function updatePizzaCost(btn) {
    let name = btn.dataset.name;
    if(btn.classList.contains("item__btn-add")){
        PIZZA_STATUS.forEach( ing => {
            if(ing.name === name) {
                ing.amount++;
                ing.totalPrice = ing.amount * ing.price;
            }
        })
    } else if (btn.classList.contains("item__btn-remove")){
        PIZZA_STATUS.forEach( ing => {
            if(ing.name === name) {
                if(ing.amount > 0) {
                    ing.amount--;
                    ing.totalPrice = ing.totalPrice - ing.price;
                }
            }
        })
    } else {
        PIZZA_STATUS.forEach( ing => {
            if(ing.name === name) {
                if(ing.amount > 0) {
                    ing.amount = 0;
                    ing.totalPrice = 0;
                }
            }
        })
    }
    updateIngredientData(name);
    updateEntireCost();
    showIngredient(name, btn);
}

function updateIngredientData(name) {
    let totalPrice = document.querySelectorAll('.totalPrice');
    let amount = document.querySelectorAll('.amount');
    
    amount.forEach( p => {
        let pName = p.dataset.name;
        if(name === pName) {
            PIZZA_STATUS.forEach( ing => {
                if(ing.name === pName) {
                    p.innerHTML = `Ilość: ${ ing.amount }`;
                }
            })
        }    
    });
    totalPrice.forEach( p => {
        let pName = p.dataset.name;
        if( name === pName) {
            PIZZA_STATUS.forEach( ing => {
                if(ing.name === name) {
                    p.innerHTML = `Całość: ${ parseFloat(ing.totalPrice.toFixed(2)) }`;
                }
            })
        }    
    })
};
// Events
hamburgerDOM.addEventListener('click', () => {
    hamburger();
})
popupBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    popupBasket();
});
popupClose.addEventListener("click", () => {
    popup.style.display = "none";
})

document.addEventListener('DOMContentLoaded', () => {

    getData()
    .then( data => {
        // createIngrediensGroup(data);
        // checkEvents(data);
        pizzaStatusHandler(data);
    });
    pizzaBuilderGenerator(29);
});
