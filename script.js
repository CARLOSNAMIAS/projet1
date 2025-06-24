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

 // Mensaje de bienvenida automático
  addMessage(
    `¡Hola! Soy tu asistente virtual 🤖<br>
  Por favor selecciona una opción:<br>
  1️⃣ Soporte técnico<br>
  2️⃣ Hacer un pedido<br>
  3️⃣ Ver productos disponibles`,
    "bot"
  );




 


  // Función para obtener la respuesta del bot
  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Saludo inicial
    if (["hola", "buenas", "hey", "holi"].some(g => lowerMessage.includes(g))) {
      return `
      ¡Hola! Soy tu asistente virtual 🤖<br>
      Por favor selecciona una opción:<br>
      1️⃣ Soporte técnico<br>
      2️⃣ Hacer un pedido<br>
      3️⃣ Ver productos disponibles
    `;
    }

    // Opciones principales
    if (lowerMessage === "1") {
      return "🛠️ Has seleccionado soporte técnico. ¿En qué puedo ayudarte?";
    }

    if (lowerMessage === "2") {
      return "🍔 ¡Genial! ¿Qué te gustaría pedir? Puedes escribir 'hamburguesa', 'combo', o 'bebida'.";
    }

    if (lowerMessage === "3") {
      return "📋 Estos son nuestros productos:\n- Hamburguesa clásica 🍔\n- Combo doble 🍟🥤\n- Bebida fría 🧊\nEscribe el nombre del producto para más detalles.";
    }

    // Productos específicos
    if (lowerMessage.includes("hamburguesa")) {
      return "Nuestra hamburguesa clásica tiene carne 100% de res, lechuga, tomate y salsa especial. ¿Quieres agregarla al pedido?";
    }

    if (lowerMessage.includes("combo")) {
      return "El combo doble incluye 2 hamburguesas, papas grandes y bebida. ¿Lo deseas?";
    }

    if (lowerMessage.includes("bebida")) {
      return "Tenemos bebidas frías como cola, limonada y té helado. ¿Cuál prefieres?";
    }

    // Emojis comunes
    if (lowerMessage.includes("😠") || lowerMessage.includes("🤬")) {
      return "😟 Lo siento si algo no salió bien. ¿Quieres ayuda con un reclamo?";
    }

    // Ayuda general
    if (lowerMessage.includes("ayuda")) {
      return "Estoy aquí para ayudarte. ¿Quieres soporte técnico (1) o hacer un pedido (2)?";
    }

    // Fallback
    return "No entendí tu mensaje 😅. Por favor escribe un número de opción o una palabra clave como 'hamburguesa', 'pedido' o 'ayuda'.";
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
                    <span class="carrito-contador">0</span>
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

    // Crear modal de pago si no existe
    this.crearModalPago();
  }

  crearModalPago() {
    if (!document.getElementById('pagoModal')) {
      const modalPago = document.createElement('div');
      modalPago.innerHTML = `
        <div class="modal fade" id="pagoModal" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title">
                  <i class="bi bi-credit-card me-2"></i>
                  Proceder al Pago
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <!-- Resumen del pedido -->
                  <div class="col-md-6">
                    <h6><i class="bi bi-receipt me-2"></i>Resumen del Pedido</h6>
                    <div id="resumen-pedido" class="border rounded p-3 mb-3"></div>
                    <div class="total-pago bg-light p-3 rounded">
                      <h5>Total a Pagar: <span id="total-pago" class="text-success">$0</span></h5>
                    </div>
                  </div>
                  
                  <!-- Formulario de pago -->
                  <div class="col-md-6">
                    <h6><i class="bi bi-person me-2"></i>Información de Entrega</h6>
                    <form id="formPago">
                      <div class="mb-3">
                        <label class="form-label">Nombre Completo</label>
                        <input type="text" class="form-control" id="nombreCliente" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Teléfono</label>
                        <input type="tel" class="form-control" id="telefonoCliente" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Dirección de Entrega</label>
                        <textarea class="form-control" id="direccionCliente" rows="3" required></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Método de Pago</label>
                        <select class="form-select" id="metodoPago" required>
                          <option value="">Seleccionar método</option>
                          <option value="efectivo">Efectivo</option>
                          <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                          <option value="transferencia">Transferencia Bancaria</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Comentarios Adicionales</label>
                        <textarea class="form-control" id="comentarios" rows="2" placeholder="Instrucciones especiales, referencias, etc."></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" onclick="carrito.confirmarPedido()">
                  <i class="bi bi-check-circle me-2"></i>Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalPago);
    }
  }


actualizarVista() {
  // Calcular total de ítems
  const totalItems = this.items.reduce((suma, item) => suma + item.cantidad, 0);

  // ✅ Actualizar todos los contadores de carrito
  const contadores = document.querySelectorAll('.carrito-contador, #carrito-contador');
  contadores.forEach(contador => {
    contador.textContent = totalItems;
    // Efecto de animación visual (opcional)
    contador.classList.remove('contador-animado');
    void contador.offsetWidth; // Reinicia animación
    contador.classList.add('contador-animado');
  });

  // Mostrar contenido del carrito
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

// MÉTODO MEJORADO: Mostrar mensaje de producto agregado


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

  // MÉTODO MEJORADO: Proceder al pago con modal
  procederPago() {
    if (this.items.length === 0) {
      this.mostrarNotificacion('Tu carrito está vacío', 'warning');
      return;
    }

    // Actualizar el resumen del pedido en el modal
    this.actualizarResumenPedido();

    // Cerrar el modal del carrito
    const carritoModal = document.getElementById('carritoModal');
    const modalInstance = bootstrap.Modal.getInstance(carritoModal);
    if (modalInstance) {
      modalInstance.hide();
    }

    // Mostrar el modal de pago
    setTimeout(() => {
      const pagoModal = new bootstrap.Modal(document.getElementById('pagoModal'));
      pagoModal.show();
    }, 300);
  }

  actualizarResumenPedido() {
    const resumenElement = document.getElementById('resumen-pedido');
    const totalPagoElement = document.getElementById('total-pago');

    if (resumenElement) {
      resumenElement.innerHTML = this.items.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <strong>${item.nombre}</strong>
            <br>
            <small class="text-muted">Cantidad: ${item.cantidad}</small>
          </div>
          <div class="text-end">
            <strong>${this.formatearPrecio(item.precio * item.cantidad)}</strong>
          </div>
        </div>
        <hr class="my-2">
      `).join('');
    }

    if (totalPagoElement) {
      totalPagoElement.textContent = this.formatearPrecio(this.total);
    }
  }

  confirmarPedido() {
    const form = document.getElementById('formPago');

    // Validar formulario
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Obtener datos del formulario
    const datosCliente = {
      nombre: document.getElementById('nombreCliente').value,
      telefono: document.getElementById('telefonoCliente').value,
      direccion: document.getElementById('direccionCliente').value,
      metodoPago: document.getElementById('metodoPago').value,
      comentarios: document.getElementById('comentarios').value
    };

    // Crear objeto del pedido
    const pedido = {
      id: this.generarIdPedido(),
      fecha: new Date().toLocaleString('es-CO'),
      cliente: datosCliente,
      items: this.items,
      total: this.total,
      estado: 'Confirmado'
    };

    // Aquí puedes enviar el pedido a tu servidor
    console.log('Pedido confirmado:', pedido);

    // Mostrar confirmación
    this.mostrarConfirmacionPedido(pedido);

    // Limpiar carrito y cerrar modal
    this.limpiarCarrito();
    const pagoModal = document.getElementById('pagoModal');
    const modalInstance = bootstrap.Modal.getInstance(pagoModal);
    if (modalInstance) {
      modalInstance.hide();
    }

    // Limpiar formulario
    form.reset();
  }

  generarIdPedido() {
    return 'PED-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  mostrarConfirmacionPedido(pedido) {
    const confirmacion = document.createElement('div');
    confirmacion.innerHTML = `
      <div class="modal fade" id="confirmacionModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title">
                <i class="bi bi-check-circle me-2"></i>
                ¡Pedido Confirmado!
              </h5>
            </div>
            <div class="modal-body text-center">
              <div class="mb-3">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
              </div>
              <h4>¡Gracias por tu pedido!</h4>
              <p><strong>Número de pedido:</strong> ${pedido.id}</p>
              <p><strong>Total:</strong> ${this.formatearPrecio(pedido.total)}</p>
              <p>Tu pedido será entregado en aproximadamente <strong>30-45 minutos</strong></p>
              <p class="text-muted">Recibirás una llamada de confirmación en breve</p>
            </div>
            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">Entendido</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(confirmacion);

    const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    confirmacionModal.show();

    // Remover el modal después de cerrarlo
    document.getElementById('confirmacionModal').addEventListener('hidden.bs.modal', function () {
      document.body.removeChild(confirmacion);
    });
  }

  mostrarNotificacion(mensaje, tipo = 'info') {
    const toast = document.createElement('div');
    const iconos = {
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'info': 'ℹ️'
    };

    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="alert alert-${tipo} toast-content">
        ${iconos[tipo]} ${mensaje}
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

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }
}

// Inicializar el carrito cuando se carga la página
let carrito;
document.addEventListener('DOMContentLoaded', function () {
  carrito = new CarritoCompras();
});

// Estilos CSS para las animaciones (agregar al CSS)
const estilosToast = document.createElement('style');
estilosToast.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .carrito-flotante {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .carrito-btn {
    border-radius: 50px;
    padding: 15px 20px;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    position: relative;
  }

  .carrito-contador {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #dc3545;
    color: white;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;
document.head.appendChild(estilosToast);

