import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Drawer } from '@mantine/core'
import { IconMenu2, IconQuestionCircle } from '@tabler/icons'
import logo from '../assets/capy.svg'
import capychill from '../assets/capywater.png'
import Login from './Login'
import { logout } from '../app/slices/authSlice'

export default function Layout({children}) {
  const auth = useSelector(state => state.auth)
  const [loginOpened, setLoginOpened] = useState(false)
  const [drawerOpened, setDrawerOpened] = useState(false)
  const dispatch = useDispatch()

  return (
    <>
    {auth.token ?
    <div className='fixed top-0 right-0 m-5 rounded-full bg-white drop-shadow-md flex flex-row gap-2 items-center'>
      <img className='rounded-full h-9' src={`https://api.multiavatar.com/${auth.username}.svg`} alt="pfp"></img>
      <p className='mr-3 text-sm text-slate-500'>{auth.username.slice(0,20)}</p>
    </div>
    : null}
    <IconQuestionCircle className='cursor-pointer fixed bottom-0 right-0 m-5 z-10' size={40} />
    <Modal
      centered
      opened={loginOpened}
      onClose={() => setLoginOpened(false)}
      size="xl"
    >
      <Login />
    </Modal>
    <Drawer
      opened={drawerOpened}
      onClose={() => setDrawerOpened(false)}
      title="capydemy"
      padding="xl"
      size="xl"
    >
      <div className='flex flex-col justify-between h-full'>
      {auth.token ?
      <div className='flex flex-col gap-5 mt-10'>
        <NavLink to="/" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
          Dashboard
        </NavLink>
        <NavLink to="/history" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
          History
        </NavLink>
        <NavLink to="profile" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
          Profile
        </NavLink>
        <NavLink to="reports" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
          Reports
        </NavLink>
        <NavLink to="notes" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2 bg-white'>
          Notes
        </NavLink>
        <button onClick={() => dispatch(logout())} className='text-red-500 mx-auto lg:w-4/12 md:w-7/12 w-full flex mt-6 text-xl text-center rounded-full p-2 text-white'>
          Logout
        </button>
      </div>
      : (
        <div onClick={() => setLoginOpened(true)} className='flex flex-col gap-5 mt-10'>
        <NavLink style={{background: "rgb(230, 138, 60)"}} className='text-center rounded-full p-2 text-white'>
          Login/Register
        </NavLink>
        </div>
      ) }
      <div className='mt-auto rounded-md bg-indigo-50 p-3 -m-2 flex flex-col'>
        <h3 className='xl:text-xl text-lg font-semibold'>Capy Fact <span className='text-slate-400'>#{Math.floor(Math.random()*100)}</span></h3>
        <p className='mt-2 leading-snug'>Capybaras are so chill about other animals sitting on them, that they’ve been called “moving chairs”. Birds, rabbits and even monkeys have been spotted taking a ride.</p>
        <img className='ml-auto mt-4' src={capychill} alt="capychill" />
      </div>
      </div>
    </Drawer>
    <div className='w-screen grid-cols-12 grid'>
      <div className="lg:block hidden xl:col-span-3 lg:col-span-4 h-screen sticky top-0 p-5">
        <div className='sidebar rounded-md bg-white drop-shadow-lg h-full xl:p-8 p-5 flex flex-col'>
          <div>
            <span className='flex justify-center items-center gap-5'>
              <img src={logo} alt="logo" />
              <h1 className='xl:text-3xl text-xl font-bold'>capydemy</h1>
            </span>
            {auth.token ?
            <div className='flex flex-col gap-3 mt-10'>
              <NavLink to="/" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
                Dashboard
              </NavLink>
              <NavLink to="/history" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
                History
              </NavLink>
              <NavLink to="/profile" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
                Profile
              </NavLink>
              <NavLink to="/reports" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2'>
                Reports
              </NavLink>
              <NavLink to="/notes" style={({ isActive }) => ({ background: isActive ? "rgb(230, 138, 60)" : "white", color: isActive ? "white" : "black"})} className='navlink text-center rounded-full p-2 bg-white'>
                Notes
              </NavLink>
              <button onClick={() => dispatch(logout())} className='logout flex justify-center text-red-500 mx-auto w-full flex mt-6 text-center rounded-full p-2 text-white'>
                Logout
              </button>
            </div>
            : (
              <div onClick={() => setLoginOpened(true)} className='flex flex-col gap-5 mt-10'>
              <NavLink style={{background: "rgb(230, 138, 60)"}} className='text-center rounded-full p-2 text-white'>
                Login/Register
              </NavLink>
              </div>
            ) }
          </div>
          <div className='mt-auto rounded-md bg-indigo-50 p-3 -m-2 flex flex-col'>
            <h3 className='xl:text-xl text-lg font-semibold'>Capy Fact <span className='text-slate-400'>#{Math.floor(Math.random()*100)}</span></h3>
            <p className='mt-2 leading-snug'>Capybaras are so chill about other animals sitting on them, that they’ve been called “moving chairs”. Birds, rabbits and even monkeys have been spotted taking a ride.</p>
            <img className='ml-auto mt-4' src={capychill} alt="capychill" />
          </div>
        </div>
      </div>
      <div className="justify-center items-center lg:hidden block col-span-12 flex px-5 pt-5">
        <span className='flex justify-center items-center gap-5'>
          <img src={logo} alt="logo" />
          <h1 className='xl:text-3xl text-xl font-bold'>capydemy</h1>
        </span>
        <IconMenu2 onClick={() => setDrawerOpened(true)} className='absolute top-0 left-0 m-5' />
      </div>
      <div className="xl:col-span-9 lg:col-span-8 col-span-12 p-5 min-h-screen relative">
        {children}
        <div style={{transform: "translate(-50%, 0)"}} className='flex flex-col items-center absolute bottom-0 left-1/2'>
        <img src="https://api.capy.lol/v1/capyhour" alt="capyhour" className='rounded-md w-40 w-full' />
        <p className='mt-2 text-slate-500 text-center'>Capybara of the hour to keep you motivated :)</p>
        <p className='text-center p-5'>Created by Capybara Code</p>
        </div>
      </div>
    </div>
    </>
  )
}
