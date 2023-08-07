import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Student extends Document {
  // @Prop({ type: Schema.Types.ObjectId })
  // id: string;
  @Prop({ required: true, minlength: 3 })
  fname: string;
  @Prop({ required: true, minlength: 3 })
  lname: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  gender: 'male' | 'female';
  @Prop({ required: true })
  birthdate: Date;
  @Prop({ required: true })
  country: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
