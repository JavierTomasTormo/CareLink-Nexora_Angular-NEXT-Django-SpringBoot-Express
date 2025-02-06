# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from vitalnest.token.blacklist.models import BlackList
# from vitalnest.token.refreshtoken.models import RefreshToken
# from vitalnest.usertype.user.models import User

# class LogoutView(APIView):
#     def post(self, request):
#         refresh_token = request.data.get('refresh_token')
#         email = request.data.get('email')
#         id_user = request.data.get('id_user')
        
#         try:
#             # Find token record based on provided identifier
#             if refresh_token:
#                 token_record = RefreshToken.objects.get(refresh_token=refresh_token)
#             elif email:
#                 token_record = RefreshToken.objects.get(email=email)
#             elif id_user:
#                 token_record = RefreshToken.objects.get(id_user=id_user)
#             else:
#                 return Response({'error': 'Please provide refresh_token, email or id_user'}, 
#                             status=status.HTTP_400_BAD_REQUEST)
            
#             # Create blacklist entry
#             BlackList.objects.create(
#                 id_user=token_record.id_user,
#                 email=token_record.email,
#                 token_expired=token_record.refresh_token
#             )
            
#             # Delete from RefreshToken
#             token_record.delete()
            
#             return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
            
#         except RefreshToken.DoesNotExist:
#             return Response({'error': 'No active session found'}, status=status.HTTP_400_BAD_REQUEST)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from vitalnest.token.blacklist.models import BlackList
from vitalnest.token.refreshtoken.models import RefreshToken
from vitalnest.usertype.user.models import User
from django.db.models import Q

class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        email = request.data.get('email')
        id_user = request.data.get('id_user')

        # Build dynamic query based on provided values
        query = Q()
        if refresh_token:
            query |= Q(refresh_token=refresh_token)
        if email:
            query |= Q(email=email)
        if id_user:
            query |= Q(id_user=id_user)

        if not query:
            return Response({'error': 'At least one identifier is required'}, 
                        status=status.HTTP_400_BAD_REQUEST)

        try:
            # Find token record with any of the provided identifiers
            token_record = RefreshToken.objects.filter(query).first()
            
            if not token_record:
                return Response({'error': 'No active session found'}, 
                            status=status.HTTP_404_NOT_FOUND)

            # Create blacklist entry
            BlackList.objects.create(
                id_user=token_record.id_user,
                email=token_record.email,
                token_expired=token_record.refresh_token
            )
            
            # Delete from RefreshToken
            token_record.delete()
            
            return Response({'message': 'Successfully logged out'}, 
                        status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, 
                        status=status.HTTP_400_BAD_REQUEST)
