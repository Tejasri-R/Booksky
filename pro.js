var overlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addbutton = document.getElementById("add-popup");

addbutton.addEventListener("click", function () {
  overlay.style.display = "block";
  popupbox.style.display = "block";
});

var cancelbut = document.getElementById("cancel-popup");
cancelbut.addEventListener("click", function (event) {
  event.preventDefault();
  overlay.style.display = "none";
  popupbox.style.display = "none";
});

var container = document.querySelector(".container");
var addbook = document.getElementById("add-book");
var booktitle = document.getElementById("book-title");
var bookauthor = document.getElementById("book-author");
var description = document.getElementById("description");

document.addEventListener("DOMContentLoaded", function () {
  loadBooksFromLocalStorage();
});

addbook.addEventListener("click", function (event) {
  event.preventDefault();

  var book = {
    title: booktitle.value,
    author: bookauthor.value,
    description: description.value,
  };

  addBookToUI(book);

  saveBookToLocalStorage(book);

  overlay.style.display = "none";
  popupbox.style.display = "none";
});

function addBookToUI(book) {
  var div = document.createElement("div");
  div.setAttribute("class", "book-container");
  div.innerHTML = `<h2>${book.title}</h2>
            <h3>${book.author}</h3><br>
            <p>${book.description}</p>
            <button onclick="dltbook(event)">Delete</button>
            </div>`;
  container.append(div);
}

function dltbook(event) {
  var bookContainer = event.target.parentElement;
  var title = bookContainer.querySelector("h2").innerText;

  bookContainer.remove();

  removeBookFromLocalStorage(title);
}

function saveBookToLocalStorage(book) {
  var books = JSON.parse(localStorage.getItem("books")) || [];

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
  var books = JSON.parse(localStorage.getItem("books")) || [];

  books.forEach(function (book) {
    addBookToUI(book);
  });
}

function removeBookFromLocalStorage(title) {
  var books = JSON.parse(localStorage.getItem("books")) || [];

  books = books.filter(function (book) {
    return book.title !== title;
  });

  localStorage.setItem("books", JSON.stringify(books));
}
