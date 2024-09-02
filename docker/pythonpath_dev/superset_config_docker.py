import os
from typing import Optional, Literal
from datetime import timedelta

#from superset.stats_logger import StatsdStatsLogger

from flask_appbuilder.security.manager import AUTH_LDAP, AUTH_DB, AUTH_OAUTH
from celery.schedules import crontab
from cachelib.redis import RedisCache
from dateutil import tz

from flask import Flask, redirect
from flask_appbuilder import expose, IndexView
from superset.superset_typing import FlaskResponse

SMTP_HOST = os.environ.get('SMTP_HOST')
SMTP_STARTTLS = os.environ.get('SMTP_STARTTLS')
SMTP_SSL = os.environ.get('SMTP_SSL')
SMTP_PORT = os.environ.get('SMTP_PORT')
SMTP_USER = os.environ.get('SMTP_USER')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')
SMTP_MAIL_FROM = os.environ.get('SMTP_MAIL_FROM')

SLACK_API_TOKEN = ''

ALERT_REPORTS_NOTIFICATION_DRY_RUN = False  # Change to False for activate
EMAIL_REPORTS_SUBJECT_PREFIX = 'Отчет'

VKTEAM_API_TOKEN = os.environ.get('VKTEAM_API_TOKEN')
VKTEAM_URL = 'https://api.vkteams.yanao.ru/bot/v1/'

TELEGRAM_API_TOKEN = os.environ.get('TELEGRAM_API_TOKEN')
TELEGRAM_URL = 'https://api.telegram.org/bot'

WEBDRIVER_TYPE = "chrome"
WEBDRIVER_OPTION_ARGS = [
    "--force-device-scale-factor=2.0",
    "--high-dpi-support=2.0",
    "--headless",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    # This is required because our process runs as root (in order to install pip packages)
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-extensions",
]

SCREENSHOT_LOCATE_WAIT = 1000
SCREENSHOT_LOAD_WAIT = 6000

WEBDRIVER_BASEURL = "http://superset:8088/"
WEBDRIVER_BASEURL_USER_FRIENDLY = "http://localhost:8088/"
THUMBNAIL_SELENIUM_USER = "admin"

BABEL_DEFAULT_LOCALE = "ru"

LANGUAGES = {
    "ru": {"flag": "ru", "name": "Russian"},
    # "en": {"flag": "us", "name": "English"},
}

D3_FORMAT = {
     "decimal": ",",           # - decimal place string (e.g., ".").
     "thousands": "\u00a0",         # - group separator string (e.g., ",").
     "grouping": [3],          # - array of group sizes (e.g., [3]), cycled as needed.
     "currency": ["", "\u00a0\u20bd"]     # - currency prefix/suffix strings (e.g., ["$", ""])
}

D3_FORMAT_PREFIXIES = {
  "k": 'тыс.',
  "M": 'млн',
  "G": 'млрд'
}


FEATURE_FLAGS = {
    "ALERT_REPORTS": True,
    "DASHBOARD_CROSS_FILTERS": True,
    "DASHBOARD_RBAC": True,
    "GENERIC_CHART_AXES": True,
    "THUMBNAILS": True,
    "THUMBNAILS_SQLA_LISTENERS": True,
    "LISTVIEWS_DEFAULT_CARD_VIEW": True,
    "ENABLE_TEMPLATE_PROCESSING": True,
    "ENABLE_TEMPLATE_REMOVE_FILTERS": True,
    "DASHBOARD_CACHE": True,
    "UX_BETA": True,
    "TAGGING_SYSTEM": True,
    #"GLOBAL_ASYNC_QUERIES": True,
    "DASHBOARD_NATIVE_FILTERS_SET": True,
    "DASHBOARD_FILTERS_EXPERIMENTAL": True,
    "RLS_IN_SQLLAB": True,
    "DRILL_TO_DETAIL": True,
    "ALLOW_ADHOC_SUBQUERY": True,
    "HORIZONTAL_FILTER_BAR": True,
    "RLS_FORM_QUERY_REL_FIELDS": True,
    "DASHBOARD_EDIT_CHART_IN_NEW_TAB": True,
    "DRILL_BY": True,
    "CACHE_QUERY_BY_USER": True,
    #"EMBEDDABLE_CHARTS": True,
}

