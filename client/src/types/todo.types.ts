export interface ITodoItem {
  _id?: string
  title: string
  description: string
  dueDate: Date
  done: boolean
}

export type ITodoList = ITodoItem[]
