document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".team-card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 200); // mỗi card cách nhau 200ms
  });
});