export interface User {
  _id: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  todoList: TodoList;
}

export class TodoItem {
  title: string;
  description: string;
  dueDate: Date;
}

export type TodoList = TodoItem[];
