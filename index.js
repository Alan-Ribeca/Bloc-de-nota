// variables
const botonLapiz = document.querySelector(".editBtn");
const bloc = document.querySelector(".notasBloc");
const flechaGuardar = document.querySelector(".flechaBloc");
const divCard = document.querySelector(".card");
let tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];
let cardId = tarjetas.length;
let papelera = [];

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
        btnDelete.classList.add("deleteCard")
        btnDelete.addEventListener("click", () => {
            botonEliminar(tarjeta.id)
        })

        contenedorBloc.addEventListener("click", (event) => {
            if (event.target !== btnDelete) {
                editarCard()
            }
        });

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


function editarCard() {
    console.log("hola")
}

function botonEliminar(id) {
    // eliminar la card
    const tarjetaEliminada = tarjetas.find(tarjeta => tarjeta.id === id);
    tarjetas = tarjetas.filter(tarjeta => tarjeta.id !== id);

    // Guardar la info
    localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

    // Verificar si la tarjeta ya está en localStorage "localPapelera"
    const localPapelera = JSON.parse(localStorage.getItem("localPapelera")) || [];
    const existeEnLocalPapelera = localPapelera.some(tarjeta => tarjeta.id === id);

    // Si no esta la agrego
    if (!existeEnLocalPapelera) {
        localPapelera.push(tarjetaEliminada);

        // Guardar el array de localStorage "localPapelera" actualizado
        localStorage.setItem("localPapelera", JSON.stringify(localPapelera));
    }

    generarTarjetas();
}

function mostrarPapelera() {
    const papeleraDiv = document.querySelector(".papeleraEchas");
    papeleraDiv.innerHTML = "";

    for (let tarjeta of papelera) {
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

        // Agregar evento al contenedor para redirigir a "./pages/papelera.html"
        contenedorBloc.addEventListener("click", () => {
            window.location.href = "./pages/papelera.html";
        });

        papeleraDiv.appendChild(contenedorBloc);
    }
}

