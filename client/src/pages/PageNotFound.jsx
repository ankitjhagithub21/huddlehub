import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <p className="mt-4 text-xl text-gray-400">
          Oops! The page you are looking for doesn't exist.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
