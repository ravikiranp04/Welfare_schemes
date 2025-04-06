import React from 'react';
import { useLocation } from 'react-router-dom';
import './ViewDetails.css';

function ViewDetails() {
  const location = useLocation();
  const scheme = location.state.scheme;
  console.log(scheme)
  if (!scheme) {
    return (
      <div className="container mt-5">
        <h2 className="text-danger">❗ No Scheme Data Provided</h2>
        <p>Please go back and select a scheme again.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5 view-details">
      {/* Scheme Name & Description */}
      <div className="text-center mb-4">
        <h1 className="text-primary">{scheme.Name || 'Scheme Name'}</h1>
        <p className="text-muted">{scheme.Description || 'No description available.'}</p>
      </div>

      {/* Highlight Info */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="highlight-box border rounded p-3 bg-light shadow-sm">
            <h6 className="text-muted">Official Website</h6>
            <a href={scheme.Where_to_Apply} target="_blank" rel="noreferrer" className="text-primary">
              {scheme.Where_to_Apply || 'N/A'}
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="highlight-box border rounded p-3 bg-light shadow-sm">
            <h6 className="text-muted">Income Range</h6>
            <p className="mb-0 text-success fw-bold">
              ₹{scheme.minimum_income?.toLocaleString() || '0'} - ₹{scheme.maximum_income?.toLocaleString() || 'N/A'}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="highlight-box border rounded p-3 bg-light shadow-sm">
            <h6 className="text-muted">Eligible Age</h6>
            <p className="mb-0 text-success fw-bold">
              {scheme.Minimum_Age || 'N/A'} - {scheme.maximum_age || 'N/A'} years
            </p>
          </div>
        </div>
      </div>

      {/* Image & Core Details */}
      <div className="card shadow-lg border-0 mb-4">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src="/scheme-image.jpg"
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt="Scheme Visual"
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title text-success mb-3">Scheme Details</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Sector:</strong> {scheme.Sector}</li>
                <li className="list-group-item"><strong>Managed By:</strong> {scheme.State_Central}</li>
                <li className="list-group-item"><strong>Gender Eligibility:</strong> {scheme.Gender}</li>
                <li className="list-group-item"><strong>Caste Eligibility:</strong> {Array.isArray(scheme.Caste_Eligible) ? scheme.Caste_Eligible.join(', ') : 'N/A'}</li>
                <li className="list-group-item"><strong>Other Criteria:</strong> {scheme["Other Criteria"] || 'None'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Required */}
      {Array.isArray(scheme.Documents_Required) && scheme.Documents_Required.length > 0 && (
        <div className="mb-4">
          <h4 className="text-info mb-3">📄 Documents Required</h4>
          <ul className="list-group">
            {scheme.Documents_Required.map((doc, index) => (
              <li key={index} className="list-group-item">{doc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {Array.isArray(scheme.Tags) && scheme.Tags.length > 0 && (
        <div className="mb-4">
          <h4 className="text-info mb-3">🏷️ Tags</h4>
          <div className="d-flex flex-wrap gap-2">
            {scheme.Tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Application Steps */}
      <div className="mb-5">
        <h4 className="text-info mb-3">📝 How to Apply</h4>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item">Visit the official portal: <a href={scheme.Where_to_Apply} target="_blank" rel="noreferrer">{scheme.Where_to_Apply}</a></li>
          <li className="list-group-item">Register using your Aadhaar number and verify with mobile OTP.</li>
          <li className="list-group-item">Fill in all required personal, income, and residential details.</li>
          <li className="list-group-item">Upload scanned copies of the required documents.</li>
          <li className="list-group-item">Submit the application and save/print the acknowledgment.</li>
        </ol>
      </div>
    </div>
  );
}

export default ViewDetails;
