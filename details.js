let cartIcon = document.getElementById("cart-icon");

cartIcon.addEventListener("click", addToCart);

function addToCart() {
    let bookTitle = document.getElementById("book-title").textContent;
    let bookPrice = document.getElementById("book-price").textContent;

    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        cartItems.push({ title: bookTitle, price: bookPrice });
    } else {
        cartItems = [{ title: bookTitle, price: bookPrice }];
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    atualizarContadorCarrinho();

    alert("Livro adicionado ao carrinho!");
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


const urlParams = new URLSearchParams(window.location.search);
const isbn = urlParams.get('isbn');

const bookTitle = document.getElementById('book-title');
const bookSubtitle = document.getElementById('book-subtitle');
const bookAuthors = document.getElementById('book-authors');
const bookPublisher = document.getElementById('book-publisher');
const bookISBN = document.getElementById('book-isbn');
const bookPages = document.getElementById('book-pages');
const bookYear = document.getElementById('book-year');
const bookRating = document.getElementById('book-rating');
const bookDescription = document.getElementById('book-description');
const bookPrice = document.getElementById('book-price');
const bookImage = document.getElementById('book-image');
const bookUrl = document.getElementById('book-url');

function fetchBookDetails(isbn) {
    const apiUrl = `https://api.itbook.store/1.0/books/${isbn}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error === '0') {
                bookTitle.textContent = data.title;
                bookSubtitle.textContent = data.subtitle;
                bookAuthors.textContent = `Authors: ${data.authors}`;
                bookPublisher.textContent = `Publisher: ${data.publisher}`;
                bookISBN.textContent = `ISBN: ${data.isbn13}`;
                bookPages.textContent = `Pages: ${data.pages}`;
                bookYear.textContent = `Year: ${data.year}`;
                bookRating.textContent = `Rating: ${data.rating}`;
                bookDescription.textContent = data.desc;
                bookPrice.textContent = `Price: ${data.price}`;
                bookImage.src = data.image;
            } else {
                console.error('Error fetching book details:', data.error);
            }
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
        });
}

fetchBookDetails(isbn);

let tooltip = document.querySelector(".abrir-carrinho");
let cartSidebar = document.querySelector("#cart-sidebar-id");

tooltip.addEventListener("click", function () {
    cartSidebar.classList.toggle("open");
});

let closeIcon = document.querySelector(".close-icon");

closeIcon.addEventListener("click", function () {
    cartSidebar.classList.remove("open");
});
