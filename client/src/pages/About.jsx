import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <div className="bg-blue-50 mt-20 min-h-screen p-6">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg mb-6">Hello, I'm Karnan, a passionate full-stack MERN developer. I love crafting delightful web experiences using modern technologies.</p>
        <h2 className="text-2xl font-bold mb-4">About the Real Estate Website</h2>
        <p className="text-lg mb-6">Our real estate platform is designed with a focus on elegance, usability, and performance. We combine sleek design with powerful functionality to redefine the real estate experience.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Advanced property search with filtering options</li>
              <li>User-friendly listing creation and management</li>
              <li>Secure authentication using JWT tokens</li>
              <li>Interactive image galleries with Swiper</li>
              <li>Responsive design for seamless mobile experience</li>
              <li>And much more!</li>
            </ul>
            <p className="text-lg">We are committed to delivering a cutting-edge platform that meets the needs of both property owners and seekers, with a focus on innovation, reliability, and user satisfaction.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-lg mb-6">At RealEstate, we strive to revolutionize the real estate industry by providing a seamless and enjoyable experience for all users. Our mission is to empower individuals and businesses to find their perfect property with ease.</p>
            <Link to="/contact" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Get in Touch</Link>
          </div>
        </div>
      </div>
    </div>
      
      <Footer/>
    </div>
  )
}
