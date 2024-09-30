from django.contrib import admin
from .models import Exercise, Workout, ExerciseCompleted, User, Post


# Register your models here.

# This is what is shown in the django admin-panel, localhost:8000/admin


@admin.register(Exercise)
class ExerciseModel(admin.ModelAdmin):
    # filters on the right side
    # list_filter = ('name', 'category')
    # display in the middle/left
    list_display = ('name', 'category')


@admin.register(Workout)
class WorkoutModel(admin.ModelAdmin):
    filter = ('name')
    list_display = ('name', 'exercises_list', 'user')

    # displays exercises in a workout as a list
    def exercises_list(self, obj):
        return ", ".join([exercise.name for exercise in obj.exercises.all()])
    exercises_list.short_description = "Exercises"

# @admin.register(ExerciseCompleted)
# class ExerciseCompletedModel(admin.ModelAdmin):
#     list_display = ('date', 'exercise')

@admin.register(ExerciseCompleted)
class ExerciseCompletedModel(admin.ModelAdmin):

    list_display = ('exercise', 'reps', 'date', 'user')


# @admin.register(ExerciseInWorkout)
# class ExerciseInWorkout(admin.ModelAdmin):
#     list_display = ('workout', 'exercise', 'sets', 'reps')

@admin.register(Post)
class PostModel(admin.ModelAdmin):
    # filters on the right side
    # list_filter = ('name', 'category')
    # display in the middle/left
    list_display = ('title', 'description', 'workout', 'user')