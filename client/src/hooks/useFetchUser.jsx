import { useEffect } from "react"
import { getUser } from "../api/user"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setToken, setUser } from "../redux/slices/userSlice"


const useFetchUser = () => {
    
    const {token} = useSelector(state=>state.user) 
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(setLoading(true))
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
            }finally{
                dispatch(setLoading(false))
            }
        }
        if(token){
            fetchUser()
        }else{
            dispatch(setUser(null))
            dispatch(setToken(null))
            dispatch(setLoading(false))
        }
    },[])
}

export default useFetchUser
