import mongoose, { Schema, Document } from 'mongoose';

export interface NoteModel extends Document {
  date: Date;
  content: string;
}

const NoteSchema: Schema = new Schema({
  date: { type: Date, required: true },
  content: { type: String, required: true },
});

export default mongoose.model<NoteModel>('Note', NoteSchema);
