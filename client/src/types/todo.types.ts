export interface ITodoItem {
  _id?: string
  title: string
  description: string
  dueDate: Date
}

export type ITodoList = ITodoItem[]
