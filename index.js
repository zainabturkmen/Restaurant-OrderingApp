// javascript
import { menuArray } from './data.js'
const menuEl = document.getElementById('menu')
const modalEl = document.getElementById('modal')
const myOrderEl = document.getElementById('myOrder')
const myPaymentEl = document.getElementById('myPayment')
const paymentBtn = document.getElementById('payment-btn')
let orderEl = {}

function initializMenu(){
    for (const menu of menuArray)
    menuEl.appendChild(getMenuHtml(menu))
}
 
function getMenuHtml(menu){
    let menuEl = document.createElement("div")
    menuEl.id = menu['id']
    menuEl.className = "menu-foods"
        menuEl.innerHTML += `
           <img src="${menu['emoji']}" class="emoji"/>
           
             <div>
                <h2 class="name">${menu['name']}</h2>
                <p class="ingredients-text">${menu['ingredients']}</p>
                <p class="price">$${menu['price']}</p> 
              </div>   
              
                <button class="plus-btn">+</button> `
        
    return menuEl
}

 function renderMyOrder(){
     let totalPrice = 0
     let totalItems = 0 
     myOrderEl.innerHTML = ""
     
     if(Object.keys(orderEl).length > 0){
         myOrderEl.innerHTML += `<h3 id="orderEl-title">Your Order</h3>`
         
     for(const item in orderEl){
        const calculatePrice = orderEl[item]['price'] * orderEl[item]['count']
        totalPrice += calculatePrice
        totalItems += orderEl[item]['count']
        myOrderEl.appendChild(generateMyOrder(item, orderEl[item]['count'], calculatePrice))

         }
         
        myOrderEl.appendChild(generateMyOrder("Total Price", totalItems, totalPrice, "total-price"))
        myOrderEl.innerHTML += `<button id="complete-btn" data-credentials = "sdf">Complete Order</button>`
     }
 }
 
 
 function generateMyOrder(name, count, totalPrice, id=false){
     const MyItemEl = document.createElement("div")
     if(id)
     MyItemEl.id = id
     MyItemEl.className = "myOrder-item"
     
     MyItemEl.innerHTML += `
     <h3>${name}</h3>
     ${count > 1 ? `<h6>x${count}</h6>` : ""}
     <p class ="remove-btn">${id ? "remove all Items" : "remove"}</p>
     <h4>$${totalPrice}</h4> `
     
     return MyItemEl
 }
 
 
 function addButton(){
     const addButtonEl = document.getElementsByClassName('plus-btn')
     for (let i = 0; i < addButtonEl.length; i++){
         addButtonEl[i].addEventListener("click", event => {
             const parentItem = addButtonEl[i].parentElement.children[1].children
             const NameOfItem = parentItem[0].textContent
             const priceItem = parseInt(parentItem[2].textContent.replace("$", ""))
             
             if (orderEl[NameOfItem])
                 orderEl[NameOfItem]['count'] += 1
             else
             orderEl[NameOfItem] = { count : 1, price: priceItem}
             console.log(orderEl)
             renderMyOrder()
             removeButton()
             completeButton()
         })
     }
 }

 
 function removeButton(){
     const removeItems = document.getElementsByClassName('remove-btn')
     
     for(let i = 0; i < removeItems.length; i++){
         removeItems[i].addEventListener("click", event =>{
             const parentItem = removeItems[i].parentElement.children
             const NameOfItem = parentItem[0].textContent
             
             if(removeItems[i].textContent === "remove all Items")
               orderEl = {}
             else if (orderEl[NameOfItem]['count'] === 1)
               delete orderEl[NameOfItem]
             else
               orderEl[NameOfItem]['count'] -= 1
               
                  renderMyOrder()
                  removeButton()
                  completeButton()
         })
     }
 }
 
 
function completeButton(){
    document.getElementById('complete-btn').addEventListener('click', event =>{
        const myPaymentForm = document.getElementById('myPayment')
        myPaymentForm.style.display = "flex"
    })
} 

 initializMenu()
 addButton()
 
 
function modlFom(){
    modalEl.style.display = 'block'
}
 
 document.addEventListener('click', function(e){
     if(e.target.dataset.credentials){
         modlFom()
     }
 })
 
 myPaymentEl.addEventListener('submit', function(e){
     e.preventDefault()
     const NameInForm  = new FormData(myPaymentEl)
     const userName = NameInForm.get('name')
     
     modalEl.style.display = 'none'
     myOrderEl.innerHTML = `
     <div class="thanks-text">Thanks ${userName}! Your order is on its way!</div>
     `
 })
 
 
 
