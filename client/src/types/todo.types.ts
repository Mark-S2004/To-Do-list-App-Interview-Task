export interface ITodoItem {
    id?: string,
    title: string,
    description: string,
    dueDate: Date
}

export type ITodoList = ITodoItem[]