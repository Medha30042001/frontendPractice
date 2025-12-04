
console.log("JS loaded");

//go to the index page
document.getElementById("indexBtn").addEventListener("click", ()=>{
    console.log("Button Clicked");
    window.location.href = "../html/index.html";
});

let books = [];

const IMAGE_URL = "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg";

document.getElementById("addBookBtn").addEventListener("click", ()=>{
    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let category = document.getElementById("category").value;

    if(!title || !author || !category){
        alert("Please fill all the fields!");
        return;
    }

    let book = {
        title,
        author,
        category,
        imageUrl : IMAGE_URL
    };

    //same as this
    /*
    let book = {
        title: title,
        author: author,
        category: category,
        imageUrl: IMAGE_URL
    };
    */

    books.push(book);
    renderBooks(books);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";

});

function renderBooks(bookList){
    let container = document.getElementById("container");
    container.innerHTML = "";
    
    bookList.forEach((book, index)=>{
        let card = document.createElement("div");
        card.className = "card";

        let img = document.createElement("img");
        img.src = book.imageUrl;

        let title = document.createElement("h3");
        title.textContent = book.title;

        let author = document.createElement("p");
        author.textContent = book.author;

        let category = document.createElement("p");
        category.textContent = book.category;

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", ()=>{
            deleteBook(index);
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(category);
        card.appendChild(deleteBtn);

        container.appendChild(card);
    });

}

    function deleteBook(index){
        books.splice(index, 1);
        renderBooks(books);
    }

    document.getElementById("sortMenu").addEventListener("change", ()=>{
        let sortMenu = document.getElementById("sortMenu").value;
        if(sortMenu === "A to Z") atoz();
        else if (sortMenu === "Z to A") ztoa();
    });

    function atoz(){
        books.sort((a, b)=> a.title.localeCompare(b.title));
        renderBooks(books);
    }

    function ztoa(){
        books.sort((a, b) => b.title.localeCompare(a.title));
        renderBooks(books);
    }

    document.getElementById("filterMenu").addEventListener("change", ()=>{
        let filterMenu = document.getElementById("filterMenu").value;

        if(filterMenu === "All"){
            renderBooks(books);
            return;
        }

        let filtered = books.filter(book => book.category === filterMenu);
        renderBooks(filtered);
    });