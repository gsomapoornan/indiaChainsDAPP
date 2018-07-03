/**
 * Give a message
 * @param {models.transactions.giveMessage} tx
 * @transaction
 */
function giveMessage(tx){
  
  console.log("In function");
  
  var msg = tx.txt; //the message inputted
  var person = tx.receive;//the person receiving the message
  
  if(person.state == "TRUE"){
  	throw new Error("This person already has a message");
  }
  else{
  	console.log("You have sent "+ person.name + " the message: " + msg);
    person.message = msg;
    person.state = "TRUE";
  }
  
  //the lines below update the information about the people to the hyperledger fabric
  return getAssetRegistry("models.person.Person").then(
  	function (asset) {
    	asset.update(person);
    }
  ).catch(function (error) {throw new Error(error);});
  
}
