import { useEffect, useState } from 'react'
import LeftNavigation from '../components/LeftNavigation'
import CircularBox from '../components/CircularBox'
import ActiveImg from '../assets/Account circle.png'
import waitingImg from '../assets/Account circle (1).png'
import FancyButton from '../components/FancyButton'
import '../css_files/home.css'
import profpic from '../assets/Illustration - Cow.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext'

const home = () => {
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    checkAuth();
    fetchUsers();
  }, [navigate,isAuthenticated]);

  const checkAuth = () => {
    if (!isAuthenticated) {
      navigate('/login'); 
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users', { withCredentials: true });
      setUsers(response.data); 
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
      const pendingUser = users.filter(user => user.approval == 'Pending').length;
      const approvedUser = users.filter(user => user.approval == 'Approved').length;
      const handleApprove = async (userId) => {
        try {
          await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
      
          const response = await axios.put(
            `http://127.0.0.1:8000/update/${userId}`,
            { approval: 'Approved' }, 
            { withCredentials: true }
          );
          console.log('User approved:', response.data);
          fetchUsers(); 
        } catch (err) {
          console.error('Error approving user:', err.response?.data);
        }
      };

      const handleReject = async (userId) => {
        try {
          await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
          const response = await axios.put(
            `http://127.0.0.1:8000/update/${userId}`,
            { approval: 'Rejected' }, 
            { withCredentials: true }
          );
          console.log('User approved:', response.data);
          fetchUsers();
          window.location.reload();
        } catch (err) {
          console.error('Error approving user:', err.response?.data);
        } 
      };
    
  return (
    <>
      <LeftNavigation/>
      <div className='sectionHome'>
      <div className='massiveTopPart'>
          <CircularBox addClass='activeBox'>
            <div className='activeInside'>
              <img src={ActiveImg}/>
              <p className='boldTxt'> Active </p>
            </div>
            <p>{approvedUser}</p>
          </CircularBox>
          <CircularBox  addClass='waitingBox'>
            <div className='waitingInside'>
              <img src={waitingImg}/>
              <p className='boldTxt'>Waiting Approval</p>
            </div>
            <p>{pendingUser}</p>
          </CircularBox>
      </div>
      <CircularBox addClass='coolTable'>
        <table className='myTable' style={{borderCollapse:'collapse'}}>
          <thead style={{borderBottom:'1px solid blue'}}>
            <tr>
              <th className='coolLine'>
                no
              </th >
              <th  className='coolLine'>
                photo
              </th>
              <th className='coolLine'>
                name
              </th>
              <th className='coolLine'>
                action
              </th>
            </tr>
          </thead>
          <tbody>
          {users.filter(user => user.approval === 'Pending').map((user, index) => (
            user.approval == 'Pending' ? (
            <tr>
              <td>{index+1}</td>
              <td>
                <img src={user.image_url? user.image_url : profpic} className='smallImg'/>
              </td>
              <td style={{textDecoration:'underline'}}> <Link to={`/profile/${user.id}`}>{user.username} </Link></td>
              <td>
                <FancyButton section='Approve' className='approveButton' onClick={()=>handleApprove(user.id)}/>
                <FancyButton section='Reject' className='rejectButton' onClick={()=>handleReject(user.id)}/>
              </td>
            </tr> ) : null
          ))}
          </tbody>
        </table>
      </CircularBox>
      </div>
    </>
  )
}

export default home
