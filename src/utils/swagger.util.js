import __dirname from "../../utils.js";

const opts = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: " CODER COMMERCE",
            description: "DOCUMENTACION DE CODER COMMERCE"
        }
    },
    apis: [ `${__dirname}//src/docs/*.yaml` ],
};


export default opts;