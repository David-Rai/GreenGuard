import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import db from '../model/db_local.js'

const Secret_Key = process.env.SECRET;

//Signup
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    //checking if email exist or not
    const [rows] = await db.execute("select * from users where email=?", [email]);
    if (rows.length > 0) {
        const error = new Error("user existed");
        error.status = 500;
        return next(error);
    }

    //encrypting the password
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            const error = new Error("inserting failed");
            error.status = 500;
            return next(error);
        }

        //inserting into the database
        const new_username = `${username}-${nanoid()}`
        const query = "insert into users (username,email,password) values (?,?,?)";
        const [results] = await db.execute(query, [new_username, email, hash]);

        //creating the jwt token 
        const payload = {
            user_id: rows[0].id,
            email,
            username: new_username
        };

        const token = jwt.sign(payload, Secret_Key);
        res.cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            // path: "/",
            // sameSite: "lax",
            // httpOnly: true,
        });

        //Returning the response object
        res.json({
            status: 201,
            message: "successfully registered",
            results,
            token
        });
    });
}


//Signin
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    //Getting the actually data 
    const query = "select * from users where email=?";
    const [rows] = await db.execute(query, [email]);

    // creating the jwt if valid
    bcrypt.compare(password, rows[0].password, (err, result) => {
        if (err || !result) {
            const error = new Error("password is incorrect");
            error.status = 401;
            return next(error);
        }

        if (result) {
            const payload = {
                email,
                user_id: rows[0].id,
                username: rows[0].username
            };
            const token = jwt.sign(payload, Secret_Key);

            res.cookie("token", token, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                // path: "/",
                // sameSite: "lax",
                // httpOnly: true,
            });

            //Response
            res.json({
                token,
                success: true,
                message: "login successfully",
            });
        }
    });
}