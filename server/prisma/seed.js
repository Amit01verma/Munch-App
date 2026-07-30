const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
await prisma.orderItem.deleteMany();
await prisma.order.deleteMany();

await prisma.cartItem.deleteMany();
await prisma.cart.deleteMany();

await prisma.product.deleteMany();
await prisma.category.deleteMany();

  // Create Categories
 const burgers = await prisma.category.create({
  data: {
    name: "Burgers",
    image: "/categories/burger.png",
  },
});

const pizzas = await prisma.category.create({
  data: {
    name: "Pizzas",
    image: "/categories/pizza.png",
  },
});

const pasta = await prisma.category.create({
  data: {
    name: "Pasta",
    image: "/categories/pasta.png",
  },
});

const wraps = await prisma.category.create({
  data: {
    name: "Wraps",
    image: "/categories/wrap.png",
  },
});

const fries = await prisma.category.create({
  data: {
    name: "Fries",
    image: "/categories/fries.png",
  },
});

const beverages = await prisma.category.create({
  data: {
    name: "Beverages",
    image: "/categories/drink.png",
  },
});

  // Create Products
  await prisma.product.createMany({
  data: [
    // ================= BURGERS =================

    {
      name: "Classic Burger",
      description: "Juicy grilled beef burger",
      price: 199,
      image: "/foods/burger1.png",
      rating: 4.7,
      isVeg: false,
      categoryId: burgers.id,
    },
    {
      name: "Cheese Burger",
      description: "Loaded with cheese",
      price: 249,
      image: "/foods/burger2.png",
      rating: 4.8,
      isVeg: false,
      categoryId: burgers.id,
    },
    {
      name: "Chicken Burger",
      description: "Crispy chicken burger",
      price: 229,
      image: "/foods/burger3.png",
      rating: 4.8,
      isVeg: false,
      categoryId: burgers.id,
    },
    {
      name: "Veg Supreme Burger",
      description: "Loaded veggie burger",
      price: 189,
      image: "/foods/burger4.png",
      rating: 4.6,
      isVeg: true,
      categoryId: burgers.id,
    },

    // ================= PIZZAS =================

    {
      name: "Veg Pizza",
      description: "Fresh vegetable pizza",
      price: 299,
      image: "/foods/pizza1.png",
      rating: 4.6,
      isVeg: true,
      categoryId: pizzas.id,
    },
    {
      name: "Pepperoni Pizza",
      description: "Loaded pepperoni pizza",
      price: 399,
      image: "/foods/pizza2.png",
      rating: 4.9,
      isVeg: false,
      categoryId: pizzas.id,
    },
    {
      name: "Farmhouse Pizza",
      description: "Loaded with veggies",
      price: 349,
      image: "/foods/pizza3.png",
      rating: 4.8,
      isVeg: true,
      categoryId: pizzas.id,
    },
    {
      name: "BBQ Chicken Pizza",
      description: "BBQ chicken & cheese",
      price: 429,
      image: "/foods/pizza4.png",
      rating: 4.9,
      isVeg: false,
      categoryId: pizzas.id,
    },

    // ================= PASTA =================

    {
      name: "White Sauce Pasta",
      description: "Creamy white sauce pasta",
      price: 279,
      image: "/foods/pasta1.png",
      rating: 4.7,
      isVeg: true,
      categoryId: pasta.id,
    },
    {
      name: "Red Sauce Pasta",
      description: "Classic Italian pasta",
      price: 269,
      image: "/foods/pasta2.png",
      rating: 4.6,
      isVeg: true,
      categoryId: pasta.id,
    },
    {
      name: "Chicken Alfredo",
      description: "Creamy Alfredo pasta",
      price: 329,
      image: "/foods/pasta3.png",
      rating: 4.8,
      isVeg: false,
      categoryId: pasta.id,
    },
    {
      name: "Penne Arrabbiata",
      description: "Spicy tomato pasta",
      price: 289,
      image: "/foods/pasta4.png",
      rating: 4.7,
      isVeg: true,
      categoryId: pasta.id,
    },
  
    // ================= WRAPS =================

    {
      name: "Chicken Wrap",
      description: "Grilled chicken wrap",
      price: 199,
      image: "/foods/wrap1.png",
      rating: 4.7,
      isVeg: false,
      categoryId: wraps.id,
    },
    {
      name: "Paneer Wrap",
      description: "Spicy paneer wrap",
      price: 189,
      image: "/foods/wrap2.png",
      rating: 4.6,
      isVeg: true,
      categoryId: wraps.id,
    },
    {
      name: "Mexican Veg Wrap",
      description: "Loaded with Mexican veggies",
      price: 209,
      image: "/foods/wrap3.png",
      rating: 4.7,
      isVeg: true,
      categoryId: wraps.id,
    },
    {
      name: "BBQ Chicken Wrap",
      description: "BBQ chicken with fresh veggies",
      price: 229,
      image: "/foods/wrap4.png",
      rating: 4.8,
      isVeg: false,
      categoryId: wraps.id,
    },

    // ================= FRIES =================

    {
      name: "French Fries",
      description: "Golden crispy fries",
      price: 129,
      image: "/foods/fries1.png",
      rating: 4.6,
      isVeg: true,
      categoryId: fries.id,
    },
    {
      name: "Peri Peri Fries",
      description: "Spicy peri peri seasoning",
      price: 149,
      image: "/foods/fries2.png",
      rating: 4.8,
      isVeg: true,
      categoryId: fries.id,
    },
    {
      name: "Cheese Fries",
      description: "Loaded with melted cheese",
      price: 169,
      image: "/foods/fries3.png",
      rating: 4.8,
      isVeg: true,
      categoryId: fries.id,
    },
    {
      name: "Loaded Fries",
      description: "Chicken, cheese & sauces",
      price: 219,
      image: "/foods/fries4.png",
      rating: 4.9,
      isVeg: false,
      categoryId: fries.id,
    },

    // ================= BEVERAGES =================

    {
      name: "Coca Cola",
      description: "Chilled soft drink",
      price: 79,
      image: "/foods/drink1.png",
      rating: 4.5,
      isVeg: true,
      categoryId: beverages.id,
    },
    {
      name: "Fresh Lime Soda",
      description: "Refreshing lime soda",
      price: 99,
      image: "/foods/drink2.png",
      rating: 4.7,
      isVeg: true,
      categoryId: beverages.id,
    },
    {
      name: "Chocolate Milkshake",
      description: "Rich chocolate milkshake",
      price: 159,
      image: "/foods/drink3.png",
      rating: 4.8,
      isVeg: true,
      categoryId: beverages.id,
    },
    {
      name: "Cold Coffee",
      description: "Creamy cold coffee",
      price: 149,
      image: "/foods/drink4.png",
      rating: 4.8,
      isVeg: true,
      categoryId: beverages.id,
    },
  ],
});

console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });