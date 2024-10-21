import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
    return (
       <>
       <Header/>
        <main>
            
            <Hero />
            <Features />
            <Pricing />
            <Contact />
        </main>
        <Footer/>
       </>
    )
}

export default Home
