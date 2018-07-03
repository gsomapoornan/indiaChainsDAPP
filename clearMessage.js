/**
 * Drop a message
 * @param {models.transactions.clearMessage} tx 
 * @transaction
 */
function clearMessage(tx){
  
  var person = tx.receive;
  
  if(person.state == "FALSE"){
   	throw new Error("Person already does not have message");
  }
  else{
    person.state = "FALSE";
    person.message = "";
  }
  
  //the lines below update the information about the people to the hyperledger fabric
  return getAssetRegistry("models.person.Person").then(
  	function (asset) {
    		asset.update(person);
    }
  ).catch(function (error) {throw new Error(error);});
  
  
}
