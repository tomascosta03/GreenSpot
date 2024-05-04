import { checkSchema } from "express-validator";

const VeiculoValidationSchema = () => {
    return checkSchema({
        idVeiculo: {
            isInt: true,
            notEmpty: true
        },
        matricula: {
            notEmpty: true
        },
        cor: {
            notEmpty: true
        },
        modelo: {
            notEmpty: true
        },
    });
}

export default VeiculoValidationSchema;
