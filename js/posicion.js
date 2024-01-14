export {}

const linea = document.querySelector(".container");
const card = document.querySelector(".cardEchas");

linea.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    card.classList.toggle("grid")
});
