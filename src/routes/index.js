import {Router} from "express";
const router = Router()

router.get('/', (req, res) => res.render('index'));

router.get('/process', (req, res) => res.render('process'));

export default router