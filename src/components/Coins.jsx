import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from "../index.js"
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader.jsx';
import Errorcomponents from './Errorcomponents.jsx';
import { Link } from 'react-router-dom';
import "../sytles/card.css"
function Coins() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr");

    const currencySymbol= currency==="inr" ? "₹" : currency==="eur" ? "€" : "$"

    const changePage=(page)=>{
        setPage(page)
        setLoding(true)
    }
    const btns=new Array(132).fill(1)

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                console.log(data);
                setLoding(false)

                setCoins(data)
            } catch (error) {
                setError(true)
                setLoding(false)
            }
        };
        fetchCoins();
    }, [currency,page])

    if (error) return <Errorcomponents massage="error while loding exchanges" />

    return (
        
        <div className='blackBackground'>
            <Container maxW={"container.xl"} backgroundColor={"blackAlpha.900"}>
            {loading ? <Loader /> : <>

                <RadioGroup textColor={'white'} value={currency} onChange={setCurrency} p={"8"}>
                    <HStack spacing={"4"}>
                    {/* "inr" ? "₹" : currency==="eur" ? "€" : "$" */}
                        <Radio colorScheme='green' value='inr'>INR</Radio>
                        <Radio colorScheme='green' value='usd'>USD</Radio>
                        <Radio colorScheme='green' value='eur'>ERU</Radio>
                    </HStack>
                </RadioGroup>
                <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                    {
                        coins.map((i) => {
                            return <CoinCard key={i.id} id={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price
                            } currencySymbol={currencySymbol}></CoinCard>
                        })
                    }
                </HStack>

                <HStack width={"full"} overflowX={"auto"} p={"8"}>
                    
                    {
                        btns.map((item,index)=>{
                            return <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)}>{index+1}</Button>
                        })
                    }
                </HStack>
            </>}
        </Container>
        </div>
            
        
    )
};

const CoinCard = ({id, name, img, symbol, price,currencySymbol="₹" }) => {
    return (
        <>
            <Link to={`/coin/${id}`} >
            <div >
            <VStack className='glass' width={"52"} shadow={"dark-lg"} p={"8"} borderRadius={"md"} transition={"all 0.3s"} m={"4"} css={{
                    "&:hover": { transform: "scale(1.1)" },
                    "transition": "all 0.5"
                }}>
                    <Image src={img} h={"10"} objectFit={"contain"} alt={"exchanges"}></Image>
                    <Text className='glowing-text' color={"whiteAlpha.900"}>{symbol}</Text>
                    <Text color={"whiteAlpha.900"} noOfLines={1}>{name}</Text>
                    <Text color={"green.500"} >{price? `${currencySymbol} ${price}`:"NA"}</Text>
                </VStack>
            </div>
                
            </Link>

        </>
    )

}


export default Coins