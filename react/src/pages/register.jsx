import React, { useEffect, useState } from 'react'
import FirstStep from '../registrationStep/FirstStep'
import SecondStep from '../registrationStep/SecondStep'
import ThirdStep from '../registrationStep/ThirdStep'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const register = () => {
  const [step,setStep] = useState(1);
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  

  const [form,setForm] = useState({
    name: "",
    email: "",
    phoneNum: "",
    university: "",
    password: "",
    passwordConfirmation: "",
    files : {}
  })

  const handleFormChange = (name, value) => {
    if(name == 'files'){
      setForm(prev => ({
        ...prev,
        files: {...prev.files,value,}
      }));
    }
    else
    {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    console.log(form);
  },[form])

  const nextStepFirst = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = 'Name cannot be empty';
    if (!form.email) newErrors.email = 'Email cannot be empty';
    if (!form.university) newErrors.university = 'University cannot be empty';
    if (!form.phoneNum) newErrors.phoneNum = 'Phone Number cannot be empty';
    if (!form.password) newErrors.password = 'Password cannot be empty';
    if (!form.passwordConfirmation) newErrors.passwordConfirmation = 'Password Confirmation cannot be empty';
    if (form.password && form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password && form.passwordConfirmation && form.password !== form.passwordConfirmation)
      newErrors.passwordConfirmation = 'Password and confirmation do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);
  const nextStepSubmit = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });
      console.log('Form Data:', form);
      
      const formData = new FormData();
      formData.append('username', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phoneNum);
      formData.append('university_id', form.university);
      formData.append('password', form.password);
      formData.append('password_confirmation', form.passwordConfirmation);

      Object.entries(form.files.value).forEach(([key, file]) => {
        formData.append(`files[${key}]`, file); 
      });

      const res = await axios.post(
        'http://127.0.0.1:8000/registration',
        formData,
        {
          headers : {
            'Content-Type':'multipart/form-data',
          },
          withCredentials: true
        }
      );

      console.log('Registration success:', res.data);
      setStep(prev => prev + 1);
    } catch (err) {
      console.error('Registration error:', err);
      setMsg('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1 :
        return <FirstStep formData={form} onChange={handleFormChange} nextStep={nextStepFirst} errors={errors}/>
      case 2 :
        return <SecondStep formData={form} onChange={handleFormChange} nextStep={nextStepSubmit} prevStep={prevStep} setMsg={setMsg}/>
      case 3 :
        return  <ThirdStep/>
      default :
        return null;
    }
  }
  return (
    <>
      {renderStep()}
      {msg && (
        <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: msg }} />
      )}
    </>
  )
}

export default register
