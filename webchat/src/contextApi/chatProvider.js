import {createContext ,useState  ,useEffect }  from "react";
import { useNavigate } from 'react-router-dom';

 export const ChatContext = createContext();

 const ChatProvider =({children})=>{
    const [user , setinput ] = useState();
    const [Selecthat, setSelecthat] = useState();
    const [ chats ,setchats ] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            console.log("userinfo" , userInfo)
            setinput(userInfo)
            if(!userInfo){
                navigate('/')
            }

    },[navigate])
    console.log("user : ",user)
    return(
    <ChatContext.Provider value={{user, setinput , chats ,setchats ,Selecthat, setSelecthat}}>
        {children}
    </ChatContext.Provider>
    )
  
}
export default ChatProvider;
