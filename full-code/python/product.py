from datetime import datetime
import database


class Product:
    def __init__(self, name, price, url, last_updated):
        self.name = name
        self.price = price
        self.url = url
        self.sales = []
        self.total_sales = 0.0
        self.last_updated = last_updated
        self.started_tracking = datetime.now()
        #print(f"{name} costs {price}")

    def add_sale(self):
        time_now = datetime.now().strftime("%d/%m - %H:%M:%S")
        self.sales.append(time_now)
        self.total_sales += self.price
        database.update_product(self)
        print(f"{self.name} sold for {self.price} at {time_now}, total sales: {self.total_sales}", flush=True)

    def json_format(self):
        return {
            'name': self.name,
            'unit_price': self.price,
            'total_sales': self.total_sales,
            'started_tracking': self.started_tracking.strftime("%d/%m - %H:%M:%S"),
            'url': self.url,
        }

    def __str__(self):
        return f"{self.name} costs {self.price}. Sold {len(self.sales)} times. Total sales: {self.total_sales}"