HTML_SANITIZATION = False

#SECRET_KEY = 'wtreAEzlsuEVZu/S2B3I8XnTyx4CqJkoxw4tyrK+HRk1JrE1bBWAuVeU'

MAPBOX_API_KEY = "pk.eyJ1IjoiaXRhcHBhcmF0IiwiYSI6ImNsMXVhOXJwMTA4YnczY21tczdmNG41c28ifQ.rNjd1zZfhPo0vpcon8kc9w"

APP_ICON = "/static/assets/images/superset-logo-horiz-beta.png"

DRUID_TZ = tz.gettz('Asia/Yekaterinburg')

#AUTH_TYPE = AUTH_LDAP
#AUTH_TYPE = AUTH_DB
#AUTH_TYPE = AUTH_OAUTH

PUBLIC_ROLE_LIKE='public'

AUTH_LDAP_SERVER = "ldap://192.168.0.200"
AUTH_USER_REGISTRATION = True
AUTH_USER_REGISTRATION_ROLE = "Public"
RECAPTCHA_PUBLIC_KEY = os.environ.get('RECAPTCHA_PUBLIC_KEY')
#f"reCAPTCHA_{os.environ.get('RECAPTCHA_PUBLIC_KEY')}"

AUTH_LDAP_BIND_USER = "UID=superset,CN=users,CN=accounts,DC=home,DC=local"
AUTH_LDAP_SEARCH = "cn=users,cn=accounts,dc=home,dc=local"
    #"CN=users,CN=accounts,DC=home,DC=local"
#AUTH_LDAP_UID_FIELD = "sAMAccountName"
AUTH_LDAP_UID_FIELD = "uid"
AUTH_LDAP_FIRSTNAME_FIELD = "givenName"
AUTH_LDAP_LASTNAME_FIELD = "sn"
AUTH_LDAP_EMAIL_FIELD = "mail"
AUTH_LDAP_BIND_PASSWORD = "superset" #os.environ.get("AUTH_LDAP_BIND_PASSWORD")

# AUTH_LDAP_USERNAME_FORMAT = ""
# AUTH_LDAP_SEARCH_FILTER = ""
AUTH_ROLE_ADMIN = 'Admin'
AUTH_ROLE_PUBLIC = 'Public'
# AUTH_USER_REGISTRATION_ROLE = "Public_LDAP"

#AUTH_ROLES_MAPPING = {
#    "CN=Пользователи,OU=Groups,OU=Аппарат Губернатора ЯНАО,OU=ИОГВ,DC=yg,DC=loc": [
#        "User"],
#    "CN=supersetadmin,OU=Groups,OU=Аппарат Губернатора ЯНАО,OU=ИОГВ,DC=yg,DC=loc": [
#        "Admin"],
#}
AUTH_LDAP_GROUP_FIELD = "memberOf"
AUTH_ROLES_SYNC_AT_LOGIN = False
#PERMANENT_SESSION_LIFETIME = 1800

#-------------- OAUTH -----------------#

AUTH_USER_REGISTRATION_ROLE = "Gamma"
LOGOUT_REDIRECT_URL='http://192.168.0.201:8080/realms/superset/protocol/openid-connect/logout'
# OAuth provider configuration for Keycloak
OAUTH_PROVIDERS = [
  {
    'name': 'keycloak',
    'icon': 'fa-key',
    'token_key': 'access_token', # Keycloak uses 'access_token' for the access token
    'remote_app': {
      'client_id': 'superset-ui',
      'client_secret': 'GFCWqktlceYz5Cuza1Ct6Yg1iAQ6VO0T',
      'client_kwargs': {
        'scope': 'openid profile email',
      },
      'server_metadata_url': 'http://192.168.0.26:28080/realms/superset/.well-known/openid-configuration',
      'api_base_url': 'http://192.168.0.26:28080/realms/superset/protocol/',
      #'server_metadata_url': 'http://192.168.0.201:8080/realms/superset/.well-known/openid-configuration',
      #'api_base_url': 'http://192.168.0.201:8080/realms/superset/protocol/',
    },
  }
  ]


