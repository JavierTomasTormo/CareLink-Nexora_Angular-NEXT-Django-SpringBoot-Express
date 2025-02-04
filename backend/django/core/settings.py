from pathlib import Path
import os
from datetime import timedelta
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-hu*@qlqlu5%_(rmru1e*&t6to4jks%+rxnpn4*grqq(c0an%o+'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps ##################
    'rest_framework',
    'corsheaders',
    'django_filters',

    # Activities ##################
    'vitalnest.activities.apps.ActivitiesConfig',

    # Timetables ##################
    'vitalnest.timetables.day.apps.DayConfig',
    'vitalnest.timetables.daysofweek.apps.DayOfWeekConfig',
    'vitalnest.timetables.hour.apps.HourConfig',
    'vitalnest.timetables.month.apps.MonthConfig',
    'vitalnest.timetables.year.apps.YearConfig',

    # Users ##################
    'vitalnest.usertype.user.apps.UserConfig',
    'vitalnest.usertype.userpatient.apps.UserPatientConfig',

    # Token ##################
    'vitalnest.token.blacklist.apps.BlackListConfig',
    'vitalnest.token.refreshtoken.apps.RefreshTokenConfig',

    # Roles ##################
    'vitalnest.roles.role.apps.RoleConfig',
    'vitalnest.roles.userrole.apps.UserRoleConfig',

    # Health ##################
    'vitalnest.health.medications.apps.MedicationsConfig',
    'vitalnest.health.prescription.apps.PrescriptionConfig',

    # Notifications ##################
    'vitalnest.notifications.prescriptions.apps.NotificationsPrescriptionsConfig',
    'vitalnest.notifications.activities.apps.NotificationsActivityConfig',
    'vitalnest.notifications.diets.apps.NotificationsDietsConfig',

    # Rooms ##################
    'vitalnest.rooms.room.apps.RoomConfig',
    'vitalnest.rooms.bedroom.apps.BedRoomConfig',

    # Food ##################
    'vitalnest.food.meals.apps.MealsConfig',
    'vitalnest.food.diets.apps.DietsConfig',

    # Images ##################
    'vitalnest.images.images.apps.ImagesConfig',
    'vitalnest.images.imagesactivities.apps.ImagesActivitiesConfig',
    'vitalnest.images.imagesrooms.apps.ImagesRoomsConfig',

    # Payments ##################
    'vitalnest.payments.payment.apps.PaymentConfig',
    'vitalnest.payments.inscription.apps.InscriptionConfig',
    'vitalnest.payments.cancelation.apps.CancelationConfig',

    # Auth ##################
    'vitalnest.auth.tutor.register.apps.RegisterConfig',
    'vitalnest.auth.tutor.login.apps.LoginConfig',

]

# JWT Settings
SECRET_KEY_JWT = os.getenv('DJANGO_SECRET_KEY')

JWT_AUTH = {
    'JWT_SECRET_KEY': SECRET_KEY_JWT,
    'JWT_ALGORITHM': 'HS256',
    'JWT_EXPIRATION_DELTA': timedelta(hours=2),
}

# Argon2 Settings
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher', 
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',    
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher', 
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher', 
    'django.contrib.auth.hashers.ScryptPasswordHasher',    
]
ARGON2_PARAMETERS = {
    'time_cost': 4,  
    'memory_cost': 102400,  
    'parallelism': 8, 
}


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:4200",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'vitalnest.middleware.VerifyTokenMiddleware',
]

ROOT_URLCONF = 'core.urls'

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

WSGI_APPLICATION = 'core.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'vitalnest',
        'USER': 'postgres',
        'PASSWORD': 'rootpassword',
        'HOST': 'postgres',
        'PORT': '5432',
    }
}

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

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
