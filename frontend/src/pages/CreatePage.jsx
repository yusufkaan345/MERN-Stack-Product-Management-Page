import { Container, Heading, VStack, Box, Input, Button, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })
  const { createProduct } = useProductStore()
  const toast = useToast()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    if (!success) {
      toast({ title: "error", description: message, status: "error", duration: 3000, isClosable: true })
    } else {
      toast({ title: "success", description: message, status: "success", duration: 3000, isClosable: true })
    }
    setNewProduct({ name: "", price: "", image: "" })
  }
  return (
    <>
      <Container maxW={"container.sm"}>
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Product
          </Heading>

          <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
            <VStack spacing={4}>
              <Input placeholder="Product Name" name='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
              <Input placeholder="Product Price" type='number' name='price' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              <Input placeholder="Product Image URL" name='image' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
              <Button colorScheme='blue' onClick={handleAddProduct}>Add product</Button>
            </VStack>
          </Box>

        </VStack>

      </Container>
    </>
  )
}

export default CreatePage