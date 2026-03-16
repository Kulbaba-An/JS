
(function(window){
  let GoodByeSpeaker = {};
  speakWord = "Good Bye";
  GoodByeSpeaker.speak = function(name) {
    console.log(speakWord + " " + name);
  }
  window.GoodByeSpeaker = GoodByeSpeaker;
})(window);


