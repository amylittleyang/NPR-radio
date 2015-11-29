var app = angular.module('myApp',[]);

app.run(function($rootScope){
    $rootScope.name = "Ari Lerner";
   
});
var apiKey = 'MDIxNDUwNjU5MDE0NDg3NzcyMzQ1MTAxZQ000',
        nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

// NPR Radio
app.controller('PlayerController',['$scope','$http',function($scope,$http){
    var audio = document.createElement('audio');
    var audio_text = "(None)";
    $scope.audio = audio;
    $scope.audio_text = audio_text;
    $scope.playing = false;
    $scope.play = function(program){
      if($scope.playing){
          $scope.audio.pause();
      }  
      var url = program.audio[0].format.mp4.$text;
      $scope.audio_text = program.title.$text;
        audio.src = url;
        audio.play();
        $scope.playing = true;
    };
    
    $scope.pause = function(){
        audio.pause();
        $scope.playing = false;
    };
    $scope.continue = function(){
        audio.play();
        $scope.playing = true;
    };
    $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function(data, status) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    // Some error occurred
  });                       
}]);
