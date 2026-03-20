import React from 'react'

const conversations = [
	{ id: 1, name: 'Jennifer Fritz', last: 'I’m looking to work with a designer that…', time: '3:15 PM' },
	{ id: 2, name: 'Laney Gray', last: 'Individuals and interactions over…', time: '5:15 PM' },
	{ id: 3, name: 'Oscar Thomsen', last: 'Responding', time: '11:05 PM' },
]

export default function Message(){
	return (
		<div style={{display:'flex', height: '80vh', gap:24}}>
			<aside style={{width:320, background:'#f7fafc', borderRadius:8, padding:12, boxShadow:'0 2px 6px rgba(12,30,60,0.04)', border:'1px solid #eef2f7'}}>
				<div style={{padding:'8px 6px'}}>
					<input placeholder="Search..." style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #e6eef6'}} />
				</div>

				<ul style={{listStyle:'none', margin:0, padding:0, marginTop:12}}>
					{conversations.map(c => (
						<li key={c.id} style={{display:'flex', alignItems:'center', gap:12, padding:'10px', borderRadius:8, cursor:'pointer', border:'1px solid transparent'}} onMouseEnter={e=>e.currentTarget.style.border='1px solid #eef2f7'} onMouseLeave={e=>e.currentTarget.style.border='1px solid transparent'}>
							<div style={{width:44, height:44, borderRadius:44, background:'#e2edf8', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700}}>{c.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
							<div style={{flex:1}}>
								<div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
									<strong>{c.name}</strong>
									<span style={{fontSize:12, color:'#6b7280'}}>{c.time}</span>
								</div>
								<div style={{fontSize:13, color:'#6b7280', marginTop:4}}>{c.last}</div>
							</div>
						</li>
					))}
				</ul>
			</aside>

			<section style={{flex:1, display:'flex', flexDirection:'column', background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(12,30,60,0.04)', border:'1px solid #eef2f7'}}>
				<header style={{padding:16, borderBottom:'1px solid #eef2f7', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
					<div style={{display:'flex', alignItems:'center', gap:12}}>
						<div style={{width:44, height:44, borderRadius:44, background:'#e2edf8', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700}}>JF</div>
						<div>
							<div style={{fontWeight:700}}>Jennifer Fritz</div>
							<div style={{fontSize:12, color:'#6b7280'}}>Active Now</div>
						</div>
					</div>
					<div style={{display:'flex', gap:12}}>
						<button style={{border:'none', background:'transparent', cursor:'pointer'}}>🔍</button>
						<button style={{border:'none', background:'transparent', cursor:'pointer'}}>⚙️</button>
					</div>
				</header>

				<div style={{flex:1, padding:20, overflowY:'auto'}}>
					<div style={{display:'flex', justifyContent:'flex-start', marginBottom:12}}>
						<div style={{background:'#f1f5f9', padding:12, borderRadius:12, maxWidth:'60%', border:'1px solid #e6eef6'}}>Your story continues on mobile: Build and edit decks. Give and receive feedback.</div>
					</div>
					<div style={{display:'flex', justifyContent:'flex-end', marginBottom:12}}>
						<div style={{background:'#dbeafe', padding:12, borderRadius:12, maxWidth:'60%', border:'1px solid #dbefff'}}>I've always been on the fringe of people in the design community.</div>
					</div>
				</div>

				<footer style={{padding:12, borderTop:'1px solid #eef2f7', display:'flex', gap:8, alignItems:'center'}}>
					<input placeholder="Type a message" style={{flex:1, padding:10, borderRadius:8, border:'1px solid #e6eef6', outline:'none'}} />
					<button style={{background:'#0ea5a4', color:'#fff', border:'none', padding:'10px 14px', borderRadius:8, cursor:'pointer'}}>Send</button>
				</footer>
			</section>
		</div>
	)
}
