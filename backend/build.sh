set -o errexit

pip install -r requirements.txt

python learnthru/manage.py collectstatic --noinput

python learnthru/manage.py migrate --noinput