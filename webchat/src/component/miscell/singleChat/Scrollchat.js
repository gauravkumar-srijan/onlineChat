import { Avatar, Tooltip } from '@chakra-ui/react';
import React ,{useContext} from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender , isLastMessage , isSameSenderMargin , isSameUser} from '../../chatconfig/Chatlogic';
import { ChatContext } from '../../../contextApi/chatProvider';

const Scrollchat = ({messages}) => {
    const {user} = useContext(ChatContext);
    console.log(messages);
  return (
   <ScrollableFeed>
        {messages && messages.map((mess,index)=>(

            <div style={{display : "flex"}} key={mess._id}>
                {(isSameSender(messages,mess,index,user._id)) || (isLastMessage(messages,index,user._id))
                    &&(
                    <Tooltip
                      label={mess.sender.name}
                      placement='bottom'
                      hasArrow
                    >
                      <Avatar mt="7px" mr={1} size={'sm'} cursor='pointer' 
                      name={mess.sender.name} src="" alt={mess.sender.name}
                        />
                    </Tooltip> )
                }
                <span style={{backgroundColor:`${
            mess.sender._id===user._id? "pink":"yellow"
            }`,
            borderRadius:'20px',
            padding:'5px 15px',
            maxWidth:'75%',
            marginLeft:isSameSenderMargin(messages,mess,index,user._id),
            marginTop:isSameUser(messages,mess,index,mess._id)?3:10
          }}
          >
              {console.log(mess.content)}
            {mess.content}
          </span>
                
            </div>
        ))}

   </ScrollableFeed>
  
  )
}

export default Scrollchat;