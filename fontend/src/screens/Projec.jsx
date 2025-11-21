'use client'
import React from 'react'
import { useState } from 'react'
import {useNavigate , useLocation} from 'react-router-dom'

const Project = ({navigate}) =>{
      const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)
    const location = useLocation()
    console.log(location.state)
    return(
        <main className='h-screen w-screen flex'>

            <section className='left relative flex flex-col h-full min-w-72 bg-slate-300'>
                <header className='flex justify-end  p-2 px-4 w-full bg-slate-100'>
                    <button className='p-2' onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)}>
                          <i className="ri-group-fill"></i>
                    </button>
                    
                </header>


                <div className="conversation-area flex-grow flex flex-col ">


                    <div className='message-box p-1 flex-grow flex flex-col gap-1 '>
                        <div className="incoming max-w-56  message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                           
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                        <p className='text-sm'> Lorem ipsum dolor sit amet.</p>   
                        </div>

                        <div className="ml-auto max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                           
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                        <p className='text-sm'> Lorem ipsum dolor sit amet.</p>   
                        </div>

                        <div className={`sidePanel w-full flex flex-col gap-2 h-full  absolute  transition-all bg-slate-50  ${isSidePanelOpen? 'translate-x-0':'-translate-x-full'} right-0 top-0 `} >

                            <header className='flex justify-end p-2 px-4 bg-gray-600'>
                                <button onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)}>
                                         <i className="ri-close-fill"></i>
                                </button>
                         
                            </header>
                            

                            <div className="users flex flex-col gap-2 "> 
                                <div className="user flex gap-2 items-center hover:bg-slate-400">
                                  <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center  p-5  text-white bg-gray-900'>

                                    <i className='ri-user-fill absolute'></i>

                                  </div>
                                  <h1 className='font-semibold text-lg'>Username</h1>
                                </div>
                            </div>



                        </div>

                    </div>
                    <div className="inputField w-full flex">
                        <input type="text" placeholder='Enter message' className='p-2 py-4 border-none  outline-none flex-grow' />
                        <button className='px-3'><i className="ri-send-plane-fill"></i></button>
                    </div>





                </div>




            </section>

        </main>
    )
}

export default Project