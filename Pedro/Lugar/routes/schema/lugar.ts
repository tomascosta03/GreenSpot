import { checkSchema } from "express-validator";

const LugarValidationSchema = () => {
    return checkSchema({
        idLugar: {
            errorMessage: 'Invalid idLugar',
            isInt: true,
            notEmpty: true
        },
        localizacao: {
            notEmpty: true
        },
        tamanho: {
            notEmpty: true
        },
        ocupado: {
            isBoolean: true
        },
    });
}

export default LugarValidationSchema;
