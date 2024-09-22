import mongoose from "mongoose";

const fillBlanckSchema = new mongoose.Schema({
  sentences: [{ 
    type: String, 
    required: true, 
    unique: true 
  }],
});

const FillBlanck = mongoose.model("FillBlanck", fillBlanckSchema);

export default FillBlanck;
