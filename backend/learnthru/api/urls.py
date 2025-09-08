from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseListView, RegistrationViewSet

router = DefaultRouter()
router.register(r"registrations", RegistrationViewSet, basename="registration")

urlpatterns = [
    path("courses/", CourseListView.as_view(), name="course-list"),
] + router.urls
