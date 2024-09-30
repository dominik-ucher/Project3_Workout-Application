from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import Exercise, Workout, ExerciseCompleted, Post


# Using the Django REST Framework's ModelSerializer class, which has a lot built-in. Serializes instances of the models,
# which basically translates them from a django/python model to an easier readable JSON format


class ExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ['id', 'name', 'category']


class WorkoutSerializer(serializers.ModelSerializer):
    # exercises = ExerciseSerializer(many=True, read_only=False)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'exercises', 'user']

class ExerciseCompletedSerializer(serializers.ModelSerializer):
    # time = serializers.CharField(allow_null=True, allow_blank=True)
    # speed = serializers.CharField(allow_null=True, allow_blank=True)
    # reps = serializers.CharField(allow_null=True, allow_blank=True)
    # weight = serializers.CharField(allow_null=True, allow_blank=True)

    class Meta:
        model = ExerciseCompleted
        fields = ['id', 'exercise', 'reps', 'date', 'user']

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'workout', 'user']

# class ExerciseInWorkoutSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = ExerciseInWorkout
#         fields = ['workout', 'exercise', 'sets', 'reps']
    
    # time = serializers.IntegerField(allow_null=True)
    # speed = serializers.FloatField(allow_null=True)
    # reps = serializers.IntegerField(allow_null=True)
    # weight = serializers.FloatField(allow_null=True)

    # class Meta:
    #     model = Exercise
    #     model_dependent_fields = ('time', 'speed', 'reps', 'weight')
    #     fields = ('name', 'category') + model_dependent_fields
    #     read_only_field = ('id')

    # Overwrite create method
#     def create(self, validated_data):
#         inputChecks.checkNameLength(self, validated_data.get('name'))
#         inputChecks.checkDescriptionLength(
#             self, validated_data.get('description'))
#         if (validated_data.get('time') != 0):
#             inputChecks.checkIfIntegerOverZero(
#                 self, validated_data.get('time'))
#         if (validated_data.get('reps') != 0):
#             inputChecks.checkIfIntegerOverZero(
#                 self, validated_data.get('reps'))
#         if (validated_data.get('speed') != 0.0):
#             inputChecks.checkIfFloatOverZero(
#                 self, validated_data.get('speed'))
#         if (validated_data.get('weight') != 0.0):
#             inputChecks.checkIfFloatOverZero(
#                 self, validated_data.get('weight'))

#         exercise = Exercise(name=validated_data.get(
#             'name'), description=validated_data.get('description'),
#             time=validated_data.get('description'),
#             speed=validated_data.get('speed'),
#             reps=validated_data.get('reps'),
#             weight=validated_data.get('weight'))
#         exercise.save()
#         return exercise


# class inputChecks:
#     def checkNameLength(self, name):
#         if len(name) > 40:
#             raise ValidationError(
#                 ("The exercise name cannot be longer than 40 characters."),
#                 code='name_too_long',
#             )

#     def checkDescriptionLength(self, name):
#         if len(name) > 100:
#             raise ValidationError(
#                 ("The exercise description cannot be longer than 100 characters."),
#                 code='description_too_long',
#             )

#     def checkIfIntegerOverZero(self, integ):
#         if (not isinstance(integ, int)):
#             raise ValidationError(
#                 ("The input must be an integer."),
#                 code='not_integer',
#             )
#         if (integ <= 0):
#             raise ValidationError(
#                 ("The input must be positive."),
#                 code='not_positive_integer',
#             )

#     def checkIfFloatOverZero(self, floa):
#         if (not isinstance(floa, float)):
#             raise ValidationError(
#                 ("The input must be a float."),
#                 code='not_a_float',
#             )
#         if (floa <= 0):
#             raise ValidationError(
#                 ("The input must be positive."),
#                 code='not_positive_float',
#             )


# class WorkoutSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Workout
#         fields = ['id', 'name', 'exercises']
