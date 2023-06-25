const cardsContainer = document.querySelector('.cards-container');

function fetchBooks() {
    fetch('https://api.itbook.store/1.0/search/archi')
        .then(response => response.json())
        .then(data => renderBooks(data.books))
        .catch(console.error);
}

function renderBooks(books) {
    cardsContainer.innerHTML = '';
    if (books.length === 0) {
        cardsContainer.innerHTML = 'Nenhum item disponível para a sua pesquisa...';
    } else {
        books.forEach(book => {
            const card = createCard(book);
            cardsContainer.appendChild(card);
        });
    }
}

fetchBooks();

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

    const autorMock = document.createElement('p');
    autorMock.textContent = `Autor: ${generateRandomAutor()}`;
    card.appendChild(autorMock);

    const editoraMock = document.createElement('p');
    editoraMock.textContent = `Editora: ${generateRandomPublisher()}`;
    card.appendChild(editoraMock);


    const categoryMock = document.createElement('p');
    categoryMock.textContent = `Categoria: ${generateRandomCategory()}`;
    card.appendChild(categoryMock);

    const statusMock = document.createElement('p');
    statusMock.textContent = `Status: Disponível`;
    card.appendChild(statusMock);

    const addToCartButton = document.createElement('button');
    addToCartButton.innerHTML = '<span id="cart-icon-card" class="material-symbols-outlined">shopping_cart</span>';
    addToCartButton.setAttribute('data-text', 'Adicionar ao Carrinho');
    addToCartButton.addEventListener('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        openModal(book);
    });
    card.appendChild(addToCartButton);

    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.innerHTML = '<span class="material-symbols-outlined">visibility</span>';
    viewDetailsButton.setAttribute('data-text', 'Detalhes');
    viewDetailsButton.addEventListener('click', function () {
        window.location.href = `details.html?isbn=${book.isbn13}`;
    });
    card.appendChild(viewDetailsButton);

    return card;
}

let bookGlobal = null;

function openModal(book) {
    bookGlobal = book;
    modalAddBook.style.display = 'block';
    const confirmButton = document.getElementById('confirm-button');
    const livro = document.getElementById("modal-detalhes-do-livro");
    livro.textContent = `Livro: ${book.title}`
    confirmButton.addEventListener('click', addToCartFromModal);
}

function addToCartFromModal() {
    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);
    addToCart(bookGlobal, quantity);
    modalAddBook.style.display = 'none';
    quantityInput.value = '1';
    bookGlobal = null
}


function generateRandomCategory() {
    const computerScienceCategories = [
        'Programação',
        'Algoritmos',
        'Redes de Computadores',
        'Segurança da Informação',
        'Banco de Dados',
        'Inteligência Artificial',
        'Desenvolvimento Web',
        'Sistemas Operacionais',
        'Engenharia de Software',
        'Ciência de Dados',
        'Arquitetura de Computadores',
        'Computação Gráfica'
    ];

    return computerScienceCategories[Math.floor(Math.random() * computerScienceCategories.length)];
}


function generateRandomAutor() {
    const computerScienceNames = [
        'Ada Lovelace',
        'Alan Turing',
        'Grace Hopper',
        'Linus Torvalds',
        'Tim Berners-Lee',
        'Donald Knuth',
        'Bill Gates',
        'Steve Jobs',
        'Mark Zuckerberg',
        'Larry Page',
        'Sergey Brin',
        'Martin Fowler'
    ];
    return computerScienceNames[Math.floor(Math.random() * computerScienceNames.length)];
}

function generateRandomPublisher() {
    const computerSciencePublishers = [
        'O\'Reilly Media',
        'Manning Publications',
        'Addison-Wesley Professional',
        'Pearson Education',
        'Packt Publishing',
        'Apress',
        'No Starch Press',
        'MIT Press',
        'Pragmatic Bookshelf',
        'Oxford University Press',
        'Wiley',
        'McGraw-Hill Education'
    ];

    return computerSciencePublishers[Math.floor(Math.random() * computerSciencePublishers.length)];
}

function addToCart(book, quantity) {
    let cartItems = localStorage.getItem("cartItems");
    cartItems = JSON.parse(cartItems);
    const regex = /\$/;
    book.price = Number(book.price.toString().replace(regex, ""));
    for (let i = 0; i < quantity; i++) {
        if (cartItems) {
            cartItems.push({ title: book.title, price: book.price });
        } else {
            cartItems = [{ title: book.title, price: book.price }];
        }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    atualizarContadorCarrinho();
    alert(`${quantity} livros adicionados ao carrinho!`);
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const modalAddBook = document.getElementById("modal");
const closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", () => modalAddBook.style.display = "none");

function performSearch() {
    const keyword = searchInput.value.trim();
    if (keyword) {
        fetch(`https://api.itbook.store/1.0/search/${keyword}`)
        .then(response => response.json())
        .then(data => renderBooks(data.books))
        .catch(console.error);
    }
}

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});

searchButton.addEventListener('click', function () { performSearch(); });

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

const tooltip = document.querySelector(".abrir-carrinho");
const cartSidebar = document.querySelector("#cart-sidebar-id");

tooltip.addEventListener("click", function () {
    cartSidebar.classList.toggle("open");
});

const closeIcon = document.querySelector(".close-icon");

closeIcon.addEventListener("click", function () {
    cartSidebar.classList.remove("open");
});

function updateSideBar() {
    const cartItemsContainer = document.querySelector("#cart-items");
    const totalPriceContainer = document.querySelector("#total-price");

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const groupedItems = {};
    const regex = /Price:\s+\$/;

    cartItems.forEach(function (item) {
        item.price = Number(item.price.toString().replace(regex, ""));

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

        const itemContainer = document.createElement("div");
        itemContainer.classList.add("cart-item");

        const title = document.createElement("p");
        title.textContent = item.title;

        const price = document.createElement("span");

        price.textContent = "Preço: $" + Number(item.price).toFixed(2);

        const quantity = document.createElement("span");
        quantity.textContent = "Quantidade: " + item.quantity;

        itemContainer.appendChild(title);
        itemContainer.appendChild(price);
        itemContainer.appendChild(quantity);

        cartItemsContainer.appendChild(itemContainer);
    });


    const totalPrice = cartItemsFormatted.reduce(function (total, item) {
        return total + calculateTotalPrice(item);
    }, 0);
    totalPriceContainer.textContent = "Preço Total do Carrinho: $" + totalPrice.toFixed(2);
}

updateSideBar();