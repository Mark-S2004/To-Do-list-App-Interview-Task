export interface User {
  _id: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  todoList: TodoItem[];
}

export class TodoItem {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  done: boolean;
}

export type TodoList = TodoItem[];
