import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { CreateTaskDto } from '@/dtos/tasks.dto';

class TaskService {
  public users = userModel;

  public async createTask(userId: string, taskData: CreateTaskDto): Promise<User> {
    if (isEmpty(taskData)) {
      throw new HttpException(400, 'taskData is empty');
    }

    const findUser: User = await this.users.findById(userId);
    if (!findUser) {
      throw new HttpException(409, `This user does not exist`);
    }

    const userData: User = await this.users.findByIdAndUpdate(userId, {
      $push: { todoList: taskData },
    });

    return userData;
  }

  public async updateTask(userId: string, taskId: string, taskData: CreateTaskDto): Promise<User> {
    if (isEmpty(taskData)) {
      throw new HttpException(400, 'taskData is empty');
    }

    const updatedTaskUser: User = await this.users.findOneAndUpdate(
      { _id: userId, 'todoList._id': taskId },
      {
        $set: {
          'todoList.$.title': taskData.title,
          'todoList.$.description': taskData.description,
          'todoList.$.dueDate': taskData.dueDate,
        },
      },
    );

    if (!updatedTaskUser) {
      throw new HttpException(409, "User doesn't exist");
    }

    return updatedTaskUser;
  }

  public async deleteTask(userId: string, taskId: string): Promise<User> {
    const deletedTaskUser: User = await this.users.findByIdAndUpdate(userId, {
      $pull: { todoList: { _id: taskId } },
    });
    if (!deletedTaskUser) {
      throw new HttpException(409, "User doesn't exist");
    }

    return deletedTaskUser;
  }
}

export default TaskService;
