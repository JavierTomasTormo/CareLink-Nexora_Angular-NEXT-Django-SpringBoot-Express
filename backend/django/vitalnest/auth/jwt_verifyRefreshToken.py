from datetime import datetime, timedelta
import jwt
from django.conf import settings
from vitalnest.token.refreshtoken.models import RefreshToken
from vitalnest.token.blacklist.models import BlackList
from vitalnest.usertype.user.models import User
from vitalnest.roles.userrole.models import UserRole
from vitalnest.roles.role.models import Role

def verify_refresh_token(token):
    try:
        if BlackList.objects.filter(token_expired=token).exists():
            print("Token encontrado en blacklist")
            return "El Token se ha encontrado en la Blacklist"

        stored_token = RefreshToken.objects.filter(refresh_token=token).first()
        if not stored_token:
            print("Token no encontrado en RefreshToken")
            return "El Token no se encuentra en RefreshToken"

        payload = jwt.decode(token, settings.SECRET_KEY_JWT_REFRESH_TOKEN, algorithms=['HS256'])

        if datetime.fromtimestamp(payload['exp']) < datetime.utcnow():
            stored_token.delete()
            
            user = User.objects.get(id=payload['id_user'])
            BlackList.objects.create(
                id_user=user,
                email=user.email,
                token_expired=token
            )
            print("Token expirado movido a blacklist")
            return "El Token ha expirado y ha sido movido a la Blacklist"

        user = User.objects.get(id=payload['id_user'])
        return user

    except jwt.ExpiredSignatureError:

        try:
            payload = jwt.decode(token, settings.SECRET_KEY_JWT_REFRESH_TOKEN, algorithms=['HS256'], options={"verify_exp": False})
            user = User.objects.get(id=payload['id_user'])
            BlackList.objects.create(
                id_user=user,
                email=user.email,
                token_expired=token
            )
        except:
            pass
            
        RefreshToken.objects.filter(refresh_token=token).delete()
        return None
        
    except (jwt.InvalidTokenError, User.DoesNotExist) as e:
        print(f"Error al verificar refresh token: {str(e)}")
        return None