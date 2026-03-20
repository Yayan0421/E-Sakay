import React from 'react'
import '../../styles/rideshistory.css'

export default function RidesHistory(){
  return (
    <div className="rides-page">
      <div className="rides-header">
        <div>
          <div className="rides-title">Your Rides</div>
          <div className="small">Showing 5 total rides</div>
        </div>
        <div className="rides-filters">
          <button className="pill">All Rides</button>
          <button className="pill">Completed</button>
          <button className="pill">Cancelled</button>
        </div>
      </div>

      <div className="rides-card">
        <div className="left-col">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <div className="driver-avatar">DR</div>
              <div className="driver-info">
                <strong>Juan Dela Cruz</strong>
                <div className="small">Driver</div>
                <div style={{marginTop:8}}>
                  <div style={{fontSize:13, color:'#6b7280'}}>ABC - 1234</div>
                  <div style={{fontSize:13, color:'#6b7280'}}>MR-0451</div>
                </div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="small">Mar 10, 2026 • 4:30 PM</div>
              <div style={{marginTop:8}} className="pill">Completed</div>
            </div>
          </div>

          <div style={{marginTop:16, background:'#fbfdff', padding:12, borderRadius:8}}>
            <div style={{fontWeight:700}}>Pickup Point</div>
            <div className="small">SM City Cebu, Cebu City</div>
            <div style={{marginTop:12, fontWeight:700}}>Drop-off Point</div>
            <div className="small">Ayala Center Cebu, Cebu Business Park</div>
          </div>

          <div className="meta-row">
            <div className="meta-item">
              <div className="small">Distance</div>
              <div style={{fontWeight:700}}>3.2 km</div>
            </div>
            <div className="meta-item">
              <div className="small">Duration</div>
              <div style={{fontWeight:700}}>15 min</div>
            </div>
            <div className="meta-item">
              <div className="small">Payment</div>
              <div style={{fontWeight:700}}>Gcash</div>
            </div>
          </div>

          <div style={{marginTop:14}}>
            <div className="bike-image"/>
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:8, marginTop:12}}>
              <div style={{background:'#fff', padding:12, borderRadius:8, border:'1px solid #eef2f7'}}>
                <div className="small">DRIVER AGE</div>
                <div style={{fontWeight:700}}>32 yrs old</div>
              </div>
              <div style={{background:'#fff', padding:12, borderRadius:8, border:'1px solid #eef2f7'}}>
                <div className="small">PLATE NUMBER</div>
                <div style={{fontWeight:700}}>ABC-1234</div>
              </div>
              <div style={{background:'#fff', padding:12, borderRadius:8, border:'1px solid #eef2f7'}}>
                <div className="small">BODY NUMBER</div>
                <div style={{fontWeight:700}}>MR-0451</div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-col">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="small">TOTAL FARE</div>
            <div style={{textAlign:'right'}}>
              <div className="total-fare">₱85</div>
              <div className="small">Gcash</div>
            </div>
          </div>

          <div style={{marginTop:12, display:'flex', gap:12}}>
            <button className="hide-btn">Hide</button>
            <button className="feedback-btn">Feedback</button>
          </div>

          <div className="transaction">
            <div style={{fontWeight:700, marginBottom:8}}>Transaction History</div>
            <div className="transaction-row small"><div>Base Fare</div><div>₱51.00</div></div>
            <div className="transaction-row small"><div>Distance Fee (3.2 km)</div><div>₱29.75</div></div>
            <div className="transaction-row small"><div>Service Fee</div><div>₱4.25</div></div>
            <hr style={{border:'none', borderTop:'1px solid #eef2f7', margin:'12px 0'}}/>
            <div style={{display:'flex', justifyContent:'space-between', fontWeight:800}}><div>Total Paid</div><div>₱85.00</div></div>
            <div className="small" style={{marginTop:8}}>Payment method: Gcash</div>
          </div>
        </div>
      </div>
    </div>
  )
}
