from django.http import JsonResponse

def register_tutor(request):
    return JsonResponse({'status': 'up'})