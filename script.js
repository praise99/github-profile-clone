const Form = document.getElementById("form");
Form.addEventListener("submit", (el) => {
  el.preventDefault();
  let Search = document.getElementById("search").value;
  if (Search !== "") {
    let userName = Search.split(" ").join("");
    url = "/pages/profile/Profile.html?name=" + encodeURIComponent(userName);
    window.location.href = url;
  }
});
