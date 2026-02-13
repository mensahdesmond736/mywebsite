let params = new URLSearchParams(window.location.search);
let username = params.get("username");
document.getElementById("usern").textContent = username;
