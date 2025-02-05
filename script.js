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