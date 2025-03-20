const mongoose = require('mongoose');
const { Product, Customer, Order } = require('../models');
const connectDB = require('../config/db');

// Connect to MongoDB
connectDB();

// Sample data
// Generate more products
const createProducts = () => {
  const baseProducts = [
    {
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 999.99,
      category: 'Electronics',
      inStock: true
    },
    {
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      price: 1499.99,
      category: 'Electronics',
      inStock: true
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones',
      price: 299.99,
      category: 'Electronics',
      inStock: true
    },
    {
      name: 'Smart Watch',
      description: 'Fitness and health tracking smartwatch',
      price: 249.99,
      category: 'Electronics',
      inStock: true
    },
    {
      name: 'Digital Camera',
      description: 'Professional digital camera with 4K video',
      price: 799.99,
      category: 'Electronics',
      inStock: false
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof bluetooth speaker',
      price: 129.99,
      category: 'Electronics',
      inStock: true
    },
    {
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with timer',
      price: 79.99,
      category: 'Home Appliances',
      inStock: true
    },
    {
      name: 'Blender',
      description: 'High-speed blender for smoothies and more',
      price: 89.99,
      category: 'Home Appliances',
      inStock: true
    },
    {
      name: 'Robot Vacuum',
      description: 'Smart robot vacuum with mapping technology',
      price: 349.99,
      category: 'Home Appliances',
      inStock: false
    },
    {
      name: 'Air Purifier',
      description: 'HEPA air purifier for cleaner air',
      price: 199.99,
      category: 'Home Appliances',
      inStock: true
    }
  ];

  // Additional product categories and variations
  const categories = ['Electronics', 'Home Appliances', 'Clothing', 'Furniture', 'Books', 'Sports Equipment', 'Toys', 'Beauty', 'Jewelry', 'Food & Beverage'];
  const adjectives = ['Premium', 'Deluxe', 'Ultra', 'Advanced', 'Professional', 'Essential', 'Luxury', 'Smart', 'Eco-friendly', 'Compact'];
  const productTypes = [
    {category: 'Electronics', items: ['Tablet', 'Gaming Console', 'TV', 'Drone', 'Earbuds', 'Computer Mouse', 'Keyboard', 'Monitor', 'Printer', 'Router']},
    {category: 'Home Appliances', items: ['Microwave', 'Dishwasher', 'Refrigerator', 'Toaster', 'Vacuum Cleaner', 'Air Conditioner', 'Heater', 'Mixer', 'Kettle', 'Food Processor']},
    {category: 'Clothing', items: ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Sweater', 'Shorts', 'Socks', 'Hat', 'Gloves', 'Scarf']},
    {category: 'Furniture', items: ['Sofa', 'Chair', 'Table', 'Bed', 'Desk', 'Bookshelf', 'Cabinet', 'Ottoman', 'Dresser', 'Nightstand']},
    {category: 'Books', items: ['Fiction Novel', 'Cookbook', 'Biography', 'Self-Help Book', 'History Book', 'Science Book', 'Travel Guide', 'Art Book', 'Children\'s Book', 'Reference Book']},
    {category: 'Sports Equipment', items: ['Yoga Mat', 'Dumbbells', 'Basketball', 'Tennis Racket', 'Soccer Ball', 'Bicycle', 'Treadmill', 'Golf Clubs', 'Swimming Goggles', 'Hiking Backpack']},
    {category: 'Toys', items: ['Action Figure', 'Board Game', 'Puzzle', 'Stuffed Animal', 'Building Blocks', 'Remote Control Car', 'Doll', 'Educational Toy', 'Card Game', 'Video Game']},
    {category: 'Beauty', items: ['Shampoo', 'Face Cream', 'Perfume', 'Makeup Kit', 'Hair Dryer', 'Razor', 'Nail Polish', 'Face Mask', 'Sunscreen', 'Toothbrush']},
    {category: 'Jewelry', items: ['Necklace', 'Bracelet', 'Earrings', 'Ring', 'Watch', 'Anklet', 'Brooch', 'Pendant', 'Cufflinks', 'Tiara']},
    {category: 'Food & Beverage', items: ['Coffee Beans', 'Tea Set', 'Chocolate Box', 'Wine Bottle', 'Specialty Cookies', 'Olive Oil', 'Spice Kit', 'Gourmet Cheese', 'Dried Fruits', 'Nut Assortment']}
  ];
  
  const allProducts = [...baseProducts];
  
  // Add 200 more products
  for (let i = 0; i < 200; i++) {
    const categoryObj = productTypes[Math.floor(Math.random() * productTypes.length)];
    const category = categoryObj.category;
    const item = categoryObj.items[Math.floor(Math.random() * categoryObj.items.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    // Generate price between $5 and $2000
    const price = parseFloat((Math.random() * 1995 + 5).toFixed(2));
    
    // Determine if in stock (70% chance)
    const inStock = Math.random() > 0.3;
    
    allProducts.push({
      name: `${adjective} ${item}`,
      description: `${adjective} quality ${item.toLowerCase()} with exceptional features`,
      price,
      category,
      inStock
    });
  }
  
  return allProducts;
};

const products = createProducts();

// Generate more customers
const createCustomers = () => {
  const baseCustomers = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '555-123-4567',
      address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
        zip: '02108',
        country: 'USA'
      }
    },
    {
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phone: '555-234-5678',
      address: {
        street: '456 Oak Ave',
        city: 'San Francisco',
        state: 'CA',
        zip: '94107',
        country: 'USA'
      }
    },
    {
      name: 'Michael Williams',
      email: 'michael.williams@example.com',
      phone: '555-345-6789',
      address: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        country: 'USA'
      }
    },
    {
      name: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      phone: '555-456-7890',
      address: {
        street: '101 Elm Blvd',
        city: 'Seattle',
        state: 'WA',
        zip: '98101',
        country: 'USA'
      }
    },
    {
      name: 'David Miller',
      email: 'david.miller@example.com',
      phone: '555-567-8901',
      address: {
        street: '202 Maple Dr',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        country: 'USA'
      }
    }
  ];

  // Data for generating random customers
  const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 
                      'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
                      'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Margaret', 'Mark', 'Betty', 'Donald', 'Sandra',
                      'Steven', 'Ashley', 'Paul', 'Dorothy', 'Andrew', 'Kimberly', 'Joshua', 'Emily', 'Kenneth', 'Donna'];
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
                    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
                    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'];
  
  const streetNames = ['Main St', 'Oak Ave', 'Pine St', 'Maple Dr', 'Cedar Ln', 'Elm Blvd', 'Washington Ave', 'Park Rd', 'Lake St', 'River Rd',
                      'Highland Ave', 'Valley View Dr', 'Sunset Blvd', 'Mountain Rd', 'Spring St', 'Willow Way', 'Meadow Ln', 'Forest Dr', 'Ocean Ave', 'Beach Rd'];
  
  const cities = [
    {city: 'New York', state: 'NY', zip: '10001'},
    {city: 'Los Angeles', state: 'CA', zip: '90001'},
    {city: 'Chicago', state: 'IL', zip: '60601'},
    {city: 'Houston', state: 'TX', zip: '77001'},
    {city: 'Phoenix', state: 'AZ', zip: '85001'},
    {city: 'Philadelphia', state: 'PA', zip: '19101'},
    {city: 'San Antonio', state: 'TX', zip: '78201'},
    {city: 'San Diego', state: 'CA', zip: '92101'},
    {city: 'Dallas', state: 'TX', zip: '75201'},
    {city: 'San Jose', state: 'CA', zip: '95101'},
    {city: 'Austin', state: 'TX', zip: '78701'},
    {city: 'Jacksonville', state: 'FL', zip: '32201'},
    {city: 'Fort Worth', state: 'TX', zip: '76101'},
    {city: 'Columbus', state: 'OH', zip: '43201'},
    {city: 'Indianapolis', state: 'IN', zip: '46201'},
    {city: 'Charlotte', state: 'NC', zip: '28201'},
    {city: 'Seattle', state: 'WA', zip: '98101'},
    {city: 'Denver', state: 'CO', zip: '80201'},
    {city: 'Boston', state: 'MA', zip: '02108'},
    {city: 'Portland', state: 'OR', zip: '97201'}
  ];
  
  const allCustomers = [...baseCustomers];
  
  // Add 50 more customers
  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}@example.com`;
    const phone = `555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    const streetNumber = Math.floor(Math.random() * 9000) + 1000;
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    const cityInfo = cities[Math.floor(Math.random() * cities.length)];
    
    allCustomers.push({
      name,
      email,
      phone,
      address: {
        street: `${streetNumber} ${streetName}`,
        city: cityInfo.city,
        state: cityInfo.state,
        zip: cityInfo.zip,
        country: 'USA'
      }
    });
  }
  
  return allCustomers;
};

