from .models import CropDiseasePrediction
from rest_framework.views import APIView
from django.conf import settings
from langchain_openai import AzureChatOpenAI
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser
import tensorflow as tf
import numpy as np
import json
import uuid
import os
from PIL import Image
from datetime import timezone
from langchain.chat_models import AzureChatOpenAI
from langchain.prompts import ChatPromptTemplate
from .serializers import CropDiseasePredictionSerializers

# api_key=settings.Open_Ai_Key
# api_endpoint=settings.Open_Ai_Endpoint
        # Load crop disease classification model
# current_dir = os.path.dirname(os.path.abspath(__file__))
# base_dir = os.path.dirname(current_dir)
# model_path = os.path.join(base_dir,"model","Crop_Disease_Classification.keras")
model = tf.keras.models.load_model("/home/sheldon/Documents/Ai-Driven_Crop_Disease_Detection_And_Prevention/SeverEnd/Api/Crop_Disease_Classification.keras")
# print(f"Model path:{model}")
crop_classes = ['Cyst Nematodes',
 'anthracnose',
 'bacterial blight',
 'bacterial wilt',
 'botrytis',
 'crown gall',
 'downy mildew',
 'fire blight',
 'fusarium',
 'potato virus',
 'powdery mildew',
 'rust disease',
 'soft rot',
 'southern blight']


# api_version = "2024-12-01-preview"
api_version = "2024-12-01-preview"

llm = AzureChatOpenAI(
    api_version=api_version,
       #comphortines keys
    # azure_endpoint='https://com-openai-api.openai.azure.com/',
    # api_key='E597Hr8tExbGEGEYPgcCatY3vbAq8ix8G9ymf54hdt6S4xQu6R5xJQQJ99BEACYeBjFXJ3w3AAABACOG3ltt',
    
    api_key='52fWLlM4wawkroNM2HQX7N08R3yJGsV5PW9kiv1hvppiukvno1NvJQQJ99BEACHYHv6XJ3w3AAABACOGTLPZ',
    azure_endpoint='https://billy-openai.openai.azure.com/',
    # model_name='gpt-4o',
    model_name='gpt-4o-mini',
    temperature=0.6
)

# System prompt for agricultural analysis
CROP_SYSTEM_PROMPT = """
You are AgriAssist, an AI agricultural specialist. Analyze the following crop disease:
Disease: {disease}
Description: {description}

Provide response in this EXACT JSON format:
{{
    "disease_category": "string (bacterial/fungal/viral/nutrient deficiency/etc)",
    "characteristics": [
        "5 distinctive features",
        "Typical symptoms",
        "Environmental conditions",
        "Affected plant parts",
        "Seasonal patterns"
    ],
    "recommendations": {{
        "immediate_actions": ["action1", "action2", "action3" - explain these actions much more]  ,
        "treatments": ["treatment1", "treatment2"],
        "prevention": ["prevention1", "prevention2"],
        "economic_impact": "explanatory paragraph"
    }}
}}
"""
# Create prompt template
crop_prompt = ChatPromptTemplate.from_messages([
    ("system", CROP_SYSTEM_PROMPT),
    ("human", "Disease: {disease}\nSymptoms: {description}\nGenerate analysis:")
])

# Create processing chain
crop_chain = crop_prompt | llm


class CropDiseaseAPI(APIView):
    parser_classes = [MultiPartParser]
    
    def _init_(self, **kwargs):
        super()._init_(**kwargs)

    def post(self, request, *args, **kwargs):
        try:
            # Validate inputs
            if 'image' not in request.FILES:
                return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
            
            image = request.FILES['image']
            description = request.data.get('description', '')
            
            # Process image
            disease, confidence = self.predict_crop_disease(image)
            
            # Generate GPT analysis
            analysis = self.generate_disease_analysis(
                disease=disease,
                description=description,
                confidence=confidence
            )

            # Create database record
            prediction = CropDiseasePrediction.objects.create(
                image=image,
                user_description=description,
                predicted_disease=disease,
                confidence=confidence,
                **analysis
            )

            # Serialize response
            serializer = CropDiseasePredictionSerializers(
                prediction,
                context={'request': request}
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def predict_crop_disease(self, image):
        """Predict crop disease from image"""
        try:
            # Preprocess image
            img = Image.open(image).convert('RGB')
            img = img.resize((180,180))  # Match model's expected sizing
            img_array = tf.keras.preprocessing.image.array_to_img(img)
            img_array = tf.expand_dims(img_array,axis=0)

            # Make prediction
            predictions = model.predict(img_array)
            confidence = np.max(predictions[0]) * 100
            predicted_class = np.argmax(predictions[0])
            print(f"Predicted{crop_classes[predicted_class]} with accuracy of {confidence}")
            return crop_classes[predicted_class], confidence
            
        except Exception as e:
            raise ValueError(f"Image processing failed: {str(e)}")

    def generate_disease_analysis(self, disease, description, confidence):
        """Generate structured analysis using GPT"""
        try:
            response = crop_chain.invoke({
                "disease": disease,
                "description": f"{description} (Confidence: {confidence:.1f}%)"
            })
            
            # Parse JSON response
            try:
                return json.loads(response.content)
            except json.JSONDecodeError:
                # Fallback processing if JSON fails
                return self._parse_unstructured_response(response.content)
                
        except Exception as e:
            raise ValueError(f"Analysis generation failed: {str(e)}")

import json
import re


def _parse_unstructured_response(self, text):
    """Parse GPT response into structured JSON format"""
    # Initialize default structure
    result = {
        "disease_category": "",
        "characteristics": [],
        "recommendations": []
    }

    try:
        # First try to parse as pure JSON if the response is already formatted
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            pass

        # Clean up the text by removing unwanted characters
        text = re.sub(r'[\'\"\`]', '', text)  # Remove quotes
        text = re.sub(r'^[\[\],]+', '', text)  # Remove leading brackets/commas
        text = re.sub(r'[\[\],]+$', '', text)  # Remove trailing brackets/commas

        # Split into sections if not already JSON
        sections = {
            "characteristics": [],
            "recommendations": [],
            "disease_category": "",
        }
        
        current_section = None
        lines = text.split('\n')
        
        for line in lines:
            line = line.strip()
            if not line:
                continue

            # Detect section headers
            lower_line = line.lower()
            if 'characteristic' in lower_line:
                current_section = "characteristics"
                continue
            elif 'recommendation' in lower_line:
                current_section = "recommendations"
                continue
            elif 'category' in lower_line or 'disease' in lower_line:
                current_section = "disease_category"
                # Extract the category name
                parts = line.split(':')
                if len(parts) > 1:
                    sections["disease_category"] = parts[1].strip()
                continue

            # Handle content lines
            if current_section:
                # Clean the line and add to appropriate section
                clean_line = re.sub(r'^[-\*•\d\s\.\)]+', '', line).strip()
                if clean_line:
                    if current_section in ["characteristics", "recommendations"]:
                        sections[current_section].append(clean_line)
                    else:
                        sections[current_section] = clean_line

        # Clean each item in lists
        for key in ["characteristics", "recommendations"]:
            sections[key] = [
                item.strip().strip('",') 
                for item in sections[key] 
                if item.strip()
            ]

        return sections

    except Exception as e:
        print(f"Error parsing response: {e}")
        return result
