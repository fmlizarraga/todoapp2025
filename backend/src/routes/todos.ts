import { Router } from 'express';
import {
    getManyTodos,
    getOneTodo,
    deleteOneTodo,
    updateOneTodo,
    createAndFetchTodo
} from '../controllers';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.get('/', isAuth, getManyTodos);
router.post('/', isAuth, createAndFetchTodo);
router.get('/:id', isAuth, getOneTodo);
router.delete('/:id', isAuth, deleteOneTodo);
router.put('/:id', isAuth, updateOneTodo);

export default router;
