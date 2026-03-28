import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Catalogo from './components/Catalogo'
import DetalleAuditorio from './components/DetalleAuditorio'
import FormularioReserva from './components/FormularioReserva'
import MisReservaciones from './components/MisReservaciones'
import Footer from './components/Footer'
import './index.css'

function SobreElSistema() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ color: 'var(--ube-red)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Acerca del sistema</div>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: '24px' }}>UBE Auditorios</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--ube-gray-700)', lineHeight: 1.8, fontSize: '15px' }}>
        <p><strong>UBE Auditorios</strong> es el sistema centralizado de reservas y gestión de espacios de la Universidad Bolivariana del Ecuador.</p>
        <p>El sistema gestiona los <strong>8 auditorios y salas</strong> del campus de Durán, incluyendo el <strong>Gran Auditorio UBE</strong> con capacidad para 1.200 personas, recién inaugurado.</p>
        <div style={{ background: 'rgba(26,58,107,0.06)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(26,58,107,0.12)' }}>
          <h3 style={{ fontSize: '17px', marginBottom: '12px' }}>Funcionalidades principales</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Catálogo completo de auditorios con equipamiento detallado','Solicitud de reservas con wizard paso a paso','Consulta de disponibilidad en tiempo real','Selección de servicios adicionales por evento','Seguimiento de reservaciones y estado de aprobación','Confirmación en menos de 2 horas hábiles','Gestión administrativa completa para el equipo UBE','Inventario y tracking de equipos audiovisuales'].map(item => (
              <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '14px' }}>
                <span style={{ color: 'var(--ube-blue)', fontWeight: 700 }}>→</span>{item}
              </li>
            ))}
          </ul>
        </div>
        <p style={{ color: 'var(--ube-gray-500)', fontSize: '13px', fontStyle: 'italic' }}>Demo funcional desarrollado como propuesta técnica.</p>
      </div>
    </div>
  )
}

export default function App() {
  const [vista, setVista] = useState('home')
  const [auditorioSeleccionado, setAuditorioSeleccionado] = useState(null)
  const [reservaciones, setReservaciones] = useState([])

  const agregarReservacion = (r) => setReservaciones(prev => [r, ...prev])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header vista={vista} setVista={setVista} totalReservaciones={reservaciones.length}/>
      <main style={{ flex: 1 }}>
        {vista === 'home' && <Home setVista={setVista} setAuditorioSeleccionado={setAuditorioSeleccionado}/>}
        {vista === 'catalogo' && <Catalogo setVista={setVista} setAuditorioSeleccionado={setAuditorioSeleccionado}/>}
        {vista === 'detalle' && <DetalleAuditorio auditorio={auditorioSeleccionado} setVista={setVista} setAuditorioSeleccionado={setAuditorioSeleccionado}/>}
        {vista === 'reservar' && <FormularioReserva auditorioPreseleccionado={auditorioSeleccionado} setVista={setVista} agregarReservacion={agregarReservacion}/>}
        {vista === 'misreservaciones' && <MisReservaciones reservaciones={reservaciones} setVista={setVista}/>}
        {vista === 'sobre' && <SobreElSistema/>}
      </main>
      <Footer/>
    </div>
  )
}