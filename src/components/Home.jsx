import { ArrowRight, Users, MapPin } from 'lucide-react'
import { auditorios } from '../data/auditorios'

export default function Home({ setVista, setAuditorioSeleccionado }) {
  const destacados = auditorios.filter(a => a.destacado)
  const totalCapacidad = auditorios.reduce((sum, a) => sum + a.capacidad, 0)

  return (
    <div>
      <section style={{ background: 'linear-gradient(160deg, #0f2347 0%, #1a3a6b 50%, #1e4a8a 100%)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,168,67,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(192,57,43,0.1) 0%, transparent 40%)`, pointerEvents: 'none' }}/>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4a843' }}/>
            <span style={{ color: '#d4a843', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Sistema de reservas UBE · {auditorios.filter(a=>a.disponible).length} espacios disponibles
            </span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 6vw, 56px)', fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.15, marginBottom: '20px' }}>
            Reserva el espacio perfecto para tu evento en la <span style={{ color: '#d4a843' }}>UBE</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px' }}>
            Gestiona reservas de auditorios y espacios del campus con facilidad. Consulta disponibilidad, equipamiento y confirma en minutos.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setVista('catalogo')} style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', border: 'none', color: 'white', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(192,57,43,0.4)' }}>
              Ver auditorios disponibles <ArrowRight size={16}/>
            </button>
            <button onClick={() => setVista('reservar')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 500 }}>
              Solicitar reserva
            </button>
          </div>
        </div>
        <div style={{ maxWidth: '900px', margin: '64px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
          {[
            { valor: '8', label: 'Espacios disponibles' },
            { valor: totalCapacidad.toLocaleString(), label: 'Capacidad total' },
            { valor: '7', label: 'Días de operación' },
            { valor: '< 24h', label: 'Confirmación' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '24px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'white', fontSize: '26px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{stat.valor}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '72px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ color: 'var(--ube-red)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Espacios destacados</div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>Los espacios más solicitados</h2>
          </div>
          <button onClick={() => setVista('catalogo')} style={{ background: 'none', border: '1px solid var(--ube-blue)', color: 'var(--ube-blue)', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            Ver todos <ArrowRight size={14}/>
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {destacados.map(a => (
            <AuditorioCard key={a.id} auditorio={a}
              onVer={() => { setAuditorioSeleccionado(a); setVista('detalle') }}
              onReservar={() => { setAuditorioSeleccionado(a); setVista('reservar') }}
            />
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #0f2347, #1a3a6b)', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: 'clamp(22px, 4vw, 36px)', marginBottom: '12px' }}>¿Listo para reservar tu espacio?</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '15px' }}>Completa el formulario y recibirás confirmación en menos de 24 horas</p>
        <button onClick={() => setVista('reservar')} style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', border: 'none', color: 'white', padding: '16px 40px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(192,57,43,0.4)' }}>
          Solicitar reserva ahora <ArrowRight size={18}/>
        </button>
      </section>
    </div>
  )
}

export function AuditorioCard({ auditorio: a, onVer, onReservar }) {
  return (
    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--ube-gray-200)', transition: 'transform 0.25s, box-shadow 0.25s' }}
      onMouseOver={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)' }}
      onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)' }}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={a.imagen} alt={a.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: a.disponible ? 'rgba(22,163,74,0.9)' : 'rgba(220,38,38,0.9)', color: 'white', borderRadius: '100px', padding: '4px 10px', fontSize: '11px', fontWeight: 600 }}>
            {a.disponible ? '● Disponible' : '○ No disponible'}
          </div>
          {a.badge && <div style={{ background: 'rgba(212,168,67,0.95)', color: '#0f2347', borderRadius: '100px', padding: '4px 10px', fontSize: '10px', fontWeight: 700 }}>✦ {a.badge}</div>}
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15,35,71,0.85)', color: 'white', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={11}/> {a.capacidad}
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: '11px', color: 'var(--ube-red)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{a.tipo}</div>
        <h3 style={{ fontSize: '16px', marginBottom: '8px', lineHeight: 1.3 }}>{a.nombre}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--ube-gray-500)', fontSize: '12px', marginBottom: '12px' }}>
          <MapPin size={12}/> {a.ubicacion}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--ube-gray-500)', lineHeight: 1.6, marginBottom: '16px' }}>{a.descripcion.substring(0, 100)}...</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {a.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{ background: 'var(--ube-gray-100)', color: 'var(--ube-blue)', fontSize: '11px', fontWeight: 500, padding: '3px 8px', borderRadius: '100px' }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onVer} style={{ flex: 1, background: 'none', border: '1px solid var(--ube-gray-200)', color: 'var(--ube-blue)', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 500 }}>Ver detalle</button>
          <button onClick={onReservar} disabled={!a.disponible} style={{ flex: 1, background: a.disponible ? 'linear-gradient(135deg, #1a3a6b, #2a5298)' : 'var(--ube-gray-200)', border: 'none', color: a.disponible ? 'white' : 'var(--ube-gray-500)', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: a.disponible ? 'pointer' : 'not-allowed' }}>
            {a.disponible ? 'Reservar' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>
  )
}