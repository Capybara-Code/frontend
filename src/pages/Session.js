import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { createFastboard, mount } from "@netless/fastboard";

export default function Session() {
  const { id } = useParams()
  const [course, setCourse] = useState({})
  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(`/courses/${id}`)
      console.log(res.data)
    }
    getCourse()
  }, [id])
  useEffect(() => {
    let app;
async function mountFastboard(div) {
  console.log("j")
    app = await createFastboard({
        sdkConfig: {
            appIdentifier: "vCwm4JNqEe2F9mVMZcNspw/lQp1ammUX-T80w",
            region: "in-mum",
        },
        joinRoom: {
            uid: localStorage.getItem("username"),
            uuid: "802e8a20936f11ed86a26bf46008d7bd",
            roomToken: "NETLESSROOM_YWs9Y0NRSURxbDBRTXlETXF1aCZub25jZT01NmY0NTlhYy0zOWRhLTQyMTMtOGFkYS04OGY2ZTk3MWNiOGMmcm9sZT0wJnNpZz1hMDhlNTM2MDY4ZTk0MjkzNTBhMGJjYTBlMzBjMTY0MTNhZWJmNTU2ODk4Y2E1OWEzNDA1ZGY0YWFhY2IwNGRjJnV1aWQ9ODAyZThhMjA5MzZmMTFlZDg2YTI2YmY0NjAwOGQ3YmQ",
        },
        managerConfig: {
            cursor: true,
        },
    });
    window.app = app;
    return mount(app, div);
    }

    mountFastboard(document.getElementById("board"));
  },[])
  return (
    <Layout>
    <div>Session</div>
    <div id="board" className='h-[40rem] w-auto'></div>
    </Layout>
  )
}
