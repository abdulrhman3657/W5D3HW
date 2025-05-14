let apiUrl = "https://682199fa259dad2655afc100.mockapi.io"

let btn_post = document.getElementById("btn-post");

btn_post.addEventListener("click", async () => {

    let post_img = document.getElementById("post-img");
    let post_text = document.getElementById("post-text");
    
    try {

        console.log(localStorage.getItem("username"))

        // post create post
        const response = await fetch(`${apiUrl}/posts`, {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            },
            body: JSON.stringify({
            imageURL: post_img.value,
            text: post_text.value,
            comments: [],
            user: localStorage.getItem("username")
            }),
        });

        const data = await response.json();
        
        // console.log(data);
        
        alert("successfull posted");
        
        getPosts();
            
        } catch (error) {
            console.log(error)
        }

})

const getPosts = async () => {
    try {
        const res = await fetch(`${apiUrl}/posts`);
        const posts = await res.json();
        
        // console.log(posts);

        displayPosts(posts);
        
    } catch (error) {
        console.log(error)
    }   
}


getPosts();


const displayPosts = async (posts) => {
    let cards_container = document.getElementById("cards-container")

    posts.forEach(post => {

        let card = document.createElement("div");
        card.classList.add("card")
        card.classList.add("border-0")
        card.classList.add("p-2")
        card.classList.add("rounded-3")
        card.style.width = "18rem";
        card.style.height = "30%";

        let img = document.createElement("img");
        img.classList.add("card-img-top")
        img.classList.add("rounded-3")
        img.src = post.imageURL

        let cars_body = document.createElement("div");
        cars_body.classList.add("card-body")
        cars_body.classList.add("d-flex")
        cars_body.classList.add("flex-column")
        cars_body.classList.add("justify-content-between")

        let card_text = document.createElement("p");
        card_text.classList.add("card-text")
        card_text.classList.add("my-2")
        card_text.innerText = post.text

        let link = document.createElement("button");
        link.classList.add("btn")
        link.classList.add("btn-dark")
        link.innerText = "Read More"

        link.addEventListener("click", () => {

            localStorage.setItem("post_id", post.id)

            window.location.href = "./pages/card.html"

        })


        let comments = post.comments;

        // console.log(comments)

        cars_body.appendChild(card_text)
        cars_body.appendChild(link)
        card.appendChild(img)
        card.appendChild(cars_body)
        cards_container.appendChild(card)
        
    });

}