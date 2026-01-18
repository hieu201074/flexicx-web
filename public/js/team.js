document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".team-card").forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("show");
    }, i * 200);
  });
});