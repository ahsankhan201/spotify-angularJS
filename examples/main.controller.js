angular

        .module('exampleApp', ['spotify', 'ui.bootstrap'])
        .config(function (SpotifyProvider) {
            SpotifyProvider.setClientId('9742fc82769f4a81844448b9ed7285b3');
            SpotifyProvider.setRedirectUri('http://spotify.bizzfast.com/examples/callback.html');
            SpotifyProvider.setScope('playlist-read-private');
        })
        .controller('MainController', ['$scope', 'Spotify', '$modal', function ($scope, Spotify, $modal) {
                $scope.result = false;
                $scope.layer = false;

                // Tabs
                $scope.tab = 'artist';
                $scope.setTab = function (tabId) {
                    this.tab = tabId;
                };

                $scope.isSet = function (tabId) {
                    return this.tab === tabId;
                };
                // Tabs end

                $scope.searchResult = function () {
                    Spotify.login().then(function (data) {
                        Spotify.search($scope.searchData, 'artist').then(function (result) {
                            $scope.artistResult = result.data.artists.items;
                        });

                        Spotify.search($scope.searchData, 'album').then(function (result) {
                            $scope.albumResult = result.data.albums.items;
                        });
                        $scope.result = true;
                    });
                };

                $scope.login = function () {
                    Spotify.login().then(function (data) {
                        alert("You are now logged in");
                    }, function () {
                        alert('didn\'t log in');
                    });
                };

                $scope.searchChild = function (item) {
                    $scope.item = item;
                    $scope.popup = true;
                    if (!(angular.isUndefined($scope.modalInstance))) {
                        $scope.modalInstance.close(true);
                        delete $scope.modalInstance;
                    }
                    $scope.options = {"limit": 3};
                    if ($scope.item.type === 'album') {
                        Spotify.getAlbumTracks($scope.item.id, $scope.options).then(function (subResult) {
                            $scope.subType = 'Track';
                            $scope.subResponse = subResult.data.items;
                        });
                    }
                    if ($scope.item.type === 'artist') {

                        Spotify.getArtistAlbums($scope.item.id, $scope.options).then(function (subResult) {
                            $scope.subType = 'Album';
                            $scope.subResponse = subResult.data.items;
                        });
                    }
                    console.log($scope.modalInstance);
                    $scope.modalInstance = $modal.open({
                        templateUrl: 'modal.html',
                        controller: 'MainController',
                        scope: $scope
                    });
                };
                $scope.closePopup = function () {
                    if (!(angular.isUndefined($scope.modalInstance))) {
                        $scope.modalInstance.close(true);
                        delete $scope.modalInstance;
                    }
                };
                
                $scope.moreData = function(){
                    $('.artistBox:hidden').slice(0, 4).slideDown();
                    $('.albumBox:hidden').slice(0, 4).slideDown();
                };

            }]);