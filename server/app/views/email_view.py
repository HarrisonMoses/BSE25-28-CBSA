# views.py

from django.http import HttpResponse, JsonResponse
from ..services.email_service import send_custom_email
from ..services.crop_recommender import crop_recommender

def send_email_view(request):
    # try:
    #     send_custom_email(
    #         message="\nThis is a test email sent from your Django app.",
    #         recipient_list=["receiver@example.com"],
    #     )
    #     return JsonResponse({"message": "✅ Email sent successfully."})
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=500)
    crop_recommender.delay("message")
    return HttpResponse("Email view is working!")
