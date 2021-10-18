from django import forms


class UploadFileForm(forms.Form):
    file_uploaded = forms.FileField()

