/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const crypto = require("crypto");
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

admin.initializeApp({
    credential: admin.credential.cert("./permission.json"),
});

const db = admin.firestore();

app.get("/hello-world", (req, res) => {
    return res.status(200).json({
        message: "Hello World",
    });
});

app.post("/api/hotel", async (req, res) => {
    try {
        const data = req.body;
        const idHotel = crypto.randomUUID();
        await db.collection("hotel").doc(`${idHotel}`).create({
            name: data.name,
            city: data.city,
            logo: data.logo,
            createdAt: Date(),
            active: true,
        });

        data.rooms.forEach( async room => {
            await db.collection("room").doc(`${crypto.randomUUID()}`).create({
                ...room,
                hotel: idHotel,
                createdAt: Date(),
                active: true
            });
        });

        return res.status(200).json({
            message: "Hotel creado exitosamente!",
        });
    } catch (error) {
        return res.statusCode(500).send(error)
    }
});

app.get("/api/hotel", async (req, res) => {
    try {
        const query = db.collection("hotel");
        const queryRooms = db.collection("room");

        const querySnapShot = await query.get();
        const querySnapShotRoom = await queryRooms.get();

        const rooms = querySnapShotRoom.docs.map( item => {
            return {
                ...item.data(),
                id: item.id
            }    
        });
        const response = querySnapShot.docs.map( item => {
            return {
                ...item.data(),
                id: item.id,
                rooms: rooms.filter(x => x.hotel === item.id)
            };
        });

        return res.status(200).json(response);

    } catch (error) {
        return res.statusCode(500).send(error)
    }
});

app.get("/api/typeRoom", async (req, res) => {
    try {
        const query = db.collection("typeRoom");

        const querySnapShot = await query.get();

        const response = querySnapShot.docs.map( item => {
            const data = item.data()
            return {
                id: item.id,
                name: data.Name,
                minGuest: data.MinGuest,
                maxGuest: data.MaxGuest,
            }
        });


        return res.status(200).json(response);

    } catch (error) {
        return res.statusCode(500).send(error)
    }
});

app.get("/api/cities", async (req, res) => {
    try {
        const query = db.collection("hotel");

        const querySnapShot = await query.get();

        const cities = querySnapShot.docs.map( item => {
            const data = item.data()
            return data.city;
        });
        const response = Array.from(new Set(cities));

        return res.status(200).json(response);

    } catch (error) {
        return res.statusCode(500).send(error)
    }
});

exports.app = functions.https.onRequest(app);