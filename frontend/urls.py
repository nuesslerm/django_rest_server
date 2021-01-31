from django.urls import path, re_path
from .views import index

# from django.conf.urls import url
# from django.conf.urls import handler404

urlpatterns = [
    # match the root
    path(r"", index),
    # match all other pages
    re_path(r"^(?:.*)/?$", index),
]

# handler404 = index