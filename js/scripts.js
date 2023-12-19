// index

document.addEventListener("DOMContentLoaded", function () {
  const cartItemsElement = document.getElementById("carrito-item");
  const checkoutBtn = document.getElementById("btn-pagar");
  let cartItems = [];

  function updateCartDisplay() {
    if (cartItems.length === 0) {
      cartItemsElement.innerHTML = "<p>No hay productos en el carrito</p>";
    } else {
      const cartList = cartItems
        .map((item) => `<li>${item.name} - Precio: ${item.price}</li>`)
        .join("");
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
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = {
        name: button.parentElement.querySelector("h3").textContent,
        price: button.parentElement.querySelector("boton-item").textContent,
      };
      addToCart(product);
    });
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
            alert("El producto ya se encuentra en el carrito");
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
function actualizarTotalCarrito() {
  // seleccionamos el contenedor carrito
  var carritoContenedor = document.getElementsByClassName('carrito')[0];
  var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
  var total = 0;

  // recorremos cada elemento del carrito para actualizar el total
  for (var i = 0; i < carritoItems.length; i++) {
      var item = carritoItems[i];
      var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];

      // quitamos el símbolo peso y el punto de milesimos
      var precio = parseFloat(precioElemento.innerText.replace('$', '').replace(/[^0-9]/g, ''));
      var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
      var cantidad = parseInt(cantidadItem.value, 10);
      total += precio * cantidad;
  }

  total = Math.round(total);
  // formateamos el total como moneda
  var totalFormateado = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total);
  document.getElementsByClassName('carrito-precio-total')[0].innerText = totalFormateado;
}



//escribe aqui el codigo de esta sesion

// registro
document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");
  const errorMessage = document.getElementById("error-message");

  registrationForm.addEventListener("submit", function (event) {
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







//funcionamiento del carousel
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".caja .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Manejar el arrastre con el pulgar en la barra de desplazamiento
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Actualizar la posición del pulgar al mover el mouse
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;
          //Asegúrese de que el pulgar de la barra de desplazamiento permanezca dentro de los límites
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }
      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }
      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });
  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });
   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }
  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }
  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);






