import express, {Request, Response, NextFunction} from 'express';
import Todo from './TodoModel';

export const TodoRouter = express.Router();

// TODO: Make it using OOPs concept

TodoRouter.get('/', (req: Request, res: Response) => {
    Todo.find((err: any, todos: any) => {
        if(err) {
            res.statusCode = 500;
            res.json({
                message: 'Unable to find any todos',
                err: err,
            });
        } else {
            res.json(todos);
        }
    });
});

TodoRouter.post('/', (req: Request, res: Response) => {
    Todo.insertMany([req.body], (err, todo) => {
        if(err) {
            res.statusCode = 500;
            res.json({
                message: `Unable to insert todo ${req.body && req.body.text}`,
                err: err,
            });
        } else {
            res.json(todo);
        }
    });
});

TodoRouter.get('/:id', (req: Request, res: Response) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            res.statusCode = 500;
            res.json({
                message: `Unable to find todo ${req.params.id}`,
                err: err,
            });
        } else {
            res.json(todo);
        }
    });
});

TodoRouter.post('/:id', (req: Request, res: Response) => {
    Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, book: any) => {
            if(err) {
                res.json({
                    message: `Unable to update todo ${req.params.id}`,
                    err: err,
                });
            } else {
                res.json(book);
            }
        }
    );
});

TodoRouter.delete('/:id', (req: Request, res: Response) => {
    Todo.deleteOne({ _id: req.params.id }, (err: any) => {
        if(err) {
            res.json({
                message: `Unable to delete todo ${req.params.id}`,
                err: err,
            });
        } else {
            res.json({
                message: 'Todo deleted from database'
            });
        }
    });
});


