import { Badge, Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const GameDetails = ({ game }) => {

    const { platform, publisher, title, thumbnail, genre } = game

    return (
        <Card boxShadow="0 0 10px #0A3A40" backgroundColor="#f0eee9">
            <CardBody>
                <Image
                    src={thumbnail}
                    alt={title}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading fontSize="1rem">{title}</Heading>
                    <Text color='blue.600' fontSize='0.8rem' >
                        {publisher}
                    </Text>
                    <Badge alignSelf="start">{genre}</Badge>
                    <Badge alignSelf="start">{platform}</Badge>
                </Stack>
            </CardBody>
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Link to={`/games/${game.id}`}>
                        <Button variant='ghost' colorScheme='teal' border="1px" padding="1">
                            Details +
                        </Button>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default GameDetails;