import os
from datetime import datetime, timedelta
import jwt
from django.conf import settings

def generate_access_token(user):
    payload = {
        'id_user': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + timedelta(hours=2),
        'iat': datetime.utcnow()
    }
    
    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm='HS256'
    )