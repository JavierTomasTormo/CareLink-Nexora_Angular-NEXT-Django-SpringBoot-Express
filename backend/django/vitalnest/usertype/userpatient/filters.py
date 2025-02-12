import django_filters
from django_filters import rest_framework as filters
from .models import UserPatient
from django.db.models import JSONField

class UserPatientFilter(django_filters.FilterSet):
    class Meta:
        model = UserPatient
        fields = {
            'id_user': ['exact'],
            'email': ['icontains'],
            'name_patient': ['icontains'],
            'allergies': ['icontains'],
            'difficulties': ['icontains'],
            'discapacity': ['exact'],
            'isactive': ['exact'],
            'createdat': ['date', 'date__gte', 'date__lte'],
            'updatedat': ['date', 'date__gte', 'date__lte'],
            'phone_number': ['icontains'],
            'birthday': ['icontains'],
        }
        filter_overrides = {
            JSONField: {
                'filter_class': django_filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'icontains',
                },
            },
        }