#--------------------------------------#

REDIS_HOST = 'redis'#'10.12.4.253'
REDIS_PORT = 6379

CACHE_CONFIG = {
    'CACHE_TYPE': 'RedisCache',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'CACHE_KEY_PREFIX': 'superset_cache',
    'CACHE_REDIS_HOST': REDIS_HOST,
    'CACHE_REDIS_PORT': REDIS_PORT,
    'CACHE_REDIS_DB': 0,
    'CACHE_REDIS_URL': f'redis://{REDIS_HOST}:{REDIS_PORT}/0',
}

DATA_CACHE_CONFIG = {
    **CACHE_CONFIG,
    "CACHE_KEY_PREFIX": "superset_data_cache",
    # make sure this string is unique to avoid collisions
    "CACHE_DEFAULT_TIMEOUT": 300,  # 86400,  # 60 seconds * 60 minutes * 24 hours
}

EXPLORE_STATE_CACHE_CONFIG = {
    **CACHE_CONFIG,
    "CACHE_KEY_PREFIX": "superset_data_explore_cache",
    "CACHE_DEFAULT_TIMEOUT": 300,
}

FILTER_STATE_CACHE_CONFIG = {
    **CACHE_CONFIG,
    "CACHE_KEY_PREFIX": "superset_data_filter_cache",
    "CACHE_DEFAULT_TIMEOUT": 300,
}

EXPLORE_FORM_DATA_CACHE_CONFIG = {
    **CACHE_CONFIG,
    "CACHE_KEY_PREFIX": "superset_data_explore_form_cache",
    "CACHE_DEFAULT_TIMEOUT": 300,
}

RESULTS_BACKEND: RedisCache(host=REDIS_HOST, port=REDIS_PORT,
                            key_prefix="superset_results", db=1)
'''
RESULTS_BACKEND = {
    **CACHE_CONFIG,
    "CACHE_KEY_PREFIX": "superset_backend_cache",
    "CACHE_DEFAULT_TIMEOUT": 86400,
}
'''

THUMBNAIL_CACHE_CONFIG = {
    **CACHE_CONFIG,
    'CACHE_DEFAULT_TIMEOUT': 24 * 60 * 60,
    'CACHE_KEY_PREFIX': 'thumbnail_',
    'CACHE_NO_NULL_WARNING': True,
}


class CeleryConfig(object):
    broker_url = CACHE_CONFIG['CACHE_REDIS_URL']  # 'redis://localhost:6379/0'
    imports = (
        'superset.sql_lab',
        'superset.tasks',
        'superset.tasks.thumbnails',
    )
    result_backend = CACHE_CONFIG['CACHE_REDIS_URL']  # 'redis://localhost:6379/0'
    worker_log_level = 'DEBUG'
    worker_prefetch_multiplier = 10
    task_acks_late = True
    task_annotations = {
        'sql_lab.get_sql_results': {
            'rate_limit': '100/s',
        },
        'email_reports.send': {
            'rate_limit': '1/s',
            'time_limit': 120,
            'soft_time_limit': 150,
            'ignore_result': True,
        }
    }
    beat_schedule = {
        # 'email_reports.schedule_hourly': {
        #    'task': 'email_reports.schedule_hourly',
        #    'schedule': crontab(minute='1', hour='*'),
        # },
        "reports.prune_log": {
            "task": "reports.prune_log",
            "schedule": crontab(minute=10, hour=0),
        },
        'reports.scheduler': {
            'task': 'reports.scheduler',
            'schedule': crontab(minute='*', hour='*'),
        },
        'cache-warmup-hourly': {
            'task': 'cache-warmup',
            'schedule': crontab(minute="*/20", hour='*'),
            'kwargs': {
                'strategy_name': 'top_n_dashboards',
                'top_n': 5,
                'since': '7 days ago',
            },
        }
    }


