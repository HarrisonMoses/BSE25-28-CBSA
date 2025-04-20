from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Notification(models.Model):
    class NotificationType(models.TextChoices):
        SYSTEM = 'system', _('System Notification')
        FARM_ALERT = 'farm_alert', _('Farm Alert')
        CROP_UPDATE = 'crop_update', _('Crop Update')
        WEATHER = 'weather', _('Weather Alert')
        MAINTENANCE = 'maintenance', _('Maintenance Reminder')
        MARKET = 'market', _('Market Update')
        OTHER = 'other', _('Other')

    class PriorityLevel(models.TextChoices):
        LOW = 'low', _('Low')
        MEDIUM = 'medium', _('Medium')
        HIGH = 'high', _('High')
        CRITICAL = 'critical', _('Critical')

    # Recipient of the notification
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notifications'
    )

    # Notification content
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(
        max_length=50,
        choices=NotificationType.choices,
        default=NotificationType.SYSTEM
    )
    priority = models.CharField(
        max_length=20,
        choices=PriorityLevel.choices,
        default=PriorityLevel.MEDIUM
    )

    # Related objects (optional - for deep linking)
    farm = models.ForeignKey(
        'Farm',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='notifications'
    )

    # Status tracking
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    # Metadata
    action_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} - {self.user.email}"

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'is_read']),
            models.Index(fields=['created_at']),
        ]