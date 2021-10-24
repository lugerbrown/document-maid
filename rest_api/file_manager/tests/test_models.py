from django.test import TestCase
from file_manager.models import File
from django.contrib.auth.models import User


class TestModels(TestCase):
    def setUp(self):
        self.owner = User.objects.create_user('testUser', 'test@usertest.com', 'welcome@123')

    def test_file_record_creation(self):
        # Act
        document = File.objects.create(name='testName', revision=1, owner=self.owner)
        # Assert
        self.assertTrue(isinstance(document, File))
