import { Router } from "express";

const router = Router();
const users = [
    {
        username: "vhsousa",
        email: "vhsousa@me.com"
    },
    {
        username: "joaquim",
        email: "asd@me.com"
    }
]

router.get("/", (_, res) => {

    res.json(users);
});

router.get("/:id", (req, res) => {
    res.json(users.filter(u => u.email == req.params.id));
})

export default router;
