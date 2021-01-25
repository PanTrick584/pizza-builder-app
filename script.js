const ingredientsContainerDOM = document.getElementById('ingredientsContainer');
const ingredientsHeaderDOM = document.getElementById('ingredientsHeader');
const ingredientsInfoDOM = document.querySelector('#ingredientsInfo')
//  PIZZA BUILDER
const pizzaPriceDOM = document.getElementById('cost');
const pizzaBuilderDOM = document.getElementById('builder__pizza');
// POPUP DOM
const popup = document.getElementById("popup");
const popupOpen = document.getElementById("popupBtn");
const popupHamburgerOpen = document.querySelector('#popupHamburgerBtn');
const popupClose = document.getElementById("popupBtnClose");
const popupContainerDOM = document.getElementById("popupContainer");
//DISPLAY
const headerDOM = document.getElementById("header");
const headerBtnDom = document.getElementById("headerBtn");
// MENU FUNCTIONALITIES
const mainInfoContainerDOM = document.querySelector('#mainInfoContainer');
const builderCoordinatesDOM = document.querySelector('#builderCoordinates');
const mainInfoAboutDOM = document.querySelectorAll('.mainInfoAbout');
const mainInfoSliderDOM = document.querySelectorAll('.mainInfoSlider');
const mainInfoBuilderDOM = document.querySelectorAll('.mainInfoBuilder');
// HAMBURGER MENU
const hamburgerDOM = document.querySelector('#hamburger');
const hamburgerUlDOM = document.querySelector('#hamburgerUl');
const hamburgerCost = document.querySelector('#hamburgerCost')

//FOOTER
const footer = document.querySelector('#footer');

// PROMISE
async function getData( ) {
    let res = await fetch('./data.json');
    let doc = await res.json();
    let data = doc.data;    
    return data;
};

//GLOBAL VARIABLES
const BUILDER_ELEMENTS = 19;
let PIZZA_STATUS = [];
console.log(PIZZA_STATUS)
// BUILDER STATE
let CELL_AVALIABLE = [];
let CELL_RESERVED = [];

let CELL_ARRAY = [];
// AVALIBLE CELLS IN BUILDER
let CELL_NUMBERS = [];
let BOOK_CELL = [];

