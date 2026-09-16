export const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Smart devices, gadgets and electronic accessories.",
    icon: "Laptop",
    color: "#d93f68"
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, footwear and fashion accessories.",
    icon: "Shirt",
    color: "#7c5cff"
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Furniture, kitchen and home essentials.",
    icon: "Home",
    color: "#20a66a"
  },
  {
    id: 4,
    name: "Beauty",
    description: "Beauty, skincare and personal care products.",
    icon: "Sparkles",
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "Sports",
    description: "Sports equipment, fitness and outdoor products.",
    icon: "Dumbbell",
    color: "#3b82f6"
  }
];

export const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    categoryId: 1,
    sku: "ELEC-001",
    price: 89.99,
    stock: 42,
    status: "Active",
    sales: 248,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    categoryId: 1,
    sku: "ELEC-002",
    price: 129.99,
    stock: 18,
    status: "Active",
    sales: 189,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Laptop Pro 14",
    categoryId: 1,
    sku: "ELEC-003",
    price: 1199,
    stock: 7,
    status: "Active",
    sales: 92,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Classic T-Shirt",
    categoryId: 2,
    sku: "FASH-001",
    price: 29.99,
    stock: 76,
    status: "Active",
    sales: 341,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Running Shoes",
    categoryId: 2,
    sku: "FASH-002",
    price: 79.99,
    stock: 32,
    status: "Active",
    sales: 214,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Modern Chair",
    categoryId: 3,
    sku: "HOME-001",
    price: 149.99,
    stock: 12,
    status: "Active",
    sales: 86,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Skin Care Set",
    categoryId: 4,
    sku: "BEAU-001",
    price: 49.99,
    stock: 28,
    status: "Active",
    sales: 165,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Fitness Dumbbells",
    categoryId: 5,
    sku: "SPRT-001",
    price: 59.99,
    stock: 21,
    status: "Active",
    sales: 128,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80"
  }
];

export const initialOrders = [
  {
    id: "ORD-1048",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    date: "Sep 15, 2026",
    amount: 249.98,
    status: "Processing"
  },
  {
    id: "ORD-1047",
    customer: "James Brown",
    email: "james@example.com",
    date: "Sep 15, 2026",
    amount: 89.99,
    status: "Completed"
  },
  {
    id: "ORD-1046",
    customer: "Emily Davis",
    email: "emily@example.com",
    date: "Sep 14, 2026",
    amount: 1199,
    status: "Completed"
  },
  {
    id: "ORD-1045",
    customer: "Michael Smith",
    email: "michael@example.com",
    date: "Sep 14, 2026",
    amount: 79.99,
    status: "Pending"
  },
  {
    id: "ORD-1044",
    customer: "Olivia Johnson",
    email: "olivia@example.com",
    date: "Sep 13, 2026",
    amount: 179.98,
    status: "Cancelled"
  }
];

export const initialCustomers = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    orders: 18,
    spent: 1849.5,
    status: "Active"
  },
  {
    id: 2,
    name: "James Brown",
    email: "james@example.com",
    orders: 12,
    spent: 978.2,
    status: "Active"
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily@example.com",
    orders: 24,
    spent: 3250.75,
    status: "Active"
  },
  {
    id: 4,
    name: "Michael Smith",
    email: "michael@example.com",
    orders: 7,
    spent: 492.25,
    status: "Inactive"
  },
  {
    id: 5,
    name: "Olivia Johnson",
    email: "olivia@example.com",
    orders: 15,
    spent: 1420.8,
    status: "Active"
  }
];