const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');

router.post('/OrderData', async (req, res) => {
    let data = req.body.order_data;

    // Add order date at beginning of data array
    await data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        // Check if an order with the given email already exists
        let eId = await Order.findOne({ email: req.body.email });
        console.log(eId);

        if (eId === null) {
            // If not found, create a new order
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } else {
            // If found, update by pushing new data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true });
            });
        }

    } catch (error) {
        console.log(error.message);
        res.send("Server Error", error.message);
    }
});

module.exports = router;
