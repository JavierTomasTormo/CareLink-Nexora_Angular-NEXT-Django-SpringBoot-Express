from vitalnest.roles.userrole.models import UserRole
from vitalnest.roles.role.models import Role
import os
from datetime import datetime, timedelta
import jwt
from django.conf import settings

def generate_access_token(user):
    user_role = UserRole.objects.get(id_user=user)
    role = Role.objects.get(id=user_role.id_role_id)

    # print("DEBUG - User Role:", user_role)
    # print("DEBUG - Role:", role)

    payload = {
        'id_user': user.id,
        'email': user.email,
        'role': role.role,
        'exp': datetime.utcnow() + timedelta(hours=2),
        'iat': datetime.utcnow()
    }
    
    token = jwt.encode(
        payload,
        settings.SECRET_KEY_JWT,
        algorithm='HS256'
    )
    return {
        'token': token,
        'role': role.role
    }