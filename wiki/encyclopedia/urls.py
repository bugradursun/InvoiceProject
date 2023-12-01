from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"), #homepagede index function goruntuulenecek (path,function we want to call,optinoally name for the path)
    path("new/",views.new,name="new"),

]
