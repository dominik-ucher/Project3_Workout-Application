from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

# Created models with python(3) manage.py makemigrations and migrate
# If your migrations do not go through, make sure to remove migration files in the migrations folder


class Exercise(models.Model):
    name = models.CharField(max_length=40)
    category = models.TextField(default="", max_length=15)

    def __str__(self):
        return self.name


class Workout(models.Model):
    name = models.CharField(max_length=40)
    exercises = models.ManyToManyField(Exercise)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    

    def __str__(self):
        return self.name
    
class Post(models.Model):
    title = models.CharField(max_length=40)
    description = models.TextField(default="", max_length=150)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title

    
class ExerciseCompleted(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, default=1)
    reps = models.IntegerField(default=0, null=True, blank=True)
    date = models.DateField(default=datetime.date.today)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    #  time = models.CharField(default='', max_length=40, null=True, blank=True)
    # speed = models.CharField(default='', max_length=40, null=True, blank=True)
    # reps = models.CharField(default='', max_length=40, null=True, blank=True)
    # weight = models.CharField(default='', max_length=40, null=True, blank=True)




    # exercises = models.ManyToManyField(ExerciseInWorkout)
    

# class ExerciseInWorkout(models.Model):
#     workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
#     exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
#     sets = models.IntegerField(default=0, null=True, blank=True)
#     reps = models.IntegerField(default=0, null=True, blank=True)

#     def __str__(self):
#         return f"{self.exercise.name} in {self.workout.name}"


    

    

# class ExerciseCompleted(models.Model):
#     exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, default=1)
#     # sets = models.IntegerField(default=0, null=True, blank=True)
#     # speed = models.FloatField(default=0.0, null=True, blank=True)
#     reps = models.IntegerField(default=0, null=True, blank=True)
#     # weight = models.FloatField(default=0.0, null=True, blank=True)
#     date = models.DateTimeField(auto_now=True)
#     # user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)




# class ExerciseInWorkout(models.Model):
