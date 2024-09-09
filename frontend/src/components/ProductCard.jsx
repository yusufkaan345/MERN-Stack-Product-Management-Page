import { useDisclosure,Button,ModalFooter,Box, Heading, HStack, IconButton, Image,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,useColorModeValue, useToast, VStack,Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {
    const textColor=useColorModeValue("gray.100","gray.800")
    const bgColor=useColorModeValue("white","gray.800")
    const {deleteProduct,updatedProducts}=useProductStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updatedProduct,setUpdatedProduct]=useState(product)

    const toast=useToast()
    const handleDelete= async(p_id)=>{
        const {success,message }= await deleteProduct(p_id)
        if(!success){
            toast({title:"Error", description:message, status:'error', duration:3000,isClosable:true})
        }else{
            toast({title:"Success", description:message, status:'success', duration:3000,isClosable:true})
        }
    }
    const handleUpdateProduct =async (pid, product)=>{
       const {success,message}= await updatedProducts(pid,product)
        onClose()
        if(!success){
          toast({title:"Error", description:message, status:'error', duration:3000,isClosable:true})
      }else{
          toast({title:"Success", description:message, status:'success', duration:3000,isClosable:true})
      }
    }
  return (
   <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"}
   _hover={{transform:"translateY(-5px)",shadow:"xl"}}
   >
     <Image src={product.image} alt={product.name} h={48} w='full' objectFit="cover"></Image>
     <Box p={4} bg={bgColor}>
        <Heading as='h3' size='md' mb={2}>
            {product.name}
        </Heading>
        <Heading as='h5' size='md' mb={2}>
            ${product.price}
        </Heading>
        <HStack spacing={2}>
          <IconButton icon={<FaRegEdit />} onClick={onOpen} colorScheme='blue'></IconButton>
          <IconButton icon={<MdOutlineDelete /> } onClick={()=>handleDelete(product._id)} colorScheme='red'></IconButton>
        </HStack>
     </Box>

     <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Update Product</ModalHeader>

            <ModalCloseButton/>

            <ModalBody>
                <VStack spacing={4}>
                   <Input placeholder='Product Name' name='name' value={updatedProduct.name}
                   onChange={(e)=>setUpdatedProduct({...updatedProduct, name:e.target.value})}
                   />
                    <Input placeholder='Product Price' name='price' value={updatedProduct.price}
                    onChange={(e)=>setUpdatedProduct({...updatedProduct, price:e.target.value})}
                   />
                    <Input placeholder='Product Image' name='image' value={updatedProduct.image}
                   onChange={(e)=>setUpdatedProduct({...updatedProduct, image:e.target.value})}
                   />
                </VStack>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{handleUpdateProduct(updatedProduct._id,updatedProduct)}}>Update</Button>
            <Button colorScheme='orange'  onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>

     </Modal>
   </Box>
  )
}

export default ProductCard