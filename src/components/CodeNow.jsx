import { React, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "./contextAPI/ThemeContext";
import { cookieContext } from "./contextAPI/cookieContext";
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdShare,
  MdRestartAlt,
  MdPerson,
} from "react-icons/md";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, push, update } from "firebase/database";
import { PistonAPI } from "../../config/APIs";

function CodeNow() {
  const { language, uid, cid } = useParams();
  const { theme, changeTheme } = useContext(ThemeContext);
  const { getCookieValue } = useContext(cookieContext);
  const authToken = getCookieValue("userId");
  const [showModal, setShowModal] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [checkLogin, notLoginAlert] = useState(false);
  const [code, setCode] = useState(""); // Code written by the user
  const [title, setTitle] = useState("");
  const [output, setOutput] = useState(""); // Execution result
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(14); // Font size for the editor
  const [sowLogOut, setSowLogOut] = useState(false); // Font size for the editor

  const editorTheme = theme ? "light" : "vs-dark";

  // if uid and cid present get from db and set update title, code
  const getCodeFromDBIfUidCid = async () => {
    try {
      const db = getDatabase();
      const codeRef = ref(db, `codeit/${uid}/${cid}`);
      const snapshot = await get(codeRef);
      if (snapshot.exists()) {
        const codeData = snapshot.val();
        const { code, title } = codeData;
        setTitle(title);
        setCode(code);
      } else {
        window.location.href = "/404";
        // console.error("No code found for the given uid and cid.");
        return null; // Handle the case where the code doesn't exist
      }
    } catch (error) {
      window.location.href = "/404";
      // console.error("Error fetching code from DB:", error);
      return null; // Handle errors
    }
  };
  // calling getCodeFromDBIfUidCid function with condition
  useEffect(() => {
    if (uid && cid) {
      getCodeFromDBIfUidCid();
    }
  }, []);
  const handleRunCode = async () => {
    if (code == "") {
      setOutput("No output returned.");
      return;
    }
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await axios.post(PistonAPI, {
        language: language,
        version: "*", // Use the latest version
        files: [
          {
            name: "code",
            content: code,
          },
        ],
      });

      setOutput(response.data.run.output || "No output returned.");
    } catch (error) {
      setOutput("Error executing code: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetCode = () => {
    setCode(""); // Reset code editor to empty
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24)); // Increase font size with a cap at 24
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 10)); // Decrease font size with a minimum of 10
  };

  // save code to database
  const saveCodeFunc = async () => {
    if (!authToken) {
      notLoginAlert(true);
      return;
    }
    setSaveError("");
    setSaveSuccess("");
    setLoadingSave(true);
    if (code == "" || title == "") {
      setSaveError("Code or Title should be required");
      setLoadingSave(false);
      return;
    }
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated.");
        setLoadingSave(false);
      }

      const uid = user.uid; // Authenticated user's UID
      const db = getDatabase();

      // Prepare the code object
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-GB");
      const newCode = {
        date: formattedDate,
        code: code,
        title: title,
        language: language,
      };

      // Reference to the user's path
      const userRef = ref(db, `codeit/${uid}`);

      // Add a new code entry with auto-generated ID
      const codeRef = push(userRef); // Generates a unique key
      await set(codeRef, newCode);
      setSaveSuccess("Code saved successfully!, Wait a second");
      setTimeout(() => {
        window.location.href = `/codenow/${language}/${uid}/${codeRef.key}`;
      }, 2000);
      // console.log("Code saved successfully!");
    } catch (error) {
      setSaveError(
        "Something went wrong while saving the code. Please try again."
      );
      // console.error("Error saving code:", error);
      // alert("Something went wrong while saving the code. Please try again.");
    } finally {
      setLoadingSave(false);
    }
  };

  const updateSavedCode = async () => {
    if (!authToken) {
      notLoginAlert(true);
      return;
    }
    setUpdateStatus(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated.");
      }

      const db = getDatabase();
      const userCodeRef = ref(db, `codeit/${uid}/${cid}`);
      const snapshot = await get(userCodeRef);
      if (snapshot.exists()) {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-GB");
        const updatedCode = {
          date: formattedDate,
          code: code,
          title: title,
        };

        // Update the database with the new code and title
        await update(userCodeRef, updatedCode);
        console.log("Updated");
      } else {
        window.location.href = "/404";
      }
    } catch (error) {
      // setSaveError(`Error: ${error.message}`);
      console.error("Error updating code:", error);
    } finally {
      setUpdateStatus(false);
    }
  };
  return (
    <>
      <section>
        <nav className="m-0 p-4 z-50 fixed top-0 w-full bg-gray-800 flex flex-row justify-between">
          <div>
            <Link to="/" target="_blank">
              <h1 className="ml-2 text-3xl hover:bg-gray-200 inline-block rounded-lg hover:px-4 duration-300 transition-all transform">
                <b className="text-blue-400">Code</b>
                <b className="text-purple-400">It</b>
              </h1>
            </Link>
          </div>
          <div className="mr-4 flex flex-row items-center">
            <span className="mr-8 font-bold text-white bg-gray-200 px-2 py-1 hover:pl-6 hover:pr-5 rounded-md transform transition-all duration-300">
              <Link to="/history" target="_blank" className="text-gray-800">
                Code History
              </Link>
            </span>
            <span
              className="material-icons flex justify-center items-center rounded-lg p-1 bg-black text-gray-200 outline outline-2 outline-gray-200 hover:text-black hover:bg-gray-400 transform transition-all duration-300 w-8 h-8"
              onClick={changeTheme}
            >
              {theme ? (
                <MdDarkMode size={24} />
              ) : (
                <MdOutlineLightMode size={24} />
              )}
            </span>
            {authToken && (
              <div className="relative flex items-center">
                <span
                  onClick={() => setSowLogOut(!sowLogOut)}
                  className="material-icons flex ml-4 justify-center items-center rounded-full p-1 bg-black text-gray-200 outline outline-2 outline-gray-200 hover:text-black hover:bg-gray-800 transform transition-all duration-300 w-8 h-8 cursor-pointer"
                >
                  <MdPerson size={24} />
                </span>
                {sowLogOut && (
                  <div className="absolute top-10 right-0 bg-white shadow-md border rounded-md p-2 z-50">
                    <button
                      className="text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded transition-all duration-300"
                      onClick={() => {
                        // Clear all cookies
                        document.cookie.split(";").forEach((cookie) => {
                          const [name] = cookie.split("=");
                          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        });
                        window.location.href = "/login";
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </section>

      <div className="mt-20"></div>
      <div className="flex text-center justify-center gap-2">
        <button
          onClick={handleResetCode}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 font-bold rounded"
        >
          <MdRestartAlt />
        </button>
        <button
          onClick={increaseFontSize}
          className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 font-bold rounded items-center"
        >
          <AiOutlineZoomIn className="" />
        </button>
        <button
          onClick={decreaseFontSize}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <AiOutlineZoomOut className="" />
        </button>
        <button
          onClick={handleRunCode}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Run
        </button>
        {uid && cid ? (
          <button
            onClick={() => updateSavedCode()}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            {updateStatus ? "Updating..." : "Update"}
          </button>
        ) : (
          <button
            onClick={() => {
              setShowModal(true);
              if (!authToken) {
                notLoginAlert(true);
                return;
              }
            }}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        )}

        {/* <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded flex items-center">
          <MdShare className="" />
        </button> */}
      </div>
      {/* Editor and Output */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 m-4">
        {/* Code Editor */}
        <div className="h-96 border border-gray-700">
          <Editor
            height="100%"
            theme={editorTheme}
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{ fontSize }}
          />
        </div>

        {/* Output */}
        <div
          className={`h-96 border border-gray-700 p-4 overflow-auto ${
            theme ? "bg-white text-black" : "bg-stone-900 text-white"
          }`}
        >
          <h2 className="text-xl font-bold mb-2">Output:</h2>
          <pre className="h-full">{output}</pre>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {saveSuccess !== "" ? (
              <h1 className="mb-6 text-center text-green-600">{saveSuccess}</h1>
            ) : (
              <h1 className="mb-6 text-center text-red-600">
                {(title == "" || code == "") && saveError}
              </h1>
            )}

            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline outline-1 rounded-lg p-2 text-center text-gray-800"
            />
            <br />
            <button
              onClick={() => saveCodeFunc()}
              disabled={loadingSave}
              className="mt-8  bg-green-600 text-white hover:bg-green-700 font-bold py-2 px-3 rounded-lg"
            >
              {loadingSave ? "Saving..." : "Save To Cloud"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="ml-4 mt-8 bg-red-600 text-white hover:bg-red-700 font-bold py-2 px-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {checkLogin && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl mb-2">Opps! Your are not logged</h1>
            <h1 className="mb-4">Please login to save code with cloud</h1>
            <Link
              className="bg-green-700 text-gray-300 font-bold px-2 py-1 rounded-md"
              to="/login"
            >
              Login Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CodeNow;
