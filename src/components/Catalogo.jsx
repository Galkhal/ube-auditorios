import { useState } from 'react'
import { Search, SlidersHorizontal, Users } from 'lucide-react'
import { auditorios } from '../data/auditorios'
import { AuditorioCard } from './Home'

export default function Catalogo({ setVista, setAuditorioSeleccionado }) {
  const [busqueda, setBusqueda] = useState('')
  const [filtroDisponible, setFiltroDisponible] = useState('todos')
  const [filtroCapacidad, setFiltroCapacidad] = useState('todos')

  const filtrados = auditorios.filter(a => {
    const matchBusqueda = a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(busqueda.toLowerCase()))
    const matchDisponible = filtroDisponible === 'todos' ? true : filtroDisponible === 'disponible' ? a.disponible : !a.disponible
    const matchCapacidad = filtroCapacidad === 'todos' ? true : filtroCapacidad === 'pequena' ? a.capacidad <= 60 : filtroCapacidad === 'mediana' ? a.capacidad > 60 && a.capacidad <= 150 : a.capacidad > 150
    return matchBusqueda && matchDisponible && matchCapacidad
  })

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ color: 'var(--ube-red)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Catálogo de espacios</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: '12px' }}>Auditorios y salas UBE</h1>
        <p style={{ color: 'var(--ube-gray-500)', fontSize: '15px' }}>{auditorios.length} espacios disponibles en el campus de Durán</p>
      </div>

      <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '20px', marginBottom: '32px', border: '1px solid var(--ube-gray-200)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ube-gray-500)' }}/>
          <input type="text" placeholder="Buscar por nombre, tipo o uso..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid var(--ube-gray-200)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'var(--ube-gray-100)' }}/>
        </div>
        <div style={{ display: 'flex', gap: '4px', background: 'var(--ube-gray-100)', borderRadius: '8px', padding: '4px' }}>
          {[['todos','Todos'],['disponible','Disponibles'],['ocupado','No disponibles']].map(([val, label]) => (
            <button key={val} onClick={() => setFiltroDisponible(val)} style={{ background: filtroDisponible === val ? 'white' : 'none', border: 'none', padding: '7px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: filtroDisponible === val ? 600 : 400, color: filtroDisponible === val ? 'var(--ube-blue)' : 'var(--ube-gray-500)', boxShadow: filtroDisponible === val ? 'var(--shadow-sm)' : 'none' }}>{label}</button>
          ))}
        </div>
        <select value={filtroCapacidad} onChange={e => setFiltroCapacidad(e.target.value)}
          style={{ padding: '10px 14px', border: '1px solid var(--ube-gray-200)', borderRadius: '8px', fontSize: '13px', background: 'var(--ube-gray-100)', color: 'var(--ube-gray-700)', outline: 'none', cursor: 'pointer' }}>
          <option value="todos">Cualquier capacidad</option>
          <option value="pequena">Pequeño (≤60 personas)</option>
          <option value="mediana">Mediano (61–150)</option>
          <option value="grande">Grande (150+)</option>
        </select>
        <div style={{ color: 'var(--ube-gray-500)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <SlidersHorizontal size={14}/>{filtrados.length} resultado{filtrados.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--ube-gray-500)' }}>
          <Users size={40} style={{ opacity: 0.3, marginBottom: '16px' }}/>
          <p>No se encontraron espacios con esos filtros.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filtrados.map(a => (
            <AuditorioCard key={a.id} auditorio={a}
              onVer={() => { setAuditorioSeleccionado(a); setVista('detalle') }}
              onReservar={() => { setAuditorioSeleccionado(a); setVista('reservar') }}
            />
          ))}
        </div>
      )}
    </div>
  )
}