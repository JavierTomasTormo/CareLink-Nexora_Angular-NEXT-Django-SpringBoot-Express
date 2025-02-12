from django.http import JsonResponse
from vitalnest.auth.jwt_verifyRefreshToken import verify_refresh_token

class VerifyTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Rutas públicas que no requieren token
        public_paths = [
            # Auth endpoints
            '/api/auth/tutor/login', 
            '/api/auth/tutor/register',
            '/api/auth/tutor/logout',
            '/api/auth/refresh-token',
            '/api/verify-refresh-token/',  

            
            # List and Detail endpoints (GET methods are public)
            '/api/activities/',
            '/api/activities/',
            
            '/api/rooms/bedroom/',
            '/api/rooms/bedroom/',
            
            '/api/food/meals/',
            '/api/food/meals/',
            
            '/api/rooms/room/',
            '/api/rooms/room/'
        ]
                # Rutas protegidas que requieren token
        protected_paths = [
            # Protected endpoints for Create, Update, Delete operations
            '/api/activities/',  # POST (create)
            '/api/activities/',  # PUT/PATCH/DELETE
            
            '/api/rooms/bedroom/',  # POST (create)
            '/api/rooms/bedroom/',  # PUT/PATCH/DELETE
            
            '/api/food/meals/',  # POST (create)
            '/api/food/meals/',  # PUT/PATCH/DELETE
            
            '/api/rooms/room/',  # POST (create)
            '/api/rooms/room/'   # PUT/PATCH/DELETE

            # User endpoints
            '/api/users/tutor/',  # POST (create)
            '/api/users/tutor/',  # PUT/PATCH/DELETE
            '/api/users/patient/',  # POST (create)
            '/api/users/patient/',  # PUT/PATCH/DELETE
        ]


        # Si la ruta es pública, permitir acceso sin token
        if request.path in public_paths:
            return self.get_response(request)

        # Si la ruta no está protegida, permitir acceso sin token
        if request.path not in protected_paths:
            return self.get_response(request)

        # Verificar token solo para rutas protegidas
        auth_header = request.headers.get('Authorization')
        refresh_token = request.headers.get('X-Refresh-Token')
        if not auth_header or not refresh_token:
            return JsonResponse({'status': 'error', 'message': 'No token provided'}, status=401)

        try:
            auth_parts = auth_header.split()
            if auth_parts[0].lower() != 'bearer':
                return JsonResponse({'status': 'error', 'message': 'Invalid token format'}, status=401)
            
            token = auth_parts[1]
            user = verify_refresh_token(refresh_token)
            if not user:
                return JsonResponse({'status': 'error', 'message': 'Invalid or expired token'}, status=401)

            request.user = user
            return self.get_response(request)
            
        except IndexError:
            return JsonResponse({'status': 'error', 'message': 'Invalid token format'}, status=401)