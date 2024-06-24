import { Input, InputGroup, InputRightElement, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem("isAuthenticated", "false")
    }, [])

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    const validatePassword = (password) => {
        return password.length >= 8
    }

    const handleEmailIsValid = (event) => {
        const email = event.target.value
        setEmail(email)
        setIsValidEmail(validateEmail(email))
    }

    const handlePasswordIsValid = (event) => {
        const password = event.target.value
        setPassword(password)
        setIsValidPassword(validatePassword(password))
    }

    const handleLogin = () => {
        if (isValidEmail && isValidPassword) {
            localStorage.setItem("isAuthenticated", "true")
            navigate("/games")
        }
    }

    return (
        <Flex justify="center" align="center" height="100vh" background="linear-gradient(#042326, #0A3A40 ,#BD2A2E)">
            <Flex
                direction="column"
                w="30rem"
                marginX="auto"
                gap="1rem"
                padding="2rem"
                borderRadius="10px"
                boxShadow="0 0 10px #B2BEBF"
                backgroundColor="#FFFF"
                color="#000">
                < Text fontSize="1.5rem" fontWeight="600" textAlign={"center"} >
                    Login
                </Text >
                <Flex justify="center" direction="column">
                    <Text>Email</Text>
                    <Input pr='4.5rem'
                        type="email"
                        placeholder='Enter email'
                        value={email}
                        onChange={handleEmailIsValid}
                    />
                </Flex>
                <Flex direction="column">
                    <Text>Password</Text>
                    <InputGroup size="md">
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={password}
                            onChange={handlePasswordIsValid}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                <Flex justify="center" mt="0.8rem">
                    <Button colorScheme="red" onClick={handleLogin} isDisabled={!isValidEmail || !isValidPassword}>
                        Login
                    </Button>
                </Flex>
            </Flex >
        </Flex>
    )
}

export default Login;