'''
CELERYBEAT_SCHEDULE = {
    'cache-warmup-hourly': {
        'task': 'cache-warmup',
        'schedule': crontab(minute=5, hour='*'),  # hourly
        'kwargs': {
            'strategy_name': 'top_n_dashboards',
            'top_n': 5,
            'since': '7 days ago',
        },
    },
}
'''
CELERY_CONFIG = CeleryConfig

TALISMAN_ENABLED = False
TALISMAN_CONFIG = {
    "force_https": False,
    "content_security_policy": {
        "default-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "img-src": ["'self'",
                    "data:",
                    "blob:",
                    "*"],
        "worker-src": ["'self'", "blob:"],
        "connect-src": ["'self'",
                        "https://api.mapbox.com",
                        "https://events.mapbox.com",
                        "https://zakupki.yanao.ru"],
        "object-src": "'none'",
    }
}

#
# Добавление цветовых схем в суперсет. Требует перезапуска контейнеров.
#
EXTRA_CATEGORICAL_COLOR_SCHEMES = [
    {
        "id": 'Yamal AUTODOR',
        "description": '',
        "label": 'Autodor Colors',
        "isDefault": False,
        "colors": ['#1C1D1C', '#F26635', '#4D4E4D', '#EF8050', '#777777', '#F4A27C',
                   '#A4A4A4', '#F8BEA4']
    },{
        "id": 'ATK Yamal',
        "description": '',
        "label": 'ATK Yamal Colors',
        "isDefault": False,
        "colors": ['#8DD7F7', '#C8C7C7', '#0065A3', '#0095CA', '#3A4859', '#E03838']
    }]


# Global async query config options.
# Requires GLOBAL_ASYNC_QUERIES feature flag to be enabled.

GLOBAL_ASYNC_QUERIES_REDIS_CONFIG = {
    "port": 6379,
    "host": "redis",
    "password": "",
    "db": 2,
    "ssl": False,
}

GLOBAL_ASYNC_QUERIES_REDIS_STREAM_PREFIX = "async-events-"
GLOBAL_ASYNC_QUERIES_REDIS_STREAM_LIMIT = 1000
GLOBAL_ASYNC_QUERIES_REDIS_STREAM_LIMIT_FIREHOSE = 1000000
GLOBAL_ASYNC_QUERIES_JWT_COOKIE_NAME = "async-token"
GLOBAL_ASYNC_QUERIES_JWT_COOKIE_SECURE = False
GLOBAL_ASYNC_QUERIES_JWT_COOKIE_SAMESITE: Optional[
    Literal["None", "Lax", "Strict"]
] = None
GLOBAL_ASYNC_QUERIES_JWT_COOKIE_DOMAIN = None
GLOBAL_ASYNC_QUERIES_JWT_SECRET = "sdcp471J60KDgN6p8dOqieTtqUDaBiwFnd59+JJYLK7vbaBMEo86kpOi"
GLOBAL_ASYNC_QUERIES_TRANSPORT = "polling"
    #"ws"
GLOBAL_ASYNC_QUERIES_POLLING_DELAY = int(
    timedelta(milliseconds=500).total_seconds() * 1000
)
GLOBAL_ASYNC_QUERIES_WEBSOCKET_URL = "ws://127.0.0.1:8080/"


class SupersetDashboardIndexView(IndexView):
    @expose("/")
    def index(self) -> FlaskResponse:
        return redirect("/dashboard/list/")
FAB_INDEX_VIEW = f"{SupersetDashboardIndexView.__module__}.{SupersetDashboardIndexView.__name__}"


#STATS_LOGGER = StatsdStatsLogger(host='10.12.3.150', port=8125, prefix='superset')
