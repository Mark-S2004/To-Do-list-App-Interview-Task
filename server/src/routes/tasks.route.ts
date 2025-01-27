import { Router } from 'express';
import TasksController from '@controllers/tasks.controller';
import { CreateTaskDto } from '@dtos/tasks.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TasksRoute implements Routes {
  public path = '/users/:userId/tasks';
  public router = Router();
  public tasksController = new TasksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, validationMiddleware(CreateTaskDto, 'body'), this.tasksController.createTask);
    this.router.put(`${this.path}/:taskId`, validationMiddleware(CreateTaskDto, 'body', true), this.tasksController.updateTask);
    this.router.put(`${this.path}/:taskId/toggle`, this.tasksController.toggleTask);
    this.router.delete(`${this.path}/:taskId`, this.tasksController.deleteTask);
  }
}

export default TasksRoute;
