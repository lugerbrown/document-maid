import json
import os
from urllib.parse import urlencode
from django.contrib.auth.models import User
from file_manager.models import File
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIClient

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

class TestViews(TestCase):
    def setUp(self):
        self.create_db_objects()
        self.client = Client()
        self.rest_client = APIClient()

    def create_db_objects(self):
        self.user = User.objects.create_user('testUser', 'test@usertest.com', 'welcome@123')
        self.documents = [File.objects.create(name='testName', revision=1, owner=self.user)]
        self.documents.append(File.objects.create(name='testName', revision=2, owner=self.user))
        self.documents.append(File.objects.create(name='testName1', revision=1, owner=self.user))
        self.documents.append(File.objects.create(name='testName1', revision=2, owner=self.user))

    def get_token_from_logged_test_user(self):
        data = urlencode({"username": 'testUser', "password": 'welcome@123'})
        login_response = self.client.post("/auth/token/login", data, content_type="application/x-www-form-urlencoded")
        return json.loads(login_response.content.decode('utf-8'))['auth_token']

    def test_user_can_login(self):
        # Arrange
        data = urlencode({"username": 'testUser', "password": 'welcome@123'})
        # Act
        login_response = self.client.post("/auth/token/login", data, content_type="application/x-www-form-urlencoded")
        # Assert
        self.assertEqual(login_response.status_code, 200)

    def test_user_can_use_token_and_check_server(self):
        # Arrange
        token = self.get_token_from_logged_test_user()
        self.rest_client.credentials(HTTP_AUTHORIZATION='token ' + token)
        # Act
        response = self.rest_client.get(reverse('index'))
        # Assert
        self.assertEqual(response.status_code, 200)

    def test_user_can_get_file_list(self):
        # Arrange
        token = self.get_token_from_logged_test_user()
        self.rest_client.credentials(HTTP_AUTHORIZATION='token ' + token)
        # Act
        response = self.rest_client.get(reverse('file_list'))
        # Assert
        json_response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json_response), 4)
        self.assertEqual(json_response[0]['name'], 'testName')
        self.assertEqual(json_response[0]['revision'], 1)
        self.assertEqual(json_response[1]['name'], 'testName')
        self.assertEqual(json_response[1]['revision'], 2)
        self.assertEqual(json_response[2]['name'], 'testName1')
        self.assertEqual(json_response[2]['revision'], 1)
        self.assertEqual(json_response[3]['name'], 'testName1')
        self.assertEqual(json_response[3]['revision'], 2)

    def test_user_can_get_revisions_from_single_file(self):
        # Arrange
        token = self.get_token_from_logged_test_user()
        self.rest_client.credentials(HTTP_AUTHORIZATION='token ' + token)
        # Act
        response = self.rest_client.get(reverse('single_file_handler',  kwargs={'name': 'testName'}))
        # Arrange
        json_response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json_response), 2)

    def test_user_can_post_file(self):
        # Arrange
        token = self.get_token_from_logged_test_user()
        self.rest_client.credentials(HTTP_AUTHORIZATION='token ' + token)
        # Act
        with open(os.path.join(__location__, 'testFIle.txt')) as fp:
            response = self.rest_client.post(reverse('file', kwargs={'name': 'testfile.txt', 'revision': 1}),
                                  {'file_uploaded': fp})
            self.assertEqual(response.status_code, 201)
