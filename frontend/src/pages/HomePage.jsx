import React, { useEffect } from 'react'
import { Container, VStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'
function HomePage() {
  const {fetchProducts, products}=useProductStore()
  useEffect(()=>{
      fetchProducts()
  },[fetchProducts])

  console.log(products)
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient='linear(to-l,  #87ceeb, 	#000080)'
          bgClip='text'
          fontSize={{ base: "36px" }}
          fontWeight='extrabold'
        > Current Products 🚀
        </Text>


        <SimpleGrid columns={
          {
            base: 1,
            md: 2,
            lg: 3
          }
        } spacing={10} width={"full"}>
           {products.map((item)=>(
            <ProductCard key={item._id} product={item}></ProductCard>
           ))}
        </SimpleGrid>

        {products.length==0 && (<Text
          color='gray.500'
          fontSize={"xl"}
          textAlign={"center"}

        > No Products Found :/ <Link to={"/create"}><Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>Create a product</Text></Link>
        </Text>)}
      </VStack>
    </Container >
  )
}

export default HomePage