from django.http import JsonResponse
from vitalnest.auth.jwt_verifyRefreshToken import verify_refresh_token

class VerifyTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        
        public_paths = ['/api/auth/tutor/login', '/api/auth/tutor/register']
        if request.path in public_paths:
            return self.get_response(request)

        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return JsonResponse({'status': 'error', 'message': 'No token provided'}, status=401)

    # esto es para verificar que el token funcione por Bearer "Token"
        try:
            auth_parts = auth_header.split()
            if auth_parts[0].lower() != 'bearer':
                return JsonResponse({'status': 'error', 'message': 'Invalid token format'}, status=401)
            
            token = auth_parts[1]
            user = verify_refresh_token(token)
            if not user:
                return JsonResponse({'status': 'error', 'message': 'Invalid or expired token'}, status=401)

            request.user = user
            return self.get_response(request)
            
        except IndexError:
            return JsonResponse({'status': 'error', 'message': 'Invalid token format'}, status=401)