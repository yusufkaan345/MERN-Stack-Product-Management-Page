import {
    Button,
    Container,
    Flex,
    HStack,
    Text,
    useColorMode,
    useColorModeValue
  } from '@chakra-ui/react';
  import React from 'react';
  import { Link } from 'react-router-dom'; // Correct import from react-router-dom
  import { CiSquarePlus } from "react-icons/ci";
  import { IoMoon, IoSunny } from "react-icons/io5";
import { useProductStore } from '../store/product';
  
  function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode(); // Correct function name
    const {products}= useProductStore()

    return (
      <Container maxW={"1140px"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{ base: "column", sm: "row" }}>
          <Text
            bgGradient='linear(to-l, #87ceeb, 	#000080)'
            bgClip='text'
            fontSize={{ base: "30px" }}
            fontWeight='extrabold'
          >
            <Link to={"/"}>Product Store 🛒</Link>
          </Text>
         
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button>
                <CiSquarePlus />
              </Button>
            </Link>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <IoSunny /> : <IoMoon />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    );
  }
  
  export default Navbar;
  