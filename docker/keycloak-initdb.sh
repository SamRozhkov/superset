set -e

apt-get update && gpg --keyserver keyserver.ubuntu.com --recv  E88979FB9B30ACF2 && gpg --export --armor E88979FB9B30ACF2 | sudo apt-key add -
#wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg  --dearmor -o /usr/share/keyrings/dart.gpg

apt-get -y install postgresql-client

PGPASSWORD="${POSTGRES_PASSWORD}" psql --username "${POSTGRES_USER}" -h db -p 5432 -d superset <<-EOSQL
  CREATE USER ${KEYCLOAK_DATABASE_USER} WITH PASSWORD '${KEYCLOAK_DATABASE_PASSWORD}';
  CREATE DATABASE ${KEYCLOAK_DATABASE_NAME};
  GRANT ALL PRIVILEGES ON DATABASE ${KEYCLOAK_DATABASE_NAME} TO ${KEYCLOAK_DATABASE_USER};
EOSQL

PGPASSWORD="${KEYCLOAK_DATABASE_PASSWORD}" psql --username "${KEYCLOAK_DATABASE_USER}" -h db -p 5432 -d "${KEYCLOAK_DATABASE_NAME}" <<-EOSQL
   GRANT ALL ON SCHEMA public TO ${KEYCLOAK_DATABASE_USER};
EOSQL
