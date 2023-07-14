import { HStack,Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <HStack p={"4"} zIndex={10} shadow={"base"} bgColor={"blackAlpha.900"} position={"sticky"} top={"0"}>
        <Button variant={"unstyled"} color={"white"} css={{
          "&:hover" : {color :"red" }
          // "&:hover": { transform: "scale(1.1)" },
        }}>
            <Link to={"/"}>Home</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
            <Link to={"/exchanges"}>Exchanges</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
            <Link to={"/coins"}>Coins</Link>
        </Button>
    </HStack>
  )
}

export default Header