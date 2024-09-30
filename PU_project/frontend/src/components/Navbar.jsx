import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { json, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBook,
  faRunning,
  faCheck,
  faChartSimple,
  faDumbbell,
  faHeartPulse,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Navigate } from "react-router-dom";

// retrives the username from localstorage. this should be set by login
const getStorageUsername = () => {
  return localStorage.getItem("username") || "username";
};

// setter en fallback value til false
function Navbar() {
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies("mytoken");
  const [signedIn, setSignedIn] = useState(!!token["mytoken"]);
  const [username, setUsername] = useState(getStorageUsername);

  //TODO: removetoken does not work as of now, so token is set to null instead
  const logOutBtn = (event) => {
    removeToken(["mytoken"]);
    setToken(null);
    localStorage.clear();
    setSignedIn(false);
    console.log(signedIn);
  };

  // useEffect kjører bare når [token] blir oppdatert
  useEffect(() => {
    if (!token["mytoken"]) {
      setSignedIn(false);
    } else {
      setSignedIn(true);
    }
  }, [token]);

  return (
    <React.Fragment>
      {!signedIn && <Navigate to="/" replace={true} />}
      <div
        id="Main"
        class="float-left fixed  transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-screen  w-full sm:w-64 bg-gray-900 flex-col text-2xl"
      >
        <div class="xl:flex ml-10 p-6 items-center space-x-3">
          <p class="text-4xl font-gymbro leading-6 text-white">
            Gym <big style={{ color: "red" }}>Bro</big>
          </p>
        </div>
        <div class="mt-6 flex flex-col justify-start items-center  pl-11 w-full space-y-3 pb-5 ">
          <Link
            class="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-red-300  text-white rounded "
            to={"/home"}
          >
            <FontAwesomeIcon icon={faHome} fixedWidth></FontAwesomeIcon>
            <p class="text-base leading-4 ">Home</p>
          </Link>
          {/* <Link
            class="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-red-300   rounded "
            to={"/exercises"}
          >
            <FontAwesomeIcon icon={faDumbbell} fixedWidth></FontAwesomeIcon>
            <p class="text-base leading-4 ">Exercises</p>
          </Link> */}
          <Link
            class="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-red-300   rounded "
            to={"/workouts"}
          >
            <FontAwesomeIcon icon={faDumbbell} fixedWidth></FontAwesomeIcon>
            <p class="text-base leading-4 ">Workouts</p>
          </Link>
          <Link
            class="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-red-300   rounded "
            to={"/calendar"}
          >
            <FontAwesomeIcon icon={faCheck} fixedWidth></FontAwesomeIcon>
            <p class="text-base leading-4 ">Complete</p>
          </Link>
          <Link
            class="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-red-300   rounded "
            to={"/progress"}
          >
            <FontAwesomeIcon icon={faChartSimple} fixedWidth></FontAwesomeIcon>
            <p class="text-base leading-4 ">My progress</p>
          </Link>
        </div>

        <div class="flex flex-col justify-between items-center h-screen pb-6 px-6  w-full space-y-32">
          <div class=" flex justify-between items-center px-5 w-full fixed bottom-5">
            <div class="flex justify-center items-center  space-x-2">
              <div>
                <img
                  class="rounded-full max-h-11"
                  src="https://source.unsplash.com/500x500/?people'"
                  alt="avatar"
                />
              </div>
              <div class="flex justify-start flex-col items-start">
                <p class="text-sm leading-5 text-white">{username}</p>
                <p class="text-xs leading-3 text-gray-300">
                  {username}@gmail.com
                </p>
              </div>
            </div>
            <Link onClick={logOutBtn}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                color="white"
                fixedWidth
              ></FontAwesomeIcon>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
