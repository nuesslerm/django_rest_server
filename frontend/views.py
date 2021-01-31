from django.shortcuts import render

# from django.http import HttpResponse


def index(request, *args, **kwargs):
    return render(request, "html/index.html")


# def main(request):
#     return HttpResponse("Hello")