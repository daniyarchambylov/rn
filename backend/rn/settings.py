# -*- coding: utf-8 -*-
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(BASE_DIR, 'rn')


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/



config = {
    'debug.debug': 'true' == os.environ.get('DJ_DEBUG', False),
    'general.static_root': os.environ.get('DJ_STATIC_ROOT', os.path.join(BASE_DIR, 'static/')),
    'general.media_root': os.environ.get('DJ_MEDIA_ROOT', os.path.join(BASE_DIR, 'media/')),

    'logging.log_file': os.environ.get('DJ_LOG_FILE', os.path.join(BASE_DIR, 'logs/rn.log')),
    'logging.log_level': os.environ.get('DJ_LOG_LEVEL', 'debug'),

    'security.allowed_hosts': os.environ.get('DJ_ALLOWED_HOSTS', ''),
    'security.secret_key': os.environ.get('SECRET_KEY', 'SECRET_KEY'),

    'database.name': os.environ.get('POSTGRES_DB', 'rn_db'),
    'database.user': os.environ.get('POSTGRES_USER', 'rn'),
    'database.password': os.environ.get('POSTGRES_PASSWORD', ''),
    'database.host': os.environ.get('POSTGRES_HOST', ''),
    'database.port': os.environ.get('POSTGRES_PORT', 5432),

    'language.language_code': os.environ.get('DJ_LANGUAGE_CODE', 'ru'),
}


SECRET_KEY = config['security.secret_key']

DEBUG = config['debug.debug']

ALLOWED_HOSTS = config['security.allowed_hosts'].split()


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rn.accounts',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'rn.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'rn.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config['database.name'],
        'USER': config['database.user'],
        'PASSWORD': config['database.password'],
        'HOST': config['database.host'],
        'PORT': config['database.port'],
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
if DEBUG:
    AUTH_PASSWORD_VALIDATORS = []


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = config['language.language_code']

LANGUAGES = (
    ('en', 'English'),
    ('ru', 'Russian'),
)

LOCALE_PATHS = (
    os.path.join(SRC_DIR, 'locale'),
)

TIME_ZONE = 'Asia/Bishkek'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = config['general.static_root']
STATICFILES_DIRS = [
    os.path.join(SRC_DIR, 'static')
]
