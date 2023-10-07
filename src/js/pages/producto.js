import cartModal from "../components/cartModal.js";
import { recuperarProducto } from "../components/productosdb.js";
const productoimagen = document.querySelector(".producto__imagen")
const tituloProducto = document.querySelector(".details__title")
const categoriaProducto = document.querySelector(".details__category")
const precioProducto = document.querySelector(".details__nowNumber")
/* const cantidadProducto = document.querySelector(".details__restNumber") */
const talleProducto = document.querySelector(".details__talle")
const btn_addCart = document.querySelector(".btn_addCart")




const productoView=[]

export default async function producto (){
    await buscarProducto ()
    renderizarPagina()
    cartModal(productoView)

}


async function buscarProducto (){ 
    // Obtener la URL actual
    const currentUrl = window.location.href;

    // Analizar la cadena de consulta (query string) para obtener los parámetros
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obtener el valor del parámetro "id"
    const productId = urlParams.get('id');
    
    
    const res= await recuperarProducto(productId);
    productoView.push(res)
}

function renderizarPagina(){
    const producto = productoView[0]
    
        productoimagen.style.backgroundImage = `url(${producto.imagen})`;
        tituloProducto.textContent=producto.nombre
        categoriaProducto.textContent=producto.categoria
        precioProducto.textContent=producto.precio
       /*  cantidadProducto.textContent=producto.stock */
        talleProducto.textContent=producto.talle
        btn_addCart.id=producto.id
   
    

}