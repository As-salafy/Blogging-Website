document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
});

let selectedPostIndex = null;
let editIndex = null;

function addOrUpdatePost() {
    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Title and content cannot be empty!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    if (editIndex !== null) {
        posts[editIndex].title = title;
        posts[editIndex].content = content;
        editIndex = null;
        document.getElementById("cancelEdit").classList.add("hidden");
    } else {
        posts.push({ title: title, content: content, comments: [], likes: 0, dislikes: 0 });
    }

    localStorage.setItem("blogPosts", JSON.stringify(posts));
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    loadPosts();
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    let postList = document.getElementById("postList");

    postList.innerHTML = "";

    posts.forEach((post, index) => {
        let postElement = document.createElement("div");
        postElement.classList = "p-4 border rounded mb-2 bg-gray-50";
        postElement.innerHTML = `
            <h3 class="text-lg font-bold">${post.title}</h3>
            <p>${post.content.substring(0, 50)}...</p>
            <button onclick="viewPost(${index})" class="bg-blue-500 text-white px-2 py-1 rounded mt-2">Read More</button>
            <button onclick="editPost(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded mt-2">Edit</button>
            <button onclick="deletePost(${index})" class="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
        `;
        postList.appendChild(postElement);
    });
}

function editPost(index) {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    document.getElementById("postTitle").value = posts[index].title;
    document.getElementById("postContent").value = posts[index].content;
    editIndex = index;
    document.getElementById("cancelEdit").classList.remove("hidden");
}

function cancelEdit() {
    editIndex = null;
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    document.getElementById("cancelEdit").classList.add("hidden");
}

function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    loadPosts();
}

function viewPost(index) {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    let post = posts[index];

    selectedPostIndex = index;

    document.getElementById("viewTitle").innerText = post.title;
    document.getElementById("viewContent").innerText = post.content;
    document.getElementById("likeCount").innerText = post.likes;
    document.getElementById("dislikeCount").innerText = post.dislikes;

    document.getElementById("createPost").classList.add("hidden");
    document.getElementById("blogPosts").classList.add("hidden");
    document.getElementById("postView").classList.remove("hidden");

    loadComments();
}

function goBack() {
    document.getElementById("createPost").classList.remove("hidden");
    document.getElementById("blogPosts").classList.remove("hidden");
    document.getElementById("postView").classList.add("hidden");
}

function addComment() {
    let commentText = document.getElementById("commentInput").value;
    if (commentText.trim() === "") {
        alert("Comment cannot be empty!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts[selectedPostIndex].comments.push(commentText);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    document.getElementById("commentInput").value = "";
    loadComments();
}

function loadComments() {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    let comments = posts[selectedPostIndex].comments;
    let commentSection = document.getElementById("commentSection");
    commentSection.innerHTML = "";
    comments.forEach(comment => {
        let commentElement = document.createElement("div");
        commentElement.classList = "p-2 border rounded mt-2 bg-gray-200";
        commentElement.innerText = comment;
        commentSection.appendChild(commentElement);
    });
}

function likePost() {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts[selectedPostIndex].likes++;
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    document.getElementById("likeCount").innerText = posts[selectedPostIndex].likes;
}

function dislikePost() {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts[selectedPostIndex].dislikes++;
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    document.getElementById("dislikeCount").innerText = posts[selectedPostIndex].dislikes;
}
