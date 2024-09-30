import React, {useState, useEffect} from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
export default ExerciseForm;

function ExerciseForm({ workoutId }) {
    const [token] = useCookies("mytoken");
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

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
        

    const handleExerciseSubmit = (event) => {
      event.preventDefault();
      // Use workoutId and other exercise details to create a new exercise in the database
      const exerciseDetails = {
        workoutId: workoutId,
        exerciseName: event.target.elements.exerciseName.value,
        sets: event.target.elements.sets.value,
        reps: event.target.elements.reps.value,
      };
      // Make API call to create a new exercise in the database with exerciseDetails
      // ...
    };

    const handleExerciseSelect = (event) => {
        // Get the selected option value from the event target
        const selectedOptionValue = (event.target.value);
        // Update the selectedExercises state property by adding the selected option to the array
        setSelectedExercises([...selectedExercises, selectedOptionValue]);
  
      };
  
      return (
        <form onSubmit={handleExerciseSubmit}>
          <input type="hidden" name="workoutId" style={{ backgroundColor: 'blueviolet' }}  value={workoutId} />
      
          <label className="block font-semibold px-4 py-5 text-gray-800">Exercises</label>
      
          <select value={selectedExercises.length > 0 ? selectedExercises[0].exerciseName : ""}
              onChange={handleExerciseSelect} 
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              {Object.values(exercises).map((exercise) => (
              <option key={exercise.id} value={exercise.name }
              >
                  {exercise.name}
              </option>
              ))}
      
          </select>
      
          <label htmlFor="sets">Sets:</label>
          <input type="number" id="sets" name="sets" required />
      
          <label htmlFor="reps">Reps:</label>
          <input type="number" id="reps" name="reps" required />
      
          <button type="submit">Add Exercise</button>
      
          {selectedExercises.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                </tr>
              </thead>
              <tbody>
                {selectedExercises.map((exercise) => (
                  <tr key={`${exercise.exerciseName}-${exercise.sets}-${exercise.reps}`}>
                    <td>{exercise.exerciseName}</td>
                    <td>{exercise.sets}</td>
                    <td>{exercise.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </form>
      );
  }