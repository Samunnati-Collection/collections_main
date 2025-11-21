CREATE TABLE users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text, email text UNIQUE, role text);
CREATE TABLE loans (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), accountnumber text, principal numeric, outstanding numeric, "status" text, "userId" uuid REFERENCES users(id));
CREATE TABLE collections (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), "dueDate" timestamptz, "amountDue" numeric, "status" text, "loanId" uuid REFERENCES loans(id));
CREATE TABLE payments (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), method text, reference text, amount numeric, "status" text, "settledAt" timestamptz, "collectionId" uuid REFERENCES collections(id));
