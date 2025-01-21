from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.serializers.json import DjangoJSONEncoder
from .models import Activity
from .serializers import ActivitySerializer

class ActivityList(APIView):
    def get(self, request):
        activities = Activity.objects.all()
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
