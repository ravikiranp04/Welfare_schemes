import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../port";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaSearch, FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
const ageRanges = [
  { label: "Below 18", value: [0, 17] },
  { label: "18 - 25", value: [18, 25] },
  { label: "26 - 40", value: [26, 40] },
  { label: "41 - 60", value: [41, 60] },
  { label: "Above 60", value: [61, 100] },
];
const incomeRanges = [
    { label: "Below ₹1 Lakh", value: [0, 100000] },
    { label: "₹1 - 2.5 Lakhs", value: [100001, 250000] },
    { label: "₹2.5 - 5 Lakhs", value: [250001, 500000] },
    { label: "₹5 - 10 Lakhs", value: [500001, 1000000] },
    { label: "Above ₹10 Lakhs", value: [1000001, Infinity] },
  ];
  
const casteOptions = ["OC", "OBC", "SC", "ST", "EWS", "All"];

const states = [
  "Central", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const genders = ["Male", "Female", "All"];

const UserProfile = () => {
  const [schemes, setSchemes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    states: [],
    age: null,
    caste: [],
    gender: null,
    income:null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemes = async () => {
      const res = await axios.get(`${BASE_URL}/admin-api/get-all-schemes`);
      setSchemes(res.data.payload);
      setFiltered(res.data.payload);
    };
    fetchSchemes();
  }, []);

  useEffect(() => {
    filterSchemes();
  }, [filters, searchTerm, schemes]);

  const filterSchemes = () => {
    let temp = schemes;

    if (searchTerm) {
      temp = temp.filter((scheme) =>
        scheme.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.states.length) {
      temp = temp.filter((scheme) =>
        filters.states.includes(scheme.State_Central)
      );
    }

    if (filters.age) {
      const [minAge, maxAge] = filters.age;
      temp = temp.filter(
        (scheme) =>
          (!scheme.minimum_age || scheme.minimum_age <= maxAge) &&
          (!scheme.maximum_age || scheme.maximum_age >= minAge)
      );
    }

    if (filters.gender) {
      temp = temp.filter(
        (scheme) =>
          scheme.Gender === filters.gender || scheme.Gender === "All"
      );
    }

    if (filters.caste.length) {
      temp = temp.filter(
        (scheme) =>
          scheme.Caste_Eligible?.some((caste) =>
            filters.caste.includes(caste)
          ) || scheme.Caste_Eligible?.includes("All")
      );
    }
    if (filters.income) {
        const [minIncome, maxIncome] = filters.income;
        temp = temp.filter(
          (scheme) =>
            (!scheme.minimum_income || scheme.minimum_income <= maxIncome) &&
            (!scheme.maximum_income || scheme.maximum_income >= minIncome)
        );
      }
      

    setFiltered(temp);
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const isChecked = prev[type].includes(value);
      return {
        ...prev,
        [type]: isChecked
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  const { currentuser, errorMessage, loginStatus } = useSelector((state) => state.userLogin);

  return (
    <div className="container-fluid p-3" style={{ background: "#f1f5f9" }}>
      <div
        style={{
          background: "linear-gradient(to right, #00b4d8, #0077b6)",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <h2>Explore Government Schemes</h2>
        <p>Find the most suitable welfare schemes tailored to your needs.</p>
      </div>

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search schemes by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: "0 10px 10px 0" }}
          />
        </div>
      </div>

      <div className="row">
        {/* Filters Column */}
        <div className="col-md-3">
  <div className="bg-white p-3 rounded shadow-sm" style={{ maxHeight: "85vh", overflowY: "auto" }}>
    <h5 className="mb-3">Filters</h5>

    {/* States Filter */}
    <div className="mb-4 p-3 border rounded shadow-sm">
      <strong className="d-block mb-2">State</strong>
      {states.map((state, idx) => (
        <div key={idx}>
          <input
            type="checkbox"
            checked={filters.states.includes(state)}
            onChange={() => handleCheckboxChange("states", state)}
          />{" "}
          {state}
        </div>
      ))}
    </div>

    {/* Age Range Filter */}
    <div className="mb-4 p-3 border rounded shadow-sm">
      <strong className="d-block mb-2">Age Range</strong>
      {ageRanges.map((range, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name="age"
            onChange={() => setFilters({ ...filters, age: range.value })}
            checked={
              filters.age &&
              filters.age[0] === range.value[0] &&
              filters.age[1] === range.value[1]
            }
          />{" "}
          {range.label}
        </div>
      ))}
    </div>

    {/* Gender Filter */}
    <div className="mb-4 p-3 border rounded shadow-sm">
      <strong className="d-block mb-2">Gender</strong>
      {genders.map((g, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name="gender"
            onChange={() => setFilters({ ...filters, gender: g })}
            checked={filters.gender === g}
          />{" "}
          {g}
        </div>
      ))}
    </div>

    {/* Caste Filter */}
    <div className="mb-4 p-3 border rounded shadow-sm">
      <strong className="d-block mb-2">Caste</strong>
      {casteOptions.map((caste, idx) => (
        <div key={idx}>
          <input
            type="checkbox"
            checked={filters.caste.includes(caste)}
            onChange={() => handleCheckboxChange("caste", caste)}
          />{" "}
          {caste}
        </div>
      ))}
    </div>

    {/* Income Filter */}
    <div className="mb-4 p-3 border rounded shadow-sm">
      <strong className="d-block mb-2">Annual Family Income</strong>
      {incomeRanges.map((range, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name="income"
            onChange={() => setFilters({ ...filters, income: range.value })}
            checked={
              filters.income &&
              filters.income[0] === range.value[0] &&
              filters.income[1] === range.value[1]
            }
          />{" "}
          {range.label}
        </div>
      ))}
    </div>
  </div>
</div>



        {/* Schemes Display Column */}
        <div className="col-md-9">
          <div className="row">
            {filtered.length ? (
              filtered.map((scheme, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <div className="card h-100 shadow-sm border-0 rounded-4">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{scheme.Name}</h5>
                      <p className="card-text">
                        {scheme.Description?.substring(0, 100)}...
                      </p>
                      <p className="text-muted">
                        <strong>Sector:</strong> {scheme.Sector}
                      </p>
                      <button
                        className="btn btn-outline-primary rounded-pill"
                        onClick={() => navigate(`/user-profile/${currentuser.username}/scheme-view/${scheme._id}`, {
                            state: { scheme }
                          })}
                          
                      >
                        <FaInfoCircle className="me-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No schemes found with selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
