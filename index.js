// ocultar el block y que aparezca cuando se le hace click al lapiz
const botonLapiz = document.querySelector(".editBtn");
const bloc = document.querySelector(".notasBloc");
const flechaGuardar = document.querySelector(".flechaBloc");
const divCard = document.querySelector(".card")
console.log(divCard)

botonLapiz.addEventListener("click", () => {
    clickLapiz();
})

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
    const inputBloc = document.querySelector(".textarea")
    localStorage.setItem("inputBloc", inputBloc.value);
    
    inputBloc.value = "";
    
    // creo el contenedor de las card
    const contenedorBloc = document.createElement("div");
    contenedorBloc.classList.add("cardConTexto")
    
    // obtengo los datos del localStorage
    let datos = localStorage.getItem("inputBloc");
    
    contenedorBloc.textContent = datos;
    
    const divHTML = document.querySelector(".cardEchas");
    divHTML.appendChild(contenedorBloc)
    
    if(divCard.style.display === "none") {
        divCard.style.display = "block"
    }
    
}