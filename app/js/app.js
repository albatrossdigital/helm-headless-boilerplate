'use strict';

//***************************************

// Main Application

//***************************************

angular.module('app', [
  'drupalService',
  'app.menu',
  'app.static',
  'app.node',
  'app.view',
  'app.term',
  'app.vocabulary',
  'ui.router',
  'metaInfo',
  'scrollTo',
  'ui.bootstrap',
  'ngSanitize',
  'ngAnimate',
  'ngTouch',
  'ngResource',
  //'afkl.lazyImage',
  'infinite-scroll'
])

.run(
  [          '$rootScope', '$state', '$stateParams', 'metaInfo', '$window', '$location', 
    function ($rootScope,   $state,   $stateParams,   metaInfo,   $window,   $location) {

			// It's very handy to add references to $state and $stateParams to the $rootScope
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;

      $rootScope.pageUrl = 'http://localhost:9000';
      $rootScope.apiUrl = 'http://soar-city.local/api/311';

       // Share42 script
      var share42 = document.createElement('script');
    
      // Apply meta data if available
      $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){

          // Metatag info
          // ---------------------------------

          //If we have any incoming data
          if(toState.data) {
            // Set title
            var title = (toState.data.title && toState.data.title.length)
                      ? toState.data.title
                      : '';

            metaInfo.setTitle(title);

            // set description
            var description = (toState.data.description && toState.data.description.length)
                            ? toState.data.description
                            : '';

            metaInfo.setMetaDescription(description);

            // set keywords
            var keywords = (toState.data.keywords && toState.data.keywords.length)
                         ? toState.data.keywords
                         : [];

            metaInfo.setMetaKeywords(keywords, toState.data.keywordAppend);
          }
          // we're coming from a state with meta info, reset
          else if(fromState.data) {
            metaInfo.resetAll();
          }

          // Did we already load share42 script?
          if(!share42.src) {
            // Load sharing
            share42.src = '/vendor/share42.js';
            share42.type = 'text/javascript';
            share42.async = 'true';
            document.body.appendChild(share42);
          }
        }
      );

      $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){

          // send tracking
          if ($window.ga){
            $window.ga('send', 'pageview', { 
              page: $location.path(),
              title: toState.data && toState.data.title ? toState.data.title : 'FILLME!'
            });
          }

          // first time, and are we changing the main / secondary route
          if(  fromState.name && fromState.name.length
            && (!toState.data  || !(toState.data && toState.data.skipScroll))) {

            $rootScope.scrollTo('main');
          }
        }
      );

      // Helper function detects the correct sub route to go to (for templating)
      $rootScope.goSubRoute = function(baseRoute, subRoute, baseName) {
        baseName = baseName == undefined ? 'base' : baseName;
        var stateName = baseRoute+'.'+subRoute;
        try {
          var state = $state.get(stateName);
          if (state == undefined || state == null) {
            throw "myException";
          }
        }
        catch(e) {
          stateName = baseRoute+'.'+baseName;
        }
        $state.go(stateName);
      }
		
		}
	]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider', 'metaInfoProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider,   metaInfoProvider) {

      // Set base meta info
      metaInfoProvider.setBaseTitle('FILLME!');
      metaInfoProvider.setBaseDescription('FILLME!');
      metaInfoProvider.setBaseKeywords('FILLME!');

      // set location provider as regular urls
      $locationProvider.html5Mode(true);

      // trailing slash and url re-rerouting
      $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();

        var argPos = path.indexOf('/?');

        // check to see if the path already has a slash where it should be
        if (path.length > 1) {
          if(path[path.length - 1] === '/') {
            return path.substring(0, path.length - 1);
          }
          else if(argPos > 0) {
            return path.replace('/?', '?');
          }

          return '/';
        }
      });

      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      //$stateProvider

    }
  ]
);

