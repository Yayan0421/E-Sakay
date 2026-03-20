import React from 'react'
import Sidenavbar from './Sidenavbar'

export default function MSidenavbar({ open = false, onClose = () => {} }) {
  if (!open) return null

  const overlay = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 60,
    display: 'flex',
    alignItems: 'stretch',
  }

  const panel = {
    width: 300,
    maxWidth: '80%',
    height: '100vh',
    background: 'transparent',
    boxShadow: '2px 0 12px rgba(0,0,0,0.16)',
  }

  const closeBtn = {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 70,
    background: 'rgba(255,255,255,0.12)',
    border: 'none',
    color: '#fff',
    width: 36,
    height: 36,
    borderRadius: 8,
    cursor: 'pointer',
  }

  return (
    <div style={overlay} onClick={onClose} aria-hidden>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose} aria-label="Close">✕</button>
        <Sidenavbar />
      </div>
    </div>
  )
}
