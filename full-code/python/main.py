import enum
import os
import sys

from product import Product
from logger import log_msg
import json
import requests
import time
import datetime
from dateutil import parser

from logger import clear_log
from database import export_data
from database import insert_products


products: list[Product] = []
cur_urls: list[str] = []


def check_for_reset():
    if os.path.isfile("./reset.txt"):
        reset_data()
        os.remove("./reset.txt")
        log_msg(
            f"Reset data at {datetime.datetime.now().strftime('%d/%m - %H:%M:%S')}")


def reset_data():
    global products, cur_urls
    # Export data to SQL database
    export_data()
    # Clear data
    products = []
    cur_urls = []
    # Clear logs
    clear_log()


def remove_url(url):
    with open('to-track.json') as f:
        to_track = json.load(f)
        urls = to_track['urls']
        urls.remove(url)
        to_track['urls'] = urls
        with open('to-track.json', 'w') as f:
            json.dump(to_track, f)
        # SHOULD REMOVE FROM products and cur_urls TOO else BUG
        log_msg(
            f"{datetime.datetime.now().strftime('%H:%M:%S')} - Removed {url} from to-track.json\n\n")


# Add a try/except block to catch any exceptions
def init_request(url):
    try:
        final_url = url + "/products.json?page=1&limit=250"
        req = requests.get(final_url, timeout=5)
        if req.status_code == 200:
            # Get product info
            res = req.json()
            updated = parser.parse(res['product']['updated_at'])
            title = res['product']['title']
            price = float(res['product']['variants'][0]['price'])
            return Product(title, price, url, updated)
        else:
            #log_msg(f"{datetime.datetime.now().strftime('%H:%M:%S')} - Error, status code {req.status_code} for {url} - init_request")
            # remove_url(url)
            return None
    except Exception as e:
        #log_msg(f"{datetime.datetime.now().strftime('%H:%M:%S')} - Connection refused by the server for {url} - init_request")
        # remove_url(url)
        log_msg(f"{datetime.datetime.now().strftime('%H:%M:%S')} - Error: {e}")
        return None


def fetch_request(url):
    try:
        final_url = url + "/products.json?page=1&limit=250"
        req = requests.get(final_url, timeout=5)
        if req.status_code == 200:
            res = req.json()
            updated = parser.parse(res['product']['updated_at'])
            return updated
        else:
            #log_msg(f"{datetime.datetime.now().strftime('%H:%M:%S')} - Error, status code {req.status_code} for {url} - fetch_request")
            # remove_url(url)
            return None
    except Exception as e:
        #log_msg(f"{datetime.datetime.now().strftime('%H:%M:%S')} - Connection refused by the server for {url} - fetch_request")
        # remove_url(url)
        log_msg(f"{datetime.datetime.now().strftime('%H:%M:%S')} - Error: {e}")
        return None


# Main loop : fetch products last updated at each url and add them to products if they are new

def fetch_products():
    for product in products:
        updated = fetch_request(product.url)
        if updated is not None:
            if updated != product.last_updated:
                product.add_sale()
                product.last_updated = updated


def check_new_products():
    new_products = []
    with open('to-track.json') as f:
        to_track = json.load(f)
        urls = to_track['urls']
        for url in urls:
            if url not in cur_urls:
                product = init_request(url)
                if product is not None:
                    log_msg(f"New product found at {url}")
                    products.append(product)
                    new_products.append(product)
                    cur_urls.append(url)
    insert_products(new_products)


def main():
    log_msg(f"Begin log. Starting at {datetime.datetime.now()}")
    check_new_products()
    k = 0
    while True:
        #log_msg(f"Starting iteration {k} at {datetime.datetime.now().strftime('%H:%M:%S')}")
        check_for_reset()
        fetch_products()
        check_new_products()
        k += 1
        time.sleep(10)
    pass


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        log_msg('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
