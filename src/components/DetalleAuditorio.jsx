import { ArrowLeft, Users, MapPin, Clock, CheckCircle, XCircle, PlusCircle, Calendar } from 'lucide-react'

export default function DetalleAuditorio({ auditorio: a, setVista, setAuditorioSeleccionado }) {
  if (!a) return null
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
      <button onClick={() => setVista('catalogo')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ube-blue)', fontSize: '14px', fontWeight: 500, marginBottom: '28px', padding: 0, cursor: 'pointer' }}>
        <ArrowLeft size={16}/> Volver al catálogo
      </button>
      <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 'clamp(220px, 40vw, 400px)', marginBottom: '32px', position: 'relative' }}>
        <img src={a.imagen} alt={a.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,35,71,0.7) 0%, transparent 60%)' }}/>
        <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '4px' }}>{a.tipo}</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(20px, 4vw, 32px)' }}>{a.nombre}</h1>
        </div>
        <div style={{ position: 'absolute', top: '20px', right: '20px', background: a.disponible ? 'rgba(22,163,74,0.9)' : 'rgba(220,38,38,0.9)', color: 'white', borderRadius: '100px', padding: '6px 14px', fontSize: '13px', fontWeight: 600 }}>
          {a.disponible ? '● Disponible' : '○ No disponible'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr min(320px, 100%)', gap: '32px', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--ube-gray-200)', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
            {[
              { icon: Users, label: 'Capacidad', valor: `${a.capacidad} personas` },
              { icon: MapPin, label: 'Ubicación', valor: a.ubicacion },
              { icon: Clock, label: 'Horario', valor: a.horarioDisponible },
              { icon: Calendar, label: 'Anticipación mínima', valor: a.anticipacionMinima },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: '1 1 200px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--ube-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={16} color="var(--ube-blue)"/>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--ube-gray-500)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ube-gray-700)', marginTop: '2px' }}>{item.valor}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Sobre este espacio</h2>
            <p style={{ color: 'var(--ube-gray-500)', lineHeight: 1.8, fontSize: '15px' }}>{a.descripcion}</p>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Ideal para</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {a.tags.map(tag => (
                <span key={tag} style={{ background: 'rgba(26,58,107,0.08)', color: 'var(--ube-blue)', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(26,58,107,0.12)' }}>{tag}</span>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Equipamiento</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <EquipCard icon={CheckCircle} title="Incluido" items={a.equipamiento.incluido} color="var(--ube-blue)" bgColor="rgba(26,58,107,0.06)"/>
            <EquipCard icon={PlusCircle} title="Servicios extras" items={a.equipamiento.extras} color="#16a34a" bgColor="rgba(22,163,74,0.06)"/>
            <EquipCard icon={XCircle} title="No incluido" items={a.equipamiento.noIncluido} color="var(--ube-gray-500)" bgColor="var(--ube-gray-100)"/>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--ube-gray-200)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '90px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f2347, #1a3a6b)', padding: '24px' }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '4px' }}>Reservar este espacio</div>
            <div style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontSize: '20px' }}>{a.nombre}</div>
          </div>
          <div style={{ padding: '24px' }}>
            {[
              { label: 'Capacidad', valor: `${a.capacidad} personas` },
              { label: 'Horario', valor: a.horarioDisponible },
              { label: 'Anticipación mínima', valor: a.anticipacionMinima },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--ube-gray-100)', fontSize: '14px' }}>
                <span style={{ color: 'var(--ube-gray-500)' }}>{item.label}</span>
                <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '160px', fontSize: '13px' }}>{item.valor}</span>
              </div>
            ))}
            <button onClick={() => { setAuditorioSeleccionado(a); setVista('reservar') }} disabled={!a.disponible}
              style={{ width: '100%', background: a.disponible ? 'linear-gradient(135deg, #c0392b, #e74c3c)' : 'var(--ube-gray-200)', border: 'none', color: a.disponible ? 'white' : 'var(--ube-gray-500)', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: a.disponible ? 'pointer' : 'not-allowed', marginTop: '20px' }}>
              {a.disponible ? 'Solicitar reserva' : 'No disponible ahora'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--ube-gray-500)', marginTop: '12px', lineHeight: 1.5 }}>
              Sujeto a disponibilidad y aprobación del equipo de gestión
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function EquipCard({ icon: Icon, title, items, color, bgColor }) {
  return (
    <div style={{ background: bgColor, borderRadius: 'var(--radius)', padding: '20px', border: `1px solid ${color}22` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Icon size={16} color={color}/>
        <span style={{ fontSize: '13px', fontWeight: 600, color }}>{title}</span>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map(item => (
          <li key={item} style={{ fontSize: '13px', color: 'var(--ube-gray-700)', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
            <span style={{ color, marginTop: '3px', flexShrink: 0 }}>·</span>{item}
          </li>
        ))}
      </ul>
    </div>
  )
}