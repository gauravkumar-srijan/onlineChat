import { Box } from '@chakra-ui/react';
import React , {useContext} from 'react';
import { ChatContext } from '../../contextApi/chatProvider';
import Singlechat from './singleChat/Singlechat';

const Chatbox = ({fetchuser ,setfetchuser}) => {
  const{Selecthat}= useContext(ChatContext)

  return (
     <Box
      d={{ base: Selecthat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      h='81.5vh'
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Singlechat fetchAgain={fetchuser} setfetchAgain={setfetchuser} />
    </Box>
  )
}

export default Chatbox