(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngRoute',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'

  ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
          templateUrl: 'templates/home.html',
          controller: 'pipelineCtrl'
      }).
      otherwise({
          redirectTo: '/'
      });
  }])
  .service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
})

  .controller('pipelineCtrl', function($scope, $http, $location, anchorSmoothScroll) {

    $scope.goToElement = function (eID){
      console.log(eID);
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(eID);
 
      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);
      
    };

    $scope.currentForm = '';
    $scope.data = {};

    $scope.data = {
      "277": { // Loan ID
        "info": {
            "name": "Something Banking Firm",
            "due": "01-03-2016",
            "otherinfo": "other info"
        },
        "forms": { // Main Form Data
            "loanRequest": { //Type of form (left sidebar)
                "data": {
                    "client_first_name": "First Name", // data field etc...
                    "client_last_name": "Last Name",
                    "address": "Address",
                    "background": {
                        "dob": "date of birth",
                        "birthplace": "birth place"
                    },
                },
                "dueDate": "08-15-2015"                    
            },
            "sponsor": { // Type of form data
                "data": {
                    "input1": "nthnth", // data field etc...
                    "input2": "formdata",
                    "inputSection": {
                        "forminput1": "formdata"
                    },
                    "input3": "formdata"
                },
                "dueDate": "08-15-2015"   
            },
            "title": { // Type of form data
                "data": {
                    "input1": "formdata", // data field etc...
                    "input2": "formdata",
                    "inputSection": {
                        "forminput1": "formdata"
                    },
                    "input3": "formdata"
                },
                "dueDate": "08-15-2015"   
            },
            "purchase": { // Type of form data
                "data": {
                    "input1": "formdata", // data field etc...
                    "input2": "formdata",
                    "inputSection": {
                        "forminput1": "formdata"
                    },
                    "input3": "formdata"
                },
                "dueDate": "08-15-2015"   
            },
            "realEstate": { // Type of form data
                "data": {
                    "input1": "formdata", // data field etc...
                    "input2": "formdata",
                    "inputSection": {
                        "forminput1": "formdata"
                    },
                    "input3": "formdata"
                },
                "dueDate": "08-15-2015"   
            },
            "income": { // Type of form data
                "data": {
                    "input1": "formdata", // data field etc...
                    "input2": "formdata",
                    "inputSection": {
                        "forminput1": "formdata"
                    },
                    "input3": "formdata"
                },
                "dueDate": "08-15-2015"   
            }
        },
        "underwritingConditions": {
            "adminRequestNote": "Admin pastes a requst and it serves as an additional taks to be complete"
        }    
    }
  };

  $scope.setForm = function(formName) {
    $scope.currentForm = [];
    $scope.currentFormSections = [];
    angular.forEach($scope.data["277"]["forms"][formName]['data'], function(value, key) {

      if (typeof value =='object') {

        var tmp = {"section_name":key};
        tmp[tmp["section_name"]]=value;
        delete tmp["section_name"];
        $scope.currentFormSections.push(tmp);
      }
      else {
        this.push({key : value});  
      }
      
    }, $scope.currentForm);
    

    $scope.currentFormName = formName;  
  };

  $scope.setTool = function(number) {
    $scope.currentTool = number;
  };

});
  

  //config.$inject = ['$urlRouterProvider', '$locationProvider'];

/*  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }*/

  // function run() {
  //   FastClick.attach(document.body);
  // }

})();
