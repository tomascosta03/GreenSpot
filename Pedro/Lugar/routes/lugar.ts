import Router, { Response } from "express";
import LugarValidationSchema from "./schemas/lugar";
import { matchedData, validationResult } from "express-validator";
import { create, getById, updateById, deleteById } from "../services/lugar";
import { ILugar } from "../models/lugar";

const router = Router();

router.get("/", async (req, res) => {
    // YOOOOOH MALTINHAAAA NESTA FUNÇÃO podemos implementar a lógica para buscar todos os lugares de estacionamento
    // por exemplo: const lugares = await getAll();
    // res.json(lugares);
    // Ass:Pedro
});

router.get("/:idLugar", async (req, res) => {
    const idLugar = req.params.idLugar;
    const lugar = await getById(idLugar);
    if (lugar) {
        res.json(lugar);
    } else {
        res.status(404).send("Lugar de estacionamento não encontrado");
    }
});

router.post("/", LugarValidationSchema(), async (req: any, res: Response) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.json(await create(matchedData(req) as Partial<ILugar>));
    }

    return res.status(400).json({ errors: result.array() });
});

router.put("/:idLugar", async (req, res) => {
    const idLugar = req.params.idLugar;
    const updatedLugar = await updateById(idLugar, req.body as Partial<ILugar>);
    if (updatedLugar) {
        res.json(updatedLugar);
    } else {
        res.status(404).send("Lugar de estacionamento não encontrado");
    }
});

router.delete("/:idLugar", async (req, res) => {
    const idLugar = req.params.idLugar;
    const deletedLugar = await deleteById(idLugar);
    if (deletedLugar) {
        res.json(deletedLugar);
    } else {
        res.status(404).send("Lugar de estacionamento não encontrado");
    }
});

export default router;
