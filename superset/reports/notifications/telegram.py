import json
import logging
import requests
import re
from typing import List

from superset import app
from superset.reports.models import ReportRecipientType
from superset.reports.notifications.base import BaseNotification
from superset.reports.notifications.exceptions import NotificationError
from superset.utils.decorators import statsd_gauge

logger = logging.getLogger(__name__)


class TelegramNotification(BaseNotification):  # pylint: disable=too-few-public-methods
    type = ReportRecipientType.TELEGRAM

    def _get_token(self) -> str:
        return app.config['TELEGRAM_API_TOKEN']

    def _get_url(self) -> str:
        return app.config['TELEGRAM_URL']

    def _get_to(self) -> str:
        return json.loads(self._recipient.recipient_config_json)["target"]


    @statsd_gauge("reports.telegram.send")
    def send(self) -> None:
        token = self._get_token()
        url = self._get_url()
        to = self._get_to()

        if self._content.screenshots:
            if self._content.text:
                text = self._content.text #.replace('_', '\_')
            else:
                text = self._content.name #.replace('_', '\_')
        try:
            users_string_list: List[str] = []
            if isinstance(to, str):
                users_string_list = re.split(r",|\s|;", to)

            for user in users_string_list:
                response = requests.post(f'{url}{token}/sendPhoto', params={
                    'chat_id': user,
                    'caption': text
                }, files={"photo": self._content.screenshots[0]})

                logger.info(response.text)

            logger.info('Report sent to Telegram')
        except Exception as ex:
            raise NotificationError(ex) from ex
