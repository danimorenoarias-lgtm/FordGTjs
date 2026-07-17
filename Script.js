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
const mostrarTodoBtn = document.getElementById("mostrarTodoBtn");
const buscarBtn = document.getElementById("buscarBtn");
const buscarInput = document.getElementById("buscarInput");
const listaModelos = document.getElementById("listaModelos");

if (modeloInput && anioInput && agregarBtn && filtrarBtn && listaModelos) {

let modelos = [];

fetch("data/modelos.json")

.then(response => response.json())

.then(data => {

    const guardados = JSON.parse(localStorage.getItem("modelosFord"));

    modelos = guardados || data;

    mostrarModelos(modelos);

});

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

        if(lista.length===0){

listaModelos.innerHTML=`

<li class="sinResultados">

No se encontraron modelos.

</li>

`;

return;

}

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

        const anioActual=new Date().getFullYear();

if(anio<1964 || anio>anioActual){

Swal.fire({

icon:"error",

title:"Año inválido",

text:"Ingresa un año entre 1964 y el actual."

});

return;

}

        if (nombre === "" || !anio) {

            Swal.fire({

    icon: "warning",

    title: "Campos incompletos",

    text: "Debes completar todos los datos."

});
            return;

        }

        const nuevoModelo = {

            nombre,
            anio

        };

        modelos.push(nuevoModelo);

        guardarModelos();

        Swal.fire({

    icon:"success",

    title:"Modelo agregado",

    timer:1500,

    showConfirmButton:false

});

        mostrarModelos(modelos);

        modeloInput.value = "";
        anioInput.value = "";

    });

    // Eliminar modelo
    listaModelos.addEventListener("click", (e) => {

        if (e.target.classList.contains("eliminarBtn")) {

            const indice = e.target.dataset.id;

            Swal.fire({

title:"¿Eliminar modelo?",

text:"Esta acción no se puede deshacer.",

icon:"warning",

showCancelButton:true,

confirmButtonText:"Eliminar",

cancelButtonText:"Cancelar"

}).then((result)=>{

if(result.isConfirmed){

modelos.splice(indice,1);

guardarModelos();

mostrarModelos(modelos);

Swal.fire({

icon:"success",

title:"Modelo eliminado",

timer:1500,

showConfirmButton:false

});

}

});

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

buscarBtn.addEventListener("click",()=>{

const texto = buscarInput.value.toLowerCase();

const encontrados = modelos.filter(modelo=>{

return modelo.nombre.toLowerCase().includes(texto);

});

mostrarModelos(encontrados);

});

mostrarTodoBtn.addEventListener("click",()=>{

    mostrarModelos(modelos);

});

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

}

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }

});
