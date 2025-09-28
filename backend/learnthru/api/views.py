from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, CourseSerializer, RegistrationSerializer
from .models import Course, Registration

# view to create new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


# view to get details of the logged-in user
class UserDetailsView(APIView):  
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)  
        return Response(serializer.data)

# view for creating course list
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# reg
class RegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = RegistrationSerializer

    def get_queryset(self):

        return Registration.objects.filter(user=self.request.user)

        # queryset = Registration.objects.all()
        # user_id = self.request.query_params.get("user_id")
        # if user_id is not None:
        #     queryset = queryset.filter(user__id=user_id)
        # return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)