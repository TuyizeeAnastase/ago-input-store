import {Router}  from 'express';
import { getFertilizers } from '../controllers/fertilizerController';

const router=Router();

router.get('/fertilizers',getFertilizers);

export default router;