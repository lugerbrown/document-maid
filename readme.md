# DocumentMaid


Web app that Handles files storage and versioning, written in [Django][11], [Django-restFramework][12] , and [Aurelia][10] 

## Getting started

for Django Backend to work correctly you need to run. in a virtual env or directly. 
more info about virtual environments in [here][01].
```
pip install -r requirements.txt
```

after that migrations and the super user needs to be added to django

change to django project directory
```
cd rest_api
python manage.py makemigrations
python manage.py migrate
```

to create django super-user you can use this

```
 python manage.py createsuperuser --email [email] --username [username]

```
after executing a password for the user needs to be provided.

##Backend Test Execution
for (rest_api) project test execution
at same directory as before

```
cd rest_api
python manage.py test
```

you should see the output in the console like this.

```
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
......
----------------------------------------------------------------------
Ran 6 tests in 1.870s

OK
Destroying test database for alias 'default'...

```

## web-app project set up

in order to execute the web project we need to install packages 
with npm, make sure node and npm are installed.

First we change directory where the package.json is located,
and we tell npm to install the packages.
```
cd web-app
npm install
```
once packages are installed we can start the web server with
```
npm start
```
the application will be active in 
http://localhost:8080


to execute the web-app unittests you need to run 

```
npm test
```

[01]:https://docs.python.org/3/library/venv.html
[10]:https://aurelia.io/
[11]:https://www.djangoproject.com/
[12]:https://www.django-rest-framework.org/