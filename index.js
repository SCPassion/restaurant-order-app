import { menuArray } from './data.js'

const itemContainer = document.getElementById('item-container')
const orderArea = document.getElementById('order-area')
const orderContainer = document.getElementById('order-container')
const orderPrice = document.getElementById('order-price')
const paymentWindow = document.getElementById('payment-window')
const form = document.getElementById('form')
const orderArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.addbtn) {
        handleAddItem(e.target.dataset.addbtn)
    } else if(e.target.id === 'complete-btn') {
        handleCompleteOrder()
    }
})

form.addEventListener('submit', (e)=> {
    handleSubmitOrder(e)
})

function handleAddItem(itemID) {
    const itemObj = menuArray.filter((item) => {
        if(item.name === itemID) {
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

    orderContainer.textContent = `Thanks, ${name}! Your order is on its way`
}

function renderOrder(orderArr) {
    orderContainer.classList.contains('disable') && orderContainer.classList.remove('disable')

    const orderHTML = orderArr.map((order)=> {
        const {name, price} = order
        return `
            <div class="ordered-item">
                <h2 class="order-name">${name}</h2>
                <button class="remove-selection-btn">remove</button>
                <p class="order-price">$${price}</p>
            </div>`
    }).join('')

    const totalPrice = orderArr.reduce((total, item) => {
        return total + item.price
    }, 0)

    orderArea.innerHTML = orderHTML
    orderPrice.textContent = `$${totalPrice}`

}

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

