import React from 'react';

const guides = [
  { name: 'Emily Johnson', id: 'CA-1001', specialty: 'Local', language: 'English', phone: '555-1234' },
  { name: 'Carlos Ramirez', id: 'CA-1002', specialty: 'History & Culture', language: 'Spanish', phone: '555-5678' },
  { name: 'Linda Lee', id: 'CA-1003', specialty: 'Nature & Hiking', language: 'English', phone: '555-8765' },
  { name: 'Sophie Chen', id: 'CA-1004', specialty: 'Food & Wine', language: 'Chinese', phone: '555-4321' },
  { name: 'David Kim', id: 'CA-1005', specialty: 'Adventure', language: 'Korean', phone: '555-2468' },
  { name: 'Maria Garcia', id: 'CA-1006', specialty: 'Local', language: 'Spanish', phone: '555-1357' },
  { name: 'John Smith', id: 'CA-1007', specialty: 'General', language: 'English', phone: '555-2460' },
  { name: 'Anna Müller', id: 'CA-1008', specialty: 'Nature', language: 'German', phone: '555-9753' },
  { name: 'Yuki Tanaka', id: 'CA-1009', specialty: 'City Tours', language: 'Japanese', phone: '555-8642' },
  { name: 'Fatima Al-Farsi', id: 'CA-1010', specialty: 'Desert Tours', language: 'Arabic', phone: '555-7531' },
];

const GuidesDirectory = () => (
  <div style={{padding: '40px 0', minHeight: '100vh', background: '#f8f9fa'}}>
    <div style={{maxWidth: 1100, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #e0e7ef', overflow: 'hidden'}}>
      <h2 style={{color: '#135c4a', fontWeight: 'bold', fontSize: '2.1rem', textAlign: 'center', margin: '32px 0 24px 0', letterSpacing: 1}}> Tour Guides Directory</h2>
      <div style={{overflowX: 'auto', maxHeight: 520}}>
        <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '1.09rem', minWidth: 700}}>
          <thead>
            <tr style={{position: 'sticky', top: 0, zIndex: 2}}>
              <th style={{background: 'linear-gradient(90deg, #ffe082 60%, #ffd54f 100%)', color: '#135c4a', fontWeight: 'bold', fontSize: '1.13rem', padding: '16px 8px', borderTopLeftRadius: '12px', borderBottom: '2px solid #ffd54f', textAlign: 'left'}}>Title</th>
              <th style={{background: 'linear-gradient(90deg, #ffe082 60%, #ffd54f 100%)', color: '#135c4a', fontWeight: 'bold', fontSize: '1.13rem', padding: '16px 8px', borderBottom: '2px solid #ffd54f', textAlign: 'left'}}>ID Number</th>
              <th style={{background: 'linear-gradient(90deg, #ffe082 60%, #ffd54f 100%)', color: '#135c4a', fontWeight: 'bold', fontSize: '1.13rem', padding: '16px 8px', borderBottom: '2px solid #ffd54f', textAlign: 'left'}}>Guide Specialty</th>
              <th style={{background: 'linear-gradient(90deg, #ffe082 60%, #ffd54f 100%)', color: '#135c4a', fontWeight: 'bold', fontSize: '1.13rem', padding: '16px 8px', borderBottom: '2px solid #ffd54f', textAlign: 'left'}}>Guide Language</th>
              <th style={{background: 'linear-gradient(90deg, #ffe082 60%, #ffd54f 100%)', color: '#135c4a', fontWeight: 'bold', fontSize: '1.13rem', padding: '16px 8px', borderTopRightRadius: '12px', borderBottom: '2px solid #ffd54f', textAlign: 'left'}}>Telephone</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((g, i) => (
              <tr key={g.id} style={{
                background: i%2===0 ? '#fff' : '#f4f6fa',
                transition: 'background 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={e => e.currentTarget.style.background='#e3f2fd'}
              onMouseOut={e => e.currentTarget.style.background=i%2===0 ? '#fff' : '#f4f6fa'}
              >
                <td style={{padding: '14px 10px', color: '#3973d6', fontWeight: 600, borderBottom: '1px solid #e0e7ef', borderLeft: '3px solid #ffd54f'}}>{g.name}</td>
                <td style={{padding: '14px 10px', color: '#135c4a', borderBottom: '1px solid #e0e7ef'}}>{g.id}</td>
                <td style={{padding: '14px 10px', color: '#135c4a', borderBottom: '1px solid #e0e7ef'}}>{g.specialty}</td>
                <td style={{padding: '14px 10px', color: '#135c4a', borderBottom: '1px solid #e0e7ef'}}>{g.language}</td>
                <td style={{padding: '14px 10px', color: '#135c4a', borderBottom: '1px solid #e0e7ef'}}>{g.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{textAlign: 'center', margin: '30px 0 20px 0', color: '#888', fontSize: '1rem'}}>For more guides, contact the California Tourism Board.</div>
    </div>
  </div>
);

export default GuidesDirectory; 