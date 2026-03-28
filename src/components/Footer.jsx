export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ube-blue-dark)',
      color: 'rgba(255,255,255,0.5)',
      padding: '40px 24px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontSize: '16px', marginBottom: '4px' }}>UBE Auditorios</div>
          <div style={{ fontSize: '12px' }}>Sistema de reservas y gestión · Universidad Bolivariana del Ecuador</div>
        </div>
        <div style={{ fontSize: '12px', textAlign: 'right' }}>
          <div>Campus Durán · Km 5½ Vía Durán-Yaguachi</div>
          <div>Guayas, Ecuador · ube.edu.ec</div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '20px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', textAlign: 'center' }}>
        Demo v1.0 · Sistema desarrollado como propuesta técnica
      </div>
    </footer>
  )
}