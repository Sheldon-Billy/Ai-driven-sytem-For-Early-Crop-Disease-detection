from Api.urls import *
from django.contrib import admin
from django.views.generic.base import RedirectView
from django.urls import path,include
from Api.views import CropDiseaseAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path("crop-api/",include("Api.urls")),
    path("",RedirectView.as_view(url='crop-api/crop-disease/',permanent=False))
]
