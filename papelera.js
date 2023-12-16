let localPapelera = JSON.parse(localStorage.getItem("localPapelera")) || [];

function cargarLocalPapelera() {
    localPapelera = JSON.parse(localStorage.getItem("localPapelera")) || [];
}

window.onload = function () {
    cargarLocalPapelera();
    mostrarLocalPapelera();
};

function mostrarLocalPapelera() {
    const papeleraDiv = document.querySelector(".papeleraEchas");
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
        papeleraDiv.appendChild(contenedorBloc);
    }
}

function editarCard(id) {
    console.log(`Click en la tarjeta con ID: ${id}`);
}

function botonEliminar(id) {
    const index = localPapelera.findIndex(tarjeta => tarjeta.id === id);

    if (index !== -1) {
        localPapelera.splice(index, 1);
        localStorage.setItem("localPapelera", JSON.stringify(localPapelera));

        mostrarLocalPapelera();
    }
}