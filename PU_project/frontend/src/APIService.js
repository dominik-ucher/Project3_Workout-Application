// This module provides a set of static methods that can be used to interact with the backend API. 
// The EditExercise, AddExercise, and DeleteExercise methods are used to make requests to update,
// add, and delete exercises in backend/database, respectively. 
// The LoginUser method is used to add/send users and obtain an authentication token.
export default class APIService {
    static EditExercise(exercise_id, body, token) {
        return fetch(`http://127.0.0.1:8000/exercises/${exercise_id}/`, {
            'method':'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              },
              //parses the response and returns it
              body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static AddExercise(body, token) {
        console.log(body);
        return fetch('http://127.0.0.1:8000/exercises/', {
            'method':'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              },
              body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    

    static DeleteExercise(exercise_id, token) {
        return fetch(`http://127.0.0.1:8000/exercises/${exercise_id}/`, {
            'method':'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              }
        })
    }

    static AddWorkout(body, token) {
        // console.log(body);
        return fetch('http://127.0.0.1:8000/workouts/', {
            'method':'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              },
              body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static EditWorkout(workout_id, body, token) {
        return fetch(`http://127.0.0.1:8000/workouts/${workout_id}/`, {
            'method':'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              },
              //parses the response and returns it
              body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static DeleteWorkout(workout_id, token) {
        return fetch(`http://127.0.0.1:8000/workouts/${workout_id}/`, {
            'method':'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              }
        })
    }

    //the response returned is a HTTP response, if it is OK 200 the user is logged in. DRF built-in authentication is used 
    static async RegisterUser(body) {
        const response = await fetch('http://127.0.0.1:8000/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

      const response_token = await fetch('http://127.0.0.1:8000/auth/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });
    
      const data = await response_token.json();
      console.log(data)
    
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    
      return response;
      }

    //the response returned is a HTTP response, if it is OK 200 the user is logged in. DRF built-in authentication is used 
    static async LoginUser(username, password) {
      const response = await fetch('http://127.0.0.1:8000/auth/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username,
              password: password,
          }),
      });
    
      const data = await response.json();
    
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    
      return response;
    }

      static async CompleteExercise(exercise_id, reps) {
        const response = await fetch(`http://127.0.0.1:8000/exercisescompleted/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                exercise_id: exercise_id,
                // user_id: user_id,
                reps: reps,
            }),
        });
        return response;
      }

    //   static DeleteWorkout(workout_id, token) {
    //     return fetch(`http://127.0.0.1:8000/workouts/${workout_id}/`, {
    //         'method':'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${token}`
    //           }
    //     })
    // }

    static DeleteWorkout(workoutId, token) {
      return fetch(`http://localhost:8000/workouts/${workoutId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    }
  
    static async GetWorkouts(token) {
      const response = await fetch("http://localhost:8000/workouts/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
      return response.json();
    }
  
    static async CreateWorkout(workout, token) {
      const response = await fetch("http://localhost:8000/workouts/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(workout)
      });
      return response.json();
    }
  
    static async GetUser(token) {
      const response = await fetch('/api/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      return await response.json()
    }

    static async UpdateWorkout(workoutId, workout, token) {
      const response = await fetch(`http://localhost:8000/workouts/${workoutId}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(workout)
      });
      return response.json();
    }
  
    static async GetExercises(token) {
      const response = await fetch("http://localhost:8000/exercises/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
      return response.json();
    }

    static async createWorkout(workoutDetails, user, token) {
        const resp = await fetch("http://127.0.0.1:8000/workouts/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            name: workoutDetails.workoutName,
            user: user.id,
          }),
        });
        return await resp.json();
      };

    
    
}