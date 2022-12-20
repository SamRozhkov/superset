import json
import logging

from superset import app
from superset.models.reports import ReportRecipientType
from superset.reports.notifications.base import BaseNotification
from superset.reports.notifications.exceptions import NotificationError
from superset.utils.decorators import statsd_gauge
import requests

logger = logging.getLogger(__name__)

class VkteamNotifocation(BaseNotification):

    type = ReportRecipientType.VKTEAM

    @staticmethod
    def _get_token() -> str:
        return app.config('VKTEAM_API_TOKEN')

    def _get_url(self) -> str:
        return app.config('VKTEAM_URL')

    def _get_to(self) -> str:
        return json.loads(self._recipient.recipient_config_json)["target"]

    @statsd_gauge("reports.vkteam.send")
    def send(self) -> None:
        token = self._get_token()
        url = self._get_url()
        to = self._get_to()

        if self._content.screenshots:
            text = self._content.text.replace('_', '\_')
        try:
            requests.post(f'{url}messages/sendText', params={
                'token': token,
                'chatId': to,
                'caption': text,
                'file': self._content.screenshots[0].decode('utf-8')
            })
        except Exception as ex:
            raise NotificationError(ex) from ex

        logger.info('Team')
