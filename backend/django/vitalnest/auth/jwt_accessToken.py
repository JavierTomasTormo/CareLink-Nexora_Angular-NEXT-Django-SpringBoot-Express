from vitalnest.roles.userrole.models import UserRole
from vitalnest.roles.role.models import Role
import os
from datetime import datetime, timedelta
import jwt
from django.conf import settings

def generate_access_token(user):
    user_role = UserRole.objects.get(id_user=user)
    role = Role.objects.get(id=user_role.id_role_id)

    clean_email = user.email.strip()  # Eliminar espacios antes y después del email

    # Construir el payload
    payload = {
        'id_user': user.id,
        'email': clean_email,  # Usar el email limpio
        'role': role.role,
        'exp': datetime.utcnow() + timedelta(hours=2),
        'iat': datetime.utcnow()
    }
    
    try:
        # Codificar el JWT
        token = jwt.encode(
            payload,
            settings.SECRET_KEY_JWT,
            algorithm='HS256'
        ).strip()

        # Asegúrate de que no haya saltos de línea o espacios extra en el token
        token = token.replace("\n", "").replace("\r", "").strip()

        return {
            'token': token,
            'role': role.role
        }
    except Exception as e:
        print(f"Error al generar el token JWT: {e}")
        raise
