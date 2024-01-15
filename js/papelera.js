const papeleraDiv = document.querySelector(".papeleraEchas");
let localPapelera = JSON.parse(localStorage.getItem("localPapelera")) || [];
let tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];

function cargarLocalPapelera() {
    localPapelera = JSON.parse(localStorage.getItem("localPapelera")) || [];
}

window.onload = function () {
    cargarLocalPapelera();
    mostrarLocalPapelera();
};

function mostrarLocalPapelera() {
    papeleraDiv.innerHTML = "";

    for (let tarjeta of localPapelera) {
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

        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Eliminar";
        btnDelete.classList.add("deleteCard")
        btnDelete.addEventListener("click", () => {
            botonEliminar(tarjeta.id)
        })

        const btnRestaurar = document.createElement("button");
        btnRestaurar.innerHTML = "Restaurar";
        btnRestaurar.classList.add("restaurar")
        btnRestaurar.addEventListener("click", () => {
            restaurarFuncion(tarjeta.id) 
        })

        contenedorBloc.appendChild(btnDelete);
        contenedorBloc.appendChild(btnRestaurar)
        papeleraDiv.appendChild(contenedorBloc);
    }

    if (localPapelera.length === 0) {
        mostrarMensaje(`Papelera vacia`)
    }
}

function botonEliminar(id) {
    const index = localPapelera.findIndex(tarjeta => tarjeta.id === id);

    if (index !== -1) {
        localPapelera.splice(index, 1);
        localStorage.setItem("localPapelera", JSON.stringify(localPapelera));

        mostrarLocalPapelera();
    }
}

function restaurarFuncion(id) { 
    const index = localPapelera.findIndex(tarjeta => tarjeta.id === id);

    if (index !== -1) {
        const tarjeta = localPapelera.splice(index, 1)[0];
        tarjetas.push(tarjeta);

        localStorage.setItem("localPapelera", JSON.stringify(localPapelera));
        localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

    }
    mostrarLocalPapelera()
}

function mostrarMensaje(mensaje) {
    const mensajeVacio = document.createElement("h1");
    mensajeVacio.classList.add("msjPapelera");
    mensajeVacio.textContent = mensaje

    papeleraDiv.appendChild(mensajeVacio)
}

const buscador = document.querySelector(".input");
const main = document.querySelector(".bloc");
buscador.addEventListener("keyup", (e) => {
    const busqueda = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".cardConTexto");
    let resultadoBusqueda = false;

    if (e.key === "Escape") {
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

    if (!resultadoBusqueda && busqueda !== "" && e.key !== "Escape") {
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

