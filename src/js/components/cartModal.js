import {
  guardarStorage,
  recuperarStorage,
} from "../components/storage-component.js";
const botonCart = document.querySelectorAll(".navbar__cart");
const modalCarrito = document.querySelector(".modal-carrito");
const cartNumber = document.querySelectorAll(".navbar__cart--notification");

const carrito = [];
export default function  cartModal(catalogoArr) {
  cargarCarrito(carrito);
  renderizarCarrito(carrito);
  //mostrar modal de carrito

  botonCart.forEach(btn=>
    btn.addEventListener("click", () => {
    modalCarrito.classList.toggle("show");
  }));
  //escucha el btnEliminar del carrito

  document.addEventListener("click", (e) => {
    const btnEliminar = document.querySelectorAll(".btn-borrar-producto");
    btnEliminar.forEach((btnBorrar) => {
      if (e.target == btnBorrar) {
        const id = parseInt(e.target.id);
        const indiceProductoAEliminar = carrito
          .map((producto) => producto.id)
          .indexOf(id.toString());
        eliminarDelCarrito(indiceProductoAEliminar);
      }
    });
  });

  //Elimina elementos del carrito
  function eliminarDelCarrito(id) {
    const producto = carrito[id];
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      carrito.splice(id, 1);
    }
    guardarStorage("carrito", carrito);
    renderizarCarrito(carrito);
  }

 

  

  //escucha el btnagregar en el carrito
  document.addEventListener("click", (e) => {
    const btnAgregar = document.querySelectorAll(".btn_addCart");

    btnAgregar.forEach((btn) => {
      if (e.target == btn) {
        const id = parseInt(e.target.id);
        const producto = catalogoArr.find((producto) => producto.id == id);
        agregarAlCarrito(producto);
      }
    });
  });
  // function agregarAlCarrito
  function agregarAlCarrito(producto) {
    //Funciona como un actualizar carrito
    const productoBusqueda = carrito.find(
      (productoCarrito) => productoCarrito.id == producto.id
    );
    if (productoBusqueda) {
      productoBusqueda.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    guardarStorage("carrito", carrito);
    renderizarCarrito();
  }
}



// dibuja los productos del carrito en el contenedor
function renderizarCarrito() {
  modalCarrito.innerHTML = '<div class="carrito-listadoProductos">';
  carrito.length > 0
    ? (carrito.forEach(({ id, nombre, precio, cantidad, imagen }) => {
        modalCarrito.innerHTML += `<div class="card mb-3" >
      <div class="row g-0 align-items-center">
        <div class="col-3">
          <img src="${imagen}" class="img-fluid rounded-start img-cart" alt="...">
        </div>
        <div class="col-7">
          <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text"><span class="cart-price ">$${precio}</span> X <span class="cart-cantidad">${cantidad}</span> Total <span class="cart-priceTotal">$${
          precio * cantidad
        }</span></p>
            
          </div>
        </div>
        <div class="col-2">
          <i class="bi bi-trash-fill btn-borrar-producto" id="${id}-borrar"></i>
        </div>
      </div>
    </div>`;
      }),
      (modalCarrito.innerHTML += `</div>
    <div
      class="container__btn-verCarro d-flex justify-content-center align-items-center"
    >
      <a href="./carrito.html" type="button" value="" class="btn btn-warning fw-bolder" >Ver Carro</a>
    </div>`))
    : (modalCarrito.innerHTML += `
  <div class="carrito-listadoProductos">
    <div class="card mb-3">
      <div class="row g-0 align-items-center ">
        <div class="card-body text-center">
          <h5 class="card-title">No hay Productos en el carrito</h5>
        </div>
      </div>
    </div>
  </div>
`);
  renderizarCartNumber();
}

//actualizar cantidad de diferentes productos en el carrito cart-number
function renderizarCartNumber() {
  
  const numberCart=carrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
    if(numberCart>0){
      cartNumber.forEach(number=> number.style.display = "block"); 
    }else {
      cartNumber.forEach(number=> number.style.display = "none") 
    }
    cartNumber.forEach(number=> number.innerHTML = numberCart); 


}
//* Carga el carrito del localStorage
export function cargarCarrito(array) {
  const carritoSinParsear = localStorage.getItem("carrito") || [];
  const carritoParseado =
    (carritoSinParsear.length > 0 && JSON.parse(carritoSinParsear)) ||
    carritoSinParsear;
  carritoParseado.length > 0 && array.push(...carritoParseado);
}