const customers = createCustomers();

// Function to generate orders once we have customers and products
const generateOrders = (customers, products) => {
  const orders = [];
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const paymentMethods = ['credit_card', 'debit_card', 'paypal'];
  
  for (let i = 0; i < 520; i++) { // Increased from 20 to 520 orders (500 more)
    // Randomly select a customer
    const customer = customers[Math.floor(Math.random() * customers.length)];
    
    // Randomly select 1-3 products for this order
    const numProducts = Math.floor(Math.random() * 3) + 1;
    const orderProducts = [];
    const usedProductIndices = new Set();
    
    for (let j = 0; j < numProducts; j++) {
      let productIndex;
      do {
        productIndex = Math.floor(Math.random() * products.length);
      } while (usedProductIndices.has(productIndex));
      
      usedProductIndices.add(productIndex);
      const product = products[productIndex];
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      orderProducts.push({
        product: product._id,
        quantity: quantity,
        price: product.price
      });
    }
    
    // Calculate total amount
    const totalAmount = orderProducts.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    // Create the order
    orders.push({
      customer: customer._id,
      items: orderProducts,
      totalAmount: Number(totalAmount.toFixed(2)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
    });
  }
  
  return orders;
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Promise.all([
      Product.deleteMany({}),
      Customer.deleteMany({}),
      Order.deleteMany({})
    ]);
    
    console.log('Previous data deleted');
    
    // Insert new data
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} products inserted`);
    
    const insertedCustomers = await Customer.insertMany(customers);
    console.log(`${insertedCustomers.length} customers inserted`);
    
    const orders = generateOrders(insertedCustomers, insertedProducts);
    const insertedOrders = await Order.insertMany(orders);
    console.log(`${insertedOrders.length} orders inserted`);
    
    console.log('Database seeded successfully!');
    
    // Disconnect from database
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();