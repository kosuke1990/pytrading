import websocket
import json
import configparser
import logging.config

import settings

# logging
formatter= '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
logging.basicConfig(level=logging.INFO, format=formatter)

logger = logging.getLogger(__name__)
data_logger = logging.getLogger('data_log')

h = logging.FileHandler('data.log')
f = logging.Formatter('%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
h.setFormatter(f)
data_logger.addHandler(h)


class RealtimeAPI(object):

    def __init__(self):
        logger.info('==== bitflyer start ====')
        config = configparser.ConfigParser()
        config.read('settings.ini')
        # const
        JSONRPC_ID_AUTH = 1
        api_key = config['bitflyer']['api_key']
        api_secret = config['bitflyer']['api_secret']
        # publicChannels = ["lightning_board_snapshot_BTC_JPY"]
        publicChannels = "lightning_ticker_" + config['bitflyer']['product_code']
        privateChannels = ["child_order_events"]

        print(publicChannels)

    def get_real_time_ticker(self):
        pass