import { Box } from '@chakra-ui/react';
import React ,{useContext , useState}  from 'react';
import {ChatContext} from '../../contextApi/chatProvider';
import Sidebar from '../miscell/Sidebar';
import Mychats from '../miscell/Mychats';
import Chatbox from '../miscell/Chatbox';


const Chat = () => {
    const {user} = useContext(ChatContext);
    console.log(user);
    const [fetchuser , setfetchuser] = useState(false);
  return (
    <div style={{ width :'100%' }}>
      {user && <Sidebar />}
          <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" 
             h='91.5vh'  p="5px 10px 5px 10px" borderWidth="5px">
            {user && <Mychats  fetchuser={fetchuser} />}
            {user && <Chatbox fetchuser={fetchuser} setfetchuser={setfetchuser} />}
          </Box>
       

    </div>
  )
}

export default Chat