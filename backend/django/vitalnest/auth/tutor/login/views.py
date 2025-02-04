from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from vitalnest.usertype.user.models import User
import json
from vitalnest.auth.jwt_accessToken import generate_access_token

@method_decorator(csrf_exempt, name='dispatch')
class LoginTutorView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            print("DEBUG - Received data:", data)
            
            email = data['email']
            password = data['password']
            
            # Verificar email
            try:
                user = User.objects.get(email=email)
                print("DEBUG - Email check: Valid")
                
                # Verificar password
                if check_password(password, user.password):
                    print("DEBUG - Password check: Valid")

                    # Generar token
                    access_token = generate_access_token(user)
                    print("DEBUG - Access token generated", access_token)
                    
                    return JsonResponse({
                        'status': 'success',
                        'message': 'Login successful',
                        'user': {
                            'id_user': user.id,
                            'email': user.email,
                            'name': user.name,
                            'isactive': user.isactive,
                            'createdat': user.createdat.strftime('%Y-%m-%d %H:%M:%S'),
                            'updatedat': user.updatedat.strftime('%Y-%m-%d %H:%M:%S'),
                            'phone_number': user.phone_number,
                            'address': user.address,
                            'profile_img': user.profile_img
                        },
                        'access_token': access_token['token'],
                        'role': access_token['role']
                    }, status=200)
                else:
                    print("DEBUG - Password check: Invalid")
                    return JsonResponse({'status': 'error', 'message': 'Invalid password'}, status=401)
                    
            except User.DoesNotExist:
                print("DEBUG - Email check: Invalid")
                return JsonResponse({'status': 'error', 'message': 'User not found'}, status=401)
                
        except Exception as e:
            print("DEBUG - Exception:", str(e))
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)