const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sideMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!sideMenu.contains(e.target)) {
    sideMenu.classList.remove("show");
  }
});