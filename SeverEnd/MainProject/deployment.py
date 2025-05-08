import os
from .settings import *
from .settings import BASE_DIR
from dotenv import load_dotenv
load_dotenv()

# original
# ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
# CSRF_TRUSTED_ORIGINS = ['https://'+os.environ['WEBSITE_HOSTNAME']]
# DEBUG = False
# # SECRET_KEY=os.environ['MY_SECRET_KEY']

# original end


# WEBSITE_HOSTNAME = os.getenv("WEBSITE_HOSTNAME")
# SECRET_KEY = os.getenv("MY_SECRET_KEY") 

WEBSITE_HOSTNAME = "crop-prediction-webapp-hyeeekfcahbuefb6.canadacentral-01.azurewebsites.net"
SECRET_KEY = "hQ4YQD9pEcuB7e+7/a8HKWqdfXhI2tW/RCJT4PRzMCM=" 

# Validate required variables
if not WEBSITE_HOSTNAME:
    raise ValueError("WEBSITE_HOSTNAME environment variable is missing! Check Azure App Settings.")
if not SECRET_KEY:
    raise ValueError("MY_SECRET_KEY environment variable is missing! Check Azure App Settings.")

ALLOWED_HOSTS = [WEBSITE_HOSTNAME]
CSRF_TRUSTED_ORIGINS = ['https://gray-bush-04eba340f.6.azurestaticapps.net/']
DEBUG = False

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

import os

# Example connection string (in production, use environment variables)
CONNECTION_STRING = "Database=postgres;dbname=crop-prediction-webapp-database;server=crop-prediction-webapp-server.postgres.database.azure.com;port=5432;sslmode=require;user_id=dpnfcivxew;password=LsjcOG2V30D$$MVr"

# Parse the connection string
connection_params = {}
for part in CONNECTION_STRING.split(';'):
    if '=' in part:
        key, value = part.split('=', 1)
        connection_params[key.lower()] = value

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": connection_params['database'],
        "HOST": connection_params['server'],
        "USER": connection_params['user id'],
        "PASSWORD": connection_params['password'],
        "OPTIONS": {
            'sslmode': 'require',  # Important for Azure
        },
    }
}




STATIC_ROOT = BASE_DIR/'staticfiles'