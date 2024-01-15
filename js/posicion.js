export {}

const linea = document.querySelector(".palito");
const card = document.querySelector(".cardEchas");

linea.addEventListener("click", (e) => {
    card.classList.toggle("grid");
});
