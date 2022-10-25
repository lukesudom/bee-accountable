import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../components/features/auth/authSlice'
let Logo = require('../imgs/logobehhive.jpg')

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
        <img style={{ width:150, height: 130}} src={Logo} alt='bee'></img>
        </Link>
        <h1>ACCOUNTABLE</h1>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
            <Link to='/about'>
                 Calendar
              </Link>
            <Link to='/'>
              Dashboard
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
            <li>
  
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header