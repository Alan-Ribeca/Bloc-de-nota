// variables
const botonLapiz = document.querySelector(".editBtn");
const bloc = document.querySelector(".notasBloc");
const flechaGuardar = document.querySelector(".flechaBloc");
const divCard = document.querySelector(".card")

// addEventListener
botonLapiz.addEventListener("click", () => {
    clickLapiz();
})

// funciones

bloc.style.display = "none";
botonLapiz.style.display = "block"
divCard.style.display = "block"
function clickLapiz(){
    if(bloc.style.display === "none") {
        bloc.style.display = "block"
    } else {
        bloc.style.display = "none"
    }

    if(botonLapiz.style.display === "block") {
        botonLapiz.style.display = "none"
    } else {
        botonLapiz.style.display = "block"
    }

    if(divCard.style.display === "block") {
        divCard.style.display = "none"
    } 
}

flechaGuardar.addEventListener("click", () => {
    clickFlecha();
})

function clickFlecha() {
    // ocultar otra vez el bloc
    bloc.style.display = "none"
    botonLapiz.style.display = "block"

    // guardar los datos del input en localStorage 
    const inputBloc = document.querySelector(".textarea");
    localStorage.setItem("inputBloc", inputBloc.value);
    const h1Card = document.querySelector(".titulo-Bloc");
    localStorage.setItem("h1Card", h1Card.value);

    // resetear los input
    inputBloc.value = "";
    h1Card.value = "";
    
    // creo el contenedor de las card
    const contenedorBloc = document.createElement("div");
    contenedorBloc.classList.add("cardConTexto")
    
    // obtengo los datos del localStorage
    let datos = localStorage.getItem("inputBloc");
    let datosH1 = localStorage.getItem("h1Card");
    
    // creo el h1, lo completo con los datos y lo agrego
    const h1Input = document.createElement("H1");
    h1Input.classList.add("h1Input");
    h1Input.textContent = datosH1;
    contenedorBloc.appendChild(h1Input)

    // creo un elemento P para el texto, lo completo con los datos y lo agrego
    const pInput = document.createElement("P");
    pInput.classList.add("pInput");
    pInput.textContent = datos;
    contenedorBloc.appendChild(pInput);

    // agrego los dos input al html
    const divHTML = document.querySelector(".cardEchas");
    divHTML.appendChild(contenedorBloc);

    if(divCard.style.display === "none") {
        divCard.style.display = "block"
    }
}