FROM python

EXPOSE 80
WORKDIR /app
ENV FLASK_APP=/app/app.py

ADD app/requirements.txt .
RUN pip install -r requirements.txt

CMD flask run --host=0.0.0.0 --port=5000