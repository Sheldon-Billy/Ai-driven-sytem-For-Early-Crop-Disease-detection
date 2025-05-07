from django.db import models
import uuid
#creating a database table
class CropDiseasePrediction(models.Model): #table named cropprediction
    #format : varibale=models.varibletype(parameters eg. null=fasle - this means its required, etc)
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    image=models.ImageField(upload_to='crop_disease/%Y/%m/%d/')
    user_description=models.TextField(max_length=300,null=True)
    predicted_disease=models.CharField(max_length=50,blank=True,null=True)
    confidence=models.FloatField(max_length=10, null=True)
    disease_category=models.CharField(max_length=50)
    characteristics=models.TextField()
    recommendations=models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    #display of the following fields on the admin panel
    #remember to register them on admin.py
    def __str__(self):
        return f"{self.predicted_disease} ------ {self.confidence}"
