import { React, useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { use } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSignInForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg(""); // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const user = userCredential.user;
      const token = await user.uid;
      const date = new Date();
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day in milliseconds
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `userId=${token}; ${expires}; Secure; SameSite=Strict; path=/`;
      // console.log(user)
      setSuccess(true);
    } catch (error) {
      // Extract Firebase error code and message
      const errorMessage =
        error.code === "auth/invalid-credential"
          ? "Invalid email or password. Please try again."
          : "Something went wrong. Please try again.";
      setErrMsg(errorMessage);
      // console.error("Error during sign in:", error);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  function goToCode() {
    window.location.href = "/";
  }

  return (
    <>
      <NavBar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSignInForm}
            action="#"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  value={pass}
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Please wait..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Singup Now
            </Link>
          </p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">
              {success ? "Sign In Successful" : "Sign In Failed"}
            </h3>
            <p className="mt-4 text-gray-700">
              {success
                ? "You are now logged in. Start your coding practice!"
                : errMsg}
            </p>
            <div className="mt-6 flex justify-center gap-4">
              {success ? (
                <button
                  onClick={goToCode}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                >
                  Start Coding
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
