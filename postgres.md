Connecting Postgres on Mac
==========================
```
brew update
brew install postgresql
psql
```
This will take you to a Postegres CLI wher you can issue commands to Postgres, including SQL
statements.

`\l` - Lists all databases

`CREATE DATABASE <database_name>;` (replace `<database_name>` with the new name you'd like to use
for your database)

`use <database_name>;` - Switchtes you to the database you just created

`CREATE TABLE foo (id SERIAL);` - Create your first table

`\dt` - List tables

`DROP TABLE foo;` - Drop the table you created

Creating Relations Between Tables
---------------------------------

```sql
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(255),
    city CHARACTER VARYING(100),
    state_code CHARACTER VARYING(2)
);
```

```sql
CREATE TABLE employees (
    id SERIAL, 
    first_name CHARACTER VARYING(100), 
    middle_initial CHARACTER VARYING(3), 
    last_name CHARACTER VARYING(100),
    company_id INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT fk_companies
        FOREIGN KEY (company_id)
        REFERENCEs companies (id)
);
```sql
create an employees table with an auto-incrementing `id`, and name fields

`ALTER TABLE employees ADD COLUMN companyId `

Insert Data Into Table
----------------------
```sql
INSERT INTO companies (name, city, state_code) VALUES ('Foo Company', 'Foosboro', 'FL');
```

```sql
INSERT INTO employees (first_name, middle_initial, last_name, company_id) 
    VALUES ('Darnell', 'LC', 'Arford', (
        SELECT id FROM companies WHERE city='Foosboro')
    ), ('Foo', 'B', 'Baz', NULL);
```
Note: You can comma-separate additional rows in the same statement.

Query Relations
---------------

```sql
SELECT * FROM employees, companies WHERE employees.company_id = companies.id;
```

Inner join:
```sql
SELECT * FROM employees LEFT OUTER JOIN companies ON employees.company_id = companies.id;
```
