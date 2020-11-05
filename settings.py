import configparser

conf = configparser.ConfigParser()
conf.read('settings.ini')

api_key = conf['bitflyer']['api_key']
api_secret = conf['bitflyer']['api_secret']

print(api_key,api_secret)
