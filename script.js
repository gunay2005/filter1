let cart=[]




let itemsList=[]

let cards=document.getElementById('cards')
let categoriler=document.getElementById('categoriler')
let srchinput=document.getElementById('srchinput')
const categoryData=[

     { id: 1, name: "   Все", slug: "all" },
    { id: 2, name: "Куртки", slug: "outerwear" },
    { id: 3, name: "Базовые вещи", slug: "basics" },
    { id: 4, name: "Брюки", slug: "pants" },
    { id: 5, name: "Трикотаж", slug: "knitwear" },
    { id: 6, name: "Рубашки", slug: "shirts" },
   { id: 7, name: "Спорт", slug: "sportif" },
   { id: 8, name: "Обувь", slug: "footwear" }
];

function getCategory(){
    let html=categoryData.map(item =>{
     return `
         <button 
               class="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-300"
               onclick="filterProducts('${item.slug}')">${item.name}</button>

    `}).join('')
    categoriler.innerHTML=html
}

getCategory()


function getData(){
    fetch('https://69c599d88a5b6e2dec2cb0f1.mockapi.io/products')
    .then(res =>res.json())
    .then(data =>{
        itemsList =data
        displayproducts(itemsList)

    })
}
 function displayproducts(itemsList){
    let html=itemsList.map(item =>{
        return `

        <div class="group relative max-w-sm border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md">
            
           <div class="absolute top-3 left-3 z-10">
              <span class="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase rounded">
                   ${item.status}
               </span>
           </div>

             <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition"/>
          </div>

            <div class="p-4">
                <div class="flex justify-between">
                    <div>
                        <p class="text-xs text-gray-500 uppercase">${item.category}</p>
                        <h3 class="text-lg font-bold group-hover:text-purple-600">
                            ${item.name}
                         </h3>
                    </div>
                    <p class=" text-purple-600 font-bold">$${(+item.price).toFixed(2)}</p>
                 </div>

                <button onclick="addToCart(${item.id})"
                class="w-full mt-3 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-800">
                    Add to Cart
                 </button>
             </div>
         </div>
         `
     }).join('')
     cards.innerHTML =html
    }

    getData()
    
function filterProducts(category){
    if(category ==="all" ||!category){
        displayproducts(itemsList)
    }else{
        let filtered =itemsList.filter(item =>
            item.category.toLowerCase()===category.toLowerCase())
            displayproducts(filtered)
        
    }
}

// dobavlyayem v korzinu pokaz kolicvo

function addToCart(id){
    let product =itemsList.find(item =>item.id ==id)
    cart.push(product)

    updateCartCount()

    renderCart
}

function updateCartCount(){ 
    let count=document.getElementById('say')
    count.innerText= cart.length
}

// закрытие картины 


function sebetOpen(){
    document.getElementById('cartModal').classList.remove('hidden')
    renderCart()
}

function closeCart(){
    document.getElementById('cartModal').classList.add('hidden')
}

function renderCart(){
    let container=document.getElementById('cartItems')
    if(cart.length ===0){
        container.innerHTML="<p>Cart is empty</p>"
        return
    }

    let html=cart.map(item => `
        
        <div class="flex gap-3 border-b pb-2">
            <img src="${item.image}" class="w-16 h-16 object-cover rounded"/>
            
            <div class="flex-1">
                <h3 class="text-sm font-bold">${item.name}</h3>
                <p class="text-xs text-gray-500">$${item.price}</p>
            </div>
        </div>

        `).join('')

        container.innerHTML =html
}



// filter edirik


srchinput.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase()

    let filtered = itemsList.filter(item =>
        item.name.toLowerCase().includes(value)
    )

    displayproducts(filtered)
})


// и еще показ при пустом все 


srchinput.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase()

    if(value === ''){
        displayproducts(itemsList)
        return
    }

    let filtered = itemsList.filter(item =>
        item.name.toLowerCase().includes(value)
    )

    displayproducts(filtered)
})