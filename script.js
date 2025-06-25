document.addEventListener("DOMContentLoaded", function () {
  const chatContent = document.querySelector(".chat-content");
  const chatInput = document.getElementById("userInput");
  const chatSendBtn = document.getElementById("sendMessage");
  const emojiPanel = document.querySelectorAll(".emoji");

  // Crear un objeto de audio para el sonido de notificación
  const notificationSound = new Audio("./notificacion/confirmacion.mp3");

  // Función para reproducir el sonido
  function playNotificationSound() {
    notificationSound.play().catch(e => console.log("No se pudo reproducir el sonido:", e));
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

  // Mensaje de bienvenida automático mejorado
  addMessage(
    `¡Hola! 👋 Soy tu asistente virtual 🤖<br><br>
    <strong>¿En qué puedo ayudarte hoy?</strong><br><br>
    📋 <strong>Opciones principales:</strong><br>
    1️⃣ Soporte técnico<br>
    2️⃣ Hacer un pedido<br>
    3️⃣ Ver menú completo<br>
    4️⃣ Estado de pedido<br>
    5️⃣ Horarios y ubicación<br><br>
    💬 También puedes escribir directamente lo que necesitas.`,
    "bot"
  );

  // Función mejorada para obtener la respuesta del bot
  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Saludos y bienvenida
    if (lowerMessage.includes("hola") || lowerMessage.includes("buenos") || lowerMessage.includes("buenas") || lowerMessage.includes("hey") || lowerMessage.includes("holi")) {
      return `¡Hola! 👋 Bienvenido/a. ¿En qué puedo ayudarte hoy?<br><br>
      📋 <strong>Opciones principales:</strong><br>
      1️⃣ Soporte técnico<br>
      2️⃣ Hacer un pedido<br>
      3️⃣ Ver menú completo<br>
      4️⃣ Estado de pedido<br>
      5️⃣ Horarios y ubicación<br><br>
      💬 También puedes escribir directamente lo que necesitas.`;
    }

    // Opciones principales expandidas
    if (lowerMessage === "1" || lowerMessage.includes("soporte") || lowerMessage.includes("técnico")) {
      return `🛠️ <strong>Soporte Técnico</strong><br><br>
      ¿Qué problema tienes?<br><br>
      🔧 <strong>Opciones comunes:</strong><br>
      • Problemas con la app<br>
      • Error en el pago<br>
      • Pedido incorrecto<br>
      • Problemas de entrega<br>
      • Cuenta bloqueada<br><br>
      📝 Describe tu problema o escribe una de las opciones anteriores.`;
    }

    if (lowerMessage === "2" || lowerMessage.includes("pedido") || lowerMessage.includes("pedir")) {
      return `🍔 <strong>¡Perfecto! Hagamos tu pedido</strong><br><br>
      📋 <strong>¿Qué te gustaría?</strong><br>
      • Hamburguesas 🍔<br>
      • Combos 🍟🥤<br>
      • Bebidas 🧊<br>
      • Postres 🍰<br>
      • Ensaladas 🥗<br><br>
      💡 <strong>Tip:</strong> Puedes escribir el nombre del producto o usar nuestros combos especiales.`;
    }

    if (lowerMessage === "3" || lowerMessage.includes("menú") || lowerMessage.includes("menu")) {
      return `📋 <strong>MENÚ COMPLETO</strong><br><br>
      🍔 <strong>HAMBURGUESAS</strong><br>
      • Clásica - $15.000<br>
      • Doble carne - $22.000<br>
      • Pollo crispy - $18.000<br>
      • Vegetariana - $16.000<br><br>
      🍟 <strong>COMBOS</strong><br>
      • Combo clásico - $25.000<br>
      • Combo familiar - $45.000<br>
      • Combo kids - $18.000<br><br>
      🥤 <strong>BEBIDAS</strong><br>
      • Gaseosas - $5.000<br>
      • Jugos naturales - $7.000<br>
      • Malteadas - $10.000<br><br>
      🍰 <strong>POSTRES</strong><br>
      • Helado - $8.000<br>
      • Brownie - $9.000<br><br>
      💬 Escribe el nombre de cualquier producto para más detalles.`;
    }

    if (lowerMessage === "4" || lowerMessage.includes("estado") || lowerMessage.includes("seguimiento")) {
      return `📦 <strong>Estado de Pedido</strong><br><br>
      Para consultar tu pedido necesito:<br>
      • Número de orden<br>
      • Teléfono registrado<br>
      • Nombre del pedido<br><br>
      📱 También puedes revisar en la app en la sección 'Mis pedidos'.<br><br>
      ¿Cuál es tu número de orden?`;
    }

    if (lowerMessage === "5" || lowerMessage.includes("horario") || lowerMessage.includes("ubicación") || lowerMessage.includes("dirección")) {
      return `📍 <strong>Horarios y Ubicación</strong><br><br>
      🕐 <strong>HORARIOS:</strong><br>
      • Lunes a Jueves: 11:00 AM - 10:00 PM<br>
      • Viernes a Sábado: 11:00 AM - 11:00 PM<br>
      • Domingo: 12:00 PM - 9:00 PM<br><br>
      📍 <strong>UBICACIONES:</strong><br>
      • Centro: Calle 12 #34-56<br>
      • Norte: Av. Libertadores #78-90<br>
      • Sur: Centro Comercial Plaza<br><br>
      🚚 <strong>Domicilios disponibles</strong> en toda la ciudad<br><br>
      ¿Necesitas la dirección específica de alguna sede?`;
    }

    // Productos específicos con más detalle
    if (lowerMessage.includes("hamburguesa") && !lowerMessage.includes("combo")) {
      return `🍔 <strong>HAMBURGUESAS DISPONIBLES</strong><br><br>
      🥩 <strong>Clásica</strong> - $15.000<br>
      Carne 100% res, lechuga, tomate, cebolla, salsa especial<br><br>
      🥩🥩 <strong>Doble Carne</strong> - $22.000<br>
      Doble carne, queso cheddar, tocino, salsa BBQ<br><br>
      🐔 <strong>Pollo Crispy</strong> - $18.000<br>
      Pollo empanizado, lechuga, tomate, salsa ranch<br><br>
      🥬 <strong>Vegetariana</strong> - $16.000<br>
      Hamburguesa de lentejas, aguacate, vegetales frescos<br><br>
      ➕ <strong>¿Quieres agregar algo más?</strong><br>
      • Papas (+$5.000)<br>
      • Bebida (+$5.000)<br>
      • Extra queso (+$2.000)<br><br>
      💬 Escribe el nombre de la hamburguesa que prefieres.`;
    }

    if (lowerMessage.includes("combo")) {
      return `🍟🥤 <strong>COMBOS ESPECIALES</strong><br><br>
      👑 <strong>Combo Clásico</strong> - $25.000<br>
      Hamburguesa clásica + papas medianas + bebida<br><br>
      👨‍👩‍👧‍👦 <strong>Combo Familiar</strong> - $45.000<br>
      3 hamburguesas + papas grandes + 3 bebidas<br><br>
      🧒 <strong>Combo Kids</strong> - $18.000<br>
      Hamburguesa pequeña + papas + jugo + juguete<br><br>
      ⭐ <strong>Combo Premium</strong> - $35.000<br>
      Hamburguesa doble + papas grandes + bebida + postre<br><br>
      🎯 <strong>¡Ahorra hasta $8.000 con nuestros combos!</strong><br><br>
      ¿Cuál combo te interesa?`;
    }

    if (lowerMessage.includes("bebida") && !lowerMessage.includes("combo")) {
      return `🥤 <strong>BEBIDAS DISPONIBLES</strong><br><br>
      ❄️ <strong>Gaseosas</strong> - $5.000<br>
      • Coca Cola, Pepsi, Sprite, Fanta<br>
      • Tamaños: Personal, Mediana, Grande<br><br>
      🍊 <strong>Jugos Naturales</strong> - $7.000<br>
      • Naranja, Mango, Lulo, Mora<br>
      • 100% naturales, sin preservantes<br><br>
      🍓 <strong>Malteadas</strong> - $10.000<br>
      • Fresa, Chocolate, Vainilla, Oreo<br>
      • Con crema chantilly<br><br>
      ☕ <strong>Bebidas Calientes</strong> - $6.000<br>
      • Café, Chocolate, Té chai<br><br>
      💧 <strong>Agua</strong> - $3.000<br>
      • Natural o con gas<br><br>
      ¿Cuál bebida prefieres?`;
    }

    // Problemas técnicos específicos
    if (lowerMessage.includes("error") || lowerMessage.includes("problema")) {
      return `⚠️ <strong>Soporte Técnico</strong><br><br>
      🔍 <strong>Problemas más comunes:</strong><br><br>
      💳 <strong>Errores de pago</strong><br>
      • Tarjeta rechazada<br>
      • Doble cobro<br>
      • Problema con PSE<br><br>
      📱 <strong>Problemas de app</strong><br>
      • No carga<br>
      • Cierre inesperado<br>
      • No recibe notificaciones<br><br>
      🚚 <strong>Problemas de entrega</strong><br>
      • Pedido no llegó<br>
      • Dirección incorrecta<br>
      • Demora en entrega<br><br>
      🍔 <strong>Pedido incorrecto</strong><br>
      • Falta producto<br>
      • Producto equivocado<br>
      • Problema de calidad<br><br>
      📝 <strong>Describe tu problema específico</strong> para ayudarte mejor.`;
    }

    // Quejas y reclamos
    if (lowerMessage.includes("😠") || lowerMessage.includes("🤬") || lowerMessage.includes("queja") || lowerMessage.includes("reclamo")) {
      return `😟 <strong>Lamento que tengas una mala experiencia</strong><br><br>
      🙏 Queremos solucionarlo inmediatamente.<br><br>
      📋 <strong>Para ayudarte mejor, necesito:</strong><br>
      • ¿Qué pasó exactamente?<br>
      • Número de orden (si aplica)<br>
      • Fecha y hora del incidente<br>
      • Sede donde ocurrió<br><br>
      ⚡ <strong>Soluciones inmediatas:</strong><br>
      • Reembolso completo<br>
      • Nuevo pedido sin costo<br>
      • Descuento para próxima compra<br><br>
      📞 <strong>Contacto directo:</strong> WhatsApp +57 300 123 4567<br><br>
      💬 Cuéntame qué ocurrió y lo solucionamos YA.`;
    }

    // Preguntas sobre precios
    if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("vale")) {
      return `💰 <strong>PRECIOS ACTUALIZADOS</strong><br><br>
      🍔 <strong>Hamburguesas:</strong> $15.000 - $22.000<br>
      🍟 <strong>Combos:</strong> $18.000 - $45.000<br>
      🥤 <strong>Bebidas:</strong> $3.000 - $10.000<br>
      🍰 <strong>Postres:</strong> $8.000 - $9.000<br><br>
      🚚 <strong>Domicilio:</strong> GRATIS pedidos +$30.000<br>
      🚚 <strong>Domicilio:</strong> $4.000 pedidos menores<br><br>
      💳 <strong>Métodos de pago:</strong><br>
      • Efectivo<br>
      • Tarjetas débito/crédito<br>
      • PSE<br>
      • Nequi, Daviplata<br><br>
      🎯 <strong>Descuentos disponibles:</strong><br>
      • 10% estudiantes (con carné)<br>
      • 15% adultos mayores<br>
      • 20% cumpleañeros<br><br>
      ¿Qué producto específico te interesa?`;
    }

    // Ayuda general expandida
    if (lowerMessage.includes("ayuda") || lowerMessage === "?") {
      return `🆘 <strong>¿EN QUÉ PUEDO AYUDARTE?</strong><br><br>
      🔥 <strong>Acciones rápidas:</strong><br>
      • Hacer pedido → Escribe '2' o 'pedido'<br>
      • Ver menú → Escribe '3' o 'menú'<br>
      • Soporte → Escribe '1' o 'ayuda técnica'<br>
      • Precios → Escribe 'precios'<br>
      • Horarios → Escribe 'horarios'<br><br>
      ❓ <strong>Preguntas frecuentes:</strong><br>
      • ¿Cuánto demora el domicilio?<br>
      • ¿Qué métodos de pago aceptan?<br>
      • ¿Hacen domicilios los domingos?<br>
      • ¿Tienen opciones vegetarianas?<br>
      • ¿Cómo cancelo un pedido?<br><br>
      💬 <strong>Escribe tu pregunta</strong> y te ayudo inmediatamente.<br><br>
      📞 <strong>¿Prefieres hablar con un humano?</strong><br>
      Llámanos: +57 (1) 234-5678`;
    }

    // Cancelaciones
    if (lowerMessage.includes("cancelar") || lowerMessage.includes("anular")) {
      return `❌ <strong>CANCELACIÓN DE PEDIDOS</strong><br><br>
      ⏰ <strong>Puedes cancelar SI:</strong><br>
      • Han pasado menos de 5 minutos desde el pedido<br>
      • El pedido aún no está en preparación<br>
      • No ha salido para entrega<br><br>
      💰 <strong>Reembolsos:</strong><br>
      • Efectivo: Inmediato<br>
      • Tarjeta: 3-5 días hábiles<br>
      • PSE: 1-2 días hábiles<br><br>
      📋 <strong>Para cancelar necesito:</strong><br>
      • Número de orden<br>
      • Motivo de cancelación<br>
      • Método de pago usado<br><br>
      ⚡ <strong>Proceso rápido:</strong><br>
      1. Dame tu número de orden<br>
      2. Verifico el estado<br>
      3. Cancelo si es posible<br>
      4. Proceso reembolso<br><br>
      📞 <strong>¿Urgente?</strong> Llama: +57 (1) 234-5678<br><br>
      ¿Cuál es tu número de orden?`;
    }

    // Fallback mejorado con sugerencias inteligentes
    return `🤔 <strong>No entendí completamente tu mensaje</strong><br><br>
    💡 <strong>¿Quisiste decir?</strong><br>
    • "Hacer un pedido" → Escribe 'pedido'<br>
    • "Ver el menú" → Escribe 'menú'<br>
    • "Hablar con soporte" → Escribe 'ayuda'<br>
    • "Conocer precios" → Escribe 'precios'<br>
    • "Ver horarios" → Escribe 'horarios'<br><br>
    🔍 <strong>O escribe directamente:</strong><br>
    • Nombre de un producto<br>
    • Tu pregunta completa<br>
    • El número de una opción<br><br>
    💬 <strong>Mensaje recibido:</strong> "${userMessage}"<br><br>
    🚀 <strong>¡Estoy aquí para ayudarte! Inténtalo de nuevo.</strong> 😊`;
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

  // Evento para detectar Enter en el input
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      chatSendBtn.click();
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

// Panel de emoji
document.getElementById("toggleEmojiPanel").addEventListener("click", function () {
  const emojiPanel = document.getElementById("emojiPanel");
  emojiPanel.classList.toggle("hidden");
});





// Funcionalidad de arrastre del modal
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







// ==== Carrito de Compras para Hamburguesas ==== //


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






