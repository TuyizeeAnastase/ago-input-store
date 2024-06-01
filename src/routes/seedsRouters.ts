import { Router } from "express";
import { getSeeds } from "../controllers/seedControlers";

const router=Router()

router.get('/seeds',getSeeds)

export default router;