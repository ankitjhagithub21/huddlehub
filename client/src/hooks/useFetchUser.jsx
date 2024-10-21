import { useEffect } from "react"
import { getUser } from "../api/user"
import { useDispatch, useSelector } from "react-redux"
import { setToken, setUser } from "../redux/slices/userSlice"


const useFetchUser = () => {
    const {token} = useSelector(state=>state.user) 
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const fetchUser = async() =>{
            try{
                const res = await getUser(token);
                const data = await res.json()
                if(res.ok){
                    dispatch(setUser(data))

                }else{
                    dispatch(setUser(null))
                }
                
            }catch(error){
                console.log(error)
            }
        }
        if(token){
            fetchUser()
        }else{
            dispatch(setUser(null))
            dispatch(setToken(null))
        }
    },[])
}

export default useFetchUser
