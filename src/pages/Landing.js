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
          icon={<IconSearch />}
          radius="md"
          size='xl'
        />
      </div>
    </Layout>
  )
}
