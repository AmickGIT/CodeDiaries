import React, { useState,useRef } from 'react' 
import { FaArrowLeft } from "react-icons/fa"; 
import GOOGLE_ICON from "../../assets/google.svg"
import FACEBOOK_ICON from "../../assets/facebook.svg";
import COVER from "../../assets/codediariescover.png";
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/bgimg.png';
import axios from 'axios';

function SignIn() {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const formRef = useRef(null);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [paragraphText, setParagraphText] = useState('');
  const [textColor, setTextColor] = useState('text-red-500')

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Trigger form's submit event
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      handleErrorTextChange(0)
      return;
    }

    setParagraphText('')
    
    try {
      const response = await axios.post('http://localhost:4000/signin', {
        email,
        password,
      });

      if (response.data.status === 'ok') {
        // Save the JWT token in local storage
        localStorage.setItem('token', response.data.user);
        // Redirect or navigate to the protected page
        navigate('/homepage')
      } else {
        setError('Invalid email or password');
        setParagraphText(response.data.message)
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  }
  const handleErrorTextChange = (a) => {
    handleTextColorChange(a)
    if(a===0) {
      setParagraphText('Please fill all the details')
    }else if(a===1){
      setParagraphText('Incorrect Username or Password')
    }
  }

  const handleTextColorChange = (a) => {
    if(a===0 || a===1) {
      setTextColor('text-red-500')
    }else if(a===2) {
      setTextColor('text-green-500')
    }
  }

  return (
    <div className="grid grid-cols-2 p-8 bg-gray-100 min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="max-h-fit overflow-hidden flex justify-center items-center rounded-tl-lg rounded-bl-lg">
        <img src={COVER} className='w-full h-full object-cover' />
      </div>
      <div className="bg-white px-12 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-tr-lg rounded-br-lg">
        <div className="relative flex justify-left p-4">
          <button onClick={goBack}>
            <FaArrowLeft className="mr-2 transition-transform duration-150 hover:scale-150" />
          </button>
          <div className='w-1/2 items-right text-right pt-0.5 ml-72'>
            <span className="text-gray-600 ">New to Code Diaries?</span>
            <a href="/signup" className="text-blue-600 hover:underline ml-2">
              Sign Up
            </a>
          </div>
        </div>
        <div className='ml-4 mt-5'>
          <div className='w-full flex flex-col'>
            <h3 className='text-2x1 font-semibold mb-4 text-4xl'>Sign In</h3>
            <p className='text-gray-600 text-sm'>Welcome to Code Diaries</p>
          </div>

          <form id='loginForm' ref={formRef} onSubmit={handleSubmit}>
            <div className='w-full flex flex-col mt-6'>
              <input 
                type="email"
                placeholder='Email' 
                value={email} 
                onChange={handleChangeEmail}
                className='w-full mt-7 text-black border-b border-black outline-none focus:outline-none py-4'/>
            </div>
            <div className='w-full flex flex-col'>
              <input 
                type="password"
                placeholder='Password' 
                value={password} 
                onChange={handleChangePassword}
                className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
            </div>
          </form>
          <div className={`${textColor} mt-4 min-h-6 font-semibold`}>
            <p>{paragraphText}</p>
          </div>
          <div className='w-full flex flex-row items-center mt-20'>
            <button className='bg-black min-w-[105px] p-2 justify-center rounded-full text-center font-semibold flex text-white transition-transform duration-300 hover:scale-110'
                      onClick={triggerSubmit}>
              Login
            </button>
            <p className='mx-[180px] text-gray-600 py-1 text-center justify-center'>or</p>
            <button><img src={GOOGLE_ICON} className='mr-7 rounded-full hover:bg-zinc-300 h-7 w-7 border-2 rounded-4x1 border-zinc-500'/></button>
            <button><img src={FACEBOOK_ICON} className='ml-2 rounded-full mx-24 hover:bg-zinc-300 h-7 w-7 border-2 border-zinc-500'/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn