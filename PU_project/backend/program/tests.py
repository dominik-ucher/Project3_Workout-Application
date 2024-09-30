from django.test import TestCase
# Important that all tests created use django.test.TestCase NOT
# unittest.TestCase so that we can access the database
from .models import Exercise
from .models import Workout
from django.core.exceptions import ValidationError
from .serializers import ExerciseSerializer

# Create your tests here.


class ExerciseCreationTest(TestCase):
    # setting up data for the whole testcase
    def setUp(self):
        self.name = 'KillerMove'

    def test_create_exercise(self):
        # Create a new user
        exercise = Exercise(name=self.name)
        # Assert that the exercise was created successfully
        self.assertEqual(exercise.name, self.name)

    def test_making_illegal_exercise(self):
        my_kwargs2 = {
            'name': "This exercise name is way to long and complicated so that no one will ever bother to read it"}
        with self.assertRaises(expected_exception=ValidationError,
                               msg='The name is too long.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs2)


class CardioExerciseCreationTest(TestCase):
    def setUp(self):
        self.name = 'Planch'
        self.time = '10'

    def test_create_exercise(self):
        exercise = Exercise(name=self.name, time=self.time)
        # Assert that the exercise was created successfully
        self.assertEqual(exercise.name, self.name)
        self.assertEqual(exercise.time, self.time)

    def test_making_illegal_exercise(self):
        my_kwargs1 = {'name': "This exercise name is way to long and complicated so that no one will ever bother to read it",
                      'time': '60'}

        my_kwargs2 = {'name': "Valid name",
                      'time': '1.2'}

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The name is too long.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs1)

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The time must be in full minutes.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs2)


class CardioWithSpeedExerciseCreationTest(TestCase):
    def setUp(self):
        self.name = 'Running'
        self.time = '10'
        self.speed = '7.8'

    def test_create_exercise(self):
        exercise = Exercise(name=self.name, time=self.time,
                            speed=self.speed)
        # Assert that the exercise was created successfully
        self.assertEqual(exercise.name, self.name)
        self.assertEqual(exercise.time, self.time)
        self.assertEqual(exercise.speed, self.speed)

    def test_making_illegal_exercise(self):
        my_kwargs1 = {'name': "This exercise name is way to long and complicated so that no one will ever bother to read it",
                      'time': '60',
                      'speed': '7.9'}

        my_kwargs2 = {'name': "Valid name",
                      'time': '1.2',
                      'speed': 'string'}

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The name is too long.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs1)

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The speed cannot be a string.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs2)


class StrengthExerciseCreationTest(TestCase):
    def setUp(self):
        self.name = 'Push ups'
        self.reps = '12'

    def test_create_exercise(self):
        exercise = Exercise(name=self.name, reps=self.reps)
        # Assert that the exercise was created successfully
        self.assertEqual(exercise.name, self.name)
        self.assertEqual(exercise.reps, self.reps)

    def test_making_illegal_exercise(self):
        my_kwargs1 = {'name': "This exercise name is way to long and complicated so that no one will ever bother to read it",
                      'reps': '12'}

        my_kwargs2 = {'name': "Valid name",
                      'reps': '1.2'}

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The name is too long.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs1)

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The reps must be an integer.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs2)


class StrengthWithWeightExerciseCreationTest(TestCase):
    def setUp(self):
        self.name = 'Bench press'
        self.reps = '12'
        self.weight = '60'

    def test_create_exercise(self):
        exercise = Exercise(name=self.name, reps=self.reps,
                            weight=self.weight)
        # Assert that the exercise was created successfully
        self.assertEqual(exercise.name, self.name)
        self.assertEqual(exercise.reps, self.reps)
        self.assertEqual(exercise.weight, self.weight)

    def test_making_illegal_exercise(self):
        my_kwargs1 = {'name': "This exercise name is way to long and complicated so that no one will ever bother to read it",
                      'reps': '12',
                      'weight': '60'}

        my_kwargs2 = {'name': "Valid name",
                      'reps': '12',
                      'weight': 'string'}

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The name is too long.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs1)

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The weight must be a number.'):
            too_long_name = ExerciseSerializer.create(
                self, my_kwargs2)
