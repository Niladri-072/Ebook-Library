document.addEventListener('DOMContentLoaded', () => {
    const addBookBtn = document.getElementById('addBookBtn');
    const addBookModal = document.getElementById('addBookModal');
    const closeModal = document.getElementById('closeModal');
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('books');

    let editingIndex = null;  // To track which book is being edited

    // Display books from local storage
    function loadBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        bookList.innerHTML = '';
        books.forEach((book, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${book.title}</strong> by ${book.author} <br> Genre: ${book.genre} 
                <button onclick="editBook(${index})">Edit</button> 
                <button onclick="deleteBook(${index})">Delete</button>
            `;
            bookList.appendChild(li);
        });
    }

    // Open the add book modal
    addBookBtn.addEventListener('click', () => {
        addBookModal.style.display = 'block';
        editingIndex = null;  // Reset editing index when adding a new book
        bookForm.reset();  // Clear form fields
    });

    // Close the modal
    closeModal.addEventListener('click', () => {
        addBookModal.style.display = 'none';
    });

    // Add or update a book
    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const genre = document.getElementById('bookGenre').value;
        const file = document.getElementById('bookFile').files[0];

        const newBook = {
            title,
            author,
            genre,
            file: file ? file.name : '',
        };

        const books = JSON.parse(localStorage.getItem('books')) || [];

        if (editingIndex !== null) {
            // Update the existing book
            books[editingIndex] = newBook;
        } else {
            // Add a new book
            books.push(newBook);
        }

        localStorage.setItem('books', JSON.stringify(books));

        bookForm.reset();
        addBookModal.style.display = 'none';
        loadBooks();
    });

    // Delete a book
    window.deleteBook = (index) => {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        loadBooks();
    };

    // Edit a book
    window.editBook = (index) => {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const book = books[index];

        // Set form fields with book's current data
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookGenre').value = book.genre;

        // Show the modal
        addBookModal.style.display = 'block';

        // Set the editing index to know which book to update
        editingIndex = index;
    };

    loadBooks();
});
