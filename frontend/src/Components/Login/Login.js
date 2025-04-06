import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import './Login.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginThunk } from '../../Redux/slices/userLoginSlice';
const Login = () => {
    const navigate=useNavigate()
  const [showLogin, setShowLogin] = useState(true);
  const [loginType, setLoginType] = useState('mobile');
  const { currentuser, errorMessage, loginStatus } = useSelector((state) => state.userLogin);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch= useDispatch();
  const onSubmit = (data) => {
    data.login_mode=loginType
    console.log('Form submitted:', data);
    const actionobj = userLoginThunk(data);
    dispatch(actionobj);
   
  };

  useEffect(() => {
    if (loginStatus === true && currentuser) {
        navigate(`/user-profile/${currentuser.username}`);
    }
  }, [navigate, loginStatus, currentuser]);

  if (!showLogin) return null;

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      <div className="login-card card p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold m-0">Login</h2>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowLogin(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>

        <div className="btn-group mb-4 w-100" role="group">
          <button
            className={`btn ${loginType === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {setLoginType('mobile')
                reset()
            }}
          >
            Mobile
          </button>
          <button
            className={`btn ${loginType === 'aadhar' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {setLoginType('aadhar')
                reset()
            }}
          >
            Aadhar
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {loginType === 'mobile' && (
            <div className="mb-3">
              <input
                type="tel"
                placeholder="Mobile Number"
                className="form-control mb-3"
                {...register('mob_no', { required: 'Mobile number is required' })}
              />
              {errors.mobile && <small className="text-danger">{errors.mobile.message}</small>}

              <input
                type="password"
                placeholder="SECURITY PIN"
                className="form-control"
                {...register('security_pin', { required: 'PIN is required' })}
              />
              {errors.pin && <small className="text-danger">{errors.pin.message}</small>}
            </div>
          )}

          {loginType === 'aadhar' && (
            <div className="mb-3">
              <input
                type="number"
                placeholder="Aadhar Number"
                className="form-control mb-3"
                {...register('aadhar_number', { required: 'Aadhar number is required' })}
              />
              {errors.aadhar && <small className="text-danger">{errors.aadhar.message}</small>}

              <input
                type="password"
                placeholder="SECURITY PIN"
                className="form-control mb-3"
                {...register('security_pin', { required: 'PIN is required' })}
              />
              {errors.pin && <small className="text-danger">{errors.pin.message}</small>}

              <input
                type="number"
                placeholder="OTP"
                className="form-control"
                {...register('otp', { required: 'OTP is required' })}
              />
              {errors.otp && <small className="text-danger">{errors.otp.message}</small>}
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
