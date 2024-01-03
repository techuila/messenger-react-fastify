import React from 'react'
import { trpc } from '~/utils/trpc'

function Test() {
  return <div>{trpc.getMessage.useQuery().data}</div>
}

export default Test
