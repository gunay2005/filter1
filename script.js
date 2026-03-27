let itemsList = []
const container = document.querySelector('#cards')
const categoryBox = document.querySelector('#categotyes')

const categoryData = [
    { id: 1, title: "   Все", key: "all" },
    { id: 2, title: "Куртки", key: "outerwear" },
    { id: 3, title: "Базовые вещи", key: "basics" },
    { id: 4, title: "Брюки", key: "pants" },
    { id: 5, title: "Трикотаж", key: "knitwear" },
    { id: 6, title: "Рубашки", key: "shirts" },
    { id: 7, title: "Спорт", key: "sportif" },
    { id: 8, title: "Обувь", key: "footwear" }
]


function renderCategories() {
    let buttons = ''

    categoryData.forEach(cat => {
        buttons += `
            <button 
                class="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-300"
                onclick="showByCategory('${cat.key}')">
                ${cat.title}
            </button>
        `
    })

    categoryBox.innerHTML = buttons
}

renderCategories()


async function loadProducts() {
    try {
        const response = await fetch('https://69c599d88a5b6e2dec2cb0f1.mockapi.io/products')
        const result = await response.json()

        itemsList = result
        renderProducts(itemsList)

    } catch (error) {
        console.error('Error loading data:', error)
    }
}

loadProducts()


function renderProducts(arr) {
    container.innerHTML = arr.map(product => `
        <div class="group relative max-w-sm border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md">
            
            <div class="absolute top-3 left-3 z-10">
                <span class="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase rounded">
                    ${product.status}
                </span>
            </div>

            <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-110 transition"/>
            </div>

            <div class="p-4">
                <div class="flex justify-between">
                    <div>
                        <p class="text-xs text-gray-500 uppercase">${product.category}</p>
                        <h3 class="text-lg font-bold group-hover:text-purple-600">
                            ${product.name}
                        </h3>
                    </div>
                    <p class="font-blue">$${(+product.price).toFixed(2)}</p>
                </div>

                <button class="w-full mt-3 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-800">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('')
}

function showByCategory(type) {
    if (type === 'all') {
        renderProducts(itemsList)
        return
    }

    const result = itemsList.filter(el =>
        el.category.toLowerCase() === type.toLowerCase()
    )

    renderProducts(result)
}