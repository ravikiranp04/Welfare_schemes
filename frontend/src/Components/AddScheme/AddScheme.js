import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../port";

const AddScheme = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Caste_Eligible: [],
      Tags: [""],
      Documents_Required: [""],
    },
  });
  const [err,setErr]=useState("")
  const [msg,setMsg]=useState(null);

  const navigate=useNavigate()

  const casteOptions = [
    { value: "OC", label: "OC" },
    { value: "OBC", label: "OBC" },
    { value: "SC", label: "SC" },
    { value: "ST", label: "ST" },
    { value: "EWS", label: "EWS" },
    { value: "All", label: "All" },
  ];
  
  const states = [
    "Central",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const categories = [
      { title: 'Agriculture' },
      { title: 'Banking' },
      { title: 'Education' },
      { title: 'Health' },
      { title: 'Industry' },
      { title: 'Housing' },
      { title: 'Social Security' },
      { title: 'Infrastructure' },
      { title: 'Skill Development' },
      { title: 'Healthcare' },
    ];
    
    const genders = ['Male', 'Female', 'All'];
    
  
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      backgroundColor: state.isSelected ? "#e9ecef" : "white",
      color: "#212529",
      padding: 10,
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#0d6efd",
      color: "white",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
    }),
  };

  const { fields: tagFields, append: appendTag } = useFieldArray({
    control,
    name: "Tags",
  });
  const { fields: docFields, append: appendDoc } = useFieldArray({
    control,
    name: "Documents_Required",
  });

  const onSubmit = async(data) => {
    console.log("Submitted Data:", data);
    alert("Form submitted! Check console for details.");

    const res = await axios.post(`${BASE_URL}/admin-api/add-schema`,data);
    if(res.data.message==="Scheme Added"){
        setMsg(res.data.message)
        navigate('/admin=rk', { state: { msg: 'Your message here' } });

    }
    else{
        setErr("Please Try again")
    }
  };

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 container">
        {err && <p className="bg-danger text-dark">{err}</p>}
      <h2 className="text-center mb-4">Scheme Submission Form</h2>

      <div className="mb-3">
        <label className="form-label">Scheme Name</label>
        <input
          {...register("Name", { required: true })}
          className="form-control"
        />
        {errors.Name && <div className="text-danger">Required</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          {...register("Description", { required: true })}
          className="form-control"
        />
        {errors.Description && <div className="text-danger">Required</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">State / Central</label>
        <select
          {...register("State_Central", { required: true })}
          className="form-select"
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.State_Central && <div className="text-danger">Required</div>}
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Minimum Age</label>
          <input
            type="number"
            {...register("Minimum_Age")}
            className="form-control"
          />
        </div>
        <div className="col">
          <label className="form-label">Maximum Age</label>
          <input
            type="number"
            {...register("maximum_age")}
            className="form-control"
          />
        </div>
        <div className="col">
          <label className="form-label">Minimum Income</label>
          <input
            type="number"
            {...register("minimum_income")}
            className="form-control"
          />
        </div>
        <div className="col">
          <label className="form-label">Maximum Income</label>
          <input
            type="number"
            {...register("maximum_income")}
            className="form-control"
          />
        </div>
      </div>

      <div className="mb-3">
  <label className="form-label">Gender</label>
  <select {...register('Gender', { required: true })} className="form-select">
    <option value="">Select Gender</option>
    {genders.map((gender, index) => (
      <option key={index} value={gender}>{gender}</option>
    ))}
  </select>
  {errors.Gender && <div className="text-danger">Required</div>}
</div>


      <div className="mb-3">
  <label className="form-label">Sector</label>
  <select {...register('Sector', { required: true })} className="form-select">
    <option value="">Select Sector</option>
    {categories.map((cat, index) => (
      <option key={index} value={cat.title}>{cat.title}</option>
    ))}
  </select>
  {errors.Sector && <div className="text-danger">Required</div>}
</div>


      <div className="mb-3">
        <label className="form-label">Where to Apply (URL)</label>
        <input {...register("Where_to_Apply")} className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Other Criteria</label>
        <textarea {...register("Other Criteria")} className="form-control" />
      </div>

      {/* Caste Eligible with Checkbox Dropdown */}
      <div className="mb-3">
        <label className="form-label">Caste Eligible</label>
        <Controller
          control={control}
          name="Caste_Eligible"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              isMulti
              options={casteOptions}
              value={casteOptions.filter((option) =>
                value.includes(option.value)
              )}
              onChange={(selected) =>
                onChange(selected.map((opt) => opt.value))
              }
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              styles={customStyles}
              placeholder="Select caste(s)..."
            />
          )}
        />
        {errors.Caste_Eligible && (
          <div className="text-danger mt-1">
            At least one caste must be selected.
          </div>
        )}
      </div>

      {/* Dynamic Tags */}
      <div className="mb-3">
        <label className="form-label">Tags</label>
        {tagFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`Tags.${index}`)}
            className="form-control mb-2"
          />
        ))}
        <button
          type="button"
          onClick={() => appendTag("")}
          className="btn btn-outline-primary btn-sm"
        >
          + Add Tag
        </button>
      </div>

      {/* Dynamic Documents Required */}
      <div className="mb-3">
        <label className="form-label">Documents Required</label>
        {docFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`Documents_Required.${index}`)}
            className="form-control mb-2"
          />
        ))}
        <button
          type="button"
          onClick={() => appendDoc("")}
          className="btn btn-outline-primary btn-sm"
        >
          + Add Document
        </button>
      </div>

      <button type="submit" className="btn btn-success w-100 mt-3">
        Submit Scheme
      </button>
    </form>
  );
};

export default AddScheme;
