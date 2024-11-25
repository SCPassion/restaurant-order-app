import { menuArray } from './data.js'

// DOM Elements
const itemContainer = document.getElementById('item-container')
const orderArea = document.getElementById('order-area')
const orderContainer = document.getElementById('order-container')
const orderPrice = document.getElementById('order-price')
const paymentWindow = document.getElementById('payment-window')
const form = document.getElementById('form')

// Initialization
const orderArray = []

// Event Listeners
document.addEventListener('click', (e) => {
    if(e.target.dataset.addbtn) {
        handleAddItem(e.target.dataset.addbtn)
    } else if(e.target.id === 'complete-btn') {
        handleCompleteOrder()
    } else if(e.target.dataset.ordername) {
        handleRemoveItem(e.target.dataset.ordername)
    }
})

form.addEventListener('submit', (e)=> {
    handleSubmitOrder(e)
})

// Button Interactions
function handleAddItem(name) {
    const itemObj = menuArray.filter((item) => {
        if(item.name === name) {
            return item
        }
    })[0]
    orderArray.push(itemObj)
    renderOrder(orderArray)
}

function handleCompleteOrder() {
    paymentWindow.classList.remove("disable")
}

function handleSubmitOrder(e) {
    e.preventDefault()
    const formData = new FormData(form)
    console.log(formData.get('name'))
    console.log(formData.get('card-number'))
    console.log(formData.get('cvv'))
    paymentWindow.classList.add("disable")

    orderContainer.innerHTML = `
        <div class="thank-msg">
            <h1>
                Thanks, ${name}! Your order is on its way!
            </h1
        <div>`
}

function handleRemoveItem(ordername) {

    const indexToRemove = orderArray.findIndex((item) => item.name === ordername)
    orderArray.splice(indexToRemove, 1)

    !orderArray.length ? orderContainer.classList.add('disable') : renderOrder(orderArray)
}

// Render Order Functions
function renderOrder(orderArr) {
    orderContainer.classList.contains('disable') && orderContainer.classList.remove('disable')

    const orderHTML = orderArr.map((order)=> {
        const {name, price} = order
        return `
            <div class="ordered-item">
                <h2 class="order-name">${name}</h2>
                <button class="remove-selection-btn" data-ordername="${name}">remove</button>
                <p class="order-price">$${price}</p>
            </div>`
    }).join('')

    const totalPrice = orderArr.reduce((total, item) => {
        return total + item.price
    }, 0)

    orderArea.innerHTML = orderHTML
    orderPrice.textContent = `$${totalPrice}`

}

// Render HTML Functions
function getMenuHtml(menuArr) {
    return menuArr.map((item)=> {
        const {name, ingredients, id, price, emoji} = item
        return `
            <div class="item-area" id="${name}">
                <h1 class="item-logo">${emoji}</h1>
                <div class="item-description">
                    <h2>${name}</h2>
                    <h3>${ingredients.join(", ")}</h3>
                    <p>$${price}</p>
                </div>
                <div class="add-btn-area">
                    <button class="add-item-btn" data-addbtn="${name}">+</button>
                </div>
            </div>
            <div class="line"></div>
        `
    }).join("")
}

function renderMenu(menu) {
    itemContainer.innerHTML = getMenuHtml(menuArray)
    
}

renderMenu(menuArray)