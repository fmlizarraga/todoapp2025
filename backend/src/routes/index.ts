import { Router } from 'express';
import todos from './todos';
import users from './users';

interface Route {
    path: string;
    route: Router;
  }

const router: Route[] = [
    {
        path: '/api/users',
        route: users
    },
    {
        path: '/api/todos',
        route: todos
    }
];

export default router;