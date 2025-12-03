let homeBtn = document.getElementById("homeBtn");
    homeBtn.onclick = function(){
        window.location.href = "index.html";
    }

    let bookData = [
        {id:1, title:"Learn JS", author:"Alice"},
        {id:2, title:"Learn HTML", author:"Bob"},
        {id:3, title:"Learn CSS", author:"Charlie"},
        {id:4, title:"Learn DOM", author:"David"},
    ]
    displayData(bookData);

    function displayData(arr){
        let container = document.getElementById("container");
        arr.map((el, index) =>{
            let card = document.createElement("div");
            let titleTag = document.createElement("h3");
            let authorTag = document.createElement("h4");

            titleTag.textContent = `Title : ${el.title}`;
            authorTag.textContent = `Author : ${el.author}`;

            card.append(titleTag, authorTag);
            container.append(card);
        })
    }