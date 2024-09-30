import React, {useState, useEffect} from 'react';
import './App.css';
import {Link, Navigate} from "react-router-dom";
import Navbar from './components/Navbar';
import { useCookies } from "react-cookie";
import axios from 'axios';


function App() {
    const [signedIn, setSignedIn] = useState(true);
    const [token, setToken, removeToken] = useCookies("mytoken");
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [feedItems, setFeedItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);

    
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [userWorkouts, setUserWorkouts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:000/workouts')
      .then(response => setWorkouts(response.data))
      .catch(error => console.log(error));
  }, []);

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
        console.log("RESPONSE DATA : ", response.data);
        setWorkouts(response.data);
        const userWorkouts = response.data.filter(
          (workout) => workout.user === userID
        ); // we want the userID to be the token. However, the workouts are registered on simple itegers
        console.log("USERWORKOUTS: ", userWorkouts);
        setUserWorkouts(userWorkouts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchWorkouts();
  }, []);


  async function getUserId() {
    const token = localStorage.getItem("token");
    console.log('USER TOKEN: ' + token)
    try {
      const response = await axios.get('http://127.0.0.1:8000/get_user_id/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("SE HER    :    ", response.data)
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  useEffect(() => {
      if (!token["mytoken"]) {
        console.log("Signed in set to true");
        setSignedIn(false);
      }
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setUsers(resp))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setFeedItems(resp))
      .catch((error) => console.log(error));
  }, []);

  const handleWorkoutChange = async (event) => {
    const selectedWorkoutId = event.target.value;
    setSelectedWorkout(selectedWorkoutId);
    // Filter data into only the users completed exercises
    // setSelectedWorkout(
    //   workouts.find((workout) => workout.id === parseInt(selectedWorkoutId))
    // );
  };

  const getExerciseName = (id) => {
    const exercise = exercises.find((exercise) => exercise.id === id);
    return exercise ? exercise.name : null;
  };

  const handleNewPostSubmit = async (event) => {
    event.preventDefault();
    const userID = await getUserId();
    console.log("USER ID: " + userID);
    const post = { 
      title: title, 
      description: description, 
      workout: selectedWorkout,
      user : userID,
    };
    console.log(post);
    console.log(userID);
    axios
      .post("http://127.0.0.1:8000/posts/", post)
      // handle success, the reload is the current way of updating the view
      .then((response) => {
        console.log(response);
      })
      .then(() => window.location.reload())
      // handle error
      .catch((error) => {
        console.log(error);
      });

    setFeedItems([...feedItems,post]);
    setTitle("");
    setDescription("");
  };

  const getUsername = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : null;
  };

  const getWorkout = (id) => {
    const workout = workouts.find((workout) => workout.id === id);
    return workout ? workout.name : null;
  }

  const getWorkoutsExercisesAsName = (id) => {
    const workout = workouts.find((workout) => workout.id === id);
    if (!workout) return null;
  
    const exerciseNames = workout.exercises.map((exerciseId) => {
      const exercise = exercises.find((exercise) => exercise.id === exerciseId);
      return exercise ? exercise.name : null;
    });
    return exerciseNames.filter(Boolean).map((name, index) => (
      <p key={index}>{name}</p>
    ));
  };

  return (
    <>
    <Navbar className="fixed" signedIn={signedIn} userId={userId} />
      <div className="flex-1 ml-64">
        <div className="flex flex-col h-screen">
          <div className="flex-none bg-gray-900 py-8 px-4">
            <h1 className="text-4xl text-white rounded">Feed</h1>
          </div>
          <div className="flex-1 bg-gray-900 overflow-y-auto">
            <div className="mx-auto max-w-screen-xl px-4">
      <form className="px-4 py-3" onSubmit={handleNewPostSubmit}>
  <div className="flex flex-col">
  <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-2 px-3 mb-2 rounded border-gray-400"
        />
    <textarea
      placeholder="What's happening?"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full py-2 px-3 mb-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
    ></textarea>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="workout-selector">
        </div>

        <div className="workout-selector" onChange={handleWorkoutChange}>
          
          <select className="mr-2 p-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none" id="workouts" >
            <option value="">--Please select a workout--</option>
            {userWorkouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Post
        </button>
      </div>
     
    </div>
  </div>
</form>
{feedItems.map((post) => (
  <div
    key={post.id}
    className="bg-gray-100 rounded-lg overflow-hidden shadow-md my-4 w-full relative flex h-auto"
  >
  <div className="px-4 py-6 justify-between">
  <div className="flex items-center">
    <img
      src={`https://picsum.photos/${(post.user*2)+5}`}
      alt={post.user}
      className="w-12 h-12 rounded-full mr-3"
    />
    <p className="font-medium">{getUsername(post.user)}</p>
  </div>
</div>
    <div className="px-4 py-6 flex-1">
      <p className="text-2xl font-medium mb-2">{post.title}</p>
      <p className="text-gray-700 text-lg">{post.description}</p>
    </div>
    <div className="w-3/12 top-0 right-0 text-center">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* <p className="text-gray-600 font-medium mb-2">Workout:</p> */}
        <p className="text-lg font-bold mb-2">
            {getWorkout(post.workout)}
        </p>
        <p className="text-gray-600 font-medium mb-2">Exercises:</p>
        <p>{getWorkoutsExercisesAsName(post.workout)}</p>
        </div>
    </div>
  </div>
))}
  </div>
</div>
    </div>
    </div>
    </>
  );
}

export default App;
