# DocumentMaid

__TOC__

Web app that Handles files storage and versioning, written in Django, Django-restFramework , and Aurelia 

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

to create django super user you can use this

```
 python manage.py createsuperuser --email [email] --username [username]

```
after executing a password for the user needs to be provided.




[01]:https://docs.python.org/3/library/venv.html