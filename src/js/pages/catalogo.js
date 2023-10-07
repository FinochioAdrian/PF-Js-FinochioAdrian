import { cargarCatalogo }from "../components/productosdb.js";
import cartModal from "../components/cartModal.js";

const catalogoMain =document.querySelector(".resultados")

const catalogoArr =[]

export default async function catalogo() {
    
await cargarCatalogo (catalogoArr)
renderizarCatalogo(catalogoArr)
cartModal(catalogoArr)



}









function renderizarCatalogo(arr) {
    let template = "";
    arr.forEach((obj) => {
      console.log(obj.imagen);
      template += `<div data-aos="fade-right" class="col card-scale">
          <div class="card shadow-sm">
          <h3 class="card-title font-principal text-center fw-bolder">${obj.nombre}</h3>
    
        <div class="card_img-size">
          <img class="card-img-top" src=${obj.imagen} alt="" />
        </div>
    
        <div class="card-body">
                  <div class="card__details d-flex justify-content-center">
                    <h4 class="card__price">$${obj.precio}</h4>
                    
                  </div>
                  <p class="card__cuantity">Cantidad disponible: <span class="fw-bolder">${obj.stock}</span></p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group w-100">
                      <a type="button" class="btn btn-sm btn-outline-acento btn__viewProduct" id="${obj.id}-viewProduct">
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
    catalogoMain.innerHTML=template
  const btnviewProducts= document.querySelectorAll(".btn__viewProduct")
  }



  document.addEventListener("click",(e)=>{
    const btnviewProducts= document.querySelectorAll(".btn__viewProduct")
    btnviewProducts.forEach((productView)=> {
    if(e.target==productView){
      const productId=parseInt(e.target.id);
      window.location.href = `./producto.html?id=${productId}`;
  
    }})
  })