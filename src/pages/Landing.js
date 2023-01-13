import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { TextInput, Card, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import axios from '../axios'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Landing() {
  const [sessions, setSessions] = useState([])
  const [yourSessions, setYourSessions] = useState([])
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    const getSessions = async () => {
      const res = await axios.get("/courses")
      setSessions(res.data.courses)
      const res2 = await axios.get(`/courses/author/${auth.username}`)
      setYourSessions(res2.data.course)
    }
    getSessions()
  },[auth.username])
  return (
    <Layout>
      <div>
        <TextInput
          placeholder="Search for tutors and sessions."
          icon={<IconSearch size={18} />}
          radius="xl"
          size='sm'
          variant='filled'
          className='lg:w-6/12'
        />
        {(auth.token && (auth.isTutor === "false" || auth.isTutor === false)) ?
        <div className="rounded-md mt-8 bg-white drop-shadow-lg p-5">
          <h2 className='lg:text-2xl text-xl'>Reccomended Sessions</h2>
          <div className='flex gap-5 mt-8 overflow-scroll flex-nowrap'>
          {sessions.map((session, index) => {
            return (
              <Link className='xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]' to={`/session/${session.ID}`}>
              <Card className='cursor-pointer h-full xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]' shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <img
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>
                <Text mt="md" mb="xs" weight={500}>{session.course_name}</Text>
                <Text size="sm" color="dimmed">
                  {session.author}
                </Text>
              </Card>
              </Link>
            )
          })}
          </div>
        </div>
        : auth.token ? (
          <div className="rounded-md mt-8 bg-white drop-shadow-lg p-5">
          <h2 className='lg:text-2xl text-xl'>Your Sessions</h2>
          <div className='flex gap-5 mt-8 overflow-scroll flex-nowrap'>
          {yourSessions.map((session, index) => {
            return (
              <Link className='xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]' to={`/session/${session.ID}`}>
              <Card className='cursor-pointer h-full xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]' shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <img
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>
                <Text mt="md" mb="xs" weight={500}>{session.course_name}</Text>
                <Text size="sm" color="dimmed">
                  {session.author}
                </Text>
              </Card>
              </Link>
            )
          })}
          </div>
        </div>
        ) : null}
        <div className='grid grid-cols-12 gap-5 mt-8'>
        {sessions.map((session, index) => {
          return (
            <Link className='xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12' to={`/session/${session.ID}`}>
            <Card className='cursor-pointer h-full' shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <img
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Text mt="md" mb="xs" weight={500}>{session.course_name}</Text>
              <Text size="sm" color="dimmed">
                {session.author}
              </Text>
            </Card>
            </Link>
          )
        })}
        </div>
      </div>
    </Layout>
  )
}
