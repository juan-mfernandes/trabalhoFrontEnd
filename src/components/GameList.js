import { Box, Button, Center, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import GameCard from "./GameCard"
import Header from "./Header";

const GameList = () => {
    const [games, setGames] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const gamesPerPage = 20

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const savedPage = sessionStorage.getItem('currentPage')
        if (savedPage) {
            setCurrentPage(Number(savedPage))
        }
        getAllGames()
    }, [])

    useEffect(() => {
        sessionStorage.setItem('currentPage', currentPage)
    }, [currentPage])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const page = params.get('page')
        if (page) {
            setCurrentPage(Number(page))
        }
    }, [location.search])

    const getAllGames = async () => {
        const apiKey = "7cf1d9f1e8msh517d715e9e0c570p1acfe7jsnee97d0fe388d"
        const hostKey = "free-to-play-games-database.p.rapidapi.com"
        try {
            const response = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical", {
                headers: {
                    "x-rapidapi-key": apiKey,
                    "x-rapidapi-host": hostKey
                }
            })
            setGames(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const updateUrl = (page) => {
        navigate(`/games?page=${page}`)
    }

    const handleNextPage = () => {
        if (currentPage < Math.ceil(games.length / gamesPerPage)) {
            setCurrentPage(currentPage + 1)
            updateUrl(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            updateUrl(currentPage - 1)
        }
    }

    const renderGamesList = () => {
        const indexOfLastGame = currentPage * gamesPerPage
        const indexOfFirstGame = indexOfLastGame - gamesPerPage
        const currentGames = games.slice(indexOfFirstGame, indexOfLastGame)
        console.log(currentGames)

        if (loading) {
            return (
                <Center height="100vh">
                    <Spinner colorScheme="white" size="xl" />
                </Center>
            )
        }

        return (
            < Grid templateColumns='repeat(4, 5fr)' gap={6} w="97%">
                {
                    currentGames.map((game, index) => (
                        <GridItem key={index} >
                            <GameCard game={game} />
                        </GridItem>
                    ))
                }
            </Grid >
        )
    }

    return (
        <Box background="linear-gradient(#0A3A40 ,#BD2A2E)">
            <Flex direction="column">
                <Header title="Search FreeToPlayGames" />
                <Flex direction="column" justify="center" align="center" padding="4rem" >
                    {renderGamesList()}
                    <Flex mt="1.8rem">
                        <Button onClick={handlePreviousPage} isDisabled={currentPage === 1} mr={2} colorScheme="red">Anterior</Button>
                        <Button onClick={handleNextPage} isDisabled={currentPage === Math.ceil(games.length / gamesPerPage)} colorScheme="blue">Próximo</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default GameList;