import React from 'react'

import {Box,Container,Tab,TabList,TabPanel,TabPanels,Tabs,Text,} from "@chakra-ui/react";
  import { useEffect } from "react";
  import Login from '../userAuth/login';
  import Signup from '../userAuth/signup';
  import { useNavigate } from 'react-router-dom';
 
  
  function Home() {
    const navigate = useNavigate();

    useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(userInfo){
          navigate('/chat')
      }
    },[navigate])
    return (
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
          <h6 className='header_title'>Online Chat!</h6> 
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
  }
  
  export default Home;
