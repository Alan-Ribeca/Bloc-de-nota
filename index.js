import {} from "./js/posicion.js"
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

    // Restablecer los estilos de la letra a los valores predeterminados
    inputBloc.style.fontWeight = "normal";
    inputBloc.style.textDecoration = "none";
    inputBloc.style.fontSize = "medium";
    inputBloc.style.fontFamily = "Arial";

    // Restablecer el valor del selector de tamaño a "normal" y el de letra a "arial"
    selecTamaño.value = "normal";
    selecLetra.value = "Arial"

    // Restablecer idActual a null
    idActual = null;
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

        // Agregar estilos a la tarjeta existente
        tarjetaExistente.fontWeight = inputBloc.style.fontWeight;
        tarjetaExistente.textDecoration = inputBloc.style.textDecoration;
        tarjetaExistente.fontSize = inputBloc.style.fontSize;
        tarjetaExistente.fontFamily = inputBloc.style.fontFamily;
        tarjetaExistente.tamaño = selecTamaño.value;
        tarjetaExistente.tipo = selecLetra.value;
    } else {
        // Agrega los datos y estilos de la nueva tarjeta al array
        tarjetas.push({
            id: ++cardId,
            h1: h1Card.value,
            p: inputBloc.value,
            fontWeight: inputBloc.style.fontWeight,
            textDecoration: inputBloc.style.textDecoration,
            fontSize: inputBloc.style.fontSize,
            fontFamily: inputBloc.style.fontFamily,
            tamaño: selecTamaño.value,
            tipo: selecLetra.value,
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
    selecTamaño.value = tarjetaSeleccionada.tamaño
    selecLetra.value = tarjetaSeleccionada.tipo

    // ocultar las notas y mostrar el editor
    const contenedorBloc = document.getElementById("card" + id);
    contenedorBloc.style.display = "none";
    bloc.style.display = "block";
    botonLapiz.style.display = "none";
    divCard.style.display = "none";

    // Establecer idActual al id de la tarjeta que se está editando
    idActual = id

    const tarjetaExistente = tarjetas.find(tarjeta => tarjeta.id === idActual);
    if (tarjetaExistente) {
        // Aplica los estilos guardados a inputBloc
        inputBloc.style.fontWeight = tarjetaExistente.fontWeight;
        inputBloc.style.textDecoration = tarjetaExistente.textDecoration;
        inputBloc.style.fontSize = tarjetaExistente.fontSize;
        inputBloc.style.fontFamily = tarjetaExistente.fontFamily;
    }
}

function actualizarTarjeta(id) {
    const tarjetaExistente = tarjetas.find(tarjeta => tarjeta.id === id);

    if (tarjetaExistente) {
        // Actualizar contenido de la tarjeta existente
        tarjetaExistente.h1 = h1Card.value;
        tarjetaExistente.p = inputBloc.value;
        tarjetaExistente.fontWeight = inputBloc.style.fontWeight;
        tarjetaExistente.textDecoration = inputBloc.style.textDecoration;
        tarjetaExistente.fontSize = inputBloc.style.fontSize;
        tarjetaExistente.fontFamily = inputBloc.style.fontFamily;
    } else {
        // Agrega los datos de la nueva tarjeta al array
        tarjetas.push({
            id: ++cardId,
            h1: h1Card.value,
            p: inputBloc.value,
            fontWeight: inputBloc.style.fontWeight,
            textDecoration: inputBloc.style.textDecoration,
            fontSize: inputBloc.style.fontSize,
            fontFamily: inputBloc.style.fontFamily,
        });
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
const inputBloc = document.querySelector(".textarea");
const selecTamaño = document.querySelector(".select");
const selecLetra = document.querySelector(".selectLetra");
const letraNegra = document.querySelector(".negrita");
const letraSubrayar = document.querySelector(".subrayar");
const letraTachado = document.querySelector(".tachado");
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

selecTamaño.addEventListener("change", () => {
    let tamaño = selecTamaño.value;

    switch (tamaño) {
        case "pequeño":
            inputBloc.style.fontSize = "12px";
            break;
        case "normal":
            inputBloc.style.fontSize = "16px";
            break;
        case "grande":
            inputBloc.style.fontSize = "20px";
            break;
        case "enorme":
            inputBloc.style.fontSize = "28px";
            break;
        default:
            inputBloc.style.fontSize = "16px";
    }
});

selecLetra.addEventListener("change", () => {
    let fuente = selecLetra.value;

    switch (fuente) {
        case "Arial":
            inputBloc.style.fontFamily = "Arial";
            break;
        case "Verdana":
            inputBloc.style.fontFamily = "Verdana";
            break;
        case "Courier New":
            inputBloc.style.fontFamily = "Courier New";
            break;
        case "Georgia":
            inputBloc.style.fontFamily = "Georgia";
            break;
        case "Times New Roman":
            inputBloc.style.fontFamily = 'Times New Roman';
            break;
        default:
            inputBloc.style.fontFamily = "Arial";
    }
});


// BUSCADOR
const buscador = document.querySelector(".input");
const main = document.querySelector(".bloc");

buscador.addEventListener("keyup", (e) => {
    const busqueda = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".cardConTexto");
    let resultadoBusqueda = false;

    if (e.key === "Escape"){
        e.target.value = "";
        for (let card of cards) {
            card.style.display = "";
        }
    } else {
        for (let card of cards) {
            const h1 = card.querySelector(".h1Input").textContent.toLowerCase();
            if (h1.includes(busqueda)) {
                card.style.display = "";
                resultadoBusqueda = true;
            } else {
                card.style.display = "none";
            }
        }
    }

    if(!resultadoBusqueda && busqueda !== "" && e.key !== "Escape") {
        if (!document.querySelector(".mensaje-busqueda")) {
            const TituloBusqueda = document.createElement("p");
            TituloBusqueda.textContent = "Sin coincidencias. Revisa tu búsqueda.";
            TituloBusqueda.classList.add("mensaje-busqueda");
    
            main.appendChild(TituloBusqueda);
        }
    } else {
        const mensaje = document.querySelector(".mensaje-busqueda");
        if (mensaje) {
            mensaje.remove();
        }
    }
});

buscador.addEventListener("blur", function() {
    this.value = ""; 
});
