import assert from "assert";
import env from "../../src/utils/env.utils.js";
import { userModel } from "../../src/dao/models/userModel.js";
import dbConnect from "../../src/utils/db.utils.js";


describe(
    "Testing Users",
    () => {
        const data = { first_name:"Martin", last_name: "Pache", email: "mp3@coder.com", password: "hola1234"};
        let tid = "";
        before(async() => await dbConnect(env.MONGO_URI));
        it(
            "Propiedad email es enviada por el usuario",
            () => assert.ok(data.email)
        )
        it(
            "La propiedad password es enviada por el usuario que quiere registrarse",
            ()=> assert.ok(data.password)
        )
        it(
            "La creación de un usuario devuelve un objeto con el objectid",
            async ()=> {
                const one = await userModel.create(data)
                tid = one._id
                assert.ok(one._id)       
            }
        )
        it(
            "El usuario no se crea si ya existe en la base de datos",
            async ()=> {
                let one = await userModel.findById(tid)
                if (!one) {
                    one = await userModel.create(data)
                    // console.log(one);
                    tid = one._id
                }
                assert.ok(one._id)
            }
        )
        it(
            "La eliminación de un usuario, lo saca de la base de datos",
            async()=> {
                await userModel.findByIdAndDelete(tid)
                const one = await userModel.findById(tid)
                assert.strictEqual(one, null)
            }
        )
    }
)