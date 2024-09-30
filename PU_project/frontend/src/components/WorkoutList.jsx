import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function WorkoutList(props) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [token] = useCookies("mytoken");

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

  // This deletes a workout from the database and reloads the window
  const deleteBtn = (workout) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) {
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:8000/workouts/${workout.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // this get the exercise name based on the exercise id
  const getExerciseName = (id) => {
    const exercise = exercises.find((exercise) => exercise.id === id);
    return exercise ? exercise.name : null;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {props.workouts &&
        props.workouts.map((workout) => {
          return (
            <div key={workout.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {workout.name}
                </h2>
                <button
                  onClick={() => deleteBtn(workout)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
              <ul className="max-w-md space-y-1 text-black-500 list-inside dark:text-gray-400 list-none">
                {workout.exercises.map((exercise, index) => (
                  <li key={index}>{getExerciseName(exercise)}</li>
                ))}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default WorkoutList;
