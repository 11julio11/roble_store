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




