

export function guardarStorage (clave,valor) {
localStorage.setItem(clave,JSON.stringify(valor))
}

export function recuperarStorage (clave){
    return localStorage.getItem(clave)
}