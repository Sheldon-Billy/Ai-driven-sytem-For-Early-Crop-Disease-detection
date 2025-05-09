name: Django DRF API Deployment

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  PYTHON_VERSION: "3.11"
  WEBAPP_NAME: "crop-prediction-webapp"

jobs:
  deploy_api:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3

      # Set up Python
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}

      # Install dependencies
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r SeverEnd/requirements.txt
      - name: Collect static files
        run: |
          python endpoints/manage.py collectstatic --noinput

      # Database migrations (if needed)
      - name: Run migrations
        working-directory: SeverEnd
        run: |
          python manage.py migrate --noinput
      - name: Create deployment package
        run: |
          cd endpoints
          zip -r ../deployment-package.zip . -x '.git' '.env' 'venv/*'

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: python-app
          path: deployment-package.zip

  deploy:
    runs-on: ubuntu-latest
    environment:
      name: "Production"
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: python-app

      - name: "Deploy to Azure Web App"
        uses: azure/webapps-deploy@v3
        id: deploy-to-webapp
        with:
          app-name: ${{ env.WEBAPP_NAME }}
          slot-name: "Production"
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: deployment-package.zip
