import React from 'react'
import CircularBox from '../components/CircularBox'
import CircularInput from '../components/CircularInput'
import FancyButton from '../components/FancyButton'
import '../css_files/register.css' 
import succesPic from '../assets/Group 37301.png'
import topBar from '../assets/theThird.png'
import { useNavigate } from 'react-router-dom'

const ThirdStep = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

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
            <hr className='shorterHr' />
            <img src={succesPic} className='succesImg'/>
            <h3 className='succesTxt'>Permintaan Akun Berhasil Dikirim</h3>
            <p className='subPermintaanTxt'>
                Permintaan Anda akan kami verifikasi dalam waktu maksimal 2 x 24 jam. 
                Hasil verifikasi akan kami informasikan melalui email yang anda daftarkan.
            </p>
            <FancyButton section='Close' className='nextButton' onClick={handleClick}/>
        </CircularBox>
    </div>
  )
}

export default ThirdStep
