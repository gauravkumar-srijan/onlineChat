 import React from 'react';
 import {useDisclosure} from  '@chakra-ui/hooks'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
     ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
 const Profile = ({children , user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
   return (
     <div>
         {children ? (<span onClick={onOpen}> {children}</span>) : (<IconButton d={{ase:"flex"}}
          icon={<ViewIcon />} onClick={onOpen}/>)}
           <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader fontSize="40px" fontFamily="Work sans" d="flex" justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between"
          >
            <Image borderRadius="full" boxSize="150px" src="" alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
     </div>
   )
 }
 
 export default Profile