document.addEventListener("DOMContentLoaded", function () {
    const chatContent = document.querySelector(".chat-content");
    const chatInput = document.getElementById("userInput");
    const chatSendBtn = document.getElementById("sendMessage");
    const emojiPanel = document.querySelectorAll(".emoji");

    // Crear un objeto de audio para el sonido de notificación
    const notificationSound = new Audio("./notificacion/confirmacion.mp3");

    // Función para reproducir el sonido
    function playNotificationSound() {
      notificationSound.play();
    }

    // Función para agregar mensajes
    function addMessage(message, sender) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", sender);
      messageDiv.innerHTML = `<p>${message}</p>`;
      chatContent.appendChild(messageDiv);

      // Desplazar al final del chat
      chatContent.scrollTop = chatContent.scrollHeight;

      // Reproducir sonido si el mensaje es del bot
      if (sender === "bot") {
        playNotificationSound();
      }
    }

    // Función para obtener la respuesta del bot
    function getBotResponse(userMessage) {
      const lowerMessage = userMessage.toLowerCase();

      const responses = [
        {
          keyword: "hello",
          response: "¡Hola! ¿En qué puedo ayudarte hoy?",
        },
        {
          keyword: "comida",
          response: "Como puedo ayudarte con la comida?",
        },
        {
          keyword: "ayuda",
          response:
            "Claro, dime qué tipo de ayuda necesitas seleciona 1 soporte en linea",
        },

        {
          keyword: "soporte",
          response: "Estoy aquí para brindarte soporte técnico.",
        },

        {
          keyword: "hamburguesa",
          response: "¿Cual deseas ordenar?",
        },

        {
          keyword: "😠",
          response: "¿Porque estás enojado?",
        },

        {
          keyword: "tengo hambre",
          response: "¿Tranquilo que deseas ordenar?",
        },

        {
          keyword: "domicilio",
          response: "¿En breve te atenderemos?",
        },

        {
          keyword: "1",
          response:
            "¿Hola soy tu soporte especializado dime en que puedo ayudarte?",
        },

        // Respuesta para saludos
        {
          keyword: "hola",
          response: "¡Hola! ¿En qué puedo ayudarte hoy? 👋",
        },

        // Preguntas frecuentes
        {
          keyword: "preguntas frecuentes",
          response:
            "Aquí tienes las opciones de ayuda:\n1️⃣ Información sobre horarios de entrega\n2️⃣ Preguntas sobre productos\n3️⃣ Conoce más sobre nuestras ofertas",
        },
        {
          keyword: "comida",
          response:
            "¿Te gustaría ordenar comida? 🍔🥤 ¿En qué puedo ayudarte?",
        },

        // Quejas y reclamos
        {
          keyword: "queja",
          response:
            "Lamentamos que hayas tenido inconvenientes 😔. Por favor, proporciona más detalles para ayudarte con tu queja.",
        },
        {
          keyword: "reclamo",
          response:
            "Estamos aquí para escucharte. Por favor, cuéntanos más sobre tu situación para resolverla lo antes posible.",
        },

        // Soporte especializado
        {
          keyword: "soporte",
          response:
            "¡Claro! Por favor selecciona una de las opciones:\n1️⃣ Soporte técnico especializado\n2️⃣ Información general",
        },

        {
          keyword: "1",
          response:
            "¡Has seleccionado soporte especializado! Por favor, cuéntanos tu problema para ofrecerte una solución rápida.",
        },

        {
          keyword: "2",
          response:
            "¡Listo! Te brindaremos información general para ayudarte. ¿Qué necesitas saber?",
        },

        // Otras respuestas
        {
          keyword: "hamburguesa",
          response:
            "¡Excelente elección! 🍔 ¿Qué tipo de hamburguesa deseas ordenar hoy?",
        },
        {
          keyword: "tengo hambre",
          response: "¡Tranquilo! 🍽️ ¿Qué te gustaría pedir?",
        },
        {
          keyword: "domicilio",
          response:
            "En breve atenderemos tu solicitud de domicilio 🚀. ¿Puedes proporcionarnos más información?",
        },
        {
          keyword: "🤬",
          response:
            "Veo que estás molesto 😕. Si algo te preocupa, cuéntamelo para ayudarte.",
        },
      ];

      for (const { keyword, response } of responses) {
        if (lowerMessage.includes(keyword)) {
          return response;
        }
      }

      return "Lo siento, no entendí tu mensaje.";
    }

    // Evento para enviar texto
    chatSendBtn.addEventListener("click", () => {
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        addMessage(userMessage, "user");
        chatInput.value = "";

        setTimeout(() => {
          const botResponse = getBotResponse(userMessage);
          addMessage(botResponse, "bot");
        }, 1000);
      }
    });

    // Evento para enviar emojis
    emojiPanel.forEach((emoji) => {
      emoji.addEventListener("click", function () {
        const emojiMessage = emoji.innerText;
        addMessage(emojiMessage, "user");

        setTimeout(() => {
          const botResponse = getBotResponse(emojiMessage);
          addMessage(botResponse, "bot");
        }, 1000);
      });
    });
  });



   // panel de emoji
   document
   .getElementById("toggleEmojiPanel")
   .addEventListener("click", function () {
     const emojiPanel = document.getElementById("emojiPanel");
     emojiPanel.classList.toggle("hidden");
   });



   document.addEventListener("DOMContentLoaded", function () {
    const modalContent = document.getElementById("chatbotModalContent");
    const modalHeader = document.getElementById("chatbotModalHeader");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    modalHeader.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - modalContent.offsetLeft;
      offsetY = e.clientY - modalContent.offsetTop;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const left = e.clientX - offsetX;
      const top = e.clientY - offsetY;

      modalContent.style.left = `${left}px`;
      modalContent.style.top = `${top}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });










  // Carrito de Compras para Hamburguesas
class CarritoCompras {
    constructor() {
        this.items = [];
        this.total = 0;
        this.inicializar();
    }

    inicializar() {
        // Cargar carrito desde localStorage si existe
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            this.items = JSON.parse(carritoGuardado);
            this.calcularTotal();
        }

        // Agregar event listeners a todos los botones "Personalizar"
        this.agregarEventListeners();
        
        // Crear el HTML del carrito si no existe
        this.crearElementosCarrito();
        
        // Actualizar la vista inicial
        this.actualizarVista();
    }

    agregarEventListeners() {
        // Seleccionar todos los botones "Personalizar"
        const botonesPersonalizar = document.querySelectorAll('.btn-custom');
        
        botonesPersonalizar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                this.agregarProducto(e.target);
            });
        });
    }

    agregarProducto(boton) {
        // Obtener el contenedor del producto
        const menuItem = boton.closest('.menu-item');
        
        // Extraer información del producto
        const nombre = menuItem.querySelector('h5').textContent.trim();
        const descripcion = menuItem.querySelector('p').textContent.trim();
        const precioTexto = menuItem.querySelector('.price').textContent.trim();
        const precio = this.extraerPrecio(precioTexto);
        const imagen = menuItem.querySelector('img').src;

        // Crear objeto producto
        const producto = {
            id: this.generarId(nombre),
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        };

        // Verificar si el producto ya existe en el carrito
        const productoExistente = this.items.find(item => item.id === producto.id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            this.items.push(producto);
        }

        // Actualizar total y vista
        this.calcularTotal();
        this.actualizarVista();
        this.guardarCarrito();
        
        // Mostrar mensaje de confirmación
        this.mostrarMensajeAgregado(producto.nombre);
    }

    extraerPrecio(precioTexto) {
        // Extraer solo los números del precio (ej: "$43.900" -> 43900)
        return parseInt(precioTexto.replace(/[^\d]/g, ''));
    }

    generarId(nombre) {
        // Generar un ID único basado en el nombre
        return nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }

    eliminarProducto(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.calcularTotal();
        this.actualizarVista();
        this.guardarCarrito();
    }

    actualizarCantidad(id, nuevaCantidad) {
        const producto = this.items.find(item => item.id === id);
        if (producto) {
            if (nuevaCantidad <= 0) {
                this.eliminarProducto(id);
            } else {
                producto.cantidad = nuevaCantidad;
                this.calcularTotal();
                this.actualizarVista();
                this.guardarCarrito();
            }
        }
    }

    calcularTotal() {
        this.total = this.items.reduce((suma, item) => {
            return suma + (item.precio * item.cantidad);
        }, 0);
    }

    formatearPrecio(precio) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(precio);
    }

    crearElementosCarrito() {
        // Crear botón del carrito flotante si no existe
        if (!document.getElementById('carrito-flotante')) {
            const carritoFlotante = document.createElement('div');
            carritoFlotante.id = 'carrito-flotante';
            carritoFlotante.className = 'carrito-flotante';
            carritoFlotante.innerHTML = `
                <button class="btn btn-primary carrito-btn" data-bs-toggle="modal" data-bs-target="#carritoModal">
                    <i class="bi bi-cart4"></i>
                    <span id="carrito-contador">0</span>
                </button>
            `;
            document.body.appendChild(carritoFlotante);
        }

        // Crear modal del carrito si no existe
        if (!document.getElementById('carritoModal')) {
            const modalCarrito = document.createElement('div');
            modalCarrito.innerHTML = `
                <div class="modal fade" id="carritoModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i class="bi bi-cart4 me-2"></i>
                                    Tu Carrito de Compras
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div id="carrito-items"></div>
                                <div class="carrito-total mt-3">
                                    <h4>Total: <span id="carrito-total">$0</span></h4>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir Comprando</button>
                                <button type="button" class="btn btn-success" onclick="carrito.procederPago()">Proceder al Pago</button>
                                <button type="button" class="btn btn-danger" onclick="carrito.limpiarCarrito()">Limpiar Carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalCarrito);
        }
    }

    actualizarVista() {
        // Actualizar contador del carrito flotante
        const contador = document.getElementById('carrito-contador');
        if (contador) {
            const totalItems = this.items.reduce((suma, item) => suma + item.cantidad, 0);
            contador.textContent = totalItems;
        }

        // Actualizar items del carrito
        const carritoItems = document.getElementById('carrito-items');
        if (carritoItems) {
            if (this.items.length === 0) {
                carritoItems.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
            } else {
                carritoItems.innerHTML = this.items.map(item => `
                    <div class="carrito-item d-flex align-items-center mb-3 p-3 border rounded">
                        <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img me-3" style="width: 80px; height: 80px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <h6>${item.nombre}</h6>
                            <p class="text-muted small mb-1">${item.descripcion.substring(0, 100)}...</p>
                            <p class="mb-0"><strong>${this.formatearPrecio(item.precio)}</strong></p>
                        </div>
                        <div class="cantidad-controls">
                            <button class="btn btn-sm btn-outline-secondary" onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad - 1})">-</button>
                            <span class="mx-2">${item.cantidad}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad + 1})">+</button>
                        </div>
                        <button class="btn btn-sm btn-danger ms-2" onclick="carrito.eliminarProducto('${item.id}')">🗑️</button>
                    </div>
                `).join('');
            }
        }

        // Actualizar total
        const totalElement = document.getElementById('carrito-total');
        if (totalElement) {
            totalElement.textContent = this.formatearPrecio(this.total);
        }
    }

    mostrarMensajeAgregado(nombreProducto) {
        // Crear toast de notificación
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="alert alert-success toast-content">
                ✅ ${nombreProducto} agregado al carrito
            </div>
        `;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    limpiarCarrito() {
        this.items = [];
        this.total = 0;
        this.actualizarVista();
        this.guardarCarrito();
    }

    procederPago() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        // Aquí puedes integrar con tu sistema de pago
        alert(`Procesando pago por ${this.formatearPrecio(this.total)}\n\nTotal de items: ${this.items.length}`);
        console.log('Items del carrito:', this.items);
    }
}

// Inicializar el carrito cuando se carga la página
let carrito;
document.addEventListener('DOMContentLoaded', function() {
    carrito = new CarritoCompras();
});

