import {expect} from "chai";
import env from "../../src/utils/env.utils.js";
import {userModel} from "../../src/dao/models/userModel.js";
import dbConnect from "../../src/utils/db.utils.js";

describe(
    "Testeando el módulo de usuarios con CHAI",
    () => {
        const data = { first_name:"Martin", last_name: "Pache", email: "mp6@coder.com", password: "hola1234" }
        let tid = ""
        before( async () => await dbConnect(env.MONGO_URI) );
        afterEach(async () => {
            if (tid) {
                await userModel.findByIdAndDelete(tid);
            }
        });
        it(
            "La propiedad email es enviada por el usuario que quiere registrarse",
            ()=> expect(data).to.have.property("email")
        );
        it(
            "La propiedad email es de tipo string",
            ()=> expect(data.email).to.be.a("string")
        );
        it(
            "La propiedad email entrega un email",
            ()=>{
                const haveAnAt = data.email.includes("@")
                expect(haveAnAt).to.be.equal(true)
            }
        );
        it(
            "La creación de un usuario devuelve un objeto con el objectid",
            async ()=> {
                const one = await userModel.create(data)
                tid = one._id
                expect(one).to.have.property("_id")
            }
        );
        it(
            "La eliminación de un usuario, lo saca de la base de datos",
            async()=> {
                await userModel.findByIdAndDelete(tid);
                const deleted = await userModel.findById(tid);
                expect(deleted).to.be.null;
            }
        );
        it(
            "La creación de un usuario devuelve un usuario con un rol por defecto",
            async ()=> {
                const one = await userModel.create(data)
                expect(one).to.have.property("role")
                expect(one.role).to.be.a("string")
            }
        );
    }
)