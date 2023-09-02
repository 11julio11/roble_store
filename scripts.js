// index

document.addEventListener("DOMContentLoaded", function () {
    const cartItemsElement = document.getElementById("cartItems");
    const checkoutBtn = document.getElementById("checkoutBtn");
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
    const addToCartButtons = document.querySelectorAll(".product button.btn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", function () {
        const product = {
          name: button.parentElement.querySelector("h3").textContent,
          price: button.parentElement.querySelector("p:last-child").textContent,
        };
        addToCart(product);
      });
    });
  });

  //contacto
  
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form form");
    const feedbackMessage = document.querySelector(".contact-form .feedback");

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = contactForm.querySelector("#name").value;
      const email = contactForm.querySelector("#email").value;
      const message = contactForm.querySelector("#message").value;

      // Enviar los datos del formulario a un servidor (AJAX o Fetch)
      fetch("ruta-del-servidor/procesar-formulario.php", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          feedbackMessage.innerHTML = "¡Mensaje enviado con éxito!";
          feedbackMessage.classList.add("success");
          contactForm.reset();
        } else {
          feedbackMessage.innerHTML = "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.";
          feedbackMessage.classList.add("error");
        }
      });
    });
  });

  //carrito
  let cartItems = [];

function agregarProducto(nombre, precio) {
  cartItems.push({ nombre, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>No hay productos en el carrito</p>";
  } else {
    let total = 0;

    cartItems.forEach(item => {
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <p>${item.nombre} - $${item.precio.toFixed(2)}</p>
        </div>
      `;
      total += item.precio;
    });

    cartItemsContainer.innerHTML += `
      <p class="cart-total">Total: $${total.toFixed(2)}</p>
    `;
  }
}

function realizarPago() {
  if (cartItems.length === 0) {
    alert("No hay productos en el carrito. Agrega productos antes de pagar.");
  } else {
    alert("¡Pago realizado con éxito!");
    cartItems = [];
    actualizarCarrito();
  }
}

//Arma tu mueble
function agregarMueblePersonalizado() {
    const colorSelect = document.getElementById("color-select");
    const materialSelect = document.getElementById("material-select");
    const sizeSelect = document.getElementById("size-select");
  
    const color = colorSelect.value;
    const material = materialSelect.value;
    const size = sizeSelect.value;
  
    const mueblePersonalizado = {
      nombre: `Mueble ${color} ${material} ${size}`,
      precio: calcularPrecioPersonalizado(color, material, size)
    };
  
    agregarProducto(mueblePersonalizado.nombre, mueblePersonalizado.precio);
    alert("Mueble personalizado agregado al carrito");
  }
  
  function calcularPrecioPersonalizado(color, material, size) {
    let precioBase = 50.00; // Precio base para muebles personalizados
    // Calcula el precio adicional según las opciones seleccionadas
    if (color === "rojo") {
      precioBase += 10.00;
    } else if (color === "azul") {
      precioBase += 15.00;
    } else if (color === "verde") {
      precioBase += 12.00;
    }
    // Repite el proceso para las otras opciones (material y tamaño)
    // ...
  
    return precioBase;
  }

  //lo mas vendido

  let carrito = [];

function agregarAlCarrito(producto, precio) {
    const item = {
        producto: producto,
        precio: precio
    };
    carrito.push(item);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = "";

    for (const item of carrito) {
        const carritoItem = document.createElement("div");
        carritoItem.classList.add("carrito-item");
        carritoItem.innerHTML = `
            <div>${item.producto}</div>
            <div>$${item.precio.toFixed(2)}</div>
        `;
        carritoContainer.appendChild(carritoItem);
    }
}

//promociones
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
document.addEventListener("DOMContentLoaded", function() {
    const comprarButtons = document.querySelectorAll(".btn-comprar");
    const carritoContainer = document.getElementById("carrito");

    comprarButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            const producto = button.parentElement;
            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector("p:last-child").textContent;

            const productoAgregado = document.createElement("div");
            productoAgregado.classList.add("carrito-item");
            productoAgregado.innerHTML = `
                <p><strong>${nombre}</strong></p>
                <p>${precio}</p>
            `;

            carritoContainer.appendChild(productoAgregado);
        });
    });
});

//usuario
document.addEventListener("DOMContentLoaded", function() {
    const editProfileForm = document.getElementById("edit-profile-form");
    const changePasswordForm = document.getElementById("change-password-form");

    editProfileForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newEmail = document.getElementById("new-email").value;
        const newCountry = document.getElementById("new-country").value;
        const newAge = document.getElementById("new-age").value;
        const newGender = document.getElementById("new-gender").value;

        // Aquí podrías realizar una acción con los nuevos datos del perfil, por ejemplo, enviarlos al servidor para actualizarlos.
        // Luego, podrías mostrar un mensaje de éxito o error.
    });

    changePasswordForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newPassword = document.getElementById("new-password").value;
        const confirmNewPassword = document.getElementById("confirm-new-password").value;

        if (newPassword !== confirmNewPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Aquí podrías realizar una acción para cambiar la contraseña, como enviarla al servidor.
        // Luego, podrías mostrar un mensaje de éxito o error.
    });
});


