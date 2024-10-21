const Feature = ({ icon, title, description }) => (
    <div className="bg-gray-600 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-700">
        <div className="text-orange-500 mb-4 flex items-center justify-center">{icon}</div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

export default Feature