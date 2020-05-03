# Python: Getting Started

https://afternoon-earth-08431.herokuapp.com/

```sh
$ conda activate ai
$ heroku login
```

A barebones Django app, which can easily be deployed to Heroku.

This application supports the [Getting Started with Python on Heroku](https://devcenter.heroku.com/articles/getting-started-with-python) article - check it out.

## Installation Notes

<ul>
<li> ProcFile should be configured properly before deployment </li>
<li> https://devcenter.heroku.com/articles/getting-started-with-python#set-up </li>
<li> Congure static files before deployment by adding STATIC_ROOT to the settings</li>
<li> python manage.py collectstatic </li>
</ul>


## Running Locally

Make sure you have Python 3.7 [installed locally](http://install.python-guide.org). To push to Heroku, you'll need to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), as well as [Postgres](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup).

```sh
$ python manage.py runserver
```

or 

```sh
$ heroku local web -f Procfile.windows
```

Your app should now be running on [localhost:8000](http://localhost:5000/).

## Deploying to Heroku

```sh
$ git add .
$ git commit -m "write your message"
$ git push -u origin master
```

```sh
$ heroku create
$ git push heroku master

$ heroku run python manage.py migrate
$ heroku open
```
or

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## How to stop an app on Heroku?
To completely 'stop' your app you can scale the web dynos down to zero which effectively takes all your app http-processes offline.

```sh
$ heroku ps:scale web=0
```

## Documentation

For more information about using Python on Heroku, see these Dev Center articles:

- [Python on Heroku](https://devcenter.heroku.com/categories/python)
"# clustered_viz" 
