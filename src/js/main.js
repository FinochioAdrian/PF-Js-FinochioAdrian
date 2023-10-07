

import catalogo from "./pages/catalogo.js"
import cartModal from "./components/cartModal.js"
import producto from "./pages/producto.js"
import carritoPage from "./pages/carrito.js"
import gestionarProducto from "./pages/gestionarProducto.js"

const pathName = window.location.pathname
const arrPathname =pathName.split("/")
const lastPathName =arrPathname[arrPathname.length-1]

//TODO 


console.log(lastPathName);
switch (lastPathName) {

    case "catalogo.html" :
        catalogo()
        break;

    case "carrito.html":
        carritoPage()
        break;

    case "producto.html":
    producto()
        break;
    case "gestionarProducto.html":
    gestionarProducto()
        break;

    default:
        cartModal()
        break;
}

