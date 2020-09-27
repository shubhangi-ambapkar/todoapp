import mongoose, {Schema, Document} from "mongoose";

export interface TodoInterface extends Document {
    text: string,
    completed: boolean
}

const TodoSchema: Schema = new Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

const Todo = mongoose.model<TodoInterface>("Todo", TodoSchema);

export default Todo;


