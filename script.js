const cardsContainer = document.querySelector('.cards-container');

fetch('https://api.itbook.store/1.0/search/archi')
    .then(response => response.json())
    .then(data => {
        const books = data.books;

        books.forEach(book => {
            const card = createCard(book);
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

searchInput.addEventListener('keydown', function(event) {
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
        cardsContainer.appendChild(card);
    });
}

