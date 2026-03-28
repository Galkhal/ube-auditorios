import { useState } from 'react'
import { CheckCircle, ChevronRight, ChevronLeft, Send, Clock } from 'lucide-react'
import { auditorios, tiposEvento } from '../data/auditorios'

const PASOS = ['Evento', 'Espacio', 'Servicios', 'Solicitante', 'Confirmar']

export default function FormularioReserva({ auditorioPreseleccionado, setVista, agregarReservacion }) {
  const [paso, setPaso] = useState(0)
  const [enviado, setEnviado] = useState(false)
  const [numeroSolicitud] = useState(`UBE-${Date.now().toString().slice(-6)}`)
  const [form, setForm] = useState({
    tipoEvento: '', descripcion: '', fecha: '', horaInicio: '', horaFin: '',
    asistentes: '', auditorioId: auditorioPreseleccionado?.id || '',
    serviciosExtras: [], nombre: '', email: '', facultad: '', telefono: '', observaciones: '',
  })

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))
  const toggleServicio = (s) => setForm(prev => ({ ...prev, serviciosExtras: prev.serviciosExtras.includes(s) ? prev.serviciosExtras.filter(x => x !== s) : [...prev.serviciosExtras, s] }))
  const auditorioActual = auditorios.find(a => a.id === Number(form.auditorioId))

  const puedeAvanzar = () => {
    if (paso === 0) return form.tipoEvento && form.fecha && form.horaInicio && form.horaFin && form.asistentes
    if (paso === 1) return form.auditorioId
    if (paso === 3) return form.nombre && form.email && form.facultad
    return true
  }

  const handleEnviar = () => {
    const nuevaReservacion = {
      id: numeroSolicitud,
      ...form,
      auditorio: auditorioActual,
      estado: 'En aprobación',
      fechaCreacion: new Date().toISOString(),
    }
    if (agregarReservacion) agregarReservacion(nuevaReservacion)
    setEnviado(true)
  }

  if (enviado) return <Confirmacion form={form} auditorio={auditorioActual} setVista={setVista} numero={numeroSolicitud}/>

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: '36px' }}>
        <div style={{ color: 'var(--ube-red)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Nueva solicitud</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', marginBottom: '8px' }}>Solicitar reserva</h1>
        <p style={{ color: 'var(--ube-gray-500)', fontSize: '14px' }}>Completa el formulario y recibirás confirmación en las próximas 2 horas hábiles</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', overflowX: 'auto', paddingBottom: '4px' }}>
        {PASOS.map((p, i) => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: i < paso ? 'var(--ube-blue)' : i === paso ? 'linear-gradient(135deg, #c0392b, #e74c3c)' : 'var(--ube-gray-200)', color: i <= paso ? 'white' : 'var(--ube-gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                {i < paso ? <CheckCircle size={16}/> : i + 1}
              </div>
              <span style={{ fontSize: '11px', fontWeight: i === paso ? 600 : 400, color: i === paso ? 'var(--ube-red)' : i < paso ? 'var(--ube-blue)' : 'var(--ube-gray-500)', whiteSpace: 'nowrap' }}>{p}</span>
            </div>
            {i < PASOS.length - 1 && <div style={{ height: '2px', width: 'clamp(20px, 5vw, 60px)', background: i < paso ? 'var(--ube-blue)' : 'var(--ube-gray-200)', marginBottom: '18px' }}/>}
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--ube-gray-200)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f2347, #1a3a6b)', padding: '20px 28px' }}>
          <span style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontSize: '17px' }}>
            {['Datos del evento','Selección de espacio','Servicios adicionales','Datos del solicitante','Revisar y confirmar'][paso]}
          </span>
        </div>
        <div style={{ padding: '32px 28px' }}>
          {paso === 0 && <PasoEvento form={form} set={set}/>}
          {paso === 1 && <PasoEspacio form={form} set={set}/>}
          {paso === 2 && <PasoServicios form={form} toggleServicio={toggleServicio} auditorioActual={auditorioActual}/>}
          {paso === 3 && <PasoSolicitante form={form} set={set}/>}
          {paso === 4 && <PasoConfirmar form={form} auditorioActual={auditorioActual}/>}
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid var(--ube-gray-200)', display: 'flex', justifyContent: 'space-between', background: 'var(--ube-gray-100)' }}>
          <button onClick={() => setPaso(p => p - 1)} disabled={paso === 0} style={{ background: 'none', border: '1px solid var(--ube-gray-200)', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', color: paso === 0 ? 'var(--ube-gray-200)' : 'var(--ube-gray-700)', cursor: paso === 0 ? 'not-allowed' : 'pointer' }}>
            ← Anterior
          </button>
          {paso < PASOS.length - 1 ? (
            <button onClick={() => setPaso(p => p + 1)} disabled={!puedeAvanzar()} style={{ background: puedeAvanzar() ? 'linear-gradient(135deg, #1a3a6b, #2a5298)' : 'var(--ube-gray-200)', border: 'none', color: puedeAvanzar() ? 'white' : 'var(--ube-gray-500)', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: puedeAvanzar() ? 'pointer' : 'not-allowed' }}>
              Continuar →
            </button>
          ) : (
            <button onClick={handleEnviar} style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', border: 'none', color: 'white', padding: '10px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Send size={15}/> Enviar solicitud
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid var(--ube-gray-200)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', color: 'var(--ube-gray-700)' }

function Campo({ label, required, children, hint }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ube-gray-700)', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: 'var(--ube-red)', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ fontSize: '11px', color: 'var(--ube-gray-500)', marginTop: '4px' }}>{hint}</p>}
    </div>
  )
}

function PasoEvento({ form, set }) {
  return (
    <div>
      <Campo label="Tipo de evento" required>
        <select value={form.tipoEvento} onChange={e => set('tipoEvento', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Seleccionar tipo de evento...</option>
          {tiposEvento.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </Campo>
      <Campo label="Fecha del evento" required>
        <input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} style={inputStyle}/>
      </Campo>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Campo label="Hora de inicio" required><input type="time" value={form.horaInicio} onChange={e => set('horaInicio', e.target.value)} style={inputStyle}/></Campo>
        <Campo label="Hora de fin" required><input type="time" value={form.horaFin} onChange={e => set('horaFin', e.target.value)} style={inputStyle}/></Campo>
      </div>
      <Campo label="Número estimado de asistentes" required>
        <input type="number" min="1" placeholder="Ej: 80" value={form.asistentes} onChange={e => set('asistentes', e.target.value)} style={inputStyle}/>
      </Campo>
      <Campo label="Descripción del evento" hint="Proporciona contexto para ayudarnos a asignarte el mejor espacio">
        <textarea rows={3} placeholder="Describe brevemente el propósito del evento..." value={form.descripcion} onChange={e => set('descripcion', e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}/>
      </Campo>
    </div>
  )
}

function PasoEspacio({ form, set }) {
  const compatibles = auditorios.filter(a => a.disponible && (!form.asistentes || a.capacidad >= Number(form.asistentes)))
  const noCompatibles = auditorios.filter(a => !a.disponible || (form.asistentes && a.capacidad < Number(form.asistentes)))
  return (
    <div>
      {form.asistentes && <div style={{ background: 'rgba(26,58,107,0.06)', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: 'var(--ube-blue)', border: '1px solid rgba(26,58,107,0.12)' }}>Mostrando espacios con capacidad ≥ {form.asistentes} personas</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {compatibles.map(a => <EspacioOption key={a.id} auditorio={a} selected={form.auditorioId === a.id} onSelect={() => set('auditorioId', a.id)} disabled={false}/>)}
        {noCompatibles.map(a => <EspacioOption key={a.id} auditorio={a} selected={false} onSelect={() => {}} disabled={true}/>)}
      </div>
    </div>
  )
}

function EspacioOption({ auditorio: a, selected, onSelect, disabled }) {
  return (
    <div onClick={() => !disabled && onSelect()} style={{ padding: '16px', borderRadius: 'var(--radius)', border: selected ? '2px solid var(--ube-blue)' : '1px solid var(--ube-gray-200)', background: selected ? 'rgba(26,58,107,0.04)' : disabled ? 'var(--ube-gray-100)' : 'white', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, display: 'flex', gap: '16px', alignItems: 'center' }}>
      <img src={a.imagen} alt={a.nombre} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{a.nombre}</div>
            <div style={{ fontSize: '12px', color: 'var(--ube-gray-500)', marginTop: '2px' }}>{a.tipo} · {a.ubicacion}</div>
          </div>
          <div style={{ background: a.disponible ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)', color: a.disponible ? '#16a34a' : '#dc2626', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '100px', flexShrink: 0 }}>
            {a.disponible ? `${a.capacidad} personas` : 'No disponible'}
          </div>
        </div>
      </div>
      {selected && <CheckCircle size={20} color="var(--ube-blue)" style={{ flexShrink: 0 }}/>}
    </div>
  )
}

function PasoServicios({ form, toggleServicio, auditorioActual }) {
  if (!auditorioActual) return <p style={{ color: 'var(--ube-gray-500)' }}>Selecciona un espacio primero</p>
  return (
    <div>
      <p style={{ color: 'var(--ube-gray-500)', fontSize: '14px', marginBottom: '24px' }}>Servicios adicionales en <strong style={{ color: 'var(--ube-blue)' }}>{auditorioActual.nombre}</strong>:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
        {auditorioActual.equipamiento.extras.map(s => (
          <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '10px', border: form.serviciosExtras.includes(s) ? '2px solid var(--ube-blue)' : '1px solid var(--ube-gray-200)', background: form.serviciosExtras.includes(s) ? 'rgba(26,58,107,0.04)' : 'white', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.serviciosExtras.includes(s)} onChange={() => toggleServicio(s)} style={{ width: 16, height: 16, accentColor: 'var(--ube-blue)' }}/>
            <span style={{ fontSize: '14px', fontWeight: form.serviciosExtras.includes(s) ? 600 : 400 }}>{s}</span>
          </label>
        ))}
      </div>
      <div style={{ background: 'rgba(26,58,107,0.04)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(26,58,107,0.1)' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ube-blue)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Incluido sin costo adicional</div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {auditorioActual.equipamiento.incluido.map(e => (
            <li key={e} style={{ fontSize: '13px', color: 'var(--ube-gray-700)', display: 'flex', gap: '6px' }}>
              <CheckCircle size={13} color="#16a34a" style={{ marginTop: '3px', flexShrink: 0 }}/> {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PasoSolicitante({ form, set }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Campo label="Nombre completo" required><input type="text" placeholder="Tu nombre y apellido" value={form.nombre} onChange={e => set('nombre', e.target.value)} style={inputStyle}/></Campo>
        <Campo label="Correo institucional" required><input type="email" placeholder="usuario@ube.edu.ec" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle}/></Campo>
        <Campo label="Facultad / Unidad" required><input type="text" placeholder="Ej: Facultad de Ingeniería" value={form.facultad} onChange={e => set('facultad', e.target.value)} style={inputStyle}/></Campo>
        <Campo label="Teléfono"><input type="tel" placeholder="Ej: 0999123456" value={form.telefono} onChange={e => set('telefono', e.target.value)} style={inputStyle}/></Campo>
      </div>
      <Campo label="Observaciones" hint="Requerimientos especiales u otros detalles relevantes">
        <textarea rows={3} placeholder="Cualquier detalle adicional para el equipo técnico..." value={form.observaciones} onChange={e => set('observaciones', e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}/>
      </Campo>
    </div>
  )
}

function PasoConfirmar({ form, auditorioActual }) {
  const fecha = form.fecha ? new Date(form.fecha + 'T12:00').toLocaleDateString('es-EC', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''
  return (
    <div>
      <p style={{ color: 'var(--ube-gray-500)', marginBottom: '24px', fontSize: '14px' }}>Revisa los detalles antes de enviar.</p>
      {[
        { label: 'Tipo de evento', valor: form.tipoEvento },
        { label: 'Fecha', valor: fecha },
        { label: 'Horario', valor: `${form.horaInicio} – ${form.horaFin}` },
        { label: 'Asistentes', valor: `${form.asistentes} personas` },
        { label: 'Espacio', valor: auditorioActual?.nombre || '—' },
        { label: 'Servicios extras', valor: form.serviciosExtras.length ? form.serviciosExtras.join(', ') : 'Ninguno' },
        { label: 'Solicitante', valor: form.nombre },
        { label: 'Correo', valor: form.email },
        { label: 'Facultad', valor: form.facultad },
      ].map((item) => (
        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--ube-gray-100)' }}>
          <span style={{ fontSize: '13px', color: 'var(--ube-gray-500)' }}>{item.label}</span>
          <span style={{ fontSize: '13px', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{item.valor}</span>
        </div>
      ))}
    </div>
  )
}

function Confirmacion({ form, auditorio, setVista, numero }) {
  const fecha = form.fecha ? new Date(form.fecha + 'T12:00').toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #16a34a, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 4px 20px rgba(22,163,74,0.3)' }}>
          <CheckCircle size={40} color="white"/>
        </div>
        <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>¡Solicitud enviada!</h1>
        <div style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '12px', padding: '16px 20px' }}>
          <p style={{ color: 'var(--ube-gray-700)', lineHeight: 1.8, fontSize: '15px' }}>
            Tu espacio <strong>{auditorio?.nombre}</strong> está reservado y en etapa de aprobación. En el curso de las próximas <strong>2 horas hábiles</strong> recibirás tu confirmación definitiva en <strong>{form.email}</strong>. Gracias por utilizar este servicio.
          </p>
        </div>
      </div>

      {/* Número de solicitud */}
      <div style={{ background: 'linear-gradient(135deg, #0f2347, #1a3a6b)', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} color="rgba(255,255,255,0.6)"/>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Número de solicitud</span>
        </div>
        <span style={{ color: '#d4a843', fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, letterSpacing: '2px' }}>{numero}</span>
      </div>

      {/* Resumen completo */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--ube-gray-200)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: '28px' }}>
        <div style={{ background: 'var(--ube-gray-100)', padding: '14px 20px', borderBottom: '1px solid var(--ube-gray-200)' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ube-blue)', textTransform: 'uppercase', letterSpacing: '1px' }}>Resumen de tu reservación</span>
        </div>

        {auditorio?.imagen && (
          <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
            <img src={auditorio.imagen} alt={auditorio.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,35,71,0.7) 0%, transparent 50%)' }}/>
            <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>{auditorio.tipo}</div>
              <div style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700 }}>{auditorio.nombre}</div>
            </div>
          </div>
        )}

        <div style={{ padding: '4px 0' }}>
          {[
            { label: 'Tipo de evento', valor: form.tipoEvento },
            { label: 'Fecha', valor: fecha },
            { label: 'Horario', valor: `${form.horaInicio} – ${form.horaFin}` },
            { label: 'Asistentes estimados', valor: `${form.asistentes} personas` },
            { label: 'Ubicación', valor: auditorio?.ubicacion || '—' },
            { label: 'Servicios adicionales', valor: form.serviciosExtras.length ? form.serviciosExtras.join(', ') : 'Ninguno' },
            { label: 'Solicitante', valor: form.nombre },
            { label: 'Facultad / Unidad', valor: form.facultad },
            { label: 'Correo de confirmación', valor: form.email },
            form.telefono ? { label: 'Teléfono', valor: form.telefono } : null,
            form.observaciones ? { label: 'Observaciones', valor: form.observaciones } : null,
          ].filter(Boolean).map((item, i) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '11px 20px', background: i % 2 === 0 ? 'white' : 'rgba(248,247,244,0.8)', borderBottom: '1px solid var(--ube-gray-100)' }}>
              <span style={{ fontSize: '13px', color: 'var(--ube-gray-500)', flexShrink: 0 }}>{item.label}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, textAlign: 'right', color: 'var(--ube-gray-700)' }}>{item.valor}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setVista('misreservaciones')} style={{ background: 'var(--ube-blue)', border: 'none', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          Ver mis reservaciones
        </button>
        <button onClick={() => setVista('home')} style={{ background: 'none', border: '1px solid var(--ube-gray-200)', color: 'var(--ube-gray-700)', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
          Volver al inicio
        </button>
      </div>
    </div>
  )
}