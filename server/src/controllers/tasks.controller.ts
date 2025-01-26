import { NextFunction, Request, Response } from 'express';
import { CreateTaskDto } from '@dtos/tasks.dto';
import { User } from '@interfaces/users.interface';
import TaskService from '@services/tasks.service';

class TasksController {
  public taskService = new TaskService();

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.userId;
      const { title, description, dueDate } = req.body;
      const taskData: CreateTaskDto = {
        title,
        description,
        dueDate: new Date(dueDate),
      };
      const createdTaskUser: User = await this.taskService.createTask(userId, taskData);

      res.status(201).json({ data: createdTaskUser, message: 'Created Task' });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.userId;
      const taskId: string = req.params.taskId;
      const taskData: CreateTaskDto = req.body;
      const updatedTaskUser: User = await this.taskService.updateTask(userId, taskId, taskData);

      res.status(200).json({ data: updatedTaskUser, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.userId;
      const taskId: string = req.params.taskId;
      const deletedTaskUser: User = await this.taskService.deleteTask(userId, taskId);

      res.status(200).json({ data: deletedTaskUser, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
