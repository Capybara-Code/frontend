import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { TextInput, Card, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import axios from '../axios'
import { Link } from 'react-router-dom';

export default function Landing() {
  const [sessions, setSessions] = useState([])
  useEffect(() => {
    const getSessions = async () => {
      const res = await axios.get("/courses")
      setSessions(res.data.courses)
    }
    getSessions()
  },[])
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
        <div className="rounded-md mt-8 bg-white drop-shadow-lg p-5">
          <h2 className='lg:text-2xl text-xl'>Reccomended Sessions</h2>
        </div>
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
