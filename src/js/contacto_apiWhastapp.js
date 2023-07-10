


function enviarWhatsApp(e) {
    e.preventDefault(); // Detener el envío automático del formulario

  const form = document.getElementById("form__AbitiUsati-contacto");

  // Realizar validaciones de campos requeridos
  if (!form.checkValidity()) {
    form.reportValidity(); // Mostrar mensajes de validación nativos del navegador
    return;
  }
 

  // Obtener los valores del formulario y crear el mensaje
  const formData = Object.fromEntries(new FormData(form));
  
  
  const { nombre, apellido, email, mensaje } = formData;

  // Modificar los valores de las variables independientes según tus necesidades
  // Puedes realizar cualquier modificación o manipulación de los valores aquí

  // Crear el mensaje concatenando las variables modificadas
  const mensajeCompleto = `Hola yo soy: ${nombre} ${apellido}.\nMi Email es: ${email}\nMe contacto con vos para: ${mensaje}`;

  

  // Crear la URL de WhatsApp con el número de celular y el mensaje
  const url = `https://api.whatsapp.com/send?phone=${CELULAR}&text=${encodeURIComponent(mensajeCompleto)}`;

  // Abrir una nueva ventana o pestaña con la URL de WhatsApp
  window.open(url, "_blank");

}
