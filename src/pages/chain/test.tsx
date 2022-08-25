import { useRouter } from 'next/router'
import React from 'react'

const Chain = () => {

    const router = useRouter()
    const {name} = router.query

  return (
    <div>{name}</div>
  )
}

export default Chain