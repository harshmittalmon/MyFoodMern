const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const jwtSecret = "MyNameIsHarsh";

router.post("/createuser", body('password', 'incorrect password').isLength({ min: 3 }), body('email').isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const bod = req.body;   
        const salt =  await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(bod.password,salt);
        await User.create({
            name: bod.name,
            password: secPassword,
            email: bod.email,
            location: bod.location
        })
        res.json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false });

    }
})


router.post("/loginuser", body('password', 'incorrect password').isLength({ min: 3 }), body('email').isEmail(), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let Data = req.body.email;
    try {


        const userData = await User.findOne({
            email: Data
        })
        if (!userData) {
            return res.status(400).json({ errors: "Enter Correct Credentials" });
        }

        // const pwdCmpare = await bcrypt.compare(req.body.password , userData.password)
        // if( !pwdCmpare){
        //     return res.status(400).json({errors: "Try logging in with correct password" }); 
        // }

        const data = {
            user : {
                id : userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)

        return res.json({ sucess: true, authToken: authToken })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false });

    }
})



// router.get('/createuser', async (req,res) => {
//     return res.send("Hello ji backend to available hai :) ");
// })

module.exports = router;