let caruselImages = [
    './img/slider_pizza_1.jpg',
    './img/slider_pizza_2.jpg'
];
const populateCellNumbers = (elements) => {
    for( let i = 1; i <= elements; i++){
        CELL_NUMBERS = [...CELL_NUMBERS, i];
    }
}
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
// MAIN INFO SECTION
function setCarusel() {
    let carusel = `
        <!-- OWL CARUSEL -->
            <div class="carusel" id="carusel">
                <button class="carusel__btn" id="caruselBtnRemove">&lt;</button>
                <div class="carusel__dots" id="caruselBox">
                    <!-- DOTS -->
                </div>
                <button class="carusel__btn" id="caruselBtnAdd">&gt;</button>
            </div>
        <!-- END OF OWL CARUSEL -->
        `;
    mainInfoContainerDOM.innerHTML = carusel;
    //  CARUSEL 
    const caruselDOM = document.querySelector('#carusel');
    const caruselBoxDOM = document.querySelector('#caruselBox');
    const caruselBtnRemoveDOM = document.querySelector('#caruselBtnRemove');
    const caruselBtnAddDOM = document.querySelector('#caruselBtnAdd');

    let dot = [];
    caruselImages.forEach( img => {
        dot = [...dot, `<div class="carusel__dots-dot"></div>`]
        
    })
    caruselBoxDOM.innerHTML = [...dot].join('');
    let num = 0;
    let dots = document.querySelectorAll(".carusel__dots-dot");
    let dotsArray = Array.from(dots); 
    let dotsID = dotsArray.map( (dot, id) => {
         dot.dataset.id = id;
         return dot;
    });
    caruselBtnAddDOM.addEventListener("click", () => {
        if( num < caruselImages.length -1 ) {
            num++;
            changeDot(num);
            changeBackground(num);
        }
        
    })
    caruselBtnRemoveDOM.addEventListener("click", () =>{
        if( num > 0 ) {
            num--;
            changeDot(num)
            changeBackground(num);
        }
        
    });
    const changeBackground = (num) => caruselImages.forEach( (photo, id) => {
        if(id === num) {
            caruselDOM.style.backgroundImage = `url(${photo})`;
        }
    });
    const changeDot = (num) => dots.forEach( (dot, id) => {
        dot.style.backgroundColor = "transparent";
        if(id === num) {
            dot.style.backgroundColor = "#e0c45c";
        }
    })
    changeBackground(num);
    changeDot(num);
}
function setAboutMainInfo() {
    let about = `
        <div class="about" >
            <div class="about__box" >
                <div class="about__box-img">
                </div>
            </div>
            <div class="about__box" >
                <h1 class="">Cześć</h1>
                <p>Nazywam się Patryk Chodacki</p>
                <p>jestem twórcą tej aplikacji</p>
            </div>
        </div>
    `;
    mainInfoContainerDOM.innerHTML = about;
    scrollToTop();
}
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
// SCROLL FUNCTIONS
const scrollToTop = () => {
    let scrollOptions = {
        left: 0,
        top: 0,
        behavior: 'smooth'
      }
    
      window.scrollTo(scrollOptions);
      hamburger();
}
const scrollToBuilder = () => {
    let storySection = builderCoordinatesDOM.getBoundingClientRect();
    let scrollOptions = {
      left: storySection.left,
      top: storySection.top,
      behavior: 'smooth'
    }
  
    window.scrollTo(scrollOptions);
    hamburger();
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
               Kwota: ${parseFloat(ing.totalPrice.toFixed(2))}
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
// CHECK IF CONTAINS
const checkIfContains = () => {
    const containers = document.querySelectorAll('.ingredients__container');
    let contains = Array.from(containers).filter( con => con.classList.contains('on__down'));
        if(contains.length === 0) {
            ingredientsInfoDOM.innerHTML = 'naciśnij dowolną grupę składników powyżej, by wybrać to, co chcesz znaleźć w swojej wymarzonej pizzy';
        } else {
            ingredientsInfoDOM.innerHTML = '';
        }
}
// TRANSFORM
const activeClass = ( con ) => {
    
    if( con.classList.contains('off__down')) {
        con.classList.remove('off__down');
        con.classList.add('on__down');
    } else {
        con.classList.add('off__down');
        con.classList.remove('on__down');
    }
    checkIfContains();
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
                   } 
                   else {
                        con.classList.add('off__down');
                        con.classList.remove('on__down');
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
                    <button class="btn item__btn-add" data-name="${ing.name}">dodaj</button>
                    <button class="btn item__btn-remove" data-name="${ing.name}">odejmij</button>
                    <button class="btn item__btn-delete" data-name="${ing.name}">usuń</button>
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
    let num = CELL_NUMBERS[Math.floor(Math.random() * CELL_NUMBERS.length)];
        
    if(btn.classList.contains('item__btn-add')) {
        let newCELL_NUMBERS = CELL_NUMBERS.filter( number => number !== num);
        CELL_NUMBERS = newCELL_NUMBERS;
        //CELLS RESERVED FOR PICTURES
        let newCELL_RESERVED = [...CELL_RESERVED, { num, name }]
        CELL_RESERVED = newCELL_RESERVED;
        //
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
            }
        }); 
    } else if(btn.classList.contains('item__btn-remove')){
            let removeCell = CELL_ARRAY.find( pic => { 
               return pic.name === name; 
            })
            if(CELL_RESERVED.length !== 0) {
                let removedCellNumber = CELL_RESERVED.find( pic => pic.name === name)
                CELL_RESERVED = [...CELL_RESERVED.filter( el =>  el !== removedCellNumber  )]
                CELL_NUMBERS = [...CELL_NUMBERS, removedCellNumber.num]
            }
           
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
                return bookNum !== removeCell.id
            });
            BOOK_CELL = removeBook;
    } else {
        let deleteCell = CELL_ARRAY.filter( pic => {
            return pic.name !== name;
        })
        CELL_ARRAY = deleteCell;

        let deletedNums = CELL_RESERVED.filter( el => el.name === name );
        CELL_RESERVED = [...CELL_RESERVED.filter( el => el.name !== name )]
        deletedNums.forEach( el => CELL_NUMBERS = [...CELL_NUMBERS, el.num])
        
        let deleteNum = CELL_ARRAY.map( el => {return (el.id).toString()});

        BOOK_CELL = deleteNum;
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
    hamburgerCost.innerHTML = `${parseFloat(sum.toFixed(2))} + 10 za ciasto`;
}

function updatePizzaCost(btn) {

    let name = btn.dataset.name;
    if( btn.classList.contains("item__btn-add") ){
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
popupOpen.addEventListener("click", () => {
    popup.style.display = "flex";
    popupBasket();
});
popupHamburgerOpen.addEventListener( "click", () => {
    popup.style.display = "flex";
    popupBasket();
})
popupClose.addEventListener("click", () => {
    popup.style.display = "none";
})
// MENU EVENTS
mainInfoAboutDOM.forEach( about => about.addEventListener( "click", setAboutMainInfo ))
mainInfoSliderDOM.forEach( slider => slider.addEventListener( "click", () => {setCarusel(); scrollToTop()} ));
mainInfoBuilderDOM.forEach( coords => coords.addEventListener('click', scrollToBuilder ))

document.addEventListener('DOMContentLoaded', () => {

    getData()
    .then( data => {
        // createIngrediensGroup(data);
        // checkEvents(data);
        pizzaStatusHandler(data);
    });
    pizzaBuilderGenerator(BUILDER_ELEMENTS);
    populateCellNumbers(BUILDER_ELEMENTS);
    setCarusel();
});
