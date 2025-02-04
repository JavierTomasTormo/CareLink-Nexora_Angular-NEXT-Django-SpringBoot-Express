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
        settings.SECRET_KEY,
        algorithm='HS256'
    )

    # print("DEBUG - Refresh Token:", refresh_token)

    expires_at = (datetime.utcnow() + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S')

    print("DEBUG - When expires:", expires_at)

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

def verify_refresh_token(token):
    try:
        stored_token = RefreshToken.objects.filter(refresh_token=token).first()
        if not stored_token:
            return None

        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        
        if datetime.fromtimestamp(payload['exp']) < datetime.utcnow():
            stored_token.delete()
            return None

        user = User.objects.get(id=payload['id_user'])
        return user

    except jwt.ExpiredSignatureError:
        RefreshToken.objects.filter(refresh_token=token).delete()
        return None
    except (jwt.InvalidTokenError, User.DoesNotExist) as e:
        print(f"Error al verificar refresh token: {str(e)}")
        return None