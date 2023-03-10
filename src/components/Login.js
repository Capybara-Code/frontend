import React, { useState } from 'react'
import logo from '../assets/capy2.svg'
import { TextInput, PasswordInput, SegmentedControl, Chip } from '@mantine/core'
import axios from '../axios'
import { setUserInfo } from '../app/slices/authSlice'
import { useDispatch } from 'react-redux'
import { Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

export default function Login() {
  const [login, setLogin] = useState(true)
  const [isTutor, setIsTutor] = useState('false')
  const [email, setEmail] = useState("")
  const [userID, setUserID] = useState("")
  const [password, setPassword] = useState("")
  const [interests, setInterests] = useState([])
  const [checkPassword, setCheckPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const register = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/signup", {
        user_id: userID,
        email: email,
        password: password,
        is_tutor: isTutor === "true",
        interests: interests.join(",")
      })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.user.user_id)
      localStorage.setItem("email", res.data.user.email)
      localStorage.setItem("_id", res.data.user.ID)
      localStorage.setItem("isTutor", res.data.user.is_tutor)
      localStorage.setItem("interests",res.data.user.interests)
      dispatch(setUserInfo({ user: res.data.user, token: res.data.token }))
      setLoading(false)
      window.location.reload();
    } catch {
      console.log("oops?")
      setLoading(false)
      showNotification({
        title: 'Oops',
        message: 'There was an error signing you up. 🤥',
        color:"red",
        autoClose: 5000,
      })
    }
  }
  const startlogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/login", {
        user_id: userID,
        password: password,
      })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.user.user_id)
      localStorage.setItem("email", res.data.user.email)
      localStorage.setItem("_id", res.data.user.ID)
      localStorage.setItem("isTutor", res.data.user.is_tutor)
      localStorage.setItem("interests",res.data.user.interests)
      dispatch(setUserInfo({ user: res.data.user, token: res.data.token }))
      setLoading(false)
      window.location.reload();
    } catch {
      console.log("oops?")
      setLoading(false)
      showNotification({
        title: 'Oops',
        message: 'There was an error logging you in. 🤥',
        color:"red",
        autoClose: 5000,
      })
    }
  }
  return (
    <>
    {login ?
    <form onSubmit={(e) => {e.preventDefault();startlogin()}} className='m-5 flex flex-col'>
      <span className="flex justify-between items-center">
      <h2 className='lg:text-3xl text-xl font-bold'>Welcome Back</h2>
      <img src={logo} alt="logo" />
      </span>
      <TextInput
        placeholder="therealsupermario"
        label="Username"
        required
        className='mt-8'
        classNames={{input: "border-slate-300", label: "text-slate-500"}}
        value={userID}
        onChange={(event) => setUserID(event.currentTarget.value)}
      />
      <PasswordInput
        placeholder="youshallpassmaybe"
        label="Password"
        required
        className='mt-8'
        classNames={{input: "border-slate-300", label: "text-slate-500"}}
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <p className='text-indigo-600 text-sm font-light text-right mt-3'>Forgot Password?</p>
      <button style={{background: "rgb(230, 138, 60)"}} className='mx-auto lg:w-4/12 md:w-7/12 w-full flex justify-center mt-6 text-xl text-center rounded-full p-2 text-white'>
        {loading ? <Loader /> : "Login"}
      </button>
      <p className='text-sm font-light text-center mt-5'>Don't have an account? <span onClick={() => setLogin(false)} className='text-indigo-600 cursor-pointer'>Make one.</span></p>
    </form>
    : (
    <form onSubmit={(e) => {e.preventDefault();register()}} className='m-5 flex flex-col'>
      <span className="flex justify-between items-center">
      <h2 className='lg:text-3xl text-xl font-bold'>Hello There</h2>
      <img src={logo} alt="logo" />
      </span>
      <TextInput
        placeholder="therealsupermario"
        label="Username"
        required
        className='mt-8'
        classNames={{input: "border-slate-300", label: "text-slate-500"}}
        value={userID}
        onChange={(event) => setUserID(event.currentTarget.value)}
      />
      <TextInput
        placeholder="thedoeofjohn@aolol.mars"
        label="Email"
        required
        className='mt-8'
        classNames={{input: "border-slate-300", label: "text-slate-500"}}
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <PasswordInput
        placeholder="youshallpassmaybe"
        label="Password"
        required
        className='mt-8'
        classNames={{input: "border-slate-300", label: "text-slate-500"}}
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <PasswordInput
        placeholder="youshallpassmaybe"
        label="Once more, s'il vous plaît."
        required
        className='mt-8'
        classNames={{input: "border-slate-300", label: "text-slate-500"}}
        value={checkPassword}
        onChange={(event) => setCheckPassword(event.currentTarget.value)}
      />
      <SegmentedControl
        value={isTutor}
        onChange={setIsTutor}
        className='mt-8'
        data={[
          { label: 'Student', value: 'false' },
          { label: 'Tutor', value: 'true' },
        ]}
      />
      <Chip.Group className='mt-8' multiple={true} value={interests} onChange={setInterests}>
        <Chip value="mlai">ML/AI</Chip>
        <Chip value="webdev">Web Dev</Chip>
        <Chip value="gamedev">Game Dev</Chip>
        <Chip value="osdev">OS Dev</Chip>
        <Chip value="uiux">UI/UX</Chip>
        <Chip value="graphics">Graphic Design</Chip>
        <Chip value="security">Security</Chip>
        <Chip value="ar">AR</Chip>
        <Chip value="blockchain">Blockchain</Chip>
        <Chip value="appdev">App Dev</Chip>
        <Chip value="dsa">DSA</Chip>
        <Chip value="graph">Graph Theory</Chip>
      </Chip.Group>
      <button style={{background: "rgb(230, 138, 60)"}} className='mx-auto lg:w-4/12 md:w-7/12 w-full flex justify-center mt-6 text-xl text-center rounded-full p-2 text-white'>
        {loading ? <Loader /> : "Register"}
      </button>
      <p className='text-sm font-light text-center mt-5'>Already have an account? <span onClick={() => setLogin(true)} className='text-indigo-600 cursor-pointer'>Alright, login.</span></p>
    </form>
    )}
    </>
  )
}
