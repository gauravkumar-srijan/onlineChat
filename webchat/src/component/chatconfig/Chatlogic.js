import React from 'react'


export const getSendder = (loggedUser, users) => {
  try {
    // console.log("log" ,loggedUser._id , "chatuser" ,users[0]._id)
  
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    
  } catch (error) {
    throw new Error(error.message)
  }
  
  };
  export const getSendderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  export const isSameSender=(messages,mss,index,userId)=>{
    return(
      index<messages.length-1 &&
      (messages[index+1].sender._id!==mss.sender._id||
      messages[index+1].sender._id===undefined)&&
      messages[index].sender._id!==userId
    )
  }
  
  export const isLastMessage=(messages,index,userId)=>{
    return(
      index===messages.length-1 &&
      messages[messages.length-1].sender._id!==userId
      &&messages[messages.length-1].sender._id
    )
  }

  export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };