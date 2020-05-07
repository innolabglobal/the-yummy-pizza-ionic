# The Yummy Pizza

The Yummy Pizza is a pizza delivery web application. 

# Features
  
  - Pizza ordering system.
  - Login/Register is not necessary.
  - View order history with details.

TODO:
  - Improve validation of each form.
  - Improve the UI & UX.
  - Any other useful features.

### Tech
The Yummy Pizza uses a number of open source technologies that are good for rapid prototyping at minimum cost:

* [Angular 9](https://angular.io/) - Front end framework.
* [Ionic](https://ionicframework.com/) - Make HMTL easier.
* [Laravel](https://laravel.com/) - Server side logic.


### Installation

Install the dependencies and devDependencies and start the app using npm.

```sh
$ cd the-yummy-pizza-ionic
$ npm install
$ npm start
```

# Deploying to Firebase Hosting

Using Firebase Hosting, we can deploy our application's static files (HTML, CSS, JavaScript, etc) to the web with a single command. To get started, we'll download `firebase-tools` via npm:

```
$ npm install -g firebase-tools
```

[Read through firebase hosting quickstart](https://firebase.google.com/docs/hosting/quickstart) to get your site up and running in minutes.

Then, run the following commands:

```
$ firebase init
```

Then choose the name of the Firebase app you're deploying and enter `www` when prompted for your public directory. This will generate a `firebase.json` file. Update the file to include the following `rewrites` and `headers` configuration:

```json
{
  "hosting": {
    "public": "www",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/build/app/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000"
          }
        ]
      },
      {
        "source": "ngsw-worker.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      }
    ]
  }
}

```

Deploy your app by running the command:

```
$ npm run build:firebase:prod
```

Note that you can use any hosting service you'd like to deploy The Yummy Pizza web app, you don't need to use Firebase Hosting.

### Companion apps

These are the other components associated with this project.

| App | Repo |
| ------ | ------ |
| Server-side API | https://github.com/ljieyao/the-yummy-pizza-laravel |


License
----
MIT
