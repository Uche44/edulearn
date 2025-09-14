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
    # Write-only: accept course ID
    course = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), write_only=True
    )

    # Read-only: expose details through lesson
    course_title = serializers.CharField(source="course.title", read_only=True)
    instructor_name = serializers.CharField(source="course.instructor.name", read_only=True)
    start_time = serializers.DateTimeField(source="lesson.start_time", read_only=True)
    end_time = serializers.DateTimeField(source="lesson.end_time", read_only=True)

    class Meta:
        model = Registration
        fields = [
            "id",
            "student_first_name",
            "student_last_name",
            "email",
            "course",           # write-only
            "course_title",     # read-only
            "instructor_name",  # read-only
            "start_time",       # read-only
            "end_time",         # read-only
        ]

    def create(self, validated_data):
        course = validated_data.pop("course")

        # Find a lesson for this course (adjust logic if multiple lessons exist)
        try:
            lesson = Lesson.objects.filter(course=course).first()
            if not lesson:
                raise serializers.ValidationError("No lesson available for this course.")
        except Lesson.DoesNotExist:
            raise serializers.ValidationError("Invalid course.")

        return Registration.objects.create(lesson=lesson, **validated_data)
