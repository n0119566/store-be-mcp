const request = require('supertest');
const dbHandler = require('./setup');
const { app } = require('../index');
const { Product } = require('../models');

let server;

beforeAll(async () => {
  await dbHandler.connect();
  server = app.listen(3001);
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase();
  await server.close();
});

describe('Product API', () => {
  // Test product data
  const sampleProduct = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 99.99,
    category: 'Electronics',
    inStock: true
  };

  const multipleProducts = [
    {
      name: 'Product 1',
      description: 'Description 1',
      price: 10.99,
      category: 'Category 1',
      inStock: true
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      price: 20.99,
      category: 'Category 2',
      inStock: false
    }
  ];

  // Test GET all products
  it('should get all products', async () => {
    // Add a test product
    await Product.create(sampleProduct);

    // Get all products
    const res = await request(app).get('/api/products');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toEqual(1);
    expect(res.body.data[0].name).toEqual(sampleProduct.name);
  });

  // Test POST a product
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send(sampleProduct);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toEqual(sampleProduct.name);
    expect(res.body.data.price).toEqual(sampleProduct.price);
  });

  // Test POST multiple products
  it('should create multiple products', async () => {
    const res = await request(app)
      .post('/api/products/batch')
      .send(multipleProducts);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toEqual(2);
    expect(res.body.data[0].name).toEqual(multipleProducts[0].name);
    expect(res.body.data[1].name).toEqual(multipleProducts[1].name);
  });
});