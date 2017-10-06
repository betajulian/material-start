(function(){

  angular
       .module('users', ['ngSanitize'])
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $sce ) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.toggleOption = toggleOptionsList;
    self.makeContact        = makeContact;
    self.makeContactPhone   = makeContactPhone;
    self.makeContactTwitter = makeContactTwitter;
    self.makeContactGoogleP = makeContactGoogleP;
    self.makeContactHangout = makeContactHangout;
    self.sortByName   = sortByName;
    self.sortByAge    = sortByAge;

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( usersAll ) {
            // sort into alphabetical order first
            usersAll.results.sort(function(a, b){ 
              return (a.name.first > b.name.first) ? 1 : ((b.name.first > a.name.first) ? -1 : 0);
            });

            usersAll.results.forEach(function (users) {
              users.dob_year = users.dob.substring(0,4);
              users.gender_c = ( users.gender == "male" ) ? 'M' : 'F';
              users.age     = calculateAge(users.dob);
              self.users    = self.users.concat(users);
              self.selected = users;
            });
          });

    // *********************************
    // Internal methods
    // *********************************
    // sample commit
    /**
     * Hide or Show the 'left' sideNav area
     */
    function calculateAge(birthday) { // birthday is a date
      birthday = new Date(birthday);
      console.log('birthday: ', birthday);
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    function toggleUsersList() {
      console.log('toggleUsersList');
      $mdSidenav('left').toggle();
    }
    function toggleOptionsList() {
      console.log('toggleOptionsList');
      $mdSidenav('options').toggle();
    }

    function trustSrc(src) {
      console.log('check the src: ', src);
      return $sce.trustAsResourceUrl(src);
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      console.log('check user in selectUser: ', user);
      self.selected = angular.isNumber(user) ? self.users[user] : user;
    }

    function sortByName() {
      console.log('self.users: ', self.users);
      self.users.sort(function(a, b){ 
        return (a.name.first > b.name.first) ? 1 : ((b.name.first > a.name.first) ? -1 : 0);
      });
    }

    function sortByAge() {
      console.log('self.users before: ', self.users);
      self.users.sort(function(a, b){ 
        return a.age - b.age;
      });
      console.log('self.users after: ', self.users);
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg',       contact_detail: this.user.phone},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg',     contact_detail: this.user.login.username},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg', contact_detail: this.user.email},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg',    contact_detail: 'https://hangouts.google.com/'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

    function makeContactPhone(selectedUser) {
        console.log('in makeContactPhone');
        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg',       contact_detail: this.user.phone},
            { name: 'Cell'        , icon: 'phone'       , icon_url: 'assets/svg/phone.svg',       contact_detail: this.user.cell}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

    function makeContactTwitter(selectedUser) {
        console.log('in makeContactTwitter');
        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg',     contact_detail: this.user.login.username}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

    function makeContactGoogleP(selectedUser) {
        console.log('in makeContactGoogleP');
        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/mail.svg', contact_detail: this.user.email}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

    function makeContactHangout(selectedUser) {
        console.log('in makeContactHangout');
        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg',    contact_detail: 'https://hangouts.google.com/'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
