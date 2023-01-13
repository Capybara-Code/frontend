import React from 'react'
import Layout from '../components/Layout'
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';

export default function Landing() {
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
      </div>
    </Layout>
  )
}
