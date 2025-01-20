from django.shortcuts import render
from django.http import JsonResponse

def test_endpoint(request):
    return JsonResponse({"message": "Django API is working! con el Live Reload, crack"})
