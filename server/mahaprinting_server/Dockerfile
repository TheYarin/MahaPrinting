# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim-buster

EXPOSE 5000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
# RUN mkdir /home/appuser
# RUN useradd appuser && chown -R appuser /app /home/appuser
# USER appuser
# ENV PATH=${PATH}:/home/appuser/.local/bin

# COPY --chown=appuser . /app
COPY . /app

# Install dependencies
RUN pip install pipenv
RUN pipenv install --deploy --ignore-pipfile

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["pipenv", "run", "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
