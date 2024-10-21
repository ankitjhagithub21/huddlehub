import React from 'react'
import PricingCard from './PricingCard'

const Pricing = () => {
  return (
    <div>
       <section className="bg-gray-900 text-white py-16 px-6" id='pricing'>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8">Choose Your Plan</h2>
        <p className="text-lg text-gray-400 mb-16">
          Find the right plan for your needs. Simple and transparent pricing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <PricingCard
            title="Basic"
            price="$9"
            features={['Up to 5 Users', '50 Meeting Minutes', 'Standard Support']}
            isPopular={false}
          />
          <PricingCard
            title="Pro"
            price="$29"
            features={['Unlimited Users', 'Unlimited Meetings', 'Priority Support']}
            isPopular={true}
          />
          <PricingCard
            title="Enterprise"
            price="$99"
            features={['Custom Solutions', 'Dedicated Account Manager', '24/7 Support']}
            isPopular={false}
          />
        </div>
      </div>
    </section>
    </div>
  )
}

export default Pricing
