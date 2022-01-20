function fetchBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(data => {
        const bookTitleList = document.getElementById("list");
        const bookPanel = document.getElementById("show-panel");
        const bookInfo = document.createElement("div");
        data.forEach(book => {
            const bookTitles = document.createElement("li");
            bookTitles.textContent = book.title;
            bookTitleList.appendChild(bookTitles);
        })
        bookTitleList.addEventListener("click", event => {
            data.forEach(book => {
                if (event.target.innerText === book.title) {
                    bookInfo.innerHTML = `
                    <img src=${book.img_url}>
                    <h2>${book.title}</h2>
                    <h4>${book.subtitle}</h4>
                    <h4>${book.author}</h4>
                    <p>${book.description}</p>
                    <button class="like" id="${book.id}">LIKE</button>
                    `
                    for (const user of book.users) {
                        const bookUser = document.createElement("li");
                        bookUser.textContent = user.username;
                        bookInfo.appendChild(bookUser);
                    }
                    bookPanel.appendChild(bookInfo);
                }
            })
        })
    })
}

function patchBooks(userObj, bookId) {
    return fetch(`http://localhost:3000/books/${bookId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

function likeBooks() {
    document.getElementById("show-panel").addEventListener("click", event => {
        let userObj = {
            users: {
                id: 11,
                name: "mrmcpat"
            }
        }
        const bookPanel = document.getElementById("show-panel");
        const updatedUser = document.createElement("li");
            if(event.target.className === "like") {
                updatedUser.textContent = `${userObj.users.name}`;
                bookPanel.appendChild(updatedUser);
            }
            // patchBooks(userObj, event.target.id);
    }, {once: true})
}

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
    likeBooks();
});
