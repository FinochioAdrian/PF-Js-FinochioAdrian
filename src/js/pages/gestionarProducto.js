import cartModal from "../components/cartModal.js";
import { subirProducto } from "../components/productosdb.js";

export default function gestionarProducto() {
  cartModal()
  const formProductos = document.querySelector("#form-productos");
  const formInputs = document.querySelectorAll(".form-inputs");
  const productos = [];

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      document.addEventListener("keypress", (e) => {
        e.key === "Enter" && validacionFormulario();
      });

      formProductos.addEventListener("submit", (e) => {
        e.preventDefault();
        validacionFormulario();
      });
      /* escucha los cambios en el formulario */
      formInputs.forEach((value) => {
        value.addEventListener("change", (e) => {
          e.preventDefault();
          formInputs.forEach((input) => {
            if (e.target == input) {
              if (validacionesFormulario.hasOwnProperty(input.name)) {
                const rules = validacionesFormulario[input.name];

                if (!reglasDeValidaciones(rules, input.value)) {
                  input.classList.add("is-invalid");
                  input.classList.remove("is-valid");
                } else {
                  input.classList.remove("is-invalid");
                  input.classList.add("is-valid");
                }
              }
            }
          });
        });
      });
    },
    { once: true }
  );

  /* Reglas de validaciones del formulario, el primer atributo coincide con el atributo name de la etiqueta html input a validar, */
  const validacionesFormulario = {
    nombre: {
      required: true,
      type: "text",
      msgInvalid: "Debe de ingresar un nombre",
    },
    precio: {
      required: true,
      type: "number",
      min: 1,
      msgInvalid: "Debe de ingresar un precio",
    },
    stock: {
      required: true,
      type: "number",
      min: 1,
      msgInvalid: "Debe de ingresar un nombre",
    },
    categoria: {
      required: true,
      type: "select",
      msgInvalid: "Debe de ingresar un nombre",
    },
    talle: {
      required: true,
      type: "text",
      msgInvalid: "Debe de ingresar un talle",
    },
    estado: {
      required: true,
      type: "select",
      msgInvalid: "Debe de ingresar un estado",
    },
    descripcion: {
      required: true,
      type: "text",
      msgInvalid: "Debe de ingresar un nombre",
    },
    textarea: {
      required: true,
      type: "text",
      msgInvalid: "Debe de ingresar un nombre",
    },
  };
  /* Definicion de las reglas de validaciones */
  function reglasDeValidaciones(rules, value) {
    let res;
    switch (rules.type) {
      case "text":
        res = reglaValidacionesText(value, rules);
        return res;
      case "number":
        res = reglaValidacionesNumber(value, rules);
        return res;
      case "select":
        res = reglaValidacionesSelect(value, rules);
        return res;
      default:
        
        break;
    }
  }
  /* defincion las reglas para texto */
  function reglaValidacionesText(value, rules) {
    const ArrIsValid = [];
    for (const key in rules) {
      if (key == "required" && rules[key]) {
        ArrIsValid.push(value.trim().length > 0);
      }
      if (key == "type") {
        ArrIsValid.push(typeof value == "string");
      }
    }

    return !ArrIsValid.some((value) => value == false);
  }
  /* defincion las reglas para Selects */

  function reglaValidacionesSelect(value, rules) {
    const ArrIsValid = [];
    for (const key in rules) {
      if (key == "required" && rules[key]) {
        ArrIsValid.push(value !== "-1");
      }
    }

    return !ArrIsValid.some((value) => value == false);
  }

  /* defincion las reglas para numeros */

  function reglaValidacionesNumber(value, rules) {
    const ArrIsValid = [];
    for (const key in rules) {
      if (key == "required" && rules[key]) {
        ArrIsValid.push(value !== "");
      }
      if (key == "type") {
        ArrIsValid.push(!isNaN(Number(value)));
      }
      if (key == "min") {
        ArrIsValid.push(Number(value) >= rules[key]);
      }
    }
    return !ArrIsValid.some((value) => value == false);
  }

  /* Funcion que se llama al enviar el formulario, Valida cada campo con su regla establecida en la variable validacionesFormulario
    Esta funcion llama a la validación y alerta de campos vacios
    ademas crea los objetos
    */
  function validacionFormulario() {
    const isFormValid = [];
    formInputs.forEach((input) => {
      if (validacionesFormulario.hasOwnProperty(input.name)) {
        const rules = validacionesFormulario[input.name];

        if (!reglasDeValidaciones(rules, input.value)) {
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
          isFormValid.push(false);
        } else {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
          isFormValid.push(true);
        }
      }
    });
    if (!isFormValid.some((value) => value == false)) {
      const nuevoProducto = Object.fromEntries(new FormData(formProductos));

      if (nuevoProducto.imagen == "") {
        nuevoProducto.imagen = "https://via.placeholder.com/150";
      }
      
      
      try {
        const res = subirProducto(nuevoProducto);
        toastCustom("Producto guardado", "info");
        limpiarCampos();
      } catch (error) {
        // Manejar errores si es necesario
        toastCustom("Error al enviar el producto", "warning");
        console.error("Error al enviar el producto:", error);
        throw error;
      }
    } else {
      toastCustom("Hay campos vacios", "warning");
    }
  }
  /* limpia todos lo campos del formulario */
  function limpiarCampos() {
    formProductos.reset();
    formInputs.forEach((input) => {
      input.classList.remove("is-invalid");
      input.classList.remove("is-valid");
    });
  }
}

function toastCustom(text, status = "info") {
  const warning =
    "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))";
  const info = "linear-gradient(to right, #00b09b, #96c93d)";
  Toastify({
    text: text,
    duration: 3000,
    className: "warning",
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: status != "info" ? warning : info,
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

