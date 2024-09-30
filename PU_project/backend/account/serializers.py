from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class UserSerializer(serializers.ModelSerializer):
    super(User)

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        # should make the password write only and required, as well as hiding it from console???
        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}

        # overwrite create method for django user class
    def create(self, validated_data):
        MinimumLengthValidator.validate(self, validated_data.get('password'))
        UniqueUsernameValidator.validate(self, validated_data.get('username'))
        NotEqualPasswordAndUsername.validate(self, validated_data.get(
            'username'), validated_data.get('password'))
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        user.save()
        return user


class MinimumLengthValidator:
    def validate(self, password, user=None):
        if len(password) < 8:
            raise ValidationError(
                _("This password must contain at least %(min_length)d characters."),
                code='password_too_short',
                params={'min_length': 8},
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least %(min_length)d characters."
            % {'min_length': 8}
        )


class UniqueUsernameValidator:
    def validate(self, user):
        if User.objects.filter(username=user).exists():
            raise ValidationError(
                message="There is already a user with this username.",
            )


class NotEqualPasswordAndUsername:
    def validate(self, user, password):
        if user == password:
            raise ValidationError(
                message="The username cannot be equal to the password",
            )
