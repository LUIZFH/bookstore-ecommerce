const cardsContainer = document.querySelector('.cards-container');
fetch('https://api.itbook.store/1.0/search/archi')
    .then(response => response.json())
    .then(data => {
        const books = data.books;

        books.forEach(book => {
            const card = createCard(book);
            card.addEventListener('click', function () {
                redirectToDetails(book.isbn13);
            });
            cardsContainer.appendChild(card);
        });
    })
    .catch(error => console.error(error));

function createCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = book.title;
    card.appendChild(title);

    const image = document.createElement('img');
    image.src = book.image;
    image.alt = book.title;
    card.appendChild(image);

    const author = document.createElement('p');
    author.textContent = `ISBN: ${book.isbn13}`;
    card.appendChild(author);

    const year = document.createElement('p');
    year.textContent = `Price: ${book.price}`;
    card.appendChild(year);

    return card;
}

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const keyword = searchInput.value.trim();
        if (keyword) {
            searchBooks(keyword);
        }
    }
});

function searchBooks(keyword) {
    const url = `https://api.itbook.store/1.0/search/${keyword}`;

    window.location.href = "/bookstore-ecommerce";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const books = data.books;
            renderBooks(books);
        })
        .catch(error => console.error(error));
}

function renderBooks(books) {
    cardsContainer.innerHTML = '';

    books.forEach(book => {
        const card = createCard(book);
        card.addEventListener('click', function () {
            redirectToDetails(book.isbn13);
        });
        cardsContainer.appendChild(card);
    });
}

function redirectToDetails(isbn) {
    const detailsUrl = `details.html?isbn=${isbn}`;
    window.location.href = detailsUrl;
}


function atualizarContadorCarrinho() {
    let cartCounter = document.getElementById("cart-counter");

    if (localStorage.getItem("cartItems")) {
        let itens = JSON.parse(localStorage.getItem("cartItems"));



        cartCounter.textContent = itens.length;
    } else {
        cartCounter.textContent = "0";
    }
    updateSideBar();
}
atualizarContadorCarrinho();



let tooltip = document.querySelector(".abrir-carrinho");
let cartSidebar = document.querySelector("#cart-sidebar-id");

tooltip.addEventListener("click", function () {
    cartSidebar.classList.toggle("open");
});

let closeIcon = document.querySelector(".close-icon");

closeIcon.addEventListener("click", function () {
    cartSidebar.classList.remove("open");
});

function updateSideBar() {
    let cartItemsContainer = document.querySelector("#cart-items");
    let totalPriceContainer = document.querySelector("#total-price");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let groupedItems = {};
    let regex = /Price:\s+\$/;

    cartItems.forEach(function (item) {
        item.price = Number(item.price.replace(regex, ""));

        if (groupedItems[item.title]) {
            groupedItems[item.title].quantity += 1;
        } else {
            groupedItems[item.title] = {
                title: item.title,
                quantity: 1,
                price: item.price
            };
        }
    });

    cartItemsFormatted = Object.values(groupedItems);

    function calculateTotalPrice(item) {
        return item.quantity * item.price;
    }

    cartItemsContainer.innerHTML = "";

    cartItemsFormatted.forEach(function (item) {


        console.log({ x: item.price })
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("cart-item");

        let title = document.createElement("h4");
        title.textContent = item.title;

        let price = document.createElement("span");

        price.textContent = "Preço: $" + Number(item.price).toFixed(2);

        let quantity = document.createElement("span");
        quantity.textContent = "Quantidade: " + item.quantity;

        itemContainer.appendChild(title);
        itemContainer.appendChild(price);
        itemContainer.appendChild(quantity);

        cartItemsContainer.appendChild(itemContainer);
    });


    let totalPrice = cartItemsFormatted.reduce(function (total, item) {
        return total + calculateTotalPrice(item);
    }, 0);
    totalPriceContainer.textContent = "Preço Total do Carrinho: $" + totalPrice.toFixed(2);
}

updateSideBar();