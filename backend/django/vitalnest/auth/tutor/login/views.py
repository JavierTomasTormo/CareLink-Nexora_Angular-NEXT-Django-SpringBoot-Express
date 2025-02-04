from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from vitalnest.usertype.user.models import User
import json

@method_decorator(csrf_exempt, name='dispatch')
class LoginTutorView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            print("DEBUG - Received data:", data)
            
            email = data['email']
            print("DEBUG - Email:", email)
            
            password = data['password']
            print("DEBUG - Password:", password)
            
            try:
                user_exists = User.objects.get(email=email)
                print("DEBUG - User found in DB:", user_exists)
                print("DEBUG - Stored password hash:", user_exists.password)
                
                # Verificar la contraseña manualmente
                is_password_valid = check_password(password, user_exists.password)
                print("DEBUG - Password check result:", is_password_valid)
                
                if is_password_valid:
                    return JsonResponse({'status': 'success', 'message': 'Login successful'}, status=200)
                
            except User.DoesNotExist:
                print("DEBUG - User not found in DB")
                
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
            
        except Exception as e:
            print("DEBUG - Exception:", str(e))
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

# from django.contrib.auth import authenticate
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# from django.views import View
# from vitalnest.usertype.user.models import User
# import json

# @method_decorator(csrf_exempt, name='dispatch')
# class LoginTutorView(View):
#     def post(self, request):
#         try:
#             data = json.loads(request.body)
#             print("DEBUG - Received data:", data)
            
#             email = data['email']
#             print("DEBUG - Email:", email)
            
#             password = data['password']
#             print("DEBUG - Password:", password)
            
#             try:
#                 user_exists = User.objects.get(email=email)
#                 print("DEBUG - User found in DB:", user_exists)
#                 print("DEBUG - Stored password hash:", user_exists.password)
#             except User.DoesNotExist:
#                 print("DEBUG - User not found in DB")
#                 return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
            
#             # Intentar autenticar
#             user = authenticate(request, email=email, password=password)
#             print("DEBUG - Authenticated user:", user)
            
#             if user is not None:
#                 return JsonResponse({'status': 'success', 'message': 'Login successful'}, status=200)
#             else:
#                 return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
#         except Exception as e:
#             print("DEBUG - Exception:", str(e))
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)