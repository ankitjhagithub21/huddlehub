import { useLocation } from "react-router-dom"


const Footer = () => {
  const location = useLocation()
  if(location.pathname.includes("/meetings")){
    return null
  }
  
  return (
    <footer className="bg-[#1F2937] py-6 text-center">
        <p className="text-gray-200">© 2024 HuddleHub. All rights reserved.</p>
      </footer>
  )
}

export default Footer
