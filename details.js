let cartIcon = document.getElementById("cart-icon");

cartIcon.addEventListener("click", openModal);

function addToCart(quantity) {
    let bookTitle = document.getElementById("book-title").textContent;
    let bookPrice = document.getElementById("book-price").textContent;

    let cartItems = localStorage.getItem("cartItems");
    cartItems = JSON.parse(cartItems);

    for(let i = 0; i < quantity; i++) {
        if (cartItems) {
            cartItems.push({ title: bookTitle, price: bookPrice });
        } else {
            cartItems = [{ title: bookTitle, price: bookPrice }];
        }
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

function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    const confirmButton = document.getElementById('confirm-button');
    const livro = document.getElementById("modal-detalhes-do-livro");
    let bookTitle_ = document.getElementById("book-title").textContent;
    livro.textContent = `Livro: ${bookTitle_}`;
    confirmButton.addEventListener('click', addToCartFromModal);
}

function addToCartFromModal() {
    const modal = document.getElementById('modal');
    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);
    addToCart(quantity);
    modal.style.display = 'none';
    quantityInput.value = '1';
    bookGLobal = null
}


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
const bookSummary = document.getElementById('summary');
const bookAbstract = document.getElementById('abstract');
const formato = document.getElementById('formato');
const maisInfoAutor = document.getElementById('mais-info-autor');

function fetchBookDetails(isbn) {
    const apiUrl = `https://api.itbook.store/1.0/books/${isbn}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error === '0') {
                bookTitle.textContent = data.title;
                bookSubtitle.textContent = data.subtitle;
                bookAuthors.textContent = `Authors: ${data.authors}`;
                maisInfoAutor.textContent = `Authors More Infos: ${randomizeAuthorInfo()}`;
                bookPublisher.textContent = `Publisher: ${data.publisher}`;
                bookISBN.textContent = `ISBN: ${data.isbn13}`;
                bookPages.textContent = `Pages: ${data.pages}`;
                bookYear.textContent = `Year: ${data.year}`;
                bookRating.textContent = `Rating: ${data.rating}`;
                bookDescription.textContent = data.desc;
                bookPrice.textContent = `Price: ${data.price}`;
                bookSummary.innerHTML = `
                    <p>Conteúdo:</p>
                    <ol>
                    <li>Introdução à Arquitetura de Software</li>
                    <li>Requisitos e Análise de Negócios</li>
                    <li>Princípios de Arquitetura</li>
                    <li>Padrões Arquiteturais</li>
                    <li>Arquitetura em Camadas</li>
                    <li>Arquitetura Orientada a Serviços (SOA)</li>
                    <li>Arquitetura Baseada em Microsserviços</li>
                    <li>Arquitetura em Nuvem</li>
                    <li>Arquitetura Distribuída</li>
                    <li>Segurança e Resiliência em Arquitetura de Software</li>
                    <li>Arquitetura para Aplicações Web e Mobile</li>
                    <li>Evolução da Arquitetura de Software</li>
                    </ol>
                    <p>Apêndices:</p>
                    <ul>
                    <li>Glossário de Termos</li>
                    <li>Ferramentas e Tecnologias Comuns em Arquitetura de Software</li>
                    <li>Recursos Adicionais</li>
                    </ul>
                `;
                bookImage.src = data.image;
                bookAbstract.innerHTML = `Resumo: ${generateRandomBookSummary()}`;
                formato.textContent = `Formato: ${randomizeBookBinding()}`;
            } else {
                console.error('Error fetching book details:', data.error);
            }
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
        });
}

function randomizeBookBinding() {
    const bindings = ["capa dura", "brochura"];
    const randomIndex = Math.floor(Math.random() * bindings.length);
    return bindings[randomIndex];
}

function randomizeAuthorInfo() {
    const authorInfoPhrases = [
      "O autor possui vasta experiência na área de TI.",
      "O autor é reconhecido por suas contribuições para a indústria de tecnologia.",
      "As obras anteriores do autor receberam aclamação crítica.",
      "O autor é especialista em desenvolvimento de software.",
      "As ideias do autor têm influenciado profissionais de TI em todo o mundo.",
      "O autor é palestrante frequente em conferências de tecnologia.",
      "O trabalho do autor é amplamente utilizado e referenciado na área de TI.",
      "O autor é conhecido por sua abordagem inovadora em soluções de TI.",
      "O autor é autoridade no assunto abordado neste livro.",
      "O autor possui uma sólida formação acadêmica na área de TI."
    ];
  
    const randomIndex = Math.floor(Math.random() * authorInfoPhrases.length);
    return authorInfoPhrases[randomIndex];
  }
  


function generateRandomBookSummary() {
    const topics = [
        'Desenvolvimento de software',
        'Arquitetura de sistemas',
        'Inteligência artificial',
        'Segurança cibernética',
        'Big Data',
        'Cloud computing',
        'Internet das Coisas',
        'Machine Learning',
        'Redes de computadores',
        'Programação web',
        'Banco de dados',
        'Engenharia de software'
    ];

    const adjectives = [
        'inovador',
        'avançado',
        'prático',
        'completo',
        'abrangente',
        'essencial',
        'eficiente',
        'flexível',
        'poderoso',
        'robusto',
        'moderno',
        'otimizado'
    ];

    const verbs = [
        'explorar',
        'aprender',
        'dominar',
        'aplicar',
        'implementar',
        'otimizar',
        'desenvolver',
        'aprofundar',
        'compreender',
        'solucionar',
        'aperfeiçoar',
        'transformar'
    ];

    const getRandomWord = (array) => array[Math.floor(Math.random() * array.length)];

    const topic = getRandomWord(topics);
    const adjective = getRandomWord(adjectives);
    const verb1 = getRandomWord(verbs);
    const verb2 = getRandomWord(verbs);

    const bookSummary = `Este livro ${adjective} sobre ${topic}, ajudando os leitores a ${verb1} os conceitos e ${verb2} suas habilidades na área de TI.`;

    return bookSummary;
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
