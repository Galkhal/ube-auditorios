import { useState } from 'react'
import { Menu, X, Calendar, LayoutGrid, Info, BookOpen } from 'lucide-react'

export default function Header({ vista, setVista, totalReservaciones }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { id: 'catalogo', label: 'Auditorios', icon: LayoutGrid },
    { id: 'reservar', label: 'Reservar', icon: Calendar },
    { id: 'misreservaciones', label: 'Mis reservaciones', icon: BookOpen },
    { id: 'sobre', label: 'Acerca del sistema', icon: Info },
  ]

  return (
    <header style={{
      background: 'linear-gradient(135deg, #0f2347 0%, #1a3a6b 60%, #1e4a8a 100%)',
      boxShadow: '0 2px 20px rgba(15,35,71,0.4)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Barra superior institucional con logo grande */}
      <div style={{
        background: 'rgba(0,0,0,0.35)',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '2px solid rgba(212,168,67,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src="/logo-ube-color.png"
            alt="UBE"
            style={{ height: '98px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
          />
          <div>
            <div style={{ color: 'white', fontSize: '30px', fontWeight: 700, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>
              Universidad Bolivariana del Ecuador
            </div>
            <div style={{ color: 'rgba(212,168,67,0.9)', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '3px' }}>
              Campus Durán · Guayas, Ecuador
            </div>
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 32px', maxWidth: '1300px', margin: '0 auto', width: '100%',
      }}>
        {/* Logo + título del sistema */}
        <button onClick={() => setVista('home')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: 0 }}>
          <img
            src="/logo-ube-color.png"
            alt="UBE"
            style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.3))' }}
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontSize: '19px', fontWeight: 700, lineHeight: 1.1 }}>
              UBE Auditorios
            </div>
            <div style={{ color: 'rgba(212,168,67,0.8)', fontSize: '10px', letterSpacing: '1px', marginTop: '2px', textTransform: 'uppercase' }}>
              Sistema de reservas y gestión
            </div>
          </div>
        </button>

        {/* Nav desktop */}
        <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
          {nav.map(item => (
            <button key={item.id} onClick={() => { setVista(item.id); setMenuOpen(false) }}
              style={{
                background: vista === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: vista === item.id ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                color: vista === item.id ? 'white' : 'rgba(255,255,255,0.75)',
                padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
              }}>
              <item.icon size={13}/>
              {item.label}
              {item.id === 'misreservaciones' && totalReservaciones > 0 && (
                <span style={{ background: '#c0392b', color: 'white', borderRadius: '100px', fontSize: '10px', fontWeight: 700, padding: '1px 6px', marginLeft: '2px' }}>
                  {totalReservaciones}
                </span>
              )}
            </button>
          ))}
          <button onClick={() => setVista('reservar')} style={{
            background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
            border: 'none', color: 'white', padding: '9px 20px', borderRadius: '8px',
            fontSize: '13px', fontWeight: 600, marginLeft: '8px',
            boxShadow: '0 2px 10px rgba(192,57,43,0.4)', cursor: 'pointer',
          }}>
            Solicitar reserva
          </button>
        </nav>

        {/* Botón móvil */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px', color: 'white', display: 'none', cursor: 'pointer' }}>
          {menuOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div style={{ background: 'rgba(10,25,50,0.98)', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {nav.map(item => (
            <button key={item.id} onClick={() => { setVista(item.id); setMenuOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)', padding: '12px 0', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <item.icon size={16}/>{item.label}
              </div>
              {item.id === 'misreservaciones' && totalReservaciones > 0 && (
                <span style={{ background: '#c0392b', color: 'white', borderRadius: '100px', fontSize: '11px', fontWeight: 700, padding: '2px 8px' }}>{totalReservaciones}</span>
              )}
            </button>
          ))}
          <button onClick={() => { setVista('reservar'); setMenuOpen(false) }}
            style={{ width: '100%', background: 'linear-gradient(135deg, #c0392b, #e74c3c)', border: 'none', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, marginTop: '12px', cursor: 'pointer' }}>
            Solicitar reserva
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}