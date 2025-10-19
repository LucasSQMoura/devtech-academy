# Usa uma imagem leve do Nginx
FROM nginx:alpine

# Copia os arquivos da aplicação para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80
