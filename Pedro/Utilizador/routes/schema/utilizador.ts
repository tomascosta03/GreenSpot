import { checkSchema } from "express-validator";

const UtilizadorValidationSchema = () => {
    return checkSchema({
        idUtilizador: {
            isInt: true,
            notEmpty: true
        },
        nome: {
            notEmpty: true
        },
        email: {
            isEmail: true,
            notEmpty: true
        },
        contacto: {
            notEmpty: true
        },
        tipoUtilizador: {
            notEmpty: true
        },
    });
}

export default UtilizadorValidationSchema;
