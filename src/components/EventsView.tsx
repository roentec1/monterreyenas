import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Send,
  Sparkles,
  PartyPopper,
  CheckCircle2,
  Utensils,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  ArrowRight,
  Flame,
  Award,
} from 'lucide-react';

interface EventsViewProps {
  onNavigateTab: (tab: 'inicio' | 'menu' | 'pedido' | 'eventos') => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onNavigateTab }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    tipoEvento: 'Cumpleaños / Festejo',
    fecha: '',
    hora: '19:00',
    invitados: '25 a 40 personas',
    municipio: 'Guadalupe',
    paquete: 'Paquete Clásico Burgers + Papas',
    comentarios: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const EVENT_TYPES = [
    'Cumpleaños / Festejo',
    'Reunión Familiar / Carne Asada',
    'Posada / Fiesta de Fin de Año',
    'Evento de Empresa / Oficina',
    'Despedida / Bautizo / Primera Comunión',
    'Reunión de Amigos / Ver Partido',
    'Otro tipo de evento',
  ];

  const GUEST_RANGES = [
    '15 a 25 personas',
    '25 a 40 personas',
    '40 a 70 personas',
    '70 a 100 personas',
    'Más de 100 personas',
  ];

  const MUNICIPIOS = [
    'Guadalupe',
    'Monterrey',
    'San Nicolás',
    'Apodaca',
    'San Pedro',
    'Juárez',
    'Santa Catarina',
    'Escobedo',
    'Otro municipio en NL',
  ];

  const PACKAGES = [
    'Paquete Clásico (Hamburguesas Monterreyena & Vaquera)',
    'Paquete Completo (Burgers + Papas a la Francesa)',
    'Paquete Parrillero (Burgers + Boneless + Aros de Cebolla)',
    'Paquete Todo Incluido (Burgers + Papas + Bebidas frías)',
    'Personalizado / A la medida',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      '¡Hola La Monterreyena Burguer! 🍔🎉',
      'Me gustaría cotizar un servicio para un evento especial:',
      '',
      `👤 *Organizador:* ${formData.nombre.trim()}`,
      `📱 *Teléfono:* ${formData.telefono.trim()}`,
      `🎈 *Tipo de Evento:* ${formData.tipoEvento}`,
      `📅 *Fecha propuesta:* ${formData.fecha || 'Por definir'}`,
      `⏰ *Hora aproximada:* ${formData.hora || 'Por definir'}`,
      `👥 *Invitados estimados:* ${formData.invitados}`,
      `📍 *Municipio / Zona:* ${formData.municipio}`,
      `🍔 *Paquete de interés:* ${formData.paquete}`,
    ];

    if (formData.comentarios.trim()) {
      lines.push(`📝 *Detalles adicionales:* ${formData.comentarios.trim()}`);
    }

    lines.push('');
    lines.push('¿Me podrían brindar costos y disponibilidad para esta fecha? ¡Muchas gracias!');

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setErrorMsg('Por favor escribe tu nombre.');
      return;
    }

    if (!formData.telefono.trim() || formData.telefono.replace(/\D/g, '').length < 8) {
      setErrorMsg('Por favor ingresa un teléfono o WhatsApp válido (mínimo 8-10 dígitos).');
      return;
    }

    if (!formData.fecha) {
      setErrorMsg('Por favor selecciona la fecha aproximada de tu evento.');
      return;
    }

    const message = generateWhatsAppMessage();
    const waUrl = `https://wa.me/528136430081?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-5 pb-24 anim-fade-in">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#242323] via-[#1a1918] to-[#131313] p-5 border-b border-[#292827]">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-[#ffb800]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffb800]/20 border border-[#ffb800]/40 text-[#ffdca1] text-xs font-bold uppercase tracking-wider w-fit">
            <PartyPopper className="w-3.5 h-3.5 text-[#ffb800]" />
            Eventos Regios
          </div>

          <h1 className="font-oswald text-3xl sm:text-4xl uppercase tracking-wider text-[#ffdca1] leading-tight">
            Hamburguesas para tus Eventos
          </h1>

          <p className="text-sm text-[#d5c4ab] leading-relaxed">
            Cumpleaños, reuniones familiares, carnes asadas y eventos de empresa. Llevamos el auténtico sabor regio de <strong className="text-[#ffdca1]">La Monterreyena</strong> con preparación al momento.
          </p>

          {/* Social Media Quick Bar */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-[#a0a0a0] font-medium">Síguenos:</span>
            <a
              href="https://www.facebook.com/profile.php?id=100087675398991"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] border border-[#1877F2]/40 text-xs font-semibold transition-colors"
            >
              <Facebook className="w-3.5 h-3.5 fill-[#1877F2]" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/monterreyenas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E4405F]/20 hover:bg-[#E4405F]/30 text-[#E4405F] border border-[#E4405F]/40 text-xs font-semibold transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              Instagram
            </a>
            <a
              href="https://wa.me/528136430081"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-[#1b1a19] border border-[#2b2a29] flex flex-col items-center gap-1">
            <Flame className="w-5 h-5 text-[#ffb4ac]" />
            <span className="text-[11px] font-bold text-[#ffdca1] uppercase leading-tight">
              Al Carbón y al Momento
            </span>
            <span className="text-[10px] text-[#a0a0a0]">Calidad 100% casera</span>
          </div>
          <div className="p-3 rounded-xl bg-[#1b1a19] border border-[#2b2a29] flex flex-col items-center gap-1">
            <Users className="w-5 h-5 text-[#ffb800]" />
            <span className="text-[11px] font-bold text-[#ffdca1] uppercase leading-tight">
              Desde 15 Personas
            </span>
            <span className="text-[10px] text-[#a0a0a0]">Hasta más de 150</span>
          </div>
          <div className="p-3 rounded-xl bg-[#1b1a19] border border-[#2b2a29] flex flex-col items-center gap-1">
            <Award className="w-5 h-5 text-[#5efd8a]" />
            <span className="text-[11px] font-bold text-[#ffdca1] uppercase leading-tight">
              Servicio Puntual
            </span>
            <span className="text-[10px] text-[#a0a0a0]">Todo listo y caliente</span>
          </div>
        </div>
      </section>

      {/* Form Card */}
      <section className="px-4">
        <div className="bg-[#1b1a19] border border-[#2d2b29] rounded-2xl p-4 sm:p-5 shadow-xl relative">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#292827]">
            <Sparkles className="w-5 h-5 text-[#ffb800]" />
            <div>
              <h2 className="font-oswald text-xl uppercase tracking-wider text-[#ffdca1]">
                Formulario de Cotización para Eventos
              </h2>
              <p className="text-xs text-[#a0a0a0]">
                Llena los datos y enviaremos tu solicitud directa a nuestro WhatsApp para darte atención inmediata.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-5 rounded-xl bg-[#152e1c] border border-[#25d366]/40 flex flex-col items-center text-center gap-3 anim-scale">
              <CheckCircle2 className="w-12 h-12 text-[#5efd8a]" />
              <h3 className="font-oswald text-xl text-[#ffdca1] uppercase">
                ¡Solicitud lista para enviar!
              </h3>
              <p className="text-xs text-[#d5c4ab] max-w-xs leading-relaxed">
                Se ha generado el mensaje detallado con tus requerimientos. Si WhatsApp no se abrió automáticamente, haz clic en el botón de abajo:
              </p>
              <div className="flex flex-col w-full gap-2 pt-2">
                <a
                  href={`https://wa.me/528136430081?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-oswald text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Abrir Chat de WhatsApp (+52 81 3643 0081)
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full py-2 px-3 rounded-xl bg-[#242323] hover:bg-[#333231] text-xs text-[#d5c4ab] transition-colors"
                >
                  Modificar datos del evento
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-[#a90111]/20 border border-[#ffb4ac]/40 text-[#ffb4ac] text-xs font-semibold">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#d5c4ab] mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej. Roberto Garza"
                    required
                    className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] placeholder-[#736e67] focus:outline-none focus:border-[#ffb800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d5c4ab] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ej. 81 1234 5678"
                    required
                    className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] placeholder-[#736e67] focus:outline-none focus:border-[#ffb800]"
                  />
                </div>
              </div>

              {/* Tipo de evento */}
              <div>
                <label className="block text-xs font-semibold text-[#d5c4ab] mb-1">
                  Tipo de Evento
                </label>
                <select
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleInputChange}
                  className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#ffb800]"
                >
                  {EVENT_TYPES.map(tipo => (
                    <option key={tipo} value={tipo} className="bg-[#1f1e1d] text-[#e5e2e1]">
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha y Hora */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#d5c4ab] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#ffb800]" />
                    Fecha del Evento *
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#ffb800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d5c4ab] mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ffb800]" />
                    Hora Estimada
                  </label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#ffb800]"
                  />
                </div>
              </div>

              {/* Invitados y Municipio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#d5c4ab] mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#ffb800]" />
                    Número de Invitados
                  </label>
                  <select
                    name="invitados"
                    value={formData.invitados}
                    onChange={handleInputChange}
                    className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#ffb800]"
                  >
                    {GUEST_RANGES.map(range => (
                      <option key={range} value={range} className="bg-[#1f1e1d] text-[#e5e2e1]">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d5c4ab] mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ffb800]" />
                    Municipio o Ubicación
                  </label>
                  <select
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleInputChange}
                    className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#ffb800]"
                  >
                    {MUNICIPIOS.map(mun => (
                      <option key={mun} value={mun} className="bg-[#1f1e1d] text-[#e5e2e1]">
                        {mun}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Paquete de interés */}
              <div>
                <label className="block text-xs font-semibold text-[#d5c4ab] mb-1 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-[#ffb800]" />
                  Paquete o Menú Deseado
                </label>
                <select
                  name="paquete"
                  value={formData.paquete}
                  onChange={handleInputChange}
                  className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2.5 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#ffb800]"
                >
                  {PACKAGES.map(pkg => (
                    <option key={pkg} value={pkg} className="bg-[#1f1e1d] text-[#e5e2e1]">
                      {pkg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comentarios o notas */}
              <div>
                <label className="block text-xs font-semibold text-[#d5c4ab] mb-1">
                  Requerimientos Especiales / Dudas
                </label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Ej. Requerimos servicio en quinta privada, o nos gustaría incluir refrescos fríos..."
                  className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2 text-sm text-[#e5e2e1] placeholder-[#736e67] focus:outline-none focus:border-[#ffb800] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="shimmer-btn w-full h-12 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-oswald text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enviar Cotización a WhatsApp</span>
                <Send className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[11px] text-[#8e8a84] text-center">
                Te responderemos directamente por WhatsApp con disponibilidad de fecha y presupuesto personalizado.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Social Media & Contact Section */}
      <section className="px-4">
        <div className="bg-[#181716] border border-[#272625] rounded-2xl p-4 flex flex-col gap-3">
          <h3 className="font-oswald text-base uppercase tracking-wider text-[#ffdca1] flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#ffb800]" />
            Redes Sociales & Contacto Directo
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/lamonterreyenaburguer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#242323] hover:bg-[#2d2c2b] border border-[#383531] flex flex-col items-center text-center gap-1.5 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-[#1877F2]/20 flex items-center justify-center text-[#1877F2] group-hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5 fill-[#1877F2]" />
              </div>
              <span className="text-xs font-bold text-[#e5e2e1]">Facebook</span>
              <span className="text-[10px] text-[#a0a0a0]">@lamonterreyenaburguer</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/lamonterreyenaburguer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#242323] hover:bg-[#2d2c2b] border border-[#383531] flex flex-col items-center text-center gap-1.5 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-[#E4405F]/20 flex items-center justify-center text-[#E4405F] group-hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#e5e2e1]">Instagram</span>
              <span className="text-[10px] text-[#a0a0a0]">@lamonterreyenaburguer</span>
            </a>
          </div>

          <div className="p-3 rounded-xl bg-[#141414] border border-[#242323] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ffb800] shrink-0" />
              <div>
                <p className="font-semibold text-[#ffdca1]">Sucursal Guadalupe</p>
                <p className="text-[11px] text-[#a0a0a0]">Plutarco E Calles #1250, Gpe NL</p>
              </div>
            </div>
            <a
              href="tel:528136430081"
              className="px-3 py-1.5 rounded-lg bg-[#ffb800]/15 hover:bg-[#ffb800]/25 text-[#ffdca1] font-bold text-xs shrink-0 border border-[#ffb800]/30 transition-colors"
            >
              Llamar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
