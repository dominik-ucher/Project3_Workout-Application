import Navbar from "../components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { summary } from "date-streaks";

function Progress() {
  const chartAreaRefs = useRef({});
  const [showGraphs, setShowGraphs] = useState({});
  const [exerciseIds, setExerciseIds] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [dates, setDates] = useState([]);
  const [showStreak, setShowStreak] = useState();

  useEffect(() => {
    document.body.classList.add("bg-gray-900"); // replace with your desired background color class
    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);

  //Implementation for getting only the logged in user's completed exercises
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

  // calling this creates multiple graphs

  const createGraph = async (exerciseId) => {
    // Fetch JSON data from API endpoint
    const data = await d3.json("http://127.0.0.1:8000/exercisescompleted/");
    console.log(data);

    // Filter data into only the users completed exercises
    const userId = await getUserId();
    const completedExercises = data.filter(
      (completedExercise) => completedExercise.user == userId
    );

    // Then filter data by exercise ID
    const filteredData = completedExercises.filter(
      (d) => d.exercise == exerciseId
    );

    // Transform data into the format required by the chart
    const chartData = filteredData.map((d) => ({
      reps: d.reps,
      date: d.date,
    }));

    const tempdates = completedExercises.map((d) => d.date);
    const newDates = [...dates];
    tempdates.forEach((date) => {
      if (!newDates.includes(date)) {
        newDates.push(date);
      }
    });
    setDates(newDates);
    console.log("mapped dates:");
    console.log(dates);

    //parses time correctly from json objects
    const parseTime = d3.timeParse("%Y-%m-%d");
    chartData.forEach((d) => {
      d.date = parseTime(d.date);
    });

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // remove existing SVG element
    d3.select(chartAreaRefs.current[exerciseId]).select("svg").remove();

    // append the svg object to the chart area
    var svg = d3
      .select(chartAreaRefs.current[exerciseId])
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis and Y axis
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    x.domain(d3.extent(chartData, (d) => d.date));
    y.domain([
      d3.min(chartData, (d) => d.reps),
      d3.max(chartData, (d) => d.reps),
    ]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    // add the Line into the chart, based on date and reps
    var valueLine = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.reps));
    svg
      .append("path")
      .data([chartData])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
  };

  //extra update function for checking changes to the completed exercises. If changed, parses to the graph
  useEffect(() => {
    Object.keys(showGraphs).forEach((exerciseId) => {
      if (showGraphs[exerciseId]) {
        createGraph(exerciseId);
      }
    });
  }, [showGraphs]);

  // Fetch the list of exercise IDs from the API endpoint
  useEffect(() => {
    const fetchData = async () => {
      const data = await d3.json("http://127.0.0.1:8000/exercisescompleted/");
      const uniqueIds = [...new Set(data.map((d) => d.exercise))];
      setExerciseIds(uniqueIds);
    };
    fetchData();
  }, []);

  //toggle each corresponding graphs when clicking button
  const toggleGraph = (exerciseId) => {
    setShowGraphs((prevShowGraphs) => ({
      ...prevShowGraphs,
      [exerciseId]: !prevShowGraphs[exerciseId],
    }));
  };

  //fetches exercises to add the name to the UI
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/exercises/`)
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error(error));
  }, []);

  // gets the exercise name for use in UI
  const getExerciseName = (exerciseId) => {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);
    if (!exercise) {
      console.error(`Exercise with ID ${exerciseId} not found.`);
      return;
    }
    return exercise.name;
  };

  // gets the exercise name for use in UI
  const getExerciseCategory = (exerciseId) => {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);
    if (!exercise) {
      console.error(`Exercise with ID ${exerciseId} not found.`);
      return;
    }
    return exercise.category;
  };

  // gets the streak, only if the last date is today or yesterday
  function getStreak() {
    let streak = 0;
    if (summary(dates).withinCurrentStreak) {
      streak = summary(dates).currentStreak;
    }
    console.log(streak);
    return streak;
  }
  return (
    <>
      <Navbar />
      <div className="flex-1 ml-64 bg-gray-900">
        <div className="flex-col">
        <div className="py-8 px-4 bg-gray-900">
          <h1 className="text-4xl text-white rounded">Progress</h1>
        </div>
          <h1 className="text-white text-3xl pb-2 text-center">
            {/* render only when setStreak button is shown */}
            {showStreak && (
              <span>
                Streak: {getStreak()}
                <FontAwesomeIcon
                  icon={faFire}
                  fixedWidth
                ></FontAwesomeIcon>{" "}
              </span>
            )}
          </h1>

          {/* Render a button and chart area for each exercise ID */}
          {exerciseIds.map((exerciseId) => (
            <React.Fragment key={exerciseId}>
              <button
                className="bg-green-700 text-white px-3 py-1 rounded mb-5"
                onClick={() => {
                  toggleGraph(exerciseId);
                  setShowStreak(true);
                }}
              >
                Show Graph {getExerciseName(exerciseId)}
              </button>
              )
              <div
                className="flex flex-col text-white"
                ref={(el) => (chartAreaRefs.current[exerciseId] = el)}
              >
                {showGraphs[exerciseId] && (
                  <>
                    <h1 className="text-red-500 flex text-4xl ml-16 font-gymbro">
                      {getExerciseName(exerciseId)}
                    </h1>
                    <h2 className=" text-white flex text-4xl ml-16 font-gymbro">
                      {getExerciseCategory(exerciseId)}
                    </h2>
                  </>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default Progress;
