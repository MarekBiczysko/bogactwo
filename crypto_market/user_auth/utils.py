from django.contrib.auth.models import User

from user_auth.serializers import UserSerializer
from market.models import UserSettings


def my_jwt_response_handler(token, user=None, request=None):
    user_data = UserSerializer(user, context={'request': request}).data

    response = {
        'token': token,
        'username': user_data['username'],
    }

    try:
        user_obj = User.objects.get(username=user_data['username'])
        user_data = UserSettings.objects.get(user=user_obj)
        response['settings'] = user_data.settings
    except (User.DoesNotExist, UserSettings.DoesNotExist):
        response['settings'] = {}

    return response
