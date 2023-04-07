import json
import logging
import requests

from superset import app
from superset.models.reports import ReportRecipientType
from superset.reports.notifications.base import BaseNotification
from superset.reports.notifications.exceptions import NotificationError
from superset.utils.decorators import statsd_gauge

logger = logging.getLogger(__name__)


class VkteamNotification(BaseNotification):  # pylint: disable=too-few-public-methods
    type = ReportRecipientType.VKTEAM

    def _get_token(self) -> str:
        return app.config['VKTEAM_API_TOKEN']

    def _get_url(self) -> str:
        return app.config['VKTEAM_URL']

    def _get_to(self) -> str:
        return json.loads(self._recipient.recipient_config_json)["target"]


    @statsd_gauge("reports.vkteam.send")
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
            requests.post(f'{url}messages/sendFile', params={
                'token': token,
                'chatId': to,
                'caption': text
            }, files={"file": self._content.screenshots[0]})

            logger.info('Report sent to vkteam')
        except Exception as ex:
            raise NotificationError(ex) from ex
