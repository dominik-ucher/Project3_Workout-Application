from django.test import TestCase
# Important that all tests created use django.test.TestCase NOT
# unittest.TestCase so that we can access the database
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import django.contrib.auth.password_validation
from .serializers import UserSerializer

# Create your tests here.


class UserCreationTest(TestCase):
    # setting up data for the whole testcase
    def setUp(self):
        self.username = 'Donald_duck'
        self.password = 'duckduckgo'

    def test_create_user(self):
        # Create a new user
        user = User.objects.create_user(
            username=self.username, password=self.password)
        # Assert that the user was created successfully
        self.assertEqual(user.username, self.username)
        self.assertTrue(user.check_password(self.password))

    def test_making_illegal_user(self):
        my_kwargs1 = {'username': "Mickey", 'password': "1"}
        my_kwargs2 = {'username': "Killbill", 'password': "Killbill"}
        with self.assertRaises(expected_exception=ValidationError,
                               msg='The password is not valid.'):
            wrong_password_user = UserSerializer.create(
                self, my_kwargs1)

        with self.assertRaises(expected_exception=ValidationError,
                               msg='The password must be more different from the username.'):
            same_username_and_password_user = UserSerializer.create(
                self, my_kwargs2)

    def test_equal_usernames(self):
        my_kwarg3 = {'username': "Marilyn_Monroe",
                     'password': "DiamonsAreAGirlsBestFriend"}
        my_kwargs4 = {'username': "Marilyn_Monroe",
                      'password': "WannaBeMarilyn"}
        marilyn_user = UserSerializer.create(self,
                                             my_kwarg3)
        with self.assertRaises(expected_exception=ValidationError,
                               msg='Two users cannot be named the same'):
            identity_theif = UserSerializer.create(
                self, my_kwargs4)
