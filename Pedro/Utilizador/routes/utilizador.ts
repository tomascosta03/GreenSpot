import Router, { Response } from "express";
import UtilizadorValidationSchema from "./schemas/utilizador";
import { matchedData, validationResult } from "express-validator";
import { create, getById, updateById, deleteById } from "../services/utilizador";
import { IUtilizador } from "../models/utilizador";

const router = Router();

router.get("/", async (req, res) => {
    // aqui implementamos a logica para ir pesquisar todos os utilizadores
});

router.get("/:idUtilizador", async (req, res) => {
    const idUtilizador = req.params.idUtilizador;
    const utilizador = await getById(idUtilizador);
    if (utilizador) {
        res.json(utilizador);
    } else {
        res.status(404).send("Utilizador não encontrado");
    }
});

router.post("/", UtilizadorValidationSchema(), async (req: any, res: Response) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.json(await create(matchedData(req) as Partial<IUtilizador>));
    }

    return res.status(400).json({ errors: result.array() });
});

router.put("/:idUtilizador", async (req, res) => {
    const idUtilizador = req.params.idUtilizador;
    const updatedUtilizador = await updateById(idUtilizador, req.body as Partial<IUtilizador>);
    if (updatedUtilizador) {
        res.json(updatedUtilizador);
    } else {
        res.status(404).send("Utilizador não encontrado");
    }
});

router.delete("/:idUtilizador", async (req, res) => {
    const idUtilizador = req.params.idUtilizador;
    const deletedUtilizador = await deleteById(idUtilizador);
    if (deletedUtilizador) {
        res.json(deletedUtilizador);
    } else {
        res.status(404).send("Utilizador não encontrado");
    }
});

export default router;
