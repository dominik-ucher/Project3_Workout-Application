import React from 'react'
import { useState, useEffect } from "react";
import {useCookies} from 'react-cookie';
import axios from 'axios'

//A props is sent by Exercise.js component, a props is an array of exercises
function ExerciseList(props) {
  const [exercises, setExercises] = useState([]);
  const [token] = useCookies('mytoken')
  
  
  // API call to backend via axios.delete, deletes an exercise from the database
  const deleteBtn = (exercise) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/exercises/${exercise.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }}
    )
      // handle success, the reload is the current way of updating the view
      .then(response => {
        console.log(response);
        window.location.reload();})
        // handle error
      .catch(error => {
        console.log(error)
      })
  };
  

  // This return a list of the exercises, and a delete button for each of them
  // It is part of the "Execises.jsx" UI
  return (
    <div>
        {/* if there are nothing in props - dont try to map */}
        {props.exercises && props.exercises.map(exercise => {
        return (
          <div key={exercise.id}>
        <label>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{exercise.name}</h2>
        </label>
        
        <div className="row">
            <div className="col">
            <button onClick={() => deleteBtn(exercise)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Delete exercise
            </button>
            </div>
        </div>
        <hr/>
        </div>
        )
      })}
      </div>
  )
}

export default ExerciseList;
