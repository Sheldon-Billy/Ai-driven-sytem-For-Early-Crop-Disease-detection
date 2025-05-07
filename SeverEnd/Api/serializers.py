from rest_framework import serializers
from .models import CropDiseasePrediction

class CropDiseasePredictionSerializers(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = CropDiseasePrediction
        fields=[ #the variables on the model
            'id',
            'image_url',
            'user_description',
            'predicted_disease',
            'confidence',
            'disease_category',
            'characteristics',
            'recommendations',
            'created_at'
        ]
        #that cannot be modified on the database
        read_only_fields=['image']
       
        #convert image to url for easy storing on the database
        
    def get_image_url(self,obj):
        
        #generating full url of the image
        #obj.  is used to access fields
        
        if obj.image and hasattr(obj.image, 'url'):
            request=self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None