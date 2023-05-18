import db from '../Config/DatabaseConfig.js';
import isValidUrl from '../Helpers/ValidUrl.js';
import fs from 'fs';

export const getRunProducts = (req, res) => {
    db.query('SELECT * FROM run_data', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                status: 500,
                error: err
            });
        }
        return res.status(200).json({
            status: 200,
            data: results
        });
    });

}

export const getTotalProducts = (req, res) => {
    db.query('SELECT * FROM total_data', (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                error: err
            });
        }
        return res.status(200).json({
            status: 200,
            data: results
        });
    });
}

export const addProduct = (req, res) => {
    let url = req.body.url;
    if (!isValidUrl(url)) {
        return res.status(400).json({
            status: 400,
            error: "Invalid URL"
        });
    }

    let data = JSON.parse(fs.readFileSync("../python/to-track.json", "utf8"));
    data.urls.push(url);
    fs.writeFileSync("../python/to-track.json", JSON.stringify(data));
    return res.status(200).json({
        status: 200,
        data: "Product added"
    });
}

export const resetData = async (req, res) => {
    fs.writeFile("../python/reset.txt", "Hello", (err) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                error: err
            });
        }
        return res.status(200).json({
            status: 200,
            data: "Data reset successfully"
        });
    });
}