const cartButton = document.querySelectorAll('ul button')
const cartContainer = document.querySelector('.cart-container')
const table = document.querySelector('table')
const cartCount = document.querySelector('.cart-count')
const sizeOfProduct = document.querySelector('.select-size')
const quantityTextField = document.querySelector('.quantity-display');
let quantity = 1;
let count = 0 

const generateRandomId = (idArray) =>{
    let num

    do{
        num = Math.floor(Math.random() * 51)
    }while(idArray.includes(num))

    idArray.push(num)

    return num
}

const addToCart = () =>{
    let productChosen = productImages[0].src
    const price = parseInt(quantityTextField.value) * 78   
    const productId = generateRandomId(idArray)

    let rowData = {
        id: productId,
        removeButton: 'X',
        product: productChosen,
        amount: parseInt(quantityTextField.value),
        size: sizeOfProduct.value,
        price: price
    }

    count++
    localStorage.setItem('cart Count', count)

    let rowDataDeSerialized = JSON.parse(localStorage.getItem('rowData')) || []
    rowDataDeSerialized.push(rowData)
    localStorage.setItem('rowData', JSON.stringify(rowDataDeSerialized))

    storageCount('add')
    getCartData('add')

    quantityTextField.value = 1
    quantity = 0   
}

const removeItem = (dataId) => {

    const datas = JSON.parse(localStorage.getItem('rowData')) || []

    localStorage.setItem('cart Count', parseInt(localStorage.getItem('cart Count')) - 1)

    const updatedStorage = datas.filter(item => item.id !== dataId)
    localStorage.setItem('rowData', JSON.stringify(updatedStorage))

    const buttonId = document.getElementById(`${dataId}`)
    const row = buttonId.closest('tr')
    row.remove()
    storageCount('remove')
}
document.addEventListener('DOMContentLoaded', () =>{
    storageCount('load')  

    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        if(link.classList.contains('active')){
            link.classList.add('current-page')
        }
    });

})

const storageCount = (operation) =>{
    let storageCount = parseInt(localStorage.getItem('cart Count'))
    if (operation === 'add' || operation === 'remove'){
        cartCount.style.visibility = 'visible'
        cartCount.textContent = `${storageCount}` 
        if(storageCount === 0){
            cartCount.style.visibility = 'hidden'
        }
    }
    else if(storageCount > 0){
        cartCount.style.visibility = 'visible'
        cartCount.textContent = `${storageCount}`
        count = storageCount
        getCartData('load')
    }  
}
const getCartData = (window) =>{
    let existingData = JSON.parse(localStorage.getItem('rowData')) 

    if(window === 'add'){
        let lastData = existingData[existingData.length - 1]
        createTable(lastData)
    }
    else{
        existingData.forEach(data =>{
            createTable(data)
        })
    }
}

const createTable = (data) =>{
    let newRow = table.insertRow()

    let removeCell = newRow.insertCell(0)
    let productCell = newRow.insertCell(1)
    let amountCell = newRow.insertCell(2)
    let sizeCell = newRow.insertCell(3)
    let priceCell = newRow.insertCell(4)

    removeCell.innerHTML = `<button id="${data.id}" onClick="removeItem(${data.id})" class="remove-button"> ${data.removeButton} </button>`
    productCell.innerHTML = `<img src="${data.product}">
                            <i>Cartoon Astronaut T-Shirts</i>`
    amountCell.textContent = `${data.amount}`
    sizeCell.textContent = `${data.size}`
    priceCell.textContent = `$${data.price}`
}
/////////////////////////////////////////////////

//////////////  PRODUCT DETAILS PAGE  //////////////////
const addQuantity = () => {
    quantity++
    quantityTextField.value = quantity;
}
const subtractQuantity = () =>{
    if(quantityTextField.value > 1){
        quantity--;
        quantityTextField.value = quantity
    } 
}
/////////////////////////////////////////////////////////


/////////////////////// PAGE TWO  ///////////////////////
const totalProducts = document.querySelectorAll('.product');
const productImages = document.querySelectorAll('.single-product-grid img');

if(window.location.pathname === '/html-codes/eCommerce%20project/shop.html'){
    const shopPageOne = document.querySelector('.page-one');
    const shopPageTwo = document.querySelector('.page-two');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const computedStyle = window.getComputedStyle(shopPageOne);
    const display = computedStyle.getPropertyValue('display');

    if (display === 'none') {
        nextButton.setAttribute('disabled', 'true');
    } else {
        prevButton.setAttribute('disabled', 'true');
    }
    
    shopPageTwo.classList.add('hide');

    nextButton.addEventListener('click', () => {
        shopPageTwo.classList.remove('hide');
        shopPageOne.classList.add('hide');

        nextButton.setAttribute('disabled', 'true');
        prevButton.removeAttribute('disabled');
    });

    prevButton.addEventListener('click', () => {
        shopPageTwo.classList.add('hide');
        shopPageOne.classList.remove('hide');

        nextButton.removeAttribute('disabled');
        prevButton.setAttribute('disabled', 'true');
    });
}

totalProducts.forEach( products =>{
    products.addEventListener('click', () =>{
        if(localStorage.length === 0){
            localStorage.setItem('ProductID', products.id)
        }
        else{
            localStorage.removeItem('ProductID')
            localStorage.setItem('ProductID', products.id)
        }
        window.location.href = 'sproduct.html'
    })
})

const firstProduct = (index) =>{
    productImages[0].src = `/images/${index}.jpg`
    
    if(index.slice(0,1) === 'n'){
        productImages[1].src = '/images/n2.jpg'
        productImages[2].src = '/images/n3.jpg'
        productImages[3].src = '/images/n4.jpg'
        productImages[4].src = '/images/n5.jpg'
    }
}

if(window.location.pathname ===  '/html-codes/eCommerce%20project/sproduct.html'){
    const pID = localStorage.getItem('ProductID')

    switch(pID){
        case "featured-product-2": 
            firstProduct('f2')
            break;
        case "featured-product-3":
            firstProduct('f3')   
            break;
        case "featured-product-4":
            firstProduct('f4')
            break;
        case "featured-product-5":
            firstProduct('f5')
            break;
        case "featured-product-6":
            firstProduct('f6')
            break;
        case "featured-product-7":
            firstProduct('f7')
            break;
        case "featured-product-8":
            firstProduct('f8')
            break;
        case "featured-product-9":
            firstProduct('n1')
            break;
        case "featured-product-10":
            firstProduct('n2')
            break;
        case "featured-product-11":
            firstProduct('n3')
            break;
        case "featured-product-12":
            firstProduct('n4')
            break;
        case "featured-product-13":
            firstProduct('n5')
            break;
        case "featured-product-14":
            firstProduct('n6')
            break;
        case "featured-product-15":
            firstProduct('n7')
            break;
        case "featured-product-16":
            firstProduct('n8')
            break;
    }
}

productImages.forEach(images =>{
    images.addEventListener('click', () =>{
        const temp = productImages[0].src
        productImages[0].src = images.src
        images.src = temp;
    })
})
/////////////////////////////////////////////////////
