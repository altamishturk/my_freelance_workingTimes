import React from 'react'

function Navbar({setisLoggingIn,setIsAddingTime}) {
  const user = JSON.parse(localStorage.getItem("user")); 

  const handleLogout = () => {
    localStorage.setItem("user",null);
    localStorage.setItem("token",null);
  }

  return (
    <div className='shadow-md flex items-center'>
        <div className="container mx-auto flex items-center py-2">
            {
              !user && <button onClick={()=>setisLoggingIn(true)} className='bg-blue-700 py-2 px-4 text-white rounded-md'>Login</button>
            }
            {
              user && <div className="flex gap-5">
                <button onClick={handleLogout} className='bg-red-700 py-2 px-4 text-white rounded-md'>Logout</button>
                <button onClick={()=>setIsAddingTime(true)} className='bg-blue-700 py-2 px-4 text-white rounded-md' title='Add Time'>+</button>
              </div>
            }
        </div>
    </div>
  )
}

export default Navbar;