import { useEffect, useState } from 'react'
import CircularBox from '../components/CircularBox'
import CircularInput from '../components/CircularInput'
import noImg from '../assets/Illustration - Cow.png'
import SmallCard from '../components/SmallCard'
import '../css_files/profile.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import iconName from '../assets/Group 41.png'
import iconEmail from '../assets/Group.png'
import iconPhone from '../assets/Group (1).png'
import iconUni from '../assets/uni.png'
import { useAuth } from '../context/authcontext'

const profile = () => {
  const { id } = useParams();
  console.log(id);
  const [detail,setDetail] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); 
    } else {
      axios.get(`http://127.0.0.1:8000/users/${id}`)
        .then(res => {
          setDetail(res.data);
        })
        .catch(err => {
          console.error('API error:', err);
        });
    }}, [isAuthenticated,id]);
    console.log(detail.user_files);
  return (
    <div className='biggerPart'>
      <CircularBox addClass='leftCircular'>
          <h2>Member Profile</h2>
          <hr className='shorterHr'/>
                <img src={detail.image_url? detail.image_url : noImg} className='imgProfPic'/>
              <div className='userDetail'>
                  <CircularInput name='Name' placeholder='John Carter' type='text' value={detail.username}  moreStyle='fixingTop' rightIcon={<img src={iconName} alt="icon" style={{ width: '18.18px', height: '22.72px' }} />}/>
                  <CircularInput name='Email' placeholder='Email address' type='email' value={detail.email} moreStyle='fixingTop'  rightIcon={<img src={iconEmail} alt="icon" style={{ width: '22.72px', height: '18.18px' }} />}/>
                  <CircularInput name='Phone Number' placeholder='0888 - 456 - 7890' type='phone' value={detail.phone} moreStyle='fixingTop2' rightIcon={<img src={iconPhone} alt="icon" style={{ width: '16.66px', height: '25px'}} />} />
                  <CircularInput name='University' placeholder='University name' type='text' value={detail.university? detail.university.name : detail.university_id} moreStyle='fixingTop2' rightIcon={<img src={iconUni} alt="icon" style={{ width: '16.66px', height: '25px'}} />}/>    
              </div>
      </CircularBox>
      <CircularBox addClass='rightCircular'>
          <h2>File</h2>
          <hr className='anotherHr'/>
          <div className='uploadSection'>
                      {detail && detail.user_files ? (
              detail.user_files.map(file => (
                <SmallCard 
                  key={file.id} 
                  name={file.file_category?.name} 
                  asset={file.file_category.image_url} 
                  addClass="smallCardLayout" 
                  textClass="textClass" 
                  outerImgClass="outerImg" 
                  imgClass="smallPic"
                  onClick={() => window.open(`http://127.0.0.1:8000/storage/${file.file_url}`, '_blank')}
                />
              ))
            ) : null}
          </div>
      </CircularBox>
    </div>
  )
}

export default profile
