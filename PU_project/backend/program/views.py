from .models import Exercise, Workout, ExerciseCompleted, Post
from .serializers import ExerciseSerializer, WorkoutSerializer, ExerciseCompletedSerializer, PostSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

# BERTINE'S COMMENTS
# These classes handle the get, prost and delete requests from the API
# So far, tokens are not implemented and needs to be a new issue


class ExerciseResponse(APIView):

    def get(self, request):
        exercises = Exercise.objects.all()
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete does not recognize primary key
    def delete(self, request, pk):
        exercise = get_object_or_404(Exercise, pk=pk)
        exercise.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class WorkoutResponse(APIView):

    def get(self, request):
        workouts = Workout.objects.all()
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WorkoutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        workout = get_object_or_404(Workout, pk=pk)
        workout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ExerciseCompletedResponse(APIView):

    def get(self, request):
        exerciseCompleted = ExerciseCompleted.objects.all()
        serializer = ExerciseCompletedSerializer(exerciseCompleted, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExerciseCompletedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        exerciseCompleted = get_object_or_404(ExerciseCompleted, pk=pk)
        exerciseCompleted.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostResponse(APIView):

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete does not recognize primary key
    def delete(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# from django.http import JsonResponse
# from .models import Exercise, ExerciseCompleted, Workout
# from .serializers import ExerciseSerializer, WorkoutSerializer, ExerciseCompletedSerializer
# from rest_framework import viewsets
# from django.views.decorators.csrf import csrf_exempt

# # Create your views here.
# # Defines the behavior for handling HTTP requests related to a model with django rests built-in model.viewset.
# # Provides implementations for the most commonly used CRUD (Create=POST, Retrieve=GET, Update=PUT, Delete=DELETE) operations


# class ExerciseViewSet(viewsets.ModelViewSet):
#     queryset = Exercise.objects.all()
#     print(queryset)
#     serializer_class = ExerciseSerializer


# @csrf_exempt
# def exercise_add(request):
#     if request.method == 'POST':
#         name = request.POST.get('name')
#         if name is None:
#             return JsonResponse({'error': 'Name is required'})

#         exercise = Exercise.objects.create(name=name)

#         time = request.POST.get('time')
#         if time is not None:
#             exercise.time = time

#         speed = request.POST.get('speed')
#         if speed is not None:
#             exercise.speed = speed

#         reps = request.POST.get('reps')
#         if reps is not None:
#             exercise.reps = reps

#         weight = request.POST.get('weight')
#         if weight is not None:
#             exercise.weight = weight

#         exercise.save()

#         data = {'id': exercise.id, 'name': exercise.name, 'time': exercise.time,
#                 'speed': exercise.speed, 'reps': exercise.reps, 'weight': exercise.weight}

#         ExerciseSerializer.create(data)

#         return JsonResponse(data)
#     else:
#         return JsonResponse({'error': 'Invalid method'})


# class WorkoutViewSet(viewsets.ModelViewSet):
#     queryset = Workout.objects.all()
#     serializer_class = WorkoutSerializer

# class ExerciseCompletedViewSet(viewsets.ModelViewSet):
#     queryset = ExerciseCompleted.objects.all()
#     serializer_class = ExerciseCompletedSerializer

# # class ExerciseInWorkoutViewSet(viewsets.ModelViewSet):
# #     queryset = ExerciseInWorkout.objects.all()
# #     serializer_class = ExerciseInWorkoutSerializer

# # class ExerciseCompletedViewSet(viewsets.ModelViewSet):
# #     queryset = ExerciseCompleted.objects.all()
# #     serializer_class = ExerciseCompletedSerializer