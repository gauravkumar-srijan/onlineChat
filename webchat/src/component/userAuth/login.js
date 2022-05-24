import React from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  useToast } from '@chakra-ui/react';
import Forget from './Forget';
const Login = () => {
    const [login , setlogin] = useState({email : "" , password : ""})
    const [show ,setshow] = useState(false);
    const [loading,setLoading]=useState(false)
    const toast = useToast()
    const navigate = useNavigate();
    let name ,value;
    const loginHandle =(e) =>{
            value = e.target.value;
            name =  e.target.name;
            setlogin({...login , [name]: value})
    }

    const handleClick=()=>{
        setshow(!show);
    }
    const submitHandler=async (e)=>{
      e.preventDefault();
      setLoading(true)
      // console.log("kforun");
        const {email , password} = login ;
        if(!email || !password){
            toast({
                title: "fill email and password",
                description: "fill all details",
                status: 'warning',
                duration: 4000,
                isClosable: true,
              })
              setLoading(false)
              return;
        }
       try {
        const  config = {
            headers:{
              "Content-type" : "application/json"
            }
          }
        const {data} = await axios.post('/api/user/login' , {email , password} , config)
        // console.log(data.message);
        toast({
            title: "Login sucessful",
            description: "APPROVED" ,
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
         console.log(login);
         localStorage.setItem("userInfo", JSON.stringify(data));
         setLoading(false)
        navigate("/chat")
       }
        catch(error){
          toast({
              title:'Error Occured!',
              description:"fail",
              status:"warning",
              duration:2000,
              isClosable:true,
              position:"bottom"
          }); 
  
          setLoading(false)
      }
    
    }
  
  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
        value={login.email}
         name='email'
          type="email"
          placeholder="Enter Your Email Address"
          onChange={loginHandle}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            name='password'
            onChange={loginHandle}
            value={login.password}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
       
      >
        Login
      </Button>
      <Forget>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
      >
      
        Forgot Password!
        
      </Button>
 
      </Forget>
    </VStack>
  );
}

export default Login