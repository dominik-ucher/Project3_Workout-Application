import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function Form(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [token] = useCookies("mytoken");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedCategory, setCategory] = useState("");

  // API call to backend via axios.post, adds an exercise to the database
  const addExercise = () => {
    const category = selectedCategory;
    const exercise = { name, category };
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

  // categories
  const categoryList = ["Time", "Reps", "Speed", "Weight"];

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
                <input
                  type="name"
                  className="form-input h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm pl-5"
                  placeholder="Enter exercise name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="block font-semibold text-gray-800">
                  Type
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category...</option>
                  {categoryList.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <button
                  onClick={addExercise}
                  className="px-4 py-2 mt-5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Add exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Form;
