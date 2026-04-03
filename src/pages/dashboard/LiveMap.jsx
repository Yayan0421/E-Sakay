import React, { useContext } from 'react'
import LiveMap from '../../components/dashboard/livemap'
import { useOutletContext } from 'react-router-dom'
import '../../styles/livemap.css'
import '../../styles/homedashboard.css'

function LiveMapPage() {
  const { collapsed } = useOutletContext()

  return (
    <div className={`sidebar-collapsed-${collapsed ? 'true' : 'false'}`}>
      <LiveMap collapsed={collapsed} />
    </div>
  )
}

export default LiveMapPage
