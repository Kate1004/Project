//Під`єднюємо ангуляр
var app = angular.module('app', ['ngRoute']);
//Забираєм %2F та # з url сайту
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);
//Створюєм адреси
app.config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});
//Створюємо контроллер
app.controller('myCtrl', function ($scope) {});

//Директива Сторінок
app.directive('pagesBlock', function () {
    return {
        replace: true
        , templateUrl: 'template/pages.html'
        , controller: function ($scope) {
            $scope.arr = [{
                title: "News1"
                , text: "sdfsdfsdfsdfsdf"
    }, {
                title: "News2"
                , text: "sdfsdfsdfsdfsdf34234234"
    }, {
                title: "News3"
                , text: "sdfsdfsd2323423sdfsdf"
    }];
        }
    }
});
//Директива Menu
app.directive('menuBlock', function () {
    return {
        replace: true
        , templateUrl: 'template/menu.html'
        , controller: function ($scope) {
            $scope.home = true;
            $scope.blog = false;
            $scope.contact = false;
            $scope.userStatus = false;
            $scope.menuButtons = [
                {
                    action: function () {
                        $scope.home = true;
                        $scope.contact = false;
                        $scope.blog = false;
                        $scope.items = false;
                    }
                    , name: "Home"
                 }, {
                    action: function () {
                        $scope.home = false;
                        $scope.contact = false;
                        $scope.blog = true;
                        $scope.items = false;
                    }
                    , name: "Blog"
                 }, {
                    action: function () {
                        $scope.home = false;
                        $scope.contact = true;
                        $scope.blog = false;
                        $scope.items = false;
                    }
                    , name: "Contact"
                 }, { 
                     action: function () {
                        $scope.home = false;
                        $scope.contact = false;
                        $scope.blog = false;
                        $scope.items = true;
                    }
                    , name: "Items"
                 }
                     
             ]
        }
    }
});
//Директива Слайдера
app.directive('sliderBlock', function () {
    return {
        replace: true
        , templateUrl: 'template/slider.html'
        , link: function (scope, element, attrs) {
            //Функціонал JQuery-слайдера
            
            // JavaScript Document

	$(window).load(function(){
		var sum=0;
		$('.banner-container li img').each(function(){ 
			sum += $(this).width();
		});
		$('.banner-container ul').width(sum);
	});
	$(function(){
		var winWidth = $(".banner-container").width();
		var ulWidthCount = 0;
		ulWidthCount = $('.banner-container li').size();
		$(".banner-container li").width(winWidth/ulWidthCount);
		$(".banner-container li").hover(function(){			
			ulWidthCount = $('.banner-container li').size();
			var imgWidth = $(this).find("img").width();
			var bannerLi = winWidth - imgWidth;
			var remWidth = ulWidthCount - 1;
			var appWidth = bannerLi/remWidth;
			$(".banner-container li").stop(true, false).animate({width: appWidth},700);
			$(this).stop(true, false).animate({width: imgWidth},700);
			$(this).find("span.overlay").stop(true, false).fadeOut();
		}, function(){
			$(this).animate({width: winWidth/ulWidthCount},700);
			$(".banner-container li").animate({width:winWidth/ulWidthCount},700);
			$(this).find("span.overlay").fadeIn();
		});	
	});


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
      
            
    }
    }
});

//Директива Чату
app.directive('chatBlock', function () {
    return {
        replace: true
        , templateUrl: 'template/chat.html'
        , controller: function ($scope) {
            $scope.textField = "";
            $scope.nameField = "Anonim";
            $scope.EnterProfile = function () {
                $scope.nameField = $scope.Name;
            };
            $scope.textiki = [];
            $scope.EnterText = function () {
                $scope.date = new Date();
                $scope.textiki.push({
                    date: $scope.date
                    , nameField: $scope.nameField
                    , textField: $scope.textField
                });
                $scope.textField = "";
                $('#myDivChat').scrollTop($('#myDivChat').prop('scrollHeight'));
            }
        }
    }
});
//Директива Авторизації / Реєстрації
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/login.html',
        controller: function ($scope, $http) {
            $scope.changePasswordStatus = false;
            //Розлогінитись
            $scope.logOut = function () {
                $scope.newUser = true;
                $scope.enterLogin = false;
                localStorage.userName = "default";
                $scope.ProfileStatus = false;
            };
            
            
            //Загрузка авторизованого юзера (якщо є)
            if (localStorage.userName == undefined) {
                localStorage.userName = "default";
            } else {
                if (localStorage.userName != "default") {
                    $scope.userIn = "Wellcome " + localStorage.userName + "!!!";
                    $scope.newUser = false;
                    $scope.ProfileStatus = true;
                    $scope.enterLogin = true;
                    $scope.user = "";
                     let loginObj = {
                    login: localStorage.userName
                };
                     $http.post('http://localhost:8000/user-prof', loginObj)
                    .then(function successCallback(response) {
                        $scope.userProfile = response.data;
                         $scope.nameUserProfile = $scope.userProfile[0].name;
                         $scope.snameUserProfile = $scope.userProfile[0].sname;
                         $scope.dateUserProfile = $scope.userProfile[0].date;
                         $scope.aboutUserProfile = $scope.userProfile[0].about;
                    
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                    

                } else {
                    $scope.newUser = true;
                    $scope.enterLogin = false;
                }
            };

            //Авторизація
            $scope.check = function () {
                let loginObj = {
                    login: $scope.login,
                    pass: $scope.password
                };
                $http.post('http://localhost:8000/login-auth', loginObj)
                    .then(function successCallback(response) {
                        if (response.data == "welcome") {
                            $scope.userIn = "Wellcome " + $scope.login + "!!!";
                            $scope.newUser = false;
                            $scope.enterLogin = true;
                            $scope.user = "";
                            localStorage.userName = $scope.login;
                        
                             let loginObj = {
                    login: localStorage.userName
                };
                     $http.post('http://localhost:8000/user-prof', loginObj)
                    .then(function successCallback(response) {
                        $scope.userProfile = response.data;
                         $scope.nameUserProfile = $scope.userProfile[0].name;
                         $scope.snameUserProfile = $scope.userProfile[0].sname;
                         $scope.dateUserProfile = $scope.userProfile[0].date;
                         $scope.aboutUserProfile = $scope.userProfile[0].about;
                             $scope.ProfileStatus = true;
                    
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                        } else {
                            $scope.user = response.data;
                        };
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            };
            //Реєстрація
            $scope.registr = function () {
                let loginObj = {
                    login: $scope.login,
                    password: $scope.password
                };
                $http.post('http://localhost:8000/login-reg', loginObj)
                    .then(function successCallback(response) {
                        $scope.user = response.data;
                        $http.get('http://localhost:8000/users')
                            .then(function successCallback(response) {
                                $scope.arrUsers = response.data;
                            }, function errorCallback(response) {
                                console.log("Error!!!" + response.err);
                            });
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            };
        }
    }
});

//Директива Профайлу
app.directive('profileBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/profile.html',
        controller: function ($scope) {
        }
    }
});
