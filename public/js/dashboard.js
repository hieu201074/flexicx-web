const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.onclick = () => {
  sideMenu.classList.toggle("show");
};

document.getElementById("inviteBot").onclick = async () => {
  const res = await fetch("/api/invite");
  const data = await res.json();
  window.open(data.invite, "_blank");
};