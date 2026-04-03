import React from 'react'
import MainDashboard from '../../components/dashboard/maindashboard'
import MainDashboard2 from '../../components/dashboard/maindashboard2'
import MainDashboard3 from '../../components/dashboard/maindashboard3'
import DashboardFooter from '../../components/dashboard/dashboardfooter'

export default function DashboardHome(){
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <MainDashboard />
      <MainDashboard2 />
      <MainDashboard3 />

    </div>
  )
}
