import { Box, Center, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/GameDetails.css"

const GameDetails = () => {
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetails = async () => {
            const apiKey = "7cf1d9f1e8msh517d715e9e0c570p1acfe7jsnee97d0fe388d"
            const hostKey = "free-to-play-games-database.p.rapidapi.com"
            try {
                const response = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game`, {
                    headers: {
                        "x-rapidapi-key": apiKey,
                        "x-rapidapi-host": hostKey
                    },
                    params: {
                        id: id
                    }
                })
                setGame(response.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchDetails()

    }, [id])

    console.log(game)

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner colorScheme="white" size="xl" />
            </Center>
        )
    }

    if (!game) {
        return (
            <Center>
                <Text>Game not found</Text>
            </Center>
        )
    }

    let gameRequisitesGraphics = null,
        gameRequisitesMemory = null,
        gameRequisitesOS = null,
        gameRequisitesProcessor = null

    if (game.minimum_system_requirements) {
        gameRequisitesGraphics = game.minimum_system_requirements.graphics
        gameRequisitesMemory = game.minimum_system_requirements.memory
        gameRequisitesOS = game.minimum_system_requirements.os
        gameRequisitesProcessor = game.minimum_system_requirements.processor
    }


    const images = game.screenshots

    const UncontrolledExample = () => {
        return (
            <Carousel>
                <Carousel.Item>
                    <Flex justify="center" paddingX="7rem" paddingBottom="3rem"  >
                        <Image width="800px" height="450px" borderRadius={5} paddingX="0.5rem" paddingY="0.5rem" backgroundColor="#FFFF" boxShadow="0 0 5px #FFFF" src={images[0].image} />
                    </Flex>
                </Carousel.Item>
                <Carousel.Item>
                    <Flex justify="center" paddingX="7rem" paddingBottom="3rem" >
                        <Image width="800px" height="450px" borderRadius={5} paddingX="0.5rem" paddingY="0.5rem" backgroundColor="#FFFF" boxShadow="0 0 5px #FFFF" src={images[1].image} />
                    </Flex>
                </Carousel.Item>
                <Carousel.Item>
                    <Flex justify="center" paddingX="7rem" paddingBottom="3rem"  >
                        <Image width="800px" height="450px" borderRadius={5} paddingX="0.5rem" paddingY="0.5rem" backgroundColor="#FFF" boxShadow="0 0 5px #FFFF" src={images[2].image} />
                    </Flex>
                </Carousel.Item>
            </Carousel>
        )
    }

    return (
        <Box background="linear-gradient(#0A3A40, #0A3A40 ,#BD2A2E)" height="100%" w="100%">
            <Flex direction="column" gap={8}>
                <Box marginLeft="9.5rem" marginTop="4rem" marginBottom="2.5rem" borderRadius="0.5rem" >
                    <Flex gap={5} w="85%">
                        <Image src={game.thumbnail} borderRadius="0.5rem" />
                        <Flex direction="column" gap={2}>
                            <Text fontSize="5xl" textTransform="uppercase" fontWeight={600} color="#FFFF" textShadow="0 0 10px #FFFF">{game.title}</Text>
                            <Flex gap={2} >
                                <Text color="#FFFF" fontSize="1rem" fontWeight="500">Developer:</Text>
                                <Text color="#FFFF" fontSize="1rem">{game.developer}</Text>
                            </Flex>
                            <Flex gap={2}>
                                <Text color="#FFFF" fontSize="1rem" fontWeight="500">Genre:</Text>
                                <Text color="#FFFF" fontSize="1rem">{game.genre}</Text>
                            </Flex>
                            <Flex gap={2}>
                                <Text color="#FFFF" fontSize="1rem" fontWeight="500">Platform:</Text>
                                <Text color="#FFFF" fontSize="1rem">{game.platform}</Text>
                            </Flex>
                            <Flex gap={2}>
                                <Text color="#FFFF" fontSize="1rem" fontWeight="500">Release date:</Text>
                                <Text color="#FFFF" fontSize="1rem">{game.release_date}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <hr className="lineS" />
                <Flex gap={5} direction="column" w="85%" padding="2.5rem" alignSelf="center">
                    <Flex direction="column" gap={2}>
                        <Text fontWeight={500} fontSize="1.2rem" color="#FFFF">Description</Text>
                        <Text color="#FFFF">{game.description}</Text>
                    </Flex>
                </Flex>
                <hr className="lineS" />
                <Flex gap={2} direction="column" w="85%" padding="2.5rem" alignSelf="center" >
                    <Text fontWeight={500} fontSize="1.2rem" color="#FFFF">Minimum system requirements</Text>

                    <Flex direction="column">
                        <Flex gap={2}>
                            <Text color="#FFFF" fontSize="1rem" fontWeight="500">Graphics:</Text>
                            <Text color="#FFFF">{(!gameRequisitesGraphics || game.platform === "Web Browser") ? "N/A" : gameRequisitesGraphics}</Text>
                        </Flex>
                        <Flex gap={2}>
                            <Text color="#FFFF" fontSize="1rem" fontWeight="500">Memory:</Text>
                            <Text color="#FFFF">{(!gameRequisitesMemory || game.platform === "Web Browser") ? "N/A" : gameRequisitesMemory}</Text>
                        </Flex>
                        <Flex gap={2}>
                            <Text color="#FFFF" fontSize="1rem" fontWeight="500">OS:</Text>
                            <Text color="#FFFF">{(!gameRequisitesOS || game.platform === "Web Browser") ? "N/A" : gameRequisitesOS}</Text>
                        </Flex>
                        <Flex gap={2}>
                            <Text color="#FFFF" fontSize="1rem" fontWeight="500">Processor:</Text>
                            <Text color="#FFFF">{(!gameRequisitesProcessor || game.platform === "Web Browser") ? "N/A" : gameRequisitesProcessor}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <hr className="lineS" />
                <Text marginTop="3rem" fontWeight={500} fontSize="1.2rem" color="#FFFF" alignSelf="center">Images</Text>
                <Flex justify="center">
                    {UncontrolledExample()}
                </Flex>
            </Flex >
        </Box >
    );
}

export default GameDetails;