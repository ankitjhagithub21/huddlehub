import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center min-h-screen py-24 px-10 justify-center text-center md:text-left md:p-20">
    <div className="md:w-1/2 space-y-6">
      <h2 className="lg:text-5xl text-3xl font-semibold leading-tight lg:mt-0 mt-10">
        Connect, Collaborate, <span className="text-orange-500">Huddle.</span>
      </h2>
      <p className="text-lg  text-gray-300">
        Host seamless video conferences and virtual meetings with just one click. 
        Join your team from anywhere, at any time, with high-quality streaming.
      </p>
      <div className="space-x-4">
        <Link to="/meeting" className="bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
          Start meeting
        </Link>
        <button className="border border-orange-500 px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition">
          Learn More
        </button>
      </div>
    </div>
    <div className="md:w-1/2 mt-10 md:mt-0">
      <img
        src="/hero.png"
        alt="Video Conference"
        
      />
    </div>
  </section>
  )
}

export default Hero
