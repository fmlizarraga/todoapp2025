import { Router } from 'express';
import {
    getOneUser,
    createOneUser,
    refreshToken
} from '../controllers';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.post('/refresh', isAuth, refreshToken); 
router.post('/login', getOneUser);
router.post('/register', createOneUser);

export default router;