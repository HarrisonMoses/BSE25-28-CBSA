# Django Project Setup Guide

## Prerequisites
Ensure you have the following installed:
- Python (>=3.1)
- pip (latest version)
- Virtualenv (optional but recommended)
- Git

## Cloning the Repository
```bash
git clone <REPO_URL>
cd BSE25-28CSBA/server
```

## Setting Up a Virtual Environment
It’s recommended to use a virtual environment to manage dependencies.
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

## Installing Dependencies
```bash
pip install -r requirements.txt
```

## Database Migrations
Run migrations to set up the database schema:
```bash
python manage.py migrate
```

## Creating a Superuser (For Admin Access)
```bash
python manage.py createsuperuser
```
Follow the prompts to set up a superuser.

## Running the Development Server
```bash
python manage.py runserver
```
The project should now be accessible at `http://127.0.0.1:8000/`.

## Keeping Dependencies Updated
To update dependencies, run:
```bash
pip install --upgrade -r requirements.txt
```
If new dependencies are added, update `requirements.txt` using:
```bash
pip freeze > requirements.txt
```

## Contributing
- Create a new branch for your changes:
  ```bash
  git checkout -b feature-branch-name
  ```
- Commit changes:
  ```bash
  git commit -m "Description of changes"
  ```
- Push the branch and create a pull request:
  ```bash
  git push origin feature-branch-name
  ```

## Environment Variables
Ensure you have an `.env` file with necessary configurations. Example:
```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
```

## Additional Notes
- Use `black` and `flake8` for code formatting and linting.
- Run tests before pushing changes:
  ```bash
  python manage.py test
  
