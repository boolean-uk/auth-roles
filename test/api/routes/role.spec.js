const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createUser } = require("../../../src/controllers/user.js")

describe("Roles endpoint", () => {
    describe("POST/ roles", () => {
        it("creates a new role", async () => {
            const role = {
                name: "CHIEF POTATO"
            }
            const result = await supertest(app).post("/roles").send(role)
            expect(result.status).toEqual(201)
            expect(result.body.role.id).not.toBeUndefined()
        })
    })
})