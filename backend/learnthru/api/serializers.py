from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Course, Instructor, Registration, Lesson

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
    instructors = InstructorSerializer(many=True, read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)



    class Meta:
        model = Course
        fields = ["id", "title", "description", "instructors", "lessons"]


# registration serializer
class RegistrationSerializer(serializers.ModelSerializer):
    # Accept IDs when creating/updating
    course = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), write_only=True
    )
    instructor = serializers.PrimaryKeyRelatedField(
        queryset=Instructor.objects.all(), write_only=True
    )

    # Expose human-readable fields for responses
    course_title = serializers.CharField(source="course.title", read_only=True)
    instructor_name = serializers.CharField(source="instructor.name", read_only=True)

    class Meta:
        model = Registration
        fields = [
            "id",
            "student_first_name",
            "student_last_name",
            "email",
            "course",           # write-only (ID)
            "course_title",     # read-only (title)
            "instructor",       # write-only (ID)
            "instructor_name",  # read-only (name)
            "time",
        ]
