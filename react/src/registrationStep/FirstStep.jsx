import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CircularBox from '../components/CircularBox'
import CircularInput from '../components/CircularInput'
import FancyButton from '../components/FancyButton'
import '../css_files/register.css' 
import iconName from '../assets/Group 41.png'
import iconEmail from '../assets/Group.png'
import iconPhone from '../assets/Group (1).png'
import topBar from '../assets/Group 37318.png'
import iconUni from '../assets/uni.png'

const FirstStep = ({nextStep,formData,onChange}) => {

    const [uni,setUni] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/uni')
          .then(res => {
            setUni(res.data);
          })
          .catch(err => {
            console.error('API error:', err);
          });
      }, []);

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name && value !== undefined) {
          onChange(name, value);
        }
      };
  
    const handleUniversityChange = (event) => {
      onChange('university', event.target.value);
    };
  
  return (
    <div className='biggestPart'>
        <div className='topPart'>
            <h2 className='regisTxt'>Registration</h2>
            <p className='subTxt'>Silahkan mengisi formulir berikut dengan sebenar-benarnya. 
                Bantu kami mengenali anda dengan mudah.
            </p>
        </div>
        <CircularBox addClass='additionalCircular'>
            <div>
               <img src={topBar}/>
            </div>
            <hr className='shorterHr'/>
                    <h3 className='contactTxt'>Contact</h3>
                    <p className='informasiTxt'>Masukan informasi</p>
                <div className='registerForm'>
                    <CircularInput name='name' section='Name' value={formData.name} placeholder='John Carter' type='text' onChange={handleInputChange} moreStyle='fixingTop' rightIcon={<img src={iconName} alt="icon" style={{ width: '18.18px', height: '22.72px' }} />}/>
                    <CircularInput name='email' section='Email' value={formData.email} placeholder='Email address' type='email' onChange={handleInputChange} moreStyle='fixingTop' rightIcon={<img src={iconEmail} alt="icon" style={{ width: '22.72px', height: '18.18px' }} />}/>
                    <CircularInput name='phoneNum' section='Phone Number' value={formData.phoneNum} placeholder='0888 - 456 - 7890' type='phone' onChange={handleInputChange} moreStyle='fixingTop2' rightIcon={<img src={iconPhone} alt="icon" style={{ width: '16.66px', height: '25px'}} />}/>
                    <div className='universityInput'>
                        <label htmlFor='university' className='universityClass'>University</label>
                        <div className='relativeDiv'>
                          <select className='selectUni' onChange={handleUniversityChange} value={formData.university}>
                              <option value="">University name</option>
                              {uni.map(university => (
                                  <option key={university.id} value={university.id}>
                                      {university.name}  
                                  </option>
                                  ))}
                          </select>
                          <span className='spanUni'><img src={iconUni} style={{width:'16.66px',height:'25px'}}/></span>
                        </div>
                    </div>
                    <CircularInput name='password' section='Password' value={formData.password} placeholder='Password' type='password' onChange={handleInputChange}/>
                    <CircularInput name='passwordConfirmation' section='Password Confirmation' value={formData.passwordConfirmation} placeholder='Password Confirmation' type='password' onChange={handleInputChange}/>
                </div>
        </CircularBox>
        <FancyButton section='Next Step' className='nextButton' onClick={nextStep}/>
    </div>
  )
}

export default FirstStep
