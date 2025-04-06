import React, { useState } from 'react';
import {
  FaSearchLocation,
  FaTractor,
  FaUniversity,
  FaGraduationCap,
  FaHeartbeat,
  FaIndustry,
  FaHome,
  FaShieldAlt,
  FaRoad,
  FaBookOpen,
  FaStethoscope,

} from 'react-icons/fa';
import './Home.css';

function Home() {
  const [activeTab, setActiveTab] = useState("categories");

  const categories = [
    { icon: FaTractor, title: 'Agriculture', count: '50+ Schemes' },
    { icon: FaUniversity, title: 'Banking', count: '30+ Schemes' },
    { icon: FaGraduationCap, title: 'Education', count: '45+ Schemes' },
    { icon: FaHeartbeat, title: 'Health', count: '40+ Schemes' },
    { icon: FaIndustry, title: 'Industry', count: '35+ Schemes' },
    { icon: FaHome, title: 'Housing', count: '25+ Schemes' },
    { icon: FaShieldAlt, title: 'Social Security', count: '55+ Schemes' },
    { icon: FaRoad, title: 'Infrastructure', count: '20+ Schemes' },
    { icon: FaBookOpen, title: 'Skill Development', count: '30+ Schemes' },
    { icon: FaStethoscope, title: 'Healthcare', count: '40+ Schemes' },
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div>
      {/* Banner */}
      <div className="home-banner py-5 px-4">
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3">Find Government Schemes</h1>
          <p className="lead mb-4">
            Discover schemes and programs that can help you achieve your goals
          </p>
          <div className="search-container mx-auto">
            <div className="position-relative">
              <FaSearchLocation className="search-icon position-absolute top-50 translate-middle-y text-secondary ms-3" />
              <input
                type="text"
                className="form-control ps-5 py-3 rounded-pill shadow-sm"
                placeholder="Search for schemes, programs, or benefits..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="d-none d-sm-flex gap-4 justify-content-center border-bottom py-2">
  <button
    onClick={() => setActiveTab('categories')}
    className={`tab-btn ${activeTab === 'categories' ? 'active-tab' : ''}`}
  >
    Categories
  </button>
  <button
    onClick={() => setActiveTab('states')}
    className={`tab-btn ${activeTab === 'states' ? 'active-tab' : ''}`}
  >
    States
  </button>
  <button
    onClick={() => setActiveTab('ministries')}
    className={`tab-btn ${activeTab === 'ministries' ? 'active-tab' : ''}`}
  >
    Central Ministries
  </button>
</div>

      {/* Tab Content */}
      {activeTab === 'categories' && (
        <div className="container my-4">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {categories.map((cat, index) => {
              const IconComponent = cat.icon;
              return (
                <div className="col" key={index}>
                  <div className="card h-100 text-center shadow-sm">
                    <div className="card-body">
                      <IconComponent size={32} className="mb-2 text-primary" />
                      <h5 className="card-title">{cat.title}</h5>
                      <p className="card-text">{cat.count}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'states' && (
        <div className="container my-4">
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {states.map((state, index) => (
              <div className="col" key={index}>
                 
                <div className="p-3 border rounded text-center shadow-sm bg-light">{state}</div>
               
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ministries' && (
        <div className="container my-4 text-center">
          <h4 className="text-muted">Central Ministries section coming soon...</h4>
        </div>
      )}
    </div>
  );
}

export default Home;
