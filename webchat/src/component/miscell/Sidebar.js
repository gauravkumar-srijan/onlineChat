import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Tooltip   } from '@chakra-ui/react';
import {Box , Text} from '@chakra-ui/layout'
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/menu"
import React ,{useState , useContext} from 'react'
import { BellIcon, ChevronDownIcon, PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { ChatContext } from '../../contextApi/chatProvider';
import Profile from './profile';
import {useNavigate} from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from '@chakra-ui/react';
import ChatLoading from './ChatLoading';
import UserlistItem from '../userAvatar/userListitem';
import { Spinner } from '@chakra-ui/react'
import Passchange from './passchange/Passchange';
import Invite from './inviteuser/Invite';

import axios from 'axios';

const Sidebar = () => {
    const [search , setsearch] = useState();
    const [searchResult , setsearchResult] = useState([]);
    const [loading , setloading] = useState(false);
    const [loadingChat , setloadingChat] = useState();
    const toast = useToast()
        const navigate = useNavigate();
    const {user , chats ,setchats ,Selecthat, setSelecthat} = useContext(ChatContext);
    // console.log(user.token)
    const loggedOut =()=>{
        // alert("fkjnf");
        localStorage.removeItem("userInfo");

        navigate('/')
    }
    const { isOpen, onOpen, onClose } = useDisclosure();

        const handleSearch= async()=>{
            // alert("dekud");
       
            if(!search){
              toast({
                title: "Enter Name",
                description: "fill all details",
                status: 'warning',
                duration: 2000,
                isClosable: true,
              })
           
              return;
            } 
            // console.log("yrfg");
            try{
              setloading(true);
              const  config = {
                    headers:{
                      "Authrization" : `Bearer ${user.token}`,
                    }
                  }
                const {data} = await axios.get(`/api/user?search=${search}` , config)
                        // console.log(data);
                        setloading(false);
                        setsearchResult(data);

            }
            catch(error){
              toast({
                title: "error to fetch user",
                description: "fail",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
            }

        }
        const accessChat =async (userId)=>{
          // alert(user.token);
          try{
            setloadingChat(true);
            const  config = {
                  headers:{
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${user.token}`,
                  },
                }
              const {data} = await axios.post('/api/chat' , {userId} ,  config)
              // console.lof(data);
              // console.log(data);
              console.log("chats :",chats)
              if(!chats.find((c)=> c._id === data._id)) setchats([data , ...chats]);
          
              
              // console.log("userside" , data);
                          setSelecthat(data);
                          setloadingChat(false);
                          onClose();

          }
          catch(error){

          
            toast({
              title: "error to chat user",
              description: "fail",
              status: 'warning',
              duration: 2000,
              isClosable: true,
            })
            throw new Error(error.message);
          }
        }
        const handleKeyPress=(e)=>{
          if(e.key==='Enter')
          {
            handleSearch()
          }
        }

      
      
  return (
    <>
    <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" 
    p="5px 10px 5px 10px" borderWidth="5px">
       
       <Tooltip label="search user to chat" hasArrow placement='bottom-end'>
    
            <Button variant="ghost" onClick={onOpen}>
            <SearchIcon />
                <Text d={{base:"none" , md: "flex"}} px='4'>
                   Search User
                </Text>
            </Button>
       </Tooltip>
       <Text fontSize="2xl" fontFamily="Work sans">
         <h3 className='header_title'>Online Chat!</h3>
        </Text>
        <div>
        <Menu>
        <Tooltip label='invite user' hasArrow fontSize='xs' placement='left'>
            <MenuButton p={1}>
         
            <PlusSquareIcon fontSize="2xl" m={1} />
             
            </MenuButton>
            </Tooltip>
            <MenuList pl={2}>

              <Invite>
                <MenuItem>
                  Invite User
                </MenuItem>
                </Invite>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.email}
              />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />  
              <Passchange user={user}> 
              <MenuItem >Change Password</MenuItem>
              </Passchange> 
              <MenuDivider /> 
              <MenuItem onClick={loggedOut} >Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
   </Box>
     <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
     <DrawerOverlay />
     <DrawerContent>
       <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
       <DrawerBody>
         <Box d="flex" pb={2}>
           <Input
             placeholder="Search by name or email"
             mr={2}
             value={search}
             onChange={(e) => setsearch(e.target.value)}
             onKeyPress={handleKeyPress}
           />
           <Button onClick={handleSearch}>Go</Button>
         </Box>
         {loading ? <ChatLoading/> : (
           searchResult?.map(user=>(
             <UserlistItem key={user._id} 
             user={user} handleFunction={()=>accessChat(user._id)}
             />
             ))
           
         )}

                {loadingChat &&  <Spinner />}
      
       </DrawerBody>
     </DrawerContent>
   </Drawer>
  </>
  )
}

export default Sidebar

          