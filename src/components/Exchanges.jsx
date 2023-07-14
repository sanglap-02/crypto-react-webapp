import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from "../index.js"
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader.jsx';
import Errorcomponents from './Errorcomponents.jsx';
function Exchanges() {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`)
            console.log(data);
            setLoding(false)

            setExchanges(data)
            } catch (error) {
                setError(true)
                setLoding(false)
            }
        };
        fetchExchanges();
    }, [])

    if(error) return <Errorcomponents massage="error while loding exchanges"/>

    return (
        <div className='blackBackground'>
            <Container maxW={"container.xl"}>
            {loading ? <Loader /> : <>
                <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                    {
                        exchanges.map((i) => {
                            return <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank
                            } url={i.url}></ExchangeCard>
                        })
                    }
                </HStack>
            </>}
        </Container>
        </div>
        
    )
};

const ExchangeCard = ({ name, img, rank, url }) => {
    return (
        <>
            <a href={url} target={"blank"}>
                <VStack className='glass' width={"52"} shadow={"dark-lg"} p={"8"} borderRadius={"10"} transition={"all 0.3s"} m={"4"}  css={{
                    "&:hover":{transform : "scale(1.1)"},
                    "transition":"all 0.5"
                }}>
                    <Image src={img} h={"10"} objectFit={"contain"} alt={"exchanges"}></Image>
                    <Heading color={'white'} size={"md"} noOfLines={1}>{rank}</Heading>
                    <Text className='glowing-text' >{name}</Text>
                </VStack>
            </a>

        </>
    )

}

export default Exchanges