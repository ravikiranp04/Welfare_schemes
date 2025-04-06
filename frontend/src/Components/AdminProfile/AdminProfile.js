import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showMessage, setShowMessage] = useState(false);
  const msg = location.state?.msg;

  useEffect(() => {
    if (msg) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000); // Show message for 4 seconds

      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleAddScheme = () => {
    alert('Redirecting to Add Scheme form...');
    navigate('/admin=rk/add-scheme');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 fw-bold">Admin Profile</h1>

      {showMessage && (
        <div className="alert alert-success" role="alert">
          {msg}
        </div>
      )}

      <button onClick={handleAddScheme} className="btn btn-primary">
        + Add Scheme
      </button>
    </div>
  );
}

export default AdminProfile;
