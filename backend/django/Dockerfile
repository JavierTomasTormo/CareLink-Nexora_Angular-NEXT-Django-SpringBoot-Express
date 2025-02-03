FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    default-libmysqlclient-dev \
    pkg-config \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
RUN pip install django djangorestframework django-cors-headers psycopg2-binary django-livereload-server django-filter argon2-cffi

EXPOSE 8000

CMD python manage.py livereload & python manage.py runserver 0.0.0.0:8000