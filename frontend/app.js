async function createPost() {
  const text = document.getElementById("postText").value;
  if (!text) return alert("Write something!");

  const res = await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  alert("Post created!");
  loadPosts();
}

async function loadPosts() {
  const res = await fetch("http://localhost:5000/api/posts");
  const posts = await res.json();
  const postDiv = document.getElementById("posts");
  postDiv.innerHTML = "";
  posts.forEach(p => {
    postDiv.innerHTML += `<div class="post"><p>${p.text}</p><small>by ${p.user}</small></div>`;
  });
}

loadPosts();
