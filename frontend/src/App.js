
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import CalendarComp from './components/Timer.jsx'
// import DateRangeComp from './components/DateRangeComp.jsx'
// import DateRangePickerComp from './components/DateRangePickerComp.jsx'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
