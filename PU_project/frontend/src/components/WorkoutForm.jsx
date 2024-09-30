import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
export default WorkoutForm;

function WorkoutForm(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [token] = useCookies("mytoken");
  const handleShow = () => setShow(true);
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  // useEffect runs on every render. That means that when the count changes, a render happens,
  // which then triggers another effect. In practise, useEffect makes sure the exercises are loaded
  // so that they can be chosen from the list of exercises
  useEffect(() => {
    fetch("http://127.0.0.1:8000/exercises/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setExercises(resp))
      .catch((error) => console.log(error));
  }, []);

  // this method posts the workout to the database and reloads the window
  // A workout consists of an id, exercises, a user
  const addWorkout = async (event) => {
    event.preventDefault();
    let exerciseList = [];
    selectedExercises.forEach((name) => {
      exerciseList.push(
        exercises.find((exercise) => exercise.name === name).id
      );
    });
    const userId = await getUserId();
    const workout = { name: name, exercises: exerciseList, user: userId };
    console.log(workout);

    // waits for post to finish sending data, then reloads the page to update the view
    const postedWorkout = await postToWorkout(workout);
    // reload is the current way of updating the view
    console.log(postedWorkout);
    setShow(false);
    handleEmptyExerciseList();
    window.location.reload();
  };

  // this posts to the database
  const postToWorkout = (workout) => {
    return axios.post("http://127.0.0.1:8000/workouts/", workout);
  };

  // this empties the workout form
  const handleEmptyExerciseList = () => {
    selectedExercises.length = 0;
  };

  // this closes the form
  const handleClose = () => {
    handleEmptyExerciseList();
    setName("");
    setShow(false);
  };

  // this selects exercises for the workout
  const handleExerciseSelect = (event) => {
    const selectedOptionValue = event.target.value;
    if (selectedExercises.length < 5) {
      setSelectedExercises([...selectedExercises, selectedOptionValue]);
    } else {
      setSelectedExercises([]);
    }
  };

  // this get the current user id
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

  // This return a form to make a workout if the useState is set to true
  // The exercises that appear depends on which selected exercise you choose
  // It is part of the "Workouts.jsx" UI

  // It first displays the button that it shows on the Workout page "Add workout"
  // Everything else is only shown if useState == true
  // It shows a select box for the exercises, and the exercises that are shown under depends on the exercises chosen
  // So far you can only choose up to 4 exercises. It will fail if you do more.
  return (
    <>
      <button
        onClick={handleShow}
        className="flex items-center justify-center px-4 py-2 mt-5 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
      >
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add</span>
        </span>
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full mx-auto">
            <div className="py-4 px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Add workout</h2>
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
                <label className="block font-semibold text-gray-800 mt-4">
                  Workout name
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Enter workout name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="block font-semibold text-gray-800">
                  Exercises
                </label>

                <select
                  value={
                    selectedExercises.length > 0 ? selectedExercises[0] : ""
                  }
                  onChange={handleExerciseSelect}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">--Please select an exercise--</option>
                  {Object.values(exercises).map((exercise) => (
                    <option key={exercise.id} value={exercise.name}>
                      {exercise.name}
                    </option>
                  ))}
                </select>

                {selectedExercises.length === 0 && (
                  <>
                    <div className="mt-4">
                      <label className="block font-semibold text-gray-800 mt-4">
                        No selected
                      </label>
                    </div>
                  </>
                )}

                {selectedExercises.length === 1 && (
                  <>
                    <div className="mt-4">
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[0]}
                      </label>
                    </div>
                  </>
                )}

                {selectedExercises.length === 2 && (
                  <>
                    <div className="mt-4">
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[0]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[1]}
                      </label>
                    </div>
                  </>
                )}

                {selectedExercises.length === 3 && (
                  <>
                    <div className="mt-4">
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[0]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[1]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[2]}
                      </label>
                    </div>
                  </>
                )}

                {selectedExercises.length === 4 && (
                  <>
                    <div className="mt-4">
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[0]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[1]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[2]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[3]}
                      </label>
                    </div>
                  </>
                )}

                {selectedExercises.length === 5 && (
                  <>
                    <div className="mt-4">
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[0]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[1]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[2]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[3]}
                      </label>
                      <label className="block font-semibold text-gray-800 mt-4">
                        {selectedExercises[4]}
                      </label>
                    </div>
                  </>
                )}

                <div className="mt-4">
                  <button
                    onClick={addWorkout}
                    className="px-4 py-2 mt-5 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
                  >
                    Add workout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
