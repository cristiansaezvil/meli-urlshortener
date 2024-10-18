# meli-urlshortener
Challenge Meli - URL Shortener

**Endpoints de la app UrlShortener**

NOTA :El microservicio está desplegado como un CludRun, por lo cual al momento de realizar una prueba  
puede ser que en la primera llamada tarde en contestar, ya que no tiene instancias por defecto ;).

##############################################################################################

**Crear una URL Short**

ParamsBody:

*   url        :URL larga
*   owner  :Un identificador de quien crea la URL
*   status  :Si la URL estara activa (ENABLED|DISABLED)

```plaintext
curl --location 'https://www.youtube.com/watch?v=CANh13XKFVk' 
--header 'Content-Type: application/json' 
--data '{
"url": "https://www.youtube.com/watch?v=EqQuihD0hoI&list=RD0ySpk3ErFd0&index=2",
"owner": "3430240a-ec2d-4168-a5e5-585e9e36dc74",
"status": "ENABLED"
```

##############################################################################################  
**Update de una URL short**
**Endpoints de la app UrlShortener**

NOTA :El microservicio está desplegado como un CludRun, por lo cual al momento de realizar una prueba  
puede ser que en la primera llamada tarde en contestar, ya que no tiene instancias por defecto ;).

##############################################################################################

**Crear una URL Short**

ParamsBody:

*   url        :URL larga
*   owner  :Un identificador de quien crea la URL
*   status  :Si la URL estara activa (ENABLED|DISABLED)

```plaintext
curl --location 'https://www.youtube.com/watch?v=CANh13XKFVk' 
--header 'Content-Type: application/json' 
--data '{
"url": "https://www.youtube.com/watch?v=EqQuihD0hoI&list=RD0ySpk3ErFd0&index=2",
"owner": "3430240a-ec2d-4168-a5e5-585e9e36dc74",
"status": "ENABLED"
```

##############################################################################################  
**Update de una URL short**

ParamsPath:

*   id : ID del la URL corta

ParamsBody:

*   url        :Nueva URL de destino
*   status  :Si se quiere deshabilitar o habilitar (ENABLED|DISABLED)
*   id         :Identificador de la URL corta

```plaintext
curl --location --request PATCH 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener/oiV1Nl9' 
--header 'Content-Type: application/json' 
--data '{
"url": "https://www.youtube.com/watch/xxx/cxxxx",
"owner": "22e7e6ef-a71a-4813-b06d-a9cc5af69ba7",
"status": "ENABLED",
"id": "oiV1Nl9"
}'
```

##############################################################################################  
**Eliminar URL**

ParamsPath:

*   id: identificador de la URL corta

```plaintext
curl --location --request DELETE 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener/oiV1Nl9'
```

##############################################################################################  
\### **Paths auxiliares**  
##############################################################################################  
**Redirección**

ParamQuery

*   url: URL corta

```plaintext
curl --location 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener/redirect/short?url=https%3A%2F%2Fshort.cm%2FoiV1Nl9'
```

##############################################################################################  
**Listar los Id de URL cortas**

```plaintext
curl --location 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener'
```
ParamsPath:

*   id : ID del la URL corta

ParamsBody:

*   url        :Nueva URL de destino
*   status  :Si se quiere deshabilitar o habilitar (ENABLED|DISABLED)
*   id         :Identificador de la URL corta

```plaintext
curl --location --request PATCH 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener/oiV1Nl9' 
--header 'Content-Type: application/json' 
--data '{
"url": "https://www.youtube.com/watch/xxx/cxxxx",
"owner": "22e7e6ef-a71a-4813-b06d-a9cc5af69ba7",
"status": "ENABLED",
"id": "oiV1Nl9"
}'
```

##############################################################################################  
**Eliminar URL**

ParamsPath:

*   id: identificador de la URL corta

```plaintext
curl --location --request DELETE 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener/oiV1Nl9'
```

##############################################################################################  
\### **Paths auxiliares**  
##############################################################################################  
**Redirección**

ParamQuery

*   url: URL corta

```plaintext
curl --location 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener/redirect/short?url=https%3A%2F%2Fshort.cm%2FoiV1Nl9'
```

##############################################################################################  
**Listar los Id de URL cortas**

```plaintext
curl --location 'https://meli-urlshortener-794507061501.us-central1.run.app/url-shortener'
```
