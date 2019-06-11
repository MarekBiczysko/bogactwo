from django.urls import path
from .views import current_user, CreateUser, LogoutUser
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('current_user/', current_user),
    path('create_user/', CreateUser.as_view()),
    path('logout_user/', LogoutUser.as_view()),
    path('token-auth/', obtain_jwt_token)
]
