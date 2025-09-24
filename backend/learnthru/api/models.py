from django.db import models

class Instructor(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    # course = models.ForeignKey(Course, related_name="instructors", on_delete=models.CASCADE)


    def __str__(self):
        return self.name


class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    instructors = models.ManyToManyField(Instructor, related_name="courses")

    def __str__(self):
        return self.title

class Registration(models.Model):
    student_first_name = models.CharField(max_length=100)
    student_last_name = models.CharField(max_length=100)
    email = models.EmailField()

    # A registration links directly to a lesson (which already has course + time info)
    lesson = models.ForeignKey(
        "Lesson",
        on_delete=models.CASCADE,
        related_name="registrations"
    )

    def __str__(self):
        return f"{self.student_first_name} {self.student_last_name} - {self.lesson}"




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

