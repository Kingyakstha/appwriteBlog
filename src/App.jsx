import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        // console.log('User data is ',userData)
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((e)=>console.log("error is ",e))
    .finally(()=>setLoading(false))
  },[])

return !loading?(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
       TODO <Outlet />
      </main>
      <Footer />
    </div>
  </div>
):(
  <div>hi</div>
)
}

export default App
