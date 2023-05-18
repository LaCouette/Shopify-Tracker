import mysql.connector
import time
import product
from datetime import datetime


def connect_db():
    return mysql.connector.connect(
        host="localhost",
        user="rayan",
        passwd="rayan",
        database="shopify_tracker"
    )


db = connect_db()


def insert_products(products):
    cursor = db.cursor()
    query = """
        INSERT IGNORE INTO run_data 
        (url, name, unit_price, total_sales, started_tracking) 
        VALUES (%s, %s, %s, %s, %s);
    """
    values = []
    for product in products:
        values.append((product.url, product.name, product.price,
                      product.total_sales, product.started_tracking))
    cursor.executemany(query, values)
    db.commit()


def update_product(product):
    cursor = db.cursor()
    query = """
        UPDATE run_data 
        SET
        total_sales = %s
        WHERE url = %s;
    """
    values = (product.total_sales, product.url)
    cursor.execute(query, values)
    db.commit()


def export_data():
    cursor = db.cursor()
    fQuery = """
        INSERT INTO total_data 
        (url, name, unit_price, total_sales, started_tracking) 
        SELECT 
        url, name, unit_price, total_sales, started_tracking
        FROM run_data
        ON DUPLICATE KEY UPDATE
        total_data.total_sales = total_data.total_sales + run_data.total_sales;
    """
    sQuery = "TRUNCATE TABLE run_data;"
    cursor.execute(fQuery)
    cursor.execute(sQuery)
    db.commit()
    print("Data Reset")
