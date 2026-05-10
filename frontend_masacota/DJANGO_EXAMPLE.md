# Ejemplo de Configuración Django para el Frontend

## Backend Django - URLs y Vistas

### 1. `urls.py` - Configurar las rutas

```python
from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login_view, name='login'),
    path('api/locations/', views.get_locations, name='get_locations'),
]
```

### 2. `views.py` - Implementar los endpoints

```python
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json
from rest_framework.authtoken.models import Token

# Endpoint de Login
@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        # Buscar usuario por email
        from django.contrib.auth.models import User
        try:
            user = User.objects.get(email=email)
            # Verificar contraseña
            if user.check_password(password):
                # Generar o obtener token
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({
                    'token': token.key,
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'name': user.first_name or user.username
                    }
                }, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

# Endpoint de Ubicaciones
@require_http_methods(["GET"])
def get_locations(request):
    try:
        from .models import Location  # Asegúrate que existe este modelo
        locations = Location.objects.all().values()
        return JsonResponse(list(locations), safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
```

### 3. `models.py` - Crear modelo Location (si no existe)

```python
from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    lat = models.FloatField()
    lng = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Ubicación"
        verbose_name_plural = "Ubicaciones"
```

### 4. `settings.py` - Configuración CORS

```python
# Instalar primero: pip install django-cors-headers

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # Si usas Django REST Framework
    'corsheaders',     # CORS
    'rest_framework.authtoken',  # Para Token Auth
    'tu_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Debe estar al inicio
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",     # Frontend local
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    # Agregar tu dominio en producción
]

CORS_ALLOW_CREDENTIALS = True

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## Pasos de Instalación

1. **Instalar dependencias:**
   ```bash
   pip install django-cors-headers djangorestframework
   ```

2. **Aplicar migraciones:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Crear datos de prueba (opcional):**
   ```bash
   python manage.py shell
   ```
   
   En el shell:
   ```python
   from tu_app.models import Location
   
   Location.objects.create(
       name="Main Branch",
       address="123 Pet Street, City",
       phone="+098987 876 767",
       email="info@website.com",
       lat=40.7128,
       lng=-74.0060
   )
   
   Location.objects.create(
       name="Downtown Branch",
       address="456 Animal Ave, City",
       phone="+098987 876 768",
       email="downtown@website.com",
       lat=40.7505,
       lng=-73.9972
   )
   ```

4. **Ejecutar el servidor:**
   ```bash
   python manage.py runserver
   ```

## Testing de Endpoints

### Usar Postman o cURL

**Login:**
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Get Locations:**
```bash
curl http://localhost:8000/api/locations/
```

## Alternativa con Django REST Framework

Si prefieres usar Django REST Framework:

```python
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Location
from .serializers import LocationSerializer

@api_view(['GET'])
def get_locations(request):
    locations = Location.objects.all()
    serializer = LocationSerializer(locations, many=True)
    return Response(serializer.data)
```

---

¡Con esto tu frontend React estará completamente conectado con Django! 🎉
