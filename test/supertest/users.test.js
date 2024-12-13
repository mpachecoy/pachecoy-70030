import { expect } from "chai";
import supertest from "supertest";
import env from "../../src/utils/env.utils.js";

const requester = supertest(`http://localhost:${env.PORT}/api`);

describe(
    "Testeando las funcionalidades de User",
    () =>{
        const data = { first_name:"Martin", last_name: "Pache", email: "mp@coder.com", password: "hola1234"};
        let tid = "";
        let token;

        before(async () => {
            await requester.post("/sessions/register").send(data);
    
            const login = await requester.post("/sessions/login").send({ email: data.email, password: data.password });
            expect(login.statusCode).to.be.equals(200);
            token = login.body.token;
        });

        it(
            "Se crea correctamente un usuario",
        async () => {
            const response = await requester.post("/sessions/register").send({
                first_name: "Nuevo",
                last_name: "Usuario",
                email: "nuevo@coder.com",
                password: "test1234"
            });
            const { _body, statusCode } = response;
            tid = _body?.response?._id;
            expect(statusCode).to.be.equals(201);
        });
        it(
            "Se leen correctamente todos los usuarios",
            async ()=> {
                const response = await requester.get("/users").set("Authorization", `Bearer ${token}`);
                const {  statusCode } = response;
                expect(statusCode).to.be.equals(200);
            },
        );
        it(
            "La lectura de usuarios devuelve un array de datos",
            async ()=> {
                const response = await requester.get("/users").set("Authorization", `Bearer ${token}`);
                const { _body } = response;
                expect(_body.response).to.be.an('array');
            },
        );
        it(
            "La lectura de un usuario devuelve un objeto con los datos del usuario",
            async ()=> {
                const response = await requester.get("/users/" + tid).set("Authorization", `Bearer ${token}`);
                const { _body } = response;
                expect(_body.response).to.be.an('object');
            },
        );
        it(
            "Se actualiza correctamente un usuario",
            async ()=> {
                const obj = { password: "chau1234" };
                const response = await requester.put("/users/"+tid).send(obj).set("Authorization", `Bearer ${token}`);
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            },
        );
        it(
            "Se elimina correctamente un usuario",
            async ()=> {
                const response = await requester.delete("/users/"+tid).set("Authorization", `Bearer ${token}`);
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            },
        );
    }
)