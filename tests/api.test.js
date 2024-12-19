const { connectDB, cleanDB } = require('../config/db');
const request = require("supertest");
const app = require("../server");
require('dotenv').config();

let user = {
    email: "teste@gmail.com",
    password: "pass#123"
}

const validateUser = async () => {
    const res = await request(app)
        .get(`/api/users/${user.email}`)
        .set('Authorization', `Bearer ${user.accessToken}`);
        
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined()
    expect(res.body.email).toBe(user.email)
    expect(res.body.password).toBeDefined()
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
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeDefined()
        user.accessToken = res.body.accessToken
    });
});

describe("GET /api/authentication/validate/:email", () => {
    it("should validate the token", async () => {
        const res = await request(app)
            .get(`/api/authentication/validate/${user.email}`)
            .set('Authorization', `Bearer ${user.accessToken}`);

        console.log(res.body)
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/authentication/validate/:email", () => {
    it("should be forbidden", async () => {
        const res = await request(app)
            .get(`/api/authentication/validate/${user.email}`)
            .set('Authorization', `Bearer ${process.env.JWT_SECRET}`);

        console.log(res.body)
        expect(res.statusCode).toBe(403);
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
            .set('Authorization', `Bearer ${user.accessToken}`);

        expect(res.statusCode).toBe(200);
        user.email = body.email
        user.password = body.password
    });
});

describe("GET /api/users/:email", () => {
    it("should return the updated user", validateUser);
});

describe("GET /api/auth", () => {
    it("should return email not found", async () => {
        const body = { email: "invalid.email@gmail.com", password: "anything" }

        const res = await request(app).post("/api/auth").send(body);
        expect(res.statusCode).toBe(404);
    });
});

describe("GET /api/auth", () => {
    it("should return invalid login", async () => {
        const body = { email: user.email, password: "anything" }

        const res = await request(app).post("/api/auth").send(body);
        expect(res.statusCode).toBe(401);
    });
});

describe("DELETE /api/auth/:email", () => {
    it("should delete the user", async () => {
        const res = await request(app)
            .delete(`/api/users/${user.email}`)
            .set('Authorization', `Bearer ${user.accessToken}`);

        expect(res.statusCode).toBe(200);
    });
});
