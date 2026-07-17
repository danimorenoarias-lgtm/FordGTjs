const boton = document.getElementById("btnArriba");

if (boton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 200) {
            boton.classList.add("mostrar");
        } else {
            boton.classList.remove("mostrar");
        }

    });

    boton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// =============================
// GARAJE FORD GT
// =============================

const modeloInput = document.getElementById("modeloInput");
const anioInput = document.getElementById("anioInput");
const agregarBtn = document.getElementById("agregarBtn");
const filtrarBtn = document.getElementById("filtrarBtn");
const listaModelos = document.getElementById("listaModelos");

if (modeloInput && anioInput && agregarBtn && filtrarBtn && listaModelos) {

    let modelos = JSON.parse(localStorage.getItem("modelosFord")) || [];

    // Permite agregar con Enter
    [modeloInput, anioInput].forEach(input => {

        input.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                e.preventDefault();
                agregarBtn.click();

            }

        });

    });

    // Mostrar modelos
    function mostrarModelos(lista) {

        listaModelos.innerHTML = "";

        lista.forEach((modelo, indice) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${modelo.nombre}</strong> (${modelo.anio})
                <button class="eliminarBtn" data-id="${indice}">
                    Eliminar
                </button>
            `;

            listaModelos.appendChild(li);

        });

    }

    // Guardar en LocalStorage
    function guardarModelos() {

        localStorage.setItem(
            "modelosFord",
            JSON.stringify(modelos)
        );

    }

    // Agregar modelo
    agregarBtn.addEventListener("click", () => {

        const nombre = modeloInput.value.trim();
        const anio = Number(anioInput.value);

        if (nombre === "" || !anio) {

            alert("Completa todos los campos");
            return;

        }

        const nuevoModelo = {

            nombre,
            anio

        };

        modelos.push(nuevoModelo);

        guardarModelos();

        mostrarModelos(modelos);

        modeloInput.value = "";
        anioInput.value = "";

    });

    // Eliminar modelo
    listaModelos.addEventListener("click", (e) => {

        if (e.target.classList.contains("eliminarBtn")) {

            const indice = e.target.dataset.id;

            modelos.splice(indice, 1);

            guardarModelos();

            mostrarModelos(modelos);

        }

    });

    // Filtrar modelos modernos
    filtrarBtn.addEventListener("click", () => {

        const modernos = modelos.filter(modelo => {

            return modelo.anio >= 2016;

        });

        mostrarModelos(modernos);

    });

    // Mostrar al cargar
    mostrarModelos(modelos);

}