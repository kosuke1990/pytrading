import sys
import logging.config
import pprint

import settings
from bitflyer import bitflyer


# logging
formatter= '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
logging.basicConfig(level=logging.INFO, format=formatter)
logger = logging.getLogger(__name__)

if __name__  == "__main__":
    
    logger.info('==== pytrading start ====')
    bf = bitflyer.RealtimeAPI() # bitflyer.RealtimeAPI()とbitflyer.RealtimeAPIの違いは何?


    # /Users/iwamotokosuke/.pyenv/versions/3.8.5/lib/python3.8/site-packages
