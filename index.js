// variables
const botonLapiz = document.querySelector(".editBtn");
const bloc = document.querySelector(".notasBloc");
const flechaGuardar = document.querySelector(".flechaBloc");
const divCard = document.querySelector(".card");
let tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];
let cardId = tarjetas.length;
let papelera = [];
let idActual = null;


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
                editarCard(tarjeta.id)
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

    // Buscar la tarjeta existente en el array
    const tarjetaExistente = tarjetas.find(tarjeta => tarjeta.id === idActual);

    if (tarjetaExistente) {
        // Actualizar contenido de la tarjeta existente
        tarjetaExistente.h1 = h1Card.value;
        tarjetaExistente.p = inputBloc.value;
    } else {
        // Agrega los datos de la nueva tarjeta al array
        tarjetas.push({
            id: ++cardId,
            h1: h1Card.value,
            p: inputBloc.value
        });
    }
    // Guarda el array actualizado 
    localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

    // resetear los input
    inputBloc.value = "";
    h1Card.value = "";

    // Recrea todas las tarjetas
    generarTarjetas();

    if (divCard.style.display === "none") {
        divCard.style.display = "block"
    }

    // Restablecer idActual a null después de guardar
    idActual = null;
}

function editarCard(id) {
    const tarjetaSeleccionada = tarjetas.find(tarjeta => tarjeta.id === id);

    // Asignar los valores de la tarjeta seleccionada a los elementos correspondientes
    const h1Bloc = document.querySelector(".titulo-Bloc");
    const inputBloc = document.querySelector(".textarea");

    h1Bloc.value = tarjetaSeleccionada.h1;
    inputBloc.value = tarjetaSeleccionada.p;

    // ocultar las notas y mostrar el editor
    const contenedorBloc = document.getElementById("card" + id);
    contenedorBloc.style.display = "none";

    bloc.style.display = "block";
    botonLapiz.style.display = "none";
    divCard.style.display = "none";

    // Establecer idActual al id de la tarjeta que se está editando
    idActual = id;
}


function actualizarTarjeta(id, nuevoH1, nuevoP) {
    const tarjetaExistente = tarjetas.find(tarjeta => tarjeta.id === id);

    if (tarjetaExistente) {
        // Actualizar contenido de la tarjeta existente
        tarjetaExistente.h1 = nuevoH1;
        tarjetaExistente.p = nuevoP;

        // Guardar el array actualizado en localStorage
        localStorage.setItem("tarjetas", JSON.stringify(tarjetas));
    }
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


// TODO LO QUE ES DENTRO DEL BLOC (NEGRITA, TAMAÑO Y ESAS COSAS)
const basuraBloc = document.querySelector(".Eliminar");
const letraNegra = document.querySelector(".negrita");
const letraSubrayar = document.querySelector(".subrayar");
const letraTachado = document.querySelector(".tachado");
const inputBloc = document.querySelector(".textarea");
let enBold = false;
let enSubrayado = false;
let enTachado = false;

letraNegra.addEventListener("click", () => {
    if (enBold) {
        inputBloc.style.fontWeight = 'normal';
        enBold = false;
    } else {
        inputBloc.style.fontWeight = 'bold';
        enBold = true;
    }
})


// letraSubrayar.addEventListener("click", () => {
//     if(enSubrayado) {
//         inputBloc.style.textDecoration = "none";
//         enSubrayado = false
//     } else {
//         inputBloc.style.textDecoration = "underline";
//         enSubrayado = true
//     }
// })

// letraTachado.addEventListener("click", () => {
//     if(enTachado) {
//         inputBloc.style.textDecoration = "none";
//         enTachado = false
//     } else {
//         inputBloc.style.textDecoration = "line-through";
//         enTachado = true;
//     }
// })
letraSubrayar.addEventListener("click", () => {
    enSubrayado = !enSubrayado;
    actualizarEstilo();
});

letraTachado.addEventListener("click", () => {
    enTachado = !enTachado;
    actualizarEstilo();
});

function actualizarEstilo() {
    let estilo = '';
    if (enSubrayado) {
        estilo += 'underline ';
    }
    if (enTachado) {
        estilo += 'line-through ';
    }
    inputBloc.style.textDecoration = estilo;
}