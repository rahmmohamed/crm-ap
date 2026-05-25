CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- USERS (équipe / login)
-- =========================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user', 
  -- admin | user | manager

  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- CUSTOMERS
-- =========================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  created_by UUID REFERENCES users(id) ON DELETE SET NULL,

  name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(30),
  company VARCHAR(150),

  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  created_by UUID REFERENCES users(id) ON DELETE SET NULL,

  name VARCHAR(150) NOT NULL,
  price NUMERIC DEFAULT 0,
  description TEXT,
  stock INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- DEALS
-- =========================
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,

  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,

  title VARCHAR(150) NOT NULL,

  status VARCHAR(30) DEFAULT 'new',
  -- new | negotiating | won | lost

  value NUMERIC DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- ACTIONS (activity log)
-- =========================
CREATE TABLE actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,

  type VARCHAR(50) NOT NULL,
  -- call | email | meeting | note | update

  description TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);