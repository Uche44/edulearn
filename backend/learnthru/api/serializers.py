from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Course, Instructor, Registration

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# instructor serializer
class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'bio']

# course serializer
class CourseSerializer(serializers.ModelSerializer):
    instructors = InstructorSerializer(many=True)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "instructors"]      

# course reg
class RegistrationSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    instructor = InstructorSerializer(read_only=True)


    class Meta:
        model = Registration
        fields = "__all__"          