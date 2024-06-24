import { Box, Text } from "@chakra-ui/react";

const Header = ({ title }) => {
    return (
        <Box bgColor="#00635A" w="100%" padding={4} boxShadow="0 0 10px #00635A">
            <Text color="#FFFF" fontSize="1.2rem" textShadow="0 0 10px #FFFF" margin="0">
                {title}
            </Text>
        </Box>
    )
}

export default Header;