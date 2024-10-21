const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/users`

export const getUser = async(token) =>{
    const res = await fetch(`${baseUrl}/me`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    return res;
}


export const login = async(data) =>{
    const res = await fetch(`${baseUrl}/login`,{
        method:"POST",
        headers:{

            "Content-Type":`application/json`
        },
        body:JSON.stringify(data)
    })
    return res;
}

export const register = async(data) =>{
    const res = await fetch(`${baseUrl}/register`,{
        method:"POST",
        headers:{

            "Content-Type":`application/json`
        },
        body:JSON.stringify(data)
    })
    return res;
}


export const getAttendees = async(token) =>{
    const res = await fetch(`${baseUrl}`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    return res;
}
