import React from 'react'
import { FaVideo, FaUsers, FaLock } from 'react-icons/fa';
import Feature from './Feature';

const Features = () => {
  return (
    <section className="bg-gray-800 py-16 px-10 my-24" id='features'>
    <h2 className="text-4xl font-semibold text-center mb-12">Why HuddleHub?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <Feature
        icon={<FaVideo size={40} />}
        title="High-Quality Video"
        description="Enjoy crystal-clear video and audio during your meetings."
      />
      <Feature
        icon={<FaUsers size={40} />}
        title="Collaborative Tools"
        description="Work together with screen sharing, chat, and file sharing."
      />
      <Feature
        icon={<FaLock size={40} />}
        title="Secure Meetings"
        description="Your privacy matters with end-to-end encryption."
      />
    </div>
  </section>
  )
}

export default Features
