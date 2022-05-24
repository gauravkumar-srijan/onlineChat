import {  ViewIcon } from '@chakra-ui/icons'
import { FormLabel, IconButton, Input, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Button,   Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay } from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';


const Invite = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email , setemail] = useState();
    const [loader , setloader] = useState(false);
    const toast = useToast()
    const Submitemail= async()=>{
        setloader(true)
        if(!email) {
            toast({
                title: 'Fill Enter Email.',
                description: "Fill Input",
                status: 'warning',
                duration: 2000,
                isClosable: true,
              })
              return 

        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        // alert(email)
      const {data}  =  await axios.post('/api/chat/invite' , { email }, config);
    //    console.log(data);
       toast({
        title: data.message,
        description: "Online Chat!!",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
        setloader(false)
        setemail('');
        onClose();
    }
  return (

    <div>
    {children ? (<span onClick={onOpen}> {children}</span>) : (<IconButton d={{ase:"flex"}}
          icon={<ViewIcon />} onClick={onOpen}/>)}
          <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
   <ModalOverlay />
   <ModalContent h="410px">
     <ModalHeader fontSize="40px" fontFamily="Work sans" d="flex" justifyContent="center"
     >
       <h1>Invite User</h1>
     </ModalHeader>
     <ModalCloseButton />
     <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between"
     >
            <FormLabel htmlFor='pass'>Enter Email</FormLabel>
            <Input id='text' name='email' value={email}   type='email' required
             onChange={(e)=>{setemail(e.target.value)}}  placeholder='Enter Email'/>
            <Button onClick={Submitemail}   colorScheme='red' size='md' >  Invite</Button>
            
            
     </ModalBody>
     <ModalFooter>
       <Button onClick={onClose}>Close</Button>
     </ModalFooter>
   </ModalContent>
 </Modal>
</div>
  )
}

export default Invite