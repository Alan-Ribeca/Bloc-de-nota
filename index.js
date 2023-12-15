// variables
const botonLapiz = document.querySelector(".editBtn");
const bloc = document.querySelector(".notasBloc");
const flechaGuardar = document.querySelector(".flechaBloc");
const divCard = document.querySelector(".card")
let tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];
let cardId = tarjetas.length;


// addEventListener

window.onload = function () {
    generarTarjetas();
}

botonLapiz.addEventListener("click", () => {
    clickLapiz();
})

flechaGuardar.addEventListener("click", () => {
    clickFlecha();
})

// funciones
function generarTarjetas() {
    const divHTML = document.querySelector(".cardEchas");
    divHTML.innerHTML = ""; 
    for (let tarjeta of tarjetas) {
        const contenedorBloc = document.createElement("div");
        contenedorBloc.classList.add("cardConTexto");
        contenedorBloc.id = "card" + tarjeta.id;

        const h1Input = document.createElement("H1");
        h1Input.classList.add("h1Input");
        h1Input.textContent = tarjeta.h1;
        contenedorBloc.appendChild(h1Input);

        const pInput = document.createElement("P");
        pInput.classList.add("pInput");
        pInput.textContent = tarjeta.p;
        contenedorBloc.appendChild(pInput);

        // agregar bnt de eliminar en card
        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Eliminar";
        contenedorBloc.appendChild(btnDelete);

        divHTML.appendChild(contenedorBloc);
    }
}

bloc.style.display = "none";
botonLapiz.style.display = "block"
divCard.style.display = "block"

function clickLapiz() {
    if (bloc.style.display === "none") {
        bloc.style.display = "block"
    } else {
        bloc.style.display = "none"
    }

    if (botonLapiz.style.display === "block") {
        botonLapiz.style.display = "none"
    } else {
        botonLapiz.style.display = "block"
    }

    if (divCard.style.display === "block") {
        divCard.style.display = "none"
    }
}

function clickFlecha() {
    // ocultar otra vez el bloc
    bloc.style.display = "none"
    botonLapiz.style.display = "block"

    // guardar los datos del input en localStorage 
    const inputBloc = document.querySelector(".textarea");
    const h1Card = document.querySelector(".titulo-Bloc");

    // Agrega los datos de la nueva tarjeta al array
    tarjetas.push({
        id: ++cardId,
        h1: h1Card.value,
        p: inputBloc.value
    });

    // Guarda el array actualizado en localStorage
    localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

    // resetear los input
    inputBloc.value = "";
    h1Card.value = "";

    // Recrea todas las tarjetas
    generarTarjetas();

    if (divCard.style.display === "none") {
        divCard.style.display = "block"
    }
}
