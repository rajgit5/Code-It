import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { ThemeContext } from "./contextAPI/ThemeContext";
import { cookieContext } from "./contextAPI/cookieContext";
import { Link } from "react-router-dom";

function History() {
  const [codes, setCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext); // Theme context for theme switching
  const { getCookieValue } = useContext(cookieContext); // Cookie context to retrieve user ID from cookies
  const authToken = getCookieValue("userId"); // User ID from cookies
if (!authToken) {
  window.location.href = "/login";
}
  // Fetch codes from the database
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const db = getDatabase();
        const uid = authToken; // Use authToken to identify the user
        // console.log(uid); // Log user ID for debugging
        const userRef = ref(db, `codeit/${uid}`);

        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const codeList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setCodes(codeList);
        } else {
          console.log("No codes found for the user.");
        }
      } catch (error) {
        console.error("Error fetching codes:", error);
        alert("Failed to fetch codes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, [authToken]); // Dependency on authToken so it updates when the token changes

  // Filter codes based on the search term and sort order
  const filteredCodes = codes
    .filter((code) =>
      code.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <div
      className={`p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <h1 className="text-2xl font-bold mb-4">Code History</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          aria-label="Search codes by title"
          placeholder="Search by title..."
          className="border rounded-lg p-2 w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </button>
      </div>

      {/* Sorting Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            sortOrder === "asc" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSortOrder("asc")}
        >
          Ascending
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            sortOrder === "desc" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSortOrder("desc")}
        >
          Descending
        </button>
      </div>

      {/* Code List */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredCodes.length > 0 ? (
        <ul className="space-y-4">
          {filteredCodes.map((code) => (
            <Link to={`/codenow/${code.language}/${authToken}/${code.id}`}>
              <li
                key={code.id}
                className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <h2 className="text-lg font-semibold">Title: {code.title}</h2>
                <p className="text-sm text-gray-600">Date: {code.date}</p>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No codes found.</p>
      )}
    </div>
  );
}

export default History;
