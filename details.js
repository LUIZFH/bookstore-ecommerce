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
                bookUrl.href = data.url;
            } else {
                console.error('Error fetching book details:', data.error);
            }
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
        });
}

fetchBookDetails(isbn);
