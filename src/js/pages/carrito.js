import cartModal, { cargarCarrito } from "../components/cartModal.js";
import { guardarStorage } from "../components/storage-component.js";
const productosCarrito = document.querySelector(".productosCarrito");
const cartResumen = document.querySelector(".cart__resumen");
const carroCompras = [];
export default function carritoPage() {
  cartModal();
  cargarCarrito(carroCompras);
  renderizarCarro();
  renderizarResumen();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  document.addEventListener("click", (e) => {
    const btnEliminar = document.querySelectorAll(".btn-borrar-producto");
    btnEliminar.forEach((btnBorrar) => {
      if (e.target == btnBorrar) {
        const id = parseInt(e.target.id);
        const indiceProductoAEliminar = carroCompras
          .map((producto) => producto.id)
          .indexOf(id.toString());
        eliminarDelCarrito(indiceProductoAEliminar);
      }
    });
  });

  const procesarPago = document.querySelector(".procesar-pago");
  procesarPago.addEventListener("click", (e) => {
    swalWithBootstrapButtons
      .fire({
        title: "¿Confirmar?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar compra!",
        cancelButtonText: "Seguir Comprando!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {




          swalWithBootstrapButtons.fire(
            "Comprado!",
            "Tu compra está siendo procesada",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Compra Cancelada",
            "Puedes seguir comprando",
            "error"
          );
        }
      });
  });
}

function renderizarCarro() {
  productosCarrito.innerHTML = "";
  let template = "";
  carroCompras.length < 1
    ? (productosCarrito.innerHTML = ` <!-- producto en carrito -->
<div class="card mb-3">
  <div class="row g-0 align-items-center cart__producto">
    
    <!-- Detalles del Producto -->
    <div class="col-8 col-md-8 cart__details">
      <div class="card-body">
        <h5 class="card-title">No hay productos</h5>
        
      </div>
    </div>
   
  </div>
</div>
<!-- producto en carrito -->`)
    : (carroCompras.forEach((producto) => {
        template += `<!-- producto en carrito -->
    <div class="card mb-3">
      <div class="row g-0 align-items-center cart__producto">
        <!-- imagen Producto -->
        <div class="col-3 col-md-2 cart__imgContainer">
          <img
            src="${producto.imagen}"
            class="cart__img  rounded-start rounded-end"
            alt="${producto.nombre}"
          />
        </div>
        <!-- Detalles del Producto -->
        <div class="col-8 col-md-8 cart__details">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <div class="producto__resumenPrice d-flex flex-column flex-md-row">
              <p class="col-md-4">
                Precio: $<span class="producto__precio">${
                  producto.precio
                }</span>
              </p>
              <p class="col-md-4">
                Cantidad: <span class="producto__cantidad">${
                  producto.cantidad
                }</span>
              </p>
              <p class="col-md-4">
                Precio Total: $<span class="producto__precio">${
                  producto.precio * producto.cantidad
                }</span>
              </p>
            </div>
          </div>
        </div>
        <!-- Eliminar producto -->
        <div class="col-1 col-md-2 cart__trashContainer">
          <i class="bi bi-trash-fill  btn-borrar btn-borrar-producto" id="${
            producto.id
          }-borrar"></i>
          
        </div>
      </div>
    </div>
    <!-- producto en carrito -->`;
      }),
      (productosCarrito.innerHTML = template));
}

//Elimina elementos del carrito
function eliminarDelCarrito(id) {
  const producto = carroCompras[id];
  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    carroCompras.splice(id, 1);
  }
  guardarStorage("carrito", carroCompras);
  renderizarCarro();
  renderizarResumen();
}

function renderizarResumen() {
  let subtotal = 0;
  let template = "";
  carroCompras.length < 1
    ? (cartResumen.innerHTML = `<p class="card-text ms-3">Producto (0) <span class="cart__subtotalTotal" >$0</span></p>
    <p class="card-text ms-3">Envio  <span class="cart__envio" >consultar </span></p>
    <p class="card-text ms-3">Total  $<span class="cart__Total" >0 </span></p>`)
    : (cartResumen.innerHTML = `<p class="card-text ms-3">Producto (${
        carroCompras.length
      }) <span class="cart__subtotalTotal" >${(subtotal = carroCompras.reduce(
        (acu, producto) => {
          return acu + producto.cantidad * producto.precio;
        },
        0
      ))}</span></p>
<p class="card-text ms-3">Envio  <span class="cart__envio" >consultar </span></p>
<p class="card-text ms-3">Total  $<span class="cart__Total" >${subtotal} </span></p>
<div class="d-flex justify-content-center">
<button class="btn btn-success procesar-pago">
               
                Procesar Pago
              </button>
<div>
`);
}
