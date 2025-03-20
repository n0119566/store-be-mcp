const request = require("supertest");
const dbHandler = require("./setup");
const { app } = require("../../server");
const { Customer } = require("../models");

let server;

beforeAll(async () => {
  await dbHandler.connect();
  server = app.listen(3002);
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase();
  await server.close();
});

describe("Customer API", () => {
  // Test customer data
  const sampleCustomer = {
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
  };

  const multipleCustomers = [
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-765-4321",
      address: {
        street: "456 Oak Ave",
        city: "Somewhere",
        state: "NY",
        zip: "67890",
        country: "USA",
      },
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-987-6543",
      address: {
        street: "789 Pine St",
        city: "Nowhere",
        state: "TX",
        zip: "54321",
        country: "USA",
      },
    },
  ];

  // Test GET all customers
  it("should get all customers", async () => {
    // Add a test customer
    await Customer.create(sampleCustomer);

    // Get all customers
    const res = await request(app).get("/api/customers");

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toEqual(1);
    expect(res.body.data[0].name).toEqual(sampleCustomer.name);
    expect(res.body.data[0].email).toEqual(sampleCustomer.email);
  });

  // Test POST a customer
  it("should create a new customer", async () => {
    const res = await request(app).post("/api/customers").send(sampleCustomer);

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toEqual(sampleCustomer.name);
    expect(res.body.data.email).toEqual(sampleCustomer.email);
  });

  // Test POST multiple customers
  it("should create multiple customers", async () => {
    const res = await request(app)
      .post("/api/customers/batch")
      .send(multipleCustomers);

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toEqual(2);
    expect(res.body.data[0].name).toEqual(multipleCustomers[0].name);
    expect(res.body.data[1].name).toEqual(multipleCustomers[1].name);
  });
});
