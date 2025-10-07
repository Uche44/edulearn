"""
ASGI config for learnthru project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# settings_module = 'learnthru.deployment_settings' if 'RENDER_EXTERNAL_HOSTNAME' in os.environ else 'learnthru.settings'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'learnthru.settings')

application = get_asgi_application()
