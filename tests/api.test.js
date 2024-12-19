const { connectDB, cleanDB } = require('../config/db');
const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
require('dotenv').config();

let user = {
    email: "teste@gmail.com",
    password: "pass#123"
}

const validateUser = async () => {
    const res = await request(app)
        .get(`/api/users/${user.email}`)
        .set('Authorization', `Nearer ${user.acess_token}`);

    expect(res.body._id).toBeDefined()
    expect(res.body.email).toBe(user.email)
    expect(res.body.password).toBeDefined()
    expect(res.statusCode).toBe(200);
}

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
        const body = { email, password } = user

        const res = await request(app).post("/api/users").send(body);
        expect(res.statusCode).toBe(201);
    });
});

describe("GET /api/auth", () => {
    it("should return a token", async () => {
        const body = { email, password } = user

        const res = await request(app).post("/api/auth").send(body);
        expect(res.body.acess_token).toBeDefined()
        expect(res.body.refresh_token).toBeDefined()
        expect(res.statusCode).toBe(200);
        user.acess_token = res.body.acess_token
        user.refresh_token = res.body.refresh_token
    });
});

describe("GET /api/users/:email", () => {
    it("should return the user that was just created", validateUser);
});

describe("PUT /api/users/:email", () => {
    it("should update a user", async () => {
        const body = {
            email: "email.new@gmail.com",
            password: "new_new_password"
        }

        const res = await request(app)
            .put(`/api/users/${user.email}`)
            .send(body)
            .set('Authorization', `Nearer ${user.acess_token}`);

        expect(res.statusCode).toBe(200);
        user.email = body.email
        user.password = body.password
    });
});

describe("GET /api/users/:email", () => {
    it("should return the updated user", validateUser);
});

describe("DELETE /api/auth/:email", () => {
    it("should delete the user", async () => {
        console.log(user)

        const res = await request(app)
            .delete(`/api/users/${user.email}`)
            .set('Authorization', `Nearer ${user.acess_token}`);

        console.log(res.body)

        expect(res.statusCode).toBe(200);
    });
});