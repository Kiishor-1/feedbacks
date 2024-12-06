import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Home from './pages/Home'
import AdminPanel from './pages/AdminPanel'
import Feedbacks from './components/Admin/Feedbacks'
import ViewFeedback from './components/Admin/ViewFeedback'

export default function App() {
  return (
    <div className='flex flex-col bg-blue-50 min-h-screen'>
      <Routes>
        <Route path='/login' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<AdminPanel/>}>
          <Route index  element={<Feedbacks/>}/>
          <Route path='feedbacks/:id' element={<ViewFeedback/>}/>
        </Route>
      </Routes>
    </div>
  )
}




