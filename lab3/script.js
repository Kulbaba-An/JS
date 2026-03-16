(function(){
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  
  function isNameShort(exampleName){
    return(exampleName.length <= 3);
  }
  
  for (let i = 0; i< names.length;i++) {  
    if (names[i].charAt(0).toLowerCase() === 'j') {
      GoodByeSpeaker.speak(names[i]);
    } else {
      HelloSpeaker.speak(names[i]);
    }
    //додаткова первірка імен
    if(isNameShort(names[i])){
      console.log("Уті-тю " + names[i]);
    }
  }

})();
