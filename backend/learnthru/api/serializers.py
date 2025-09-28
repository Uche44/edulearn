from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Course, Instructor, Registration, Lesson
from django.shortcuts import get_object_or_404

# user serializer
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


# lesson serializer
class LessonSerializer(serializers.ModelSerializer):
    day_of_week_display = serializers.CharField(source="get_day_of_week_display", read_only=True)

    class Meta:
        model = Lesson
        fields = [
            "id",
            "day_of_week",
            "day_of_week_display",
            "time",
            "start_date",
            "end_date",
            "specific_date",
        ]



# course serializer
class CourseSerializer(serializers.ModelSerializer):
    instructor = InstructorSerializer(read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "instructor", "lessons"]


class RegistrationSerializer(serializers.ModelSerializer):
    # Accept only the lesson ID in the request
    lesson = serializers.PrimaryKeyRelatedField(queryset=Lesson.objects.all())

    class Meta:
        model = Registration
        fields = [
            "id",
            "lesson",  
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        lesson = instance.lesson
        course = lesson.course
        instructor = InstructorSerializer(course.instructor).data if course.instructor else None
        representation["lesson"] = {
            "id": lesson.id,
            "day_of_week": lesson.day_of_week,
            "time": lesson.time,
            "course": {
                "id": course.id,
                "title": course.title,
                "description": course.description,
                "instructor": instructor,
            },
        }
        return representation

