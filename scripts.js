// index

/*document.addEventListener("DOMContentLoaded", function () {
    const cartItemsElement = document.getElementById("carrito-item");
    const checkoutBtn = document.getElementById("btn-pagar");
    let cartItems = [];
  
    function updateCartDisplay() {
      if (cartItems.length === 0) {
        cartItemsElement.innerHTML = "<p>No hay productos en el carrito</p>";
      } else {
        const cartList = cartItems.map(item => `<li>${item.name} - Precio: ${item.price}</li>`).join("");
        cartItemsElement.innerHTML = `<ul>${cartList}</ul>`;
      }
    }
  
    function addToCart(product) {
      cartItems.push(product);
      updateCartDisplay();
    }
  
    checkoutBtn.addEventListener("click", function () {
      // Aquí puedes implementar la lógica para procesar el pago
      // Por ejemplo, mostrar un mensaje de éxito y vaciar el carrito
      alert("¡Pago exitoso! Gracias por tu compra.");
      cartItems = [];
      updateCartDisplay();
    });
  
    // Ejemplo de cómo agregar productos al carrito al hacer clic en el botón "Agregar al Carrito"
    const addToCartButtons = document.querySelectorAll("titulo-item");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", function () {
        const product = {
          name: button.parentElement.querySelector("h3").textContent,
          price: button.parentElement.querySelector("boton-item").textContent,
        };
        addToCart(product);
      });
    });
  });*/



  //contacto
  // Importamos la biblioteca Nodemailer
  import { createTransport } from 'nodemailer';

  // Creamos un transportador de correo con los datos de nuestra cuenta de Gmail
  var transporter = createTransport({
      service: 'gmail',
      auth: {
          user: 'davidjulioromero86@gmail.com', // Aquí va tu correo
          pass: 'todoesposible11' // Aquí va tu contraseña
      }
  });

  // Añadimos un evento al formulario para que se ejecute cuando se envíe
  document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitamos que la página se recargue

      // Recogemos los datos del formulario
      var fullname = document.querySelector('input[name="fullname"]').value;
      var email = document.querySelector('input[name="email"]').value;
      var phone = document.querySelector('input[name="phone"]').value;
      var affair = document.querySelector('input[name="affair"]').value;
      var message = document.querySelector('textarea[name="message"]').value;

      // Creamos las opciones del correo
      var mailOptions = {
          from: 'davidjulioromero86@gmail.com', // Aquí va tu correo
          to: 'romerojesusdavid76@gmail.com', // Aquí va el correo del destinatario
          subject: affair, // El asunto del correo
          text: 'Nombres y Apellidos: ' + fullname + '\nCorreo Electrónico: ' + email + '\nNúmero de Teléfono: ' + phone + '\nMensaje: ' + message // El cuerpo del correo
      };

      // Enviamos el correo
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error); // Si hay un error, lo mostramos en la consola
          } else {
              console.log('Email enviado: ' + info.response); // Si no hay errores, mostramos la respuesta del servidor
          }
      });
  });

  
  //carrito
  //Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por su compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("Este producto ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}



//promociones

  
//escribe aqui el codigo de esta sesion 




// registro
document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registration-form");
    const errorMessage = document.getElementById("error-message");

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtén los valores de los campos de registro
        const names = document.getElementById("names").value;
        // Obtén los demás valores de los campos de registro

        // Realiza validaciones (puedes agregar más validaciones aquí)
        if (!names || !email || !password || !confirmPassword) {
            errorMessage.textContent = "Todos los campos son obligatorios.";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Las contraseñas no coinciden.";
            return;
        }

        // Si todas las validaciones pasan, puedes enviar los datos al servidor aquí
        // Por ahora, simplemente limpiamos el mensaje de error
        errorMessage.textContent = "";
    });
});

//tipos de muebles







