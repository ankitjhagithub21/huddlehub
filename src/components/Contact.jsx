import React from 'react';

const Contact = () => {
    return (
        <section className="bg-gray-900  py-24 px-6" id='contact'>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-12">
                 {/* Google Maps Embed */}
                 <div className="rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.3459589449!2d77.2410772254802!3d23.199639467508245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1729477850880!5m2!1sen!2sin"
                      width={"100%"}
                      height={"100%"}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                </div>
                
                {/* Contact Form */}
                <div>
                    <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                    <p className="text-gray-400 mb-8">
                        Have any questions? Feel free to reach out. We’ll get back to you as soon as possible!
                    </p>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

               
            </div>
        </section>
    );
};

export default Contact;
