from flask_appbuilder.security.manager import AUTH_LDAP, AUTH_DB
from celery.schedules import crontab
from cachelib.redis import RedisCache
from dateutil import tz

SMTP_HOST = "smtp.yanao.ru"
SMTP_STARTTLS = False
SMTP_SSL = True
SMTP_PORT = 465
SMTP_USER = "bigdata@yanao.ru"
SMTP_PASSWORD = "!Rfj_dwgY`THPQrf2u5u"
SMTP_MAIL_FROM = "bigdata@yanao.ru"

SLACK_API_TOKEN = ''

ALERT_REPORTS_NOTIFICATION_DRY_RUN = False #Change to False for activate
EMAIL_REPORTS_SUBJECT_PREFIX = 'Отчет'

VKTEAM_API_TOKEN = '001.0728848750.2833988086:1000000015'
VKTEAM_URL = 'https://api.vkteams.yanao.ru/bot/v1/'

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

WEBDRIVER_BASEURL='http://localhost:8088/' #env('DASHBOARDS_BASE_URL')

SCREENSHOT_LOCATE_WAIT = 1000
SCREENSHOT_LOAD_WAIT = 6000

WEBDRIVER_BASEURL = "http://superset:8088/"
WEBDRIVER_BASEURL_USER_FRIENDLY = "http://localhost:8088/"
THUMBNAIL_SELENIUM_USER = "admin"

BABEL_DEFAULT_LOCALE = "ru"

LANGUAGES = {
    "ru": {"flag": "ru", "name": "Russian"},
    #"en": {"flag": "us", "name": "English"},
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
    "UX_BETA": False,
    "TAGGING_SYSTEM": True,
    #"GLOBAL_ASYNC_QUERIES": True,
    "DASHBOARD_NATIVE_FILTERS_SET": True,
    "DASHBOARD_FILTERS_EXPERIMENTAL": True,
    "RLS_IN_SQLLAB": True,
    "DRILL_TO_DETAIL": True,
    "ALLOW_ADHOC_SUBQUERY": True,
    "HORIZONTAL_FILTER_BAR": True,
    "RLS_FORM_QUERY_REL_FIELDS": True
}
SECRET_KEY = 'wtreAEzlsuEVZu/S2B3I8XnTyx4CqJkoxw4tyrK+HRk1JrE1bBWAuVeU'

MAPBOX_API_KEY = "pk.eyJ1IjoiaXRhcHBhcmF0IiwiYSI6ImNsMXVhOXJwMTA4YnczY21tczdmNG41c28ifQ.rNjd1zZfhPo0vpcon8kc9w"

APP_ICON = "/static/assets/images/superset-logo-horiz-beta.png"

DRUID_TZ = tz.gettz('Asia/Yekaterinburg')

AUTH_TYPE = AUTH_LDAP
#AUTH_TYPE = AUTH_DB

AUTH_LDAP_SERVER = "ldap://YG.LOC"
AUTH_USER_REGISTRATION = True
AUTH_USER_REGISTRATION_ROLE = "Public"
AUTH_LDAP_BIND_USER = "CN=superset,OU=Сервис аккаунты,OU=Аппарат Губернатора ЯНАО,OU=ИОГВ,DC=yg,DC=loc"
AUTH_LDAP_SEARCH = "OU=Аппарат Губернатора ЯНАО,OU=ИОГВ,DC=yg,DC=loc"
#AUTH_LDAP_UID_FIELD = "sAMAccountName"
AUTH_LDAP_UID_FIELD = "mail"
AUTH_LDAP_FIRSTNAME_FIELD = "givenName"
AUTH_LDAP_LASTNAME_FIELD = "sn"
AUTH_LDAP_EMAIL_FIELD = "mail"
AUTH_LDAP_BIND_PASSWORD = "10Sk2c9dw69"

#AUTH_LDAP_USERNAME_FORMAT = ""
#AUTH_LDAP_SEARCH_FILTER = ""
AUTH_ROLE_ADMIN = 'Admin'
AUTH_ROLE_PUBLIC = 'Public'
#AUTH_USER_REGISTRATION_ROLE = "Public_LDAP"

AUTH_ROLES_MAPPING = {
    "CN=Пользователи,OU=Groups,OU=Аппарат Губернатора ЯНАО,OU=ИОГВ,DC=yg,DC=loc": ["User"],
    "CN=supersetadmin,OU=Groups,OU=Аппарат Губернатора ЯНАО,OU=ИОГВ,DC=yg,DC=loc": ["Admin"],
}
AUTH_LDAP_GROUP_FIELD = "memberOf"
#AUTH_ROLES_SYNC_AT_LOGIN = True
PERMANENT_SESSION_LIFETIME = 1800

CACHE_CONFIG = {
    'CACHE_TYPE': 'RedisCache',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'CACHE_KEY_PREFIX': 'superset_cache',
    'CACHE_REDIS_HOST': 'superset_cache',
    'CACHE_REDIS_PORT': 6379,
    'CACHE_REDIS_DB': 0,
    'CACHE_REDIS_URL': 'redis://superset_cache:6379/0',
}

DATA_CACHE_CONFIG = {
    **CACHE_CONFIG,
    "CACHE_KEY_PREFIX": "superset_data_cache",  # make sure this string is unique to avoid collisions
    "CACHE_DEFAULT_TIMEOUT": 300, #86400,  # 60 seconds * 60 minutes * 24 hours
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

RESULTS_BACKEND: RedisCache(host="superset_cache", port=6379, key_prefix="superset_results")
'''
RESULTS_BACKEND = {
    **CACHE_CONFIG,
    "CACHE_KEY_PREFIX": "superset_backend_cache",
    "CACHE_DEFAULT_TIMEOUT": 86400,
}
'''

THUMBNAIL_CACHE_CONFIG = {
   **CACHE_CONFIG,
   'CACHE_DEFAULT_TIMEOUT': 24*60*60,
   'CACHE_KEY_PREFIX': 'thumbnail_',
   'CACHE_NO_NULL_WARNING': True,
}

class CeleryConfig(object):
    broker_url = CACHE_CONFIG['CACHE_REDIS_URL'] #'redis://localhost:6379/0'
    imports = (
        'superset.sql_lab',
        'superset.tasks',
        'superset.tasks.thumbnails'
    )
    result_backend = CACHE_CONFIG['CACHE_REDIS_URL']#'redis://localhost:6379/0'
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
        #'email_reports.schedule_hourly': {
        #    'task': 'email_reports.schedule_hourly',
        #    'schedule': crontab(minute='1', hour='*'),
        #},
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



EXTRA_CATEGORICAL_COLOR_SCHEMES = [
{
     "id": 'Yamal AUTODOR',
     "description": '',
     "label": 'Autodor Colors',
     "isDefault": False,
     "colors": ['#1C1D1C', '#F26635', '#4D4E4D', '#EF8050', '#777777', '#F4A27C', '#A4A4A4', '#F8BEA4']
     #"colors":['#1C1D1C', '#4D4E4D', '#777777', '#A4A4A4', '#F26635', '#EF8050', '#F4A27C', '#F8BEA4']
 }]

