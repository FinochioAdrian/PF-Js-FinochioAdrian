import { cargarCatalogo }from "../components/productosdb.js";

const catalogoMain =document.querySelector(".resultados")
const catalogoArr =[]

export default async function catalogo() {
    
await cargarCatalogo (catalogoArr)
console.log(catalogoArr);


}






function leerCatalogo() {}

function guardarCatalogo() {}



function templateCatalogo(arr) {
    let template = "";
    arr.forEach((obj) => {
      template += `<div data-aos="fade-right" class="col card-scale">
          <div class="card shadow-sm">
          <h3 class="card-title font-principal text-center fw-bolder">${obj.nombre}</h3>
    
        <div class="card_img-size">
          <img class="card-img-top" src=${obj.img} alt="" />
        </div>
    
        <div class="card-body">
                  <div class="card__details d-flex justify-content-center">
                    <h4 class="card__price">$1500</h4>
                    
                  </div>
                  <p class="card__cuantity">Cantidad disponible: <span class="fw-bolder">10</span></p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group w-100">
                      <a type="button" class="btn btn-sm btn-outline-acento">
                        Ver
                      </a>
                      <a
                        type="button"
                        class="btn btn-sm btn-outline-acento btn_addCart"
                        id="${obj.id}-addCart"
                      >
                        Añadir al carrito
                      </a>
                    </div>
                  </div>
                </div>
      </div>
    </div>`;
    });
  }