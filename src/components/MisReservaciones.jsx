import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, XCircle, ArrowRight } from 'lucide-react'

const estadoConfig = {
  'En aprobación': { color: '#d97706', bg: 'rgba(217,119,6,0.1)', icon: AlertCircle },
  'Confirmada': { color: '#16a34a', bg: 'rgba(22,163,74,0.1)', icon: CheckCircle },
  'Cancelada': { color: '#dc2626', bg: 'rgba(220,38,38,0.1)', icon: XCircle },
}

export default function MisReservaciones({ reservaciones = [], setVista }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ color: 'var(--ube-red)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Panel de usuario</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '8px' }}>Mis reservaciones</h1>
        <p style={{ color: 'var(--ube-gray-500)', fontSize: '15px' }}>
          {reservaciones.length === 0 ? 'No tienes reservaciones pendientes.' : `${reservaciones.length} solicitud${reservaciones.length !== 1 ? 'es' : ''} registrada${reservaciones.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {reservaciones.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--ube-gray-200)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--ube-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Calendar size={32} color="var(--ube-gray-500)"/>
          </div>
          <h2 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--ube-blue-dark)' }}>No tienes reservaciones pendientes</h2>
          <p style={{ color: 'var(--ube-gray-500)', marginBottom: '28px', fontSize: '14px', lineHeight: 1.7 }}>
            Cuando solicites un espacio, tus reservaciones aparecerán aquí con su estado actualizado en tiempo real.
          </p>
          <button onClick={() => setVista('catalogo')} style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', border: 'none', color: 'white', padding: '12px 28px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Ver auditorios disponibles <ArrowRight size={15}/>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reservaciones.map(r => {
            const config = estadoConfig[r.estado] || estadoConfig['En aprobación']
            const IconEstado = config.icon
            const fecha = r.fecha ? new Date(r.fecha + 'T12:00').toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'
            return (
              <div key={r.id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--ube-gray-200)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ube-gray-100)', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ube-blue)', fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}>{r.id}</span>
                    <span style={{ color: 'var(--ube-gray-200)' }}>·</span>
                    <span style={{ fontSize: '12px', color: 'var(--ube-gray-500)' }}>Solicitada el {new Date(r.fechaCreacion).toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: config.bg, color: config.color, padding: '5px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700 }}>
                    <IconEstado size={13}/> {r.estado}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {r.auditorio?.imagen && <img src={r.auditorio.imagen} alt={r.auditorio.nombre} style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}/>}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11px', color: 'var(--ube-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{r.tipoEvento}</div>
                      <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>{r.auditorio?.nombre || '—'}</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--ube-gray-500)' }}><Calendar size={13}/> {fecha}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--ube-gray-500)' }}><Clock size={13}/> {r.horaInicio} – {r.horaFin}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--ube-gray-500)' }}><MapPin size={13}/> {r.auditorio?.ubicacion || '—'}</div>
                      </div>
                    </div>
                  </div>
                  {r.estado === 'En aprobación' && (
                    <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(217,119,6,0.06)', borderRadius: '8px', border: '1px solid rgba(217,119,6,0.15)', fontSize: '13px', color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={14} color="#d97706"/> Tu solicitud está siendo revisada. Recibirás confirmación en las próximas 2 horas hábiles.
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button onClick={() => setVista('reservar')} style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', border: 'none', color: 'white', padding: '12px 28px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Nueva reservación <ArrowRight size={15}/>
        </button>
      </div>
    </div>
  )
}