import React from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import{useNavigate} from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
import axios from 'axios'; 
const Signup = () => {
    const [input , setinput] = useState({name : "" , email : "" , password : "" , cpassword:""});
    const [show , setshow] = useState(false);
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const toast = useToast()
    const InputHandle=(e)=>{
        let value = e.target.value;
        let name = e.target.name;
        setinput({...input , [name] : value})
    }
    const submitHandler= async(e)=>{
      e.preventDefault();
      setLoading(true)
      const {name ,email , password, cpassword} = input;
        if(!name || !email || !password || !cpassword) {
            console.log("dejdnkdknke");
            toast({
                title: 'Fill All Details.',
                description: "Fill All Input",
                status: 'warning',
                duration: 4000,
                isClosable: true,
              })
              setLoading(false)
              return;
        }
        const  config = {
            headers:{
              "Content-type" : "application/json"
            }
          }
        const {data} = await axios.post('/api/user/ragister' , {name ,email , password, cpassword} , config)
        console.log(data.token);
        toast({
            title: data.message,
            description: "Approved",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false)
        navigate('/chat')
          
    }
    const handleClick=()=>{
        setshow(!show);
    }
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          onChange={InputHandle}
         
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email Address"
          onChange={InputHandle}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            onChange={InputHandle}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            name="cpassword"
            placeholder="Confirm password"
            onChange={InputHandle}
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
        isLoading={loading }
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup