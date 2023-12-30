import React, { useState } from 'react';
import logo from './logo.0cfaa4df.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPwd = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:1338/forgotpwd', { email })
      .then((result) => {
        console.log(result);
        if (result.status === 200 && result.data && result.data.message !== null) {
          setShowUpdateForm(true);
        } else {
          setErrorMessage(result.data && result.data.message ? result.data.message : 'Email Not Registered');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('An error occurred. Please try again.');
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    // Check password length
    if (pwd.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    axios
      .post('http://localhost:1338/changepwd', {
        email,
        pwd,
      })
      .then((result) => {
        console.log(result);
        // Handle success or update UI accordingly
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('An error occurred while updating the password.');
      });
  };

  return (
    <div>
      <div className='text-sm shadow-lg p-1 rounded-md sm:w-4/12 w-full mt-32 m-auto items-center flex flex-col'>
        <img src={logo} alt='smart-sign' className='w-20 h-20 mt-4' />
        <h1 className='text-3xl font-bold mt-6'>Change Password</h1>
        <form
          onSubmit={(e) => {
            showUpdateForm ? handleUpdatePassword(e) : handleSubmit(e);
          }}
          className='mt-8 sm:w-10/12 w-full flex flex-col'
        >
          <div className='flex w-full text-md flex-col'>
            <label className='text-xl '>Enter Your Email</label>
            <input
              type='text'
              className='border-b indent-4 m-2 focus:outline-blue-400 h-[5vh]'
              placeholder='Enter Your Email....'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {showUpdateForm ? (
            <>
              <div className='flex w-full text-md flex-col'>
                <label className='text-xl '>New Password</label>
                <input
                  type='password'
                  name='password'
                  className='border-b indent-4 m-2 focus:outline-blue-400 h-[5vh]'
                  placeholder='Enter Your New Password....'
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
                 {pwd.length > 0 && pwd.length < 6 && (
                  <p className='text-red-500'>Password must be at least 6 characters long.</p>
                )}
              </div>
            </>
          ) : (
            <p className='text-red-500'>{errorMessage}</p>
          )}
          <div className='flex flex-col mb-6'>
            <button
              type='submit'
              className='bg-blue-700 text-white cursor-pointer text-xl rounded-md h-14 w-40 m-auto mt-4'
            >
              {showUpdateForm ? 'UPDATE' : 'SUBMIT'}
            </button>
            <p className='text-2xl underline hover:text-blue-600 cursor-pointer text-left'>
              <Link to='/login'>Back</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPwd;
