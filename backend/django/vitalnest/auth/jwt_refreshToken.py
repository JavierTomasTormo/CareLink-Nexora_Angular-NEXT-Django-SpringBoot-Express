from datetime import datetime, timedelta
import jwt
from django.conf import settings
from vitalnest.token.refreshtoken.models import RefreshToken
from vitalnest.usertype.user.models import User
from vitalnest.roles.userrole.models import UserRole
from vitalnest.roles.role.models import Role

def generate_refresh_token(user):
    
    user_role = UserRole.objects.get(id_user=user)
    role = Role.objects.get(id=user_role.id_role_id)

    payload = {
        'id_user': user.id,
        'email': user.email,
        'role': role.role,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow()
    }
    
    refresh_token = jwt.encode(
        payload,
        settings.SECRET_KEY_JWT_REFRESH_TOKEN,
        algorithm='HS256'
    )

    # print("DEBUG - Refresh Token:", refresh_token)

    expires_at = (datetime.utcnow() + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S')

    # print("DEBUG - When expires:", expires_at)

    try:
        # Verifica si ya existe un refresh token
        refresh_token_obj = RefreshToken.objects.filter(id_user=user).first()
        
        if refresh_token_obj:
            # Actualizar el token existente
            refresh_token_obj.refresh_token = refresh_token
            refresh_token_obj.expires_at = expires_at
            refresh_token_obj.save()
        else:
            RefreshToken.objects.create(
                id_user=user,
                email=user.email,
                refresh_token=refresh_token,
                expires_at=expires_at
            )
            
        return refresh_token
        
    except Exception as e:
        print(f"Error al guardar refresh token: {str(e)}")
        return None

