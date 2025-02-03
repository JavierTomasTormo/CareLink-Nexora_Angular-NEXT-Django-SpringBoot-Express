
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth.hashers import make_password
from vitalnest.usertype.user.models import User
import json

@method_decorator(csrf_exempt, name='dispatch')
class RegisterTutorView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            user = User(
                email=data['email'],
                password=make_password(data['password']),
                name=data['name'],
                isactive=data.get('isactive', 1),
                phone_number=data.get('phone_number', ''),
                address=data.get('address', ''),
                profile_img=data.get('profile_img', '')
            )
            user.save()
            return JsonResponse({'status': 'success', 'message': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)