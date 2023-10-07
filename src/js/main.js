/* import cart from "./pages/cart.js";
import index from "./pages/index.js";
import productos from "./pages/productos.js";
import tienda from "./pages/tienda.js"; */

/* import cartModal from "./components/cartModal"; */

import catalogo from "./pages/catalogo.js"
import cartModal from "./components/cartModal.js"
import producto from "./pages/producto.js"
import carritoPage from "./pages/carrito.js"

const pathName = window.location.pathname
const arrPathname =pathName.split("/")
const lastPathName =arrPathname[arrPathname.length-1]

//TODO 



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

    default:
        cartModal()
        break;
}

