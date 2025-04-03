from django.core.mail import send_mail,BadHeaderError
from templated_mail.mail import BaseEmailMessage
from django.conf import settings

def send_custom_email(message, recipient_list , from_email=None):
    try:
        if from_email is None:
            from_email = settings.DEFAULT_FROM_EMAIL
        msg = BaseEmailMessage(
            template_name='../templates/emails/farm.html',
            context={"message": message},
            from_email=from_email
            )
        msg.send(to=recipient_list)
    except BadHeaderError:
        return "Invalid header found."
    

