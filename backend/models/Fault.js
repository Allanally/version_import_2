const mongoose = require('mongoose');

const FaultSchema = new mongoose.Schema({
    name: String,
    date: Date,
    type: String,
    issuer: String,
    message: String,
    stream: String,
    mark: String
})
FaultSchema.statics.query = async function(name, stream){
    const fault = await this.find({ name, stream }) 
    console.log(fault);
   return fault;
  
}

const FaultModel = mongoose.model('faults', FaultSchema)
module.exports = FaultModel