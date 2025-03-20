const request = require('supertest');
const dbHandler = require('./setup');
const { app } = require('../index');
const { Customer, Product, Order } = require('../models');

let server;

beforeAll(async () => {
  await dbHandler.connect();
  server = app.listen(3003);
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase();
  await server.close();
});

describe('Order API', () => {
  let customer;
  let product1;
  let product2;
  
  // Set up test data before each test
  beforeEach(async () => {
    // Create a test customer
    customer = await Customer.create({
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '555-555-5555',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
        country: 'Test Country'
      }
    });
    
    // Create test products
    product1 = await Product.create({
      name: 'Test Product 1',
      description: 'Test description 1',
      price: 9.99,
      category: 'Test Category',
      inStock: true
    });
    
    product2 = await Product.create({
      name: 'Test Product 2',
      description: 'Test description 2',
      price: 19.99,
      category: 'Test Category',
      inStock: true
    });
  });
  
  // Test order data
  const createOrderData = (customerId, product1Id, product2Id) => ({
    customer: customerId,
    items: [
      {
        product: product1Id,
        quantity: 2,
        price: 9.99
      },
      {
        product: product2Id,
        quantity: 1,
        price: 19.99
      }
    ],
    totalAmount: 39.97,
    status: 'pending',
    paymentMethod: 'credit_card'
  });
  
  // Test GET all orders
  it('should get all orders', async () => {
    // Create a test order
    const orderData = createOrderData(customer._id, product1._id, product2._id);
    await Order.create(orderData);
    
    // Get all orders
    const res = await request(app).get('/api/orders');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toEqual(1);
    expect(res.body.data[0].totalAmount).toEqual(orderData.totalAmount);
  });
  
  // Test POST an order
  it('should create a new order', async () => {
    const orderData = createOrderData(customer._id, product1._id, product2._id);
    
    const res = await request(app)
      .post('/api/orders')
      .send(orderData);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalAmount).toEqual(orderData.totalAmount);
    expect(res.body.data.items.length).toEqual(2);
  });
  
  // Test POST multiple orders
  it('should create multiple orders', async () => {
    const orderData1 = createOrderData(customer._id, product1._id, product2._id);
    const orderData2 = {
      ...createOrderData(customer._id, product1._id, product2._id),
      status: 'processing',
      totalAmount: 29.97
    };
    
    const res = await request(app)
      .post('/api/orders/batch')
      .send([orderData1, orderData2]);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toEqual(2);
    expect(res.body.data[0].status).toEqual(orderData1.status);
    expect(res.body.data[1].status).toEqual(orderData2.status);
  });
});