import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div>No data found. <button onClick={() => navigate('/')}>Go Back</button></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default SuccessPage;
