# angular-spotify (Angular client side authentication- Sass - Responsive layout)



angular service to connect to the [Spotify Web API](https://developer.spotify.com/web-api/)

## Usage

Install angular-spotify via bower. Use the --save property to save into your bower.json file.
```shell
bower install angular-spotify --save
```
Also available on npm
```shell
npm install angular-spotify --save
```

Include spotify into your angular module
```js
var app = angular.module('example', ['spotify']);
```

Spotify implement Authentication on all Api requests here I am using client base authentication. This token will be expire in 3600 milli second Replace this code with your code in main controller:
```js
app.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('<CLIENT_ID>');
  SpotifyProvider.setRedirectUri('<CALLBACK_URI>');
  SpotifyProvider.setScope('<SCOPE>');
  // If you already have an auth token by using other authentication methods
  SpotifyProvider.setAuthToken('<AUTH_TOKEN>');
});
```
For example:
```js
app.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('ABC123DEF456GHI789JKL');
  SpotifyProvider.setRedirectUri('http://www.example.com/callback.html');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // If you already have an auth token by using other authentication methods 
  SpotifyProvider.setAuthToken('zoasliu1248sdfuiknuha7882iu4rnuwehifskmkiuwhjg23');
});
```


Inject Spotify into a controller to gain access to all the functions available
```js
app.controller('MainCtrl', function (Spotify) {

});
```

### Authentication
#### Login
Will open login window. Requires user to initiate as it will open a pop up window.
Requires client id, callback uri and scope to be set in config.
```js
Spotify.login();
```

Example:
```js
$scope.login = function () {
  Spotify.login();
};
```

#### Example callback html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <script>
            window.onload = function () {
                var hash = window.location;
                if (window.location.search.substring(1).indexOf("error") !== -1) {
                    // login failure
                    window.close();
                } else if (hash) {
                    var token = window.location.hash.split('#')[1].split('=')[1].split('&')[0];
                    localStorage.setItem('spotify-token', token);
                    // login success
                    window.close();
                }
            };
        </script>
    </head>
    <body>

    </body>
</html>
```


### Search 
```js
Spotify.search('Query parameter', 'type').then(function (result)
```
Get list of Spotify artist .
```js
Spotify.search('Query parameter', 'artist').then(function (result)
```

Get list of Spotify albums .
```js
Spotify.search('Query parameter', 'album').then(function (result)
```

#### Get an Album’s Tracks
Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
```js
Spotify.getAlbumTracks('AlbumID or Spotify Album URI', options);
```
##### Options Object (Optional)
 - limit - Optional. The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
 - offset - Optional. The index of the first track to return. Default: 0 (the first object). Use with limit to get the next set of tracks.

Example:
```js
Spotify.getAlbumTracks('6akEvsycLGftJxYudPjmqK').then(function (data) {
  console.log(data);
});
```

#### Get an Artist’s Albums
Get Spotify catalog information about an artist’s albums. Optional parameters can be passed in to filter and sort the response.
```js
Spotify.getArtistAlbums('Artist Id or Spotify Artist URI', options);
```

##### Options Object (Optional)
 - album_type - Optional A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. Valid values are:
   - album
   - single
   - appears_on
   - compilation

Example: { album_type: 'album,single' }
 - country - Optional. An ISO 3166-1 alpha-2 country code. Supply this parameter to limit the response to one particular country. Note if you do not provide this field, you are likely to get duplicate results per album, one for each country in which the album is available!
 - limit - The number of album objects to return. Default: 20. Minimum: 1. Maximum: 50. For example: { limit: 2 }
 - offset - Optional. The index of the first album to return. Default: 0 (i.e., the first album). Use with limit to get the next set of albums.


Example:
```js
Spotify.getArtistAlbums('1vCWHaC5f2uS3yhpwWbIA6').then(function (data) {
  console.log(data);
});
```
