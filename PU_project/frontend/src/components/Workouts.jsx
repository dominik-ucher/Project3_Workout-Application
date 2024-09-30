import "../App";
import { useState, useEffect } from "react";
import WorkoutList from "./WorkoutList";
import Navbar from "./Navbar";
import WorkoutForm from "./WorkoutForm";
import { useCookies } from "react-cookie";
import axios from "axios";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [userID, setUserID] = useState([]);

  useEffect(() => {
    document.body.classList.add("bg-gray-900"); // replace with your desired background color class
    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);

  // useEffect runs on every render. That means that when the count changes, a render happens,
  // which then triggers another effect. In practise, useEffect makes sure the workouts are loaded
  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/workouts/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const userID = await getUserId();
        console.log("her kommer userID:");
        console.log(userID);
        const userWorkouts = response.data.filter(
          (workout) => workout.user === userID
        ); // we want the userID to be the token. However, the workouts are registered on simple itegers
        console.log(response.data);
        setWorkouts(userWorkouts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchWorkouts();
  }, []);

  // this gets thge current logged in user's id
  async function getUserId() {
    const token = localStorage.getItem("token");
    console.log("USER TOKEN: " + token);
    try {
      const response = await axios.get("http://127.0.0.1:8000/get_user_id/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("her kommer response:");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  // This returns the workout page with a list of workouts,
  // and the workout form to make a new one. It is the "parent page"
  return (
    <>
      <Navbar />
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="py-8 px-4 bg-gray-900">
          <h1 className="text-4xl text-white rounded">Workout templates</h1>
        </div>
        <div className="p-8">
          <div className="flex justify-between">
            <h2 class="text-4xl font-extrabold dark:text-white"></h2>
            <div>
              <WorkoutForm workouts={workouts} userID={userID} />
            </div>
          </div>
          <br />
          <WorkoutList workouts={workouts} />
        </div>
      </div>
    </>
  );
}
export default Workouts;
