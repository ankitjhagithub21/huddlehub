const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/meetings` 


export const createMeeting = async(data,token) =>{
    const res = await fetch(`${baseUrl}`,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":`application/json`
        },
        body:JSON.stringify(data)
    })
    return res;
}

export const getMeeting = async(roomName,token) =>{
    const res = await fetch(`${baseUrl}/${roomName}`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    return res;
}


