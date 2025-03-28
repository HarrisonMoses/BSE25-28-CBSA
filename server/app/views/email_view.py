# views.py

from django.http import JsonResponse
from ..services.email_service import send_custom_email

def send_email_view(request):
    try:
        send_custom_email(
            message="\nThis is a test email sent from your Django app.",
            recipient_list=["receiver@example.com"],
        )
        return JsonResponse({"message": "✅ Email sent successfully."})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
