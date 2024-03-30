import React from 'react'
import Footer from '../components/Footer'

export default function Service() {
  return (
    <div>
      <div className="bg-gray-100 mt-20 pt-5 md:pt-0 md:mt-0 px-10 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Property Listings Management</h2>
          <p className="text-gray-700">
          Our Property Listings Management service ensures that your real estate listings are effectively showcased to potential buyers or renters. We handle the creation, optimization, and maintenance of property listings, including detailed descriptions, high-quality images, and accurate pricing information. With our expertise, your listings will attract the right audience and maximize your property's visibility in the market.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Real Estate Consultation</h2>
          <p className="text-gray-700">
          Gain valuable insights and guidance through our Real Estate Consultation service. Whether you're a first-time buyer, an investor, or a property owner looking to sell, our experienced consultants provide personalized advice tailored to your goals. From market trends and property evaluations to investment strategies and legal considerations, we offer 
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Property Marketing and Promotion</h2>
          <p className="text-gray-700">
          Elevate your property's marketing efforts with our Property Marketing and Promotion service. We employ a strategic approach combining digital marketing, social media campaigns, and targeted advertising to reach a wider audience and generate leads. From creating eye-catching property listings to leveraging advanced marketing techniques, we ensure that your properties receive the attention they deserve, leading to faster sales or rentals.
          </p>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  )
}
