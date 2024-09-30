import "../App";
import { useState, useEffect } from "react";
import ExerciseList from "./ExerciseList";
import Navbar from "./Navbar";
import Form from "./Form";
import CurrentExerciseForm from "./CurrentExerciseForm";
import { useCookies } from "react-cookie";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [editExercise, setEditExercise] = useState(null);
  const [token] = useCookies("mytoken");

  // useEffect runs on every render. That means that when the count changes, a render happens,
  // which then triggers another effect. In practise, useEffect makes sure the exercises are loaded
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
  }, [token]);

  // This returns the exercise page with a list of exercises,
  // and the form to make a new one. It is the "parent page"
  return (
    <div className="App flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="py-8 px-4 bg-gray-900">
          <h1 className="text-4xl text-white rounded">My exercises</h1>
        </div>
        <div className="p-8">
          <div className="flex justify-between">
            <h2 class="text-4xl font-extrabold dark:text-white">
              My exercises
            </h2>
            <div>
              <CurrentExerciseForm />
            </div>
          </div>
          <br />
          <ExerciseList exercises={exercises} />
        </div>
      </div>
    </div>
  );
}

export default Exercises;
