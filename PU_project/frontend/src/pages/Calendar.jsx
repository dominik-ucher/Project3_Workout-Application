import MyCalendar from "../components/MyCalendar";
import Navbar from "../components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../App";
import { useCookies } from "react-cookie";

function Calendar() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [reps, setReps] = useState({});
  const [dates, setDates] = useState({});
  const [userID, setUserID] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/workouts/`)
      .then((response) => response.json())
      .then((data) => getUserWorkouts(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/exercises/`)
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    document.body.classList.add("bg-gray-900"); // replace with your desired background color class
    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);

  const handleWorkoutChange = async (event) => {
    const selectedWorkoutId = event.target.value;

    // Filter data into only the users completed exercises
    setSelectedWorkout(
      workouts.find((workout) => workout.id === parseInt(selectedWorkoutId))
    );
  };

  const getUserWorkouts = async (data) => {
    const userId = await getUserId();
    setUserID(userId);
    const userWorkouts = data.filter((workouts) => workouts.user == userId);

    setWorkouts(userWorkouts);
  };

  //Implementation for getting only the logged in user's workouts
  async function getUserId() {
    const token = localStorage.getItem("token");
    console.log("USER TOKEN: " + token);
    try {
      const response = await axios.get("http://127.0.0.1:8000/get_user_id/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  //only the chosen workout's exercises are shown
  const filteredExercises = selectedWorkout
    ? exercises.filter((exercise) =>
        selectedWorkout.exercises.includes(exercise.id)
      )
    : [];

  //implementation for adding completed exercise
  const handleExerciseCompleted = () => {
    const completedExercises = filteredExercises.map((exercise) => ({
      exercise: exercise.id,
      reps: reps[exercise.id],
      date: dates[exercise.id],
      user: userID,
    }));

    //generates a http sending promise for all the different exercises with values
    const completedExercisesPromises = completedExercises.map((exercise) =>
      axios.post("http://127.0.0.1:8000/exercisescompleted/", exercise)
    );

    //this promises the db that all the data will be sent and are "relying" on eachother
    Promise.all(completedExercisesPromises)
      .then((responses) => {
        console.log(responses);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.reload();
      alert('Workout completed!');
  };

  const handleRepsChange = (event, exerciseId) => {
    setReps({
      ...reps,
      [exerciseId]: parseInt(event.target.value),
    });
  };

  const handleDateChange = (event, exerciseId) => {
    setDates({
      ...dates,
      [exerciseId]: event.target.value,
    });
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Navbar />
      <div className="flex-1 ml-64 bg-gray-900 p-8">
      <div className="flex-none bg-gray-900 py-8 px-4">
            <h1 className="text-4xl text-white rounded">Choose a workout to complete</h1>
          </div>

        <div className="relative">
    
        
          
          <select 
          id="workouts" 
          onChange={handleWorkoutChange}
          className="block appearance-none w-full bg-gray-100 border border-gray-700 text-gray-800 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500">
            <option value="test">--Please select a workout--</option>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>
         

        </div>
        {selectedWorkout && (
          <div className="mt-4">
            <h1 className="text-white font-light text-lg" >Workout: </h1>
            <h2 className="text-4xl text-white">{selectedWorkout.name}</h2>
            <ul>
              {filteredExercises.map((exercise) => (
                <div key={exercise.id} className="bg-white rounded-lg p-4 my-2">


                <h2 className="text-2xl font-bold text-gray-800">{exercise.name}</h2>
                <label className="text-gray-800 font-bold">{exercise.category}  </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="0"
                      className="w-16 px-2 py-1 rounded-lg bg-gray-100 text-gray-800"
                      onChange={(event) => handleRepsChange(event, exercise.id)}
                    />
                    <br></br>
                    <label className="text-gray-800 font-bold">Date:  </label>
                    <input
                      type="date"
                      placeholder="Enter date"
                      // defaultValue={"2023-03-24"}
                      defaultValue={currentDate}
                      className="px-2 py-1 rounded-lg bg-gray-100 text-gray-800"
                      onChange={(event) => handleDateChange(event, exercise.id)}
                    />
        
                </div>
              ))}
            </ul>
            <button
              className=" bg-green-500 rounded-2xl p-3 text-white"
              onClick={handleExerciseCompleted}
            >
              Complete Workout
            </button>
          </div>
        )}
      </div>
      
    </>
  );
}

export default Calendar;