//funcionamiento del buscador
//  lista de productos
let productos = [
    //inicio
    { id: 1, nombre: 'Sofa Moderno' },
    { id: 2, nombre: 'Mesa de Comedor' },
    { id: 3, nombre: 'Pack x2 Sillas' },
    { id: 4, nombre: 'Maseta en roble' },
    { id: 5, nombre: 'Mesa' },
    { id: 6, nombre: 'Jardinera en roble' },
    { id: 7, nombre: 'Mueble tv' },
    { id: 8, nombre: 'Mesa convertible' },
    //carrito
    { id: 9, nombre: 'SOFA GRIS' },
    { id: 10, nombre: 'SILLA' },
    { id: 11, nombre: 'Biblioteca' },
    { id: 12, nombre: 'Mueble de televisor' },
    { id: 13, nombre: 'Futones' },
    { id: 14, nombre: 'Mesa convertible' },
    { id: 15, nombre: 'Base de cama doble' },
    { id: 16, nombre: 'Cama nido' },
    { id: 17, nombre: 'Silla x2' },
    { id: 18, nombre: 'Comoda' },
    { id: 19, nombre: 'Maceta, Hoja De Roble' },
    { id: 20, nombre: 'sillon reclinable' },
    //Arma tu mueble
    { id: 21, nombre: 'Mesa de centro' },
    { id: 22, nombre: 'Sofa' },
    { id: 23, nombre: 'silla para barra' },
    { id: 24, nombre: 'Sofa clasico' },
    { id: 25, nombre: 'Mueble Otomana' },
    { id: 26, nombre: 'Mueble para televisor' },
    { id: 27, nombre: 'Organizador de juguetes' },
    { id: 28, nombre: 'Futon' },
    { id: 29, nombre: 'Comoda de roble' },
    { id: 30, nombre: 'Mesa de 4 Puestos' },
    { id: 31, nombre: 'Melrose' },
    { id: 32, nombre: 'Biblioteca' },
    //lo mas ventido
    { id: 33, nombre: 'Mueble tv' },
    {id: 34, nombre: 'Mesa convertibe'},
    {id: 35, nombre: 'Cama doble'},
    {id: 36, nombre: 'Cama nido'},
    {id: 37, nombre: 'Escritorio de madera'},
    {id: 38, nombre: 'Mesa de 4 puestos'},
    {id: 39, nombre: 'Espejo de roble'},
    {id: 40, nombre: 'Armario de roble'},
    {id: 41, nombre: 'Banquillo'},
    {id: 42, nombre: 'Sofa de jardin '},
    {id: 43, nombre: 'Sofa blanco'},
    {id: 44, nombre: 'Sofa de aluminio'},
    //promociones
    {id: 45, nombre: 'Sofa Esquinero'},
    {id: 46, nombre: 'Sofa Palet Estibas 2 Puestos'},
    {id: 47, nombre: 'Sofa Classic 3 Puestos'},
    {id: 48, nombre: 'Sillon 1 Puesto Gris'},
    {id: 49, nombre: 'Sillon Reclinable Giratorio'},
    {id: 50, nombre: 'Mesa convertible'},
    {id: 51, nombre: 'Closet Bariloche 6 Puertas'},
    {id: 52, nombre: 'Cómoda 5 cajones kaia'},
    {id: 53, nombre: 'Base Cama Doble'},
    {id: 54, nombre: 'Comoda'},
    {id: 55, nombre: 'Maceta, Hojas De Roble'},
    {id: 56, nombre: 'Sofa reclinable'},
    //tipos de mubles
    {id: 57, nombre: 'Asiento reclinable'},
    {id: 58, nombre: 'Sofa reclinable solo'},
    {id: 59, nombre: 'Banco Otomana Gris'},
    {id: 60, nombre: 'Sofa en L'},
    {id: 61, nombre: 'Comedor de 6 puestos'},
    {id: 62, nombre: 'Comodas'},
    {id: 63, nombre: 'Otomanas'},
    {id: 64, nombre: 'Sofa en L negro'},
    {id: 65, nombre: 'Mueble de telivisor en roble'},
    {id: 66, nombre: 'Biblioteca'},
    {id: 67, nombre: 'Futones'},
    {id: 68, nombre: 'Mesa'},
    {id: 69, nombre: 'Mesas auxiliares'},
    {id: 70, nombre: 'Mini Bar'},
    {id: 71, nombre: 'Patas de muebles'},
    {id: 72, nombre: 'Organizadores de juguetes'},
    {id: 73, nombre: 'Muebles para jardin'},
    {id: 74, nombre: 'Mesa de comedor redonda'},
    {id: 75, nombre: 'Maseta de roble'},
    {id: 76, nombre: 'Jardinera'},
    //menu

    // ... más productos
];

// Función para buscar un producto por nombre
function buscarProducto(nombre) {
    return productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

// Obtención del formulario y el campo de búsqueda
let formulario = document.querySelector('form');
let campoBusqueda = formulario.querySelector('input[type="search"]');

// Añadir un controlador de eventos al campo de búsqueda para manejar la búsqueda en tiempo real
campoBusqueda.addEventListener('input', function() {
    // Obtiene todos los elementos 'item'
    let items = document.querySelectorAll('.item');

    // Realización de la búsqueda y muestra los resultados
    let terminoBusqueda = campoBusqueda.value.toLowerCase();
    items.forEach(function(item) {
        let titulo = item.querySelector('.titulo-item').textContent.toLowerCase();
        if (titulo.includes(terminoBusqueda)) {
            // Si el término de búsqueda está en el título, muestra el elemento
            item.style.display = '';
        } else {
            // Si no, oculta el elemento
            item.style.display = 'none';
        }
    });
});