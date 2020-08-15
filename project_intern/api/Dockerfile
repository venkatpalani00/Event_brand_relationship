FROM python:3.6.10

RUN mkdir -p /usr/src/app
WORKDIR  /usr/src/app

COPY requirements.txt /usr/src/app
RUN pip install -r requirements.txt
RUN pip install flask_sqlalchemy

ENTRYPOINT [ "flask" ]
CMD ["run", "--host=0.0.0.0"]