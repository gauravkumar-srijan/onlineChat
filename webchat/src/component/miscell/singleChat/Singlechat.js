import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Spinner, Text ,useToast } from '@chakra-ui/react';
import React , {useContext ,useState ,useEffect , useRef} from 'react';
import { ChatContext } from '../../../contextApi/chatProvider';
import { getSendder , getSendderFull } from '../../chatconfig/Chatlogic';
import Profile from '../profile';
import UpdateGroupChatModal from '../groupchat/UpdateGroupChatModal';
import axios from 'axios';
import './style.css';
import Scrollchat from './Scrollchat';
import io from 'socket.io-client';
import FilePreview from '../previmg/FilePreview';
  //socket-io connection
  const ENDPOINT = "http://localhost:8000/";
  var socket , selectedChatCompare;


const Singlechat = ({fetchAgain , setfetchAgain}) => {
    const {user ,Selecthat, setSelecthat} = useContext(ChatContext);
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    //imgae section 
    const [file, setFile] = useState(null); // state for storing actual image
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

    const toast=useToast()
  //socket connection
        useEffect(()=>{
            socket= io(ENDPOINT);
            socket.emit('setup',user)
            },[])
            useEffect(()=>{
              socket.on("showmessage" , (messageRecieved)=>{
                setMessages([...messages,messageRecieved])
              })
              })
  
            
      //fetching message
      const fetchMessages=async(e)=>{
        if(!Selecthat) 
          return;
        try {
          const config={
            headers:{
              Authorization:`Bearer ${user.token}`
            }
          }
          setLoading(true)
  
          const{data}=await axios.get(`/api/message/${Selecthat._id}`,config)
  
          setMessages(data)
          setLoading(false)
          socket.emit("joinchat" ,Selecthat._id )
            console.log("all ,essage" , messages )
        } catch (error){
          toast({
            title:"Error Occured",
            description:"Failed to load the messages",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom"
          })
        }
      }
        useEffect(() => {
          fetchMessages();
          selectedChatCompare = Selecthat;
          
        }, [Selecthat])
        
    const sendMessage= async(e)=>{
      // alert("djnf");
        if(e.key === "Enter" && newMessage){
          try {
            const config={
              headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${user.token}`
              }
            }
            
            setNewMessage("")
            const{data}=await axios.post('/api/message',{
              content:newMessage,
              chatId:Selecthat._id
            },config)
            
            // console.log("message data" , data)
            setfetchAgain(!fetchAgain)
            setMessages([...messages,data])
            socket.emit("message" , data);
    
            } catch (error) {
              toast({
                title:"Error Occured",
                description:"Failed to send message",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
              })
            }
        }
    }
    const typingHandler=(e)=>{
      setNewMessage(e.target.value);
    }

  //image section 

  const onButtonClick = () => {
    console.log("Button click")
   dropRef.current.click();
  };
  const submitImage= async()=>{
    const formdata=new FormData()
    formdata.append("content",file);
    formdata.append("chatId",Selecthat._id)
        // console.log("image clicked")
    try{
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
          }
          
          setFile('')
          let {data}=await axios.post('/api/message',formdata,config)
          
          //buffering the images
          const bufferread=data.content.buffer.data
          const newBuffer=new Buffer.from(bufferread).toString("base64")
          const newContent={...data.content,buffer:newBuffer}
          
          data={...data,content:newContent}
          
          console.log(data)
          
        socket.emit("new message",data)
        setMessages([...messages,data])
        setfetchAgain(!fetchAgain)

    }catch(error)
    {
      console.log(error)
        toast({
            title:"Error Occured",
            description:"Not able to send",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom"
          })
    }
  }
  useEffect(()=>{
    socket.on('showmessage',(Newmessage)=>{
      console.log("messages recieve  : ",Newmessage)
      setfetchAgain(!fetchAgain)
      if(!selectedChatCompare||selectedChatCompare._id !== Newmessage.chat._id){
        
      }else{
        setMessages([...messages,Newmessage])
      }
    })
  })
   
  return (
    <>
    {Selecthat ? (
      <>
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          pb={3}
          px={2}
          w="100%"
          fontFamily="Work sans"
          d="flex"
          justifyContent={{ base: "space-between" }}
          alignItems="center"
        >
          <IconButton
            d={{ base: "flex", md: "none" }}
            icon={<ArrowBackIcon />}
            onClick={() => setSelecthat("")}
          />
            {/* {console.log("selectchat user" , Selecthat.users)} */}
          {!Selecthat.isGroupChat ? (
              <> {getSendder(user, Selecthat.users)}
              <Profile user={getSendderFull(user, Selecthat.users)} />
                  
               </>
          ) :
           (
            <>
              {Selecthat.chatName.toUpperCase()}
             <UpdateGroupChatModal fetchAgain={fetchAgain} 
              setFetchAgain={setfetchAgain} fetchMessages={fetchMessages} />
            </>
          )
        }


   
        </Text>
        <Box
            d='flex'
            flexDir={'column'}
            justifyContent='flex-end'
            p={3}
            bg={'#e8e8e8'}
            w='100%'
            h='100%'
            overflowY='hidden'
            borderRadius='lg'
          >
            {/* message section  */}
            {loading ? (<Spinner size='xl' alignSelf={'center'} w={20} h={20} margin='auto' />) 
            
            : (<div className='m1'>
                  {file?
              (<FilePreview file={file} setFile={setFile} submitImage={submitImage} />):
              (<Scrollchat messages={messages}/>)}
            </div>) 
            }
            <FormControl onKeyDown={sendMessage}>
              <div style={{display: 'flex',}}>
              <input type="file" id="file" name="file" ref={dropRef} style={{display: 'none'}} onChange={(e)=>{setFile(e.target.files[0])}}/>
              <IconButton
                onClick={onButtonClick}
                colorScheme='teal'
                icon={<AttachmentIcon/>}
                mr='2px'
                />

              <Input
                variant={'filled'}
                bg="#e8e8e8"
                placeholder='Enter A Message...'
                onChange={typingHandler}
                value={newMessage} 
              />
               
              </div>
            
           
            </FormControl>
           
          </Box>
          </>
  ) : (
    <Box
      d='flex'
      justifyContent='center'
      alignItems={'center'}
      h={'100%'}
    >
      <Text fontFamily={'Work sans'} pb={3} fontSize='3xl'>
        Click on a User to start chatting
      </Text>
    </Box>
  )
}
</>
  )
}

export default Singlechat