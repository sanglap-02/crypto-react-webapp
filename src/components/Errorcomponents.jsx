import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

function Errorcomponents(massage) {
  return (
    <Alert status='error'>
  <AlertIcon />
  <AlertTitle>Please refresh</AlertTitle>
  <AlertDescription>{massage} </AlertDescription>
</Alert>
  )
}

export default Errorcomponents