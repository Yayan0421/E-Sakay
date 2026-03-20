import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenavbar from '../components/dashboard/Sidenavbar'

export default function Dashboard(){
	return (
		<div style={{display:'flex', minHeight:'100vh'}}>
			<Sidenavbar />
			<main style={{flex:1, padding:24}}>
				<Outlet />
			</main>
		</div>
	)
}
