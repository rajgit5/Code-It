import React from "react";
function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700">
      <div className="text-center text-white">
        <h1 className="text-9xl font-extrabold mb-6">404</h1>
        <p className="text-xl mb-8">Oops! Page not found.</p>
        <a 
          href="/" 
          className="text-lg text-white bg-green-600 hover:bg-green-700 py-3 px-6 rounded-lg transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
