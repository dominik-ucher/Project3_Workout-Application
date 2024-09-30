import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

// THIS FORM IS NOT USED
// IT IS KEPT BECAUSE THERE'S SOME USEFUL REACT CODE IN IT
// DO NOT (PLEASE) DELETE IT
// - BERTINE

function Form(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [speed, setSpeed] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [token] = useCookies("mytoken");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedExerciseName, setSelectedExerciseName] = useState("");

  // API call to backend via axios.post, adds an exercise to the database
  const addExercise = () => {
    const name = selectedExerciseName;
    const exercise = { name, time, speed, reps, weight };
    axios
      .post("http://127.0.0.1:8000/exercises/", exercise)
      // handle success, the reload is the current way of updating the view
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      // handle error
      .catch((error) => {
        console.log(error);
      });
    // closes the form
    setShow(false);
  };

  //list of exercises to choose from
  const [exerciseList, setExerciseList] = useState([
    "Push Ups",
    "Squats",
    "Lunges",
    "Bicep Curls",
    "Tricep Extensions",
    "Deadlifts",
    "Bench Press",
    "Pull Ups",
    "Running",
    "Yoga",
  ]);

  // exercises that show a time field
  const cardioList = ["Dancing", "Yoga"];
  // exercises that show a time and speed field
  const cardioWithSpeedList = ["Running"];
  // exercises that show a reps field
  const strenghtList = ["Push Ups", "Squats", "Lunges", "Pull Ups"];
  // exercises that show a reps and weight field
  const strenghtWithWeightList = [
    "Bench Press",
    "Bicep Curls",
    "Tricep Extensions",
    "Deadlifts",
  ];

  // This return a form to make an exercise if the useState is set to true
  // The fields that appear depends on which selected exercise you choose
  // It is part of the "Execises.jsx" UI

  // It first displays the button that it shows on the Exercise page "add exercise"
  // Everything else is only shown if useState == true
  // It shows a select box for the exercises, and the fields that are shown depends on the exercise chosen
  // and which of the lists it belongs to. This is done through boolean checks
  return (
    <>
      <button
        onClick={handleShow}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Add exercise
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full mx-auto">
            <div className="py-4 px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Add new exercise
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="heroicon-ui"
                      d="M6.7 5.3a1 1 0 0 1 1.4 0L12 10.6l3.9-3.9a1 1 0 1 1 1.4 1.4L13.4 12l3.9 3.9a1 1 0 1 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 0-1.4z"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4">
                <label className="block font-semibold text-gray-800">
                  Name
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  onChange={(e) => setSelectedExerciseName(e.target.value)}
                >
                  <option value="">Select an exercise...</option>
                  {exerciseList.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                {selectedExerciseName && (
                  <div className="mt-4">
                    {(strenghtList.includes(selectedExerciseName) ||
                      strenghtWithWeightList.includes(
                        selectedExerciseName
                      )) && (
                      <>
                        <label className="block font-semibold text-gray-800 mt-4">
                          Reps
                        </label>
                        <input
                          type="number"
                          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          placeholder="Enter the reps"
                          value={reps}
                          onChange={(e) => setReps(e.target.value)}
                        />
                        {strenghtWithWeightList.includes(
                          selectedExerciseName
                        ) && (
                          <>
                            <label className="block font-semibold text-gray-800 mt-4">
                              Weight (kg)
                            </label>
                            <input
                              type="number"
                              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                              placeholder="Enter the weight"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                            />
                          </>
                        )}
                      </>
                    )}
                    {(cardioList.includes(selectedExerciseName) ||
                      cardioWithSpeedList.includes(selectedExerciseName)) && (
                      <>
                        <label className="block font-semibold text-gray-800">
                          Time (minutes)
                        </label>
                        <input
                          type="number"
                          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          placeholder="Enter the time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                        {cardioWithSpeedList.includes(selectedExerciseName) && (
                          <>
                            <label className="block font-semibold text-gray-800 mt-4">
                              Speed
                            </label>
                            <input
                              type="number"
                              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                              placeholder="Enter the speed"
                              value={speed}
                              onChange={(e) => setSpeed(e.target.value)}
                            />
                          </>
                        )}
                      </>
                    )}

                    <button
                      onClick={addExercise}
                      className="px-4 py-2 mt-5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                      Add exercise
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Form;
