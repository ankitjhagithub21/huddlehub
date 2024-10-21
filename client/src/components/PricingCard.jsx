const PricingCard = ({ title, price, features, isPopular }) => {
    return (
        <div
            className={`p-8 rounded-lg shadow-lg transition-all transform hover:scale-105 ${isPopular ? 'bg-orange-500' : 'bg-gray-800'
                }`}
        >   
            {isPopular && (
                <div className="text-sm font-semibold bg-orange-700 text-white px-3 py-1 rounded-full w-fit mb-4">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-4xl font-bold mb-4">{price}/month</p>
            <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <span className="bg-green-500 p-1 rounded-full"></span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${isPopular
                        ? 'bg-white text-orange-500 hover:bg-gray-200'
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
            >
                Choose Plan
            </button>
        </div>
    );
};

export default PricingCard