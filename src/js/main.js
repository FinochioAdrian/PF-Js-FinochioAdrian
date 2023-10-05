/* import cart from "./pages/cart.js";
import index from "./pages/index.js";
import productos from "./pages/productos.js";
import tienda from "./pages/tienda.js"; */
import cartModal from "./components/cartModal";

const pathName = window.location.pathname
const arrPathname =pathName.split("/")
const lastPathName =arrPathname[arrPathname.length-1]


cartModal();







/* switch (lastPathName) {
    case "index.html":
        index()
      break;
    case "tienda.html":
    tienda()
        break;
    case "cart.html":
    cart()
        break;
    case "productos.html":
    productos()
        break;

    default:
        break;
} */