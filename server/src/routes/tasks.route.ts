import { Router } from 'express';
import TasksController from '@controllers/tasks.controller';
import { CreateTaskDto } from '@dtos/tasks.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TasksRoute implements Routes {
  public path = '/users/:userId/tasks';
  public router = Router();
  public usersController = new TasksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, validationMiddleware(CreateTaskDto, 'body'), this.usersController.createTask);
    this.router.put(`${this.path}/:taskId`, validationMiddleware(CreateTaskDto, 'body', true), this.usersController.updateTask);
    this.router.delete(`${this.path}/:taskId`, this.usersController.deleteTask);
  }
}

export default TasksRoute;
