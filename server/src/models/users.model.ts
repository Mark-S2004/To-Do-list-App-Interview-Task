import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { v4 as uuidv4 } from 'uuid';

const TodoItemSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  todoList: {
    type: [TodoItemSchema],
    required: true,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
