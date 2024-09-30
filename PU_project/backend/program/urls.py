from django.urls import re_path
from .views import ExerciseResponse, WorkoutResponse, ExerciseCompletedResponse
from .views import ExerciseResponse, PostResponse

urlpatterns = [
    # Exercise and workout endpoints
    # r'^exercises/(?P<pk>\d+)/$' is used to edit and delete, edit is not yet implemented

    re_path(r'^exercises/(?P<pk>\d+)/$',
            ExerciseResponse.as_view(), name='exercise_detail'),
    re_path(r'^workouts/(?P<pk>\d+)/$',
            WorkoutResponse.as_view(), name='workout_detail'),
    re_path(r'^exercises/', ExerciseResponse.as_view()),
    re_path(r'^workouts/', WorkoutResponse.as_view()),
    re_path(r'^posts/', PostResponse.as_view()),
    re_path(r'^exercisescompleted/', ExerciseCompletedResponse.as_view()),
]

# from django.urls import path, include
# from .views import ExerciseViewSet, WorkoutViewSet, exercise_add, ExerciseCompletedViewSet
# from rest_framework import routers

# # Overall, this code sets up API endpoints for the Exercise and Workout models that can be accessed using HTTP requests.
# # Clients can send requests to the exercises/ and workouts/ endpoints to create, retrieve, update, or delete objects.
# # The Django REST Framework provides default implementations for these actions,
# # which can be customized by modifying the ExerciseViewSet and WorkoutViewSet classes in the views.py file.

# # New router object
# router = routers.DefaultRouter()
# # Registers the ExerciseViewSet with the router, associating it with the base path exercises. Can now send requests to "/exercises"
# router.register(r'exercises', ExerciseViewSet)
# router.register(r'workouts', WorkoutViewSet)
# router.register(r'exercisescompleted', ExerciseCompletedViewSet)
# # router.register('users/<int:user_id>/workouts/', UserWorkouts.as_view())


# # Registers the WorkoutViewSet with the router, associating it with the base path workouts. Can now send requests to "/workouts"
# # router.register('workouts', WorkoutViewSet)

# # Includes the above URLs to the root path
# urlpatterns = [
#     path('', include(router.urls)),
#     path('exercises/add/', exercise_add, name='exercise_add'),

# ]
