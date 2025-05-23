let apiUrl = "https://682199fa259dad2655afc100.mockapi.io"
let post_id = localStorage.getItem("post_id")


const getPost = async () => {
    try {
        const res = await fetch(`${apiUrl}/posts/${post_id}`);
        const post = await res.json();

        let url = post.imageURL
        let post_txt = post.text 
        let comments = post.comments;  

        let img = document.getElementById("img1");
        img.src = url;

        let card_text = document.getElementById("p1");
        card_text.innerText = post_txt;

        let comments_list = document.getElementById("comments-list");

        comments.forEach(Comment => {

            let card_comment = document.createElement("p");

            card_comment.classList.add("p-3");
            card_comment.classList.add("my-3");
            card_comment.classList.add("border");
            card_comment.classList.add("rounded");


            let item_div = document.createElement("div");
            item_div.classList.add("d-flex");
            item_div.classList.add("align-items-center");
            item_div.classList.add("justify-content-between");


            let p1 = document.createElement("p");
            p1.classList.add("fw-bold");
            p1.classList.add("rounded-3");
            p1.classList.add("p-3");
            p1.classList.add("bg-light");
            p1.classList.add("text-dark");
            
            p1.innerText = Comment.username

            // console.log(post)

            let p2 = document.createElement("p");
            p2.classList.add("px-3");
            p2.innerText = Comment.comment;

            let del_btn = document.createElement("button")
            del_btn.classList.add("btn");
            del_btn.classList.add("btn-danger");
            del_btn.innerText = "Delete"

            del_btn.addEventListener("click", async () => {
                if (Comment.username != localStorage.getItem("username")){
                    alert("you can only delete your comments")
                    return
                }

                comments = comments.filter((item) => {
                    console.log(item.username)
                    return item.username != localStorage.getItem("username")
                })

                // console.log(comments)

            const response = await fetch(`${apiUrl}/posts/${post_id}`, {
                method: "PUT",
                headers: {
                "Content-type": "application/json",
                },
                body: JSON.stringify({
                imageURL: url,
                text: post_txt,
                comments: comments,
                }),
            });

            window.location.reload();

            })

            item_div.appendChild(p1);
            item_div.appendChild(p2);
            item_div.appendChild(del_btn)
            card_comment.appendChild(item_div);

            comments_list.appendChild(card_comment)
        });

        let comment_btn = document.getElementById("comment-btn")

        comment_btn.addEventListener("click", async () => {

        if(!localStorage.getItem("username")){
            alert("you must log in to comment")
            return
        }

        let comment_input = document.getElementById("comment-input");

        comments.push({username: localStorage.getItem("username"), comment: comment_input.value})

        const response = await fetch(`${apiUrl}/posts/${post_id}`, {
            method: "PUT",
            headers: {
            "Content-type": "application/json",
            },
            body: JSON.stringify({
            imageURL: url,
            text: post_txt,
            comments: comments,
            }),
        });

        // window.location.reload();


        })
        
    } catch (error) {
        console.log(error)
    }   
}

getPost();







