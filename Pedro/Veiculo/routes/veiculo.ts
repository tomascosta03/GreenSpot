import Router, { Response } from "express";
import VeiculoValidationSchema from "./schemas/veiculo";
import { matchedData, validationResult } from "express-validator";
import { create, getById, updateById, deleteById } from "../services/veiculo";
import { IVeiculo } from "../models/veiculo";

const router = Router();

router.get("/", async (req, res) => {
    // aqui podemos implementar logica para irmos pesquisar todos os veiculos
});

router.get("/:idVeiculo", async (req, res) => {
    const idVeiculo = req.params.idVeiculo;
    const veiculo = await getById(idVeiculo);
    if (veiculo) {
        res.json(veiculo);
    } else {
        res.status(404).send("Veículo não encontrado");
    }
});

router.post("/", VeiculoValidationSchema(), async (req: any, res: Response) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.json(await create(matchedData(req) as Partial<IVeiculo>));
    }

    return res.status(400).json({ errors: result.array() });
});

router.put("/:idVeiculo", async (req, res) => {
    const idVeiculo = req.params.idVeiculo;
    const updatedVeiculo = await updateById(idVeiculo, req.body as Partial<IVeiculo>);
    if (updatedVeiculo) {
        res.json(updatedVeiculo);
    } else {
        res.status(404).send("Veículo não encontrado");
    }
});

router.delete("/:idVeiculo", async (req, res) => {
    const idVeiculo = req.params.idVeiculo;
    const deletedVeiculo = await deleteById(idVeiculo);
    if (deletedVeiculo) {
        res.json(deletedVeiculo);
    } else {
        res.status(404).send("Veículo não encontrado");
    }
});

export default router;
