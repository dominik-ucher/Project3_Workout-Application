import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const Token123 = token["mytoken"];

  useEffect(() => {
    if (Token123) {
      console.log("Signed in set to true" + Token123);
      setSignedIn(true);
    }
  }, [token]);

  //the server handles the request, if the user exists it is redirected to the home page
  const handleLogin = (event) => {
    event.preventDefault();
    APIService.LoginUser(username, password)
      .then((response) => {
        if (response.ok) {
          setToken("mytoken", response.token);
          console.log("Token set to " + response.token);
          setToken("mytoken", response.token, { path: "/" }); // also set the cookie path
          setUsername(username);
          setSignedIn(true);
          console.log("Signed in set to true " + username);

          //adds the username to local storage for use in interface in application
          localStorage.setItem("username", username);
          localStorage.setItem('mytoken', response.token)
          setSignedIn(true);
        } else {
          // Show an error message, e.g. using state variables
          setShowErrorAlert(true);
          setErrorCode(response.statusText.toString());
        }
      })
      .catch((error) => {
        // Handle network or server errors
        setShowErrorAlert(true);
        setErrorCode(error.toString());
      });
  };

  // the webcode for erroralerts
  // TODO: create component?
  const ErrorAlert = () => {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        Use your muscles to type in the correct information! <br></br>
        <strong>Error: {errorCode}</strong>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowErrorAlert(false)}
        ></button>
      </div>
    );
  };

  return (
    <React.Fragment>
      {/* Navigates to the home page if the signedIn is true */}
      {/* Needs to be contained in BrowserRouter tag for tests to work */}
      {signedIn && <Navigate to="/home" replace={true} state={username} />}

      <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div class="text-white">
            <div class="mb-8 flex flex-col items-center ">
              <h1 className="text-3xl font-gymbro">Welcome back</h1>
              <h1 className=" text-7xl text-red-600 font-gymbro mt-3">
                Gym Bro
              </h1>

              <span class="text-gray-300 mt-5">Enter Login Details</span>
            </div>
            <div className="flex flex-col items-center">
              <div class="mb-4 text-lg">
                <input
                  class="rounded-3xl border-none bg-gray-600 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>

              <div class="mb-4 text-lg">
                <input
                  class="rounded-3xl border-none bg-gray-600 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="mt-8 flex justify-center gap-5 text-lg text-black">
              <button
                type="submit"
                onClick={handleLogin}
                class="rounded-3xl bg-gray-200 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-600"
              >
                Login
              </button>
              <Link to={"/register"}>
                <button
                  type="submit"
                  class="rounded-3xl bg-gray-700 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-600"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
          {showErrorAlert ? (
            <div className="rounded-2xl p-3 mt-8 flex flex-auto text-center bg-red-700 text-lg text-white w-full">
              <ErrorAlert className="p-3" />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
