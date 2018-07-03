/**
 * Pass along a message
 * @param {models.transactions.passMessage} tx 
 * @transaction
 */
function passMessage(tx){
  
  var sender = tx.from; //person sending message
  var receiver = tx.to; //person getting message
  
  if(sender.state == "FALSE" || receiver.state == "TRUE"){
    throw new Error("Cannot send message!");  
  }
  else{
   	receiver.state = "TRUE";
    receiver.message = sender.message;
    sender.message = "";
    sender.state = "FALSE";
  }
  
  //the lines below update the information about the people to the hyperledger fabric
  return getAssetRegistry("models.person.Person").then(
  	function (asset) {
    		asset.update(sender);
     		asset.update(receiver);
    }
  ).catch(function (error) {throw new Error(error);});
  
}
