import { URLAPI } from "../services/constantes.js";

export async function recuperarCatalogo() {
  let res;
  return (res = await fetch(URLAPI + "productos")
    .then((response) => response.json())
    .then((data) => data));
}
//recupera un producto
export async function recuperarProducto(id) {
  let res;
  return (res = await fetch(URLAPI + `productos/${id}`)
    .then((response) => response.json())
    .then((data) => data));
}

/* Funcion que recupera y carga los productos almacenados en memoria en la db */
async function subirCatalogo() {
  const productoLocales = await cargarJsonlocal();
    const promesas = productoLocales.map(producto => subirProducto(producto))
try {

    const resultados = await Promise.all(promesas)
}catch (error) {
    // Manejar errores si es necesario
    console.error("Error al enviar los productos:", error);
  }
 
}

/* recupera los productos en memoria servidor */
async function cargarJsonlocal() {
  const resp = await fetch("./src/js/products.json")
    .then((response) => response.json())
    .then((data) => data);
  return resp;
}
/* Encargada de cargar el catalogo en la memoria actual  catalogoArr*/
export async function cargarCatalogo(arr) {
  const res = await recuperarCatalogo();
  if (res.length > 0) {
    arr.push(...res);
  } else {
    await subirCatalogo();
    await cargarCatalogo(arr);
  }
}

/* Sube un producto a la db */
export function subirProducto(producto) {
  return fetch(URLAPI + "productos", {
    method: "POST",
    body: JSON.stringify(producto),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resultado) => {
      return resultado;
    })
    .catch((error) => {
      // Manejar errores si es necesario
      console.error("Error al enviar el producto:", error);
      throw error;
    });
}
