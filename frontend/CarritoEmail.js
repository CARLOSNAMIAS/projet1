/* eslint-disable */
/**
 * CarritoEmail.js - Sistema de envío de emails para facturas
 * 
 * Este archivo contiene la funcionalidad para generar facturas en formato HTML
 * y enviarlas por correo electrónico a los clientes de El Corral.
 * 
 * @author Carlos Namias
 * @version 1.0
 * @date 2025
 */

class CarritoEmail {
  /**
   * Genera el contenido HTML completo de una factura
   */
  static generarHtmlFactura(pedido, formatearPrecio) {
    const itemsHtml = pedido.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px;">${item.nombre}</td>
        <td style="padding: 10px; text-align: center;">${item.cantidad}</td>
        <td style="padding: 10px; text-align: right;">${formatearPrecio(item.precio)}</td>
        <td style="padding: 10px; text-align: right;">${formatearPrecio(item.precio * item.cantidad)}</td>
      </tr>
    `
      )
      .join('');

    return `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; background-color: #f9f9f9;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
          <img src="https://raw.githubusercontent.com/CarlosNamias/menu/main/img/logo_old.png" alt="Logo El Corral" style="max-width: 150px;">
        </div>
        <div style="padding: 20px 0;">
          <h1 style="color: #48110d; text-align: center; margin: 0;">Confirmación de tu Pedido</h1>
          <p style="text-align: center; font-size: 1.1em;">¡Hola <strong>${pedido.cliente.nombre}</strong>!</p>
          <p>Gracias por tu compra en El Corral. Hemos recibido tu pedido y ya lo estamos preparando con mucho gusto.</p>
          <hr>
          <h2>Detalles del Pedido</h2>
          <p><strong>Número de Pedido:</strong> ${pedido.id}</p>
          <p><strong>Fecha:</strong> ${pedido.fecha}</p>
          <p><strong>Total Pagado:</strong> <strong style="color: #48110d; font-size: 1.2em;">${formatearPrecio(pedido.total)}</strong></p>
          <h3>Productos</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #48110d; color: white;">
                <th style="padding: 12px; text-align: left;">Producto</th>
                <th style="padding: 12px; text-align: center;">Cantidad</th>
                <th style="padding: 12px; text-align: right;">Precio Unit.</th>
                <th style="padding: 12px; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <h3 style="margin-top: 20px; color: #48110d;">Información de Entrega</h3>
          <div style="background-color: #fff; padding: 15px; border-radius: 5px;">
              <p><strong>Dirección:</strong> ${pedido.cliente.direccion}</p>
              <p><strong>Teléfono:</strong> ${pedido.cliente.telefono}</p>
              <p><strong>Método de Pago:</strong> ${pedido.cliente.metodoPago}</p>
              ${pedido.cliente.comentarios ? `<p><strong>Comentarios:</strong> ${pedido.cliente.comentarios}</p>` : ''}
          </div>
          <hr style="margin-top: 20px;">
          <p style="font-size: 0.9em; color: #777; text-align: center;">Este no es un documento de factura real. Se trata de un proyecto tipo Clone Corral con fines exclusivamente educativos.
¡Gracias por visitar y probar mi página!</p>
        </div>
      </div>
    `;
  }

  /**
   * Envía un correo electrónico utilizando el servidor backend
   */
  static async enviarEmail(emailData) {
    try {
      // 👉 Detectar si estamos en producción o desarrollo
      const baseUrl =
        window.location.hostname.includes("localhost")
          ? "http://localhost:3000"
          : "https://projet1-production-959a.up.railway.app";

      const response = await fetch(`${baseUrl}/enviar-factura`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'El servidor no pudo enviar el correo.');
      }

      return { success: true };
    } catch (error) {
      console.error('Error al enviar la factura:', error);
      return { success: false, error: error.message };
    }
  }
}

Object.assign(CarritoCompras.prototype, {
  generarHtmlFactura: function (pedido) {
    return CarritoEmail.generarHtmlFactura(pedido, this.formatearPrecio);
  },

  async enviarFacturaPorCorreo(pedido) {
    const facturaHtml = this.generarHtmlFactura(pedido);

    const emailData = {
      to: pedido.cliente.email,
      subject: `Confirmación de tu pedido en El Corralazo #${pedido.id}`,
      html: facturaHtml,
    };

    const resultado = await CarritoEmail.enviarEmail(emailData);

    if (resultado.success) {
      this.mostrarNotificacion('Factura enviada a tu correo.', 'success');
    } else {
      this.mostrarNotificacion('No se pudo enviar la factura por correo.', 'error');
    }
  },
});
