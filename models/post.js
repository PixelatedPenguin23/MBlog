import { Schema,model,models } from "mongoose";

const nU=new Schema({
  creator:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
  ,
  post: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
})

const Postt=models.Postt||model('Postt',nU)
export default Postt