from rest_framework.test import APITestCase
from rest_framework import status
from .models import Activity

class ActivityTests(APITestCase):
    def test_create_activity(self):
        data = {
            "name_activitie": "Yoga Class",
            "description": "Beginner friendly yoga",
            "intensity": 3,
            "price": "25.00",
            "caracteristics": {"level": "beginner", "equipment": "mat"},
            "max_participants": 20,
            "capacity": 20,
            "duration": 60,
            "slug": "yoga-class"
        }
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
