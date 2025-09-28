from django.db import models
from django.contrib.auth.models import User

class Instructor(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    instructor = models.ForeignKey(
        "Instructor",
        on_delete=models.CASCADE,
        related_name="courses"
    )

    def __str__(self):
        return self.title

class Registration(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="registrations")

    lesson = models.ForeignKey(
        "Lesson",
        on_delete=models.CASCADE,
        related_name="registrations"
    )

    def __str__(self):
        return f"{self.lesson}"




class Lesson(models.Model):
    DAYS_OF_WEEK = [
        ("Mon", "Monday"),
        ("Tue", "Tuesday"),
        ("Wed", "Wednesday"),
        ("Thu", "Thursday"),
        ("Fri", "Friday"),
        ("Sat", "Saturday"),
        ("Sun", "Sunday"),
    ]

    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="lessons"
    )

    
    day_of_week = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    time = models.TimeField()

    start_date = models.DateField()  
    end_date = models.DateField()    

    specific_date = models.DateField(null=True, blank=True)

    def __str__(self):
        time_str = self.time.strftime("%I:%M %p")  
        if self.specific_date:
            return f"{self.course.title} - {self.specific_date.strftime('%b %d, %Y')} at {time_str}"
        return f"{self.course.title} - {self.get_day_of_week_display()} at {time_str} ({self.start_date.strftime('%b %d, %Y')} → {self.end_date.strftime('%b %d, %Y')})"

