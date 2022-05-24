import React ,{useState,useContext ,useEffect} from 'react';
import { ChatContext } from '../../contextApi/chatProvider';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import {getSendder} from '../chatconfig/Chatlogic'
import GroupChatModal from './groupchat/GroupChatModal';
const Mychats = ({fetchuser}) => {
  const [loggeduser , setloggeduser] = useState();
  const {user, chats ,setchats ,Selecthat, setSelecthat} = useContext(ChatContext);
  const toast = useToast();

  const Fetch = async ()=>{
    try{
      const  config = {
            headers:{
              "Authorization" : `Bearer ${user.token}`,
            },
          }
        const {data} = await axios.get('/api/chat' ,  config)
        console.log("fetch chat",data);
        setchats(data)
                

    }
    catch(error){
      toast({
        title: "error occured",
        description: "fail",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    }
  }
  useEffect(() => {
    setloggeduser(JSON.parse(localStorage.getItem("userInfo")))
    Fetch();
  
  }, [fetchuser])
  console.log("check" ,loggeduser);
  return (
    <Box
    d={{ base: Selecthat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    h='81.5vh'
    p={3}
    bg="white"
    w={{ base: "100%", md: "31%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
    <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
          </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
   
      >
      {console.log("chats 1",chats)}
      {chats ? (
            <Stack overflow="scroll">
                  {chats.map((chat)=>
                  (
                    <Box
                  
                    onClick={() => setSelecthat(chat)}
                    cursor="pointer"
                    bg={Selecthat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={Selecthat === chat ? "white" : "black"}
                    _hover={{
                      background:"grey",
                      color:'black'
                  }}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    {/* {console.log("chatmychats" ,chat)} */}
                    <Text>
                      {/* {console.log("chatuser" , chat.users)} */}
                      {/* {chat.chatName} */}
                      {/* {console.log("chatuser" , chat)} */}
                      {!chat.isGroupChat
                        ? getSendder(loggeduser, chat.users)
                        : chat.chatName}
                    </Text>
                    
                  </Box>
                  ))}
            </Stack>
      ) : <ChatLoading />}
      </Box>
    </Box>
  )
}

export default Mychats