const {connectDB, cleanDB} = require('../config/db');
const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
require('dotenv').config();

connectDB();
cleanDB();

describe("GET /", () => {
    it("should return OK", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/users", () => {
    it("should create a user", async () => {
        const body = {
            email: "teste@gmail.com",
            password: "pass#123"
        }

        const res = await request(app).post("/api/users").send(body);
        console.log(res.body)
        expect(res.statusCode).toBe(201);
    });
});

describe("GET /api/users/:email", () => {
    it("should return a user", async () => {
        const res = await request(app).get("/api/users/teste@gmail.com");
        console.log(res.body)
        expect(res.statusCode).toBe(200);
    });
});