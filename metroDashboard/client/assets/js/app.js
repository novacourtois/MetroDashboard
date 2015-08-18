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
  

  .controller('pipelineCtrl', function($scope, $http, $location) {


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


  $scope.setForm('loanRequest');

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
