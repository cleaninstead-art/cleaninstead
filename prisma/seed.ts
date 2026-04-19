import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.tip.deleteMany();
  await prisma.message.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.review.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.cleanerJob.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.cleanerProfile.deleteMany();
  await prisma.user.deleteMany();

  // ============ USERS ============
  const admin = await prisma.user.create({
    data: {
      email: "admin@cleaninstead.com",
      name: "Admin User",
      password: "hashed_password_admin",
      role: "admin",
      phone: "604-555-0001",
    },
  });

  const cleanerMaria = await prisma.user.create({
    data: {
      email: "maria@cleaninstead.com",
      name: "Maria Santos",
      password: "hashed_password_maria",
      role: "cleaner",
      phone: "604-555-1234",
      isAvailable: true,
      ecoOnly: true,
    },
  });

  const cleanerJames = await prisma.user.create({
    data: {
      email: "james@cleaninstead.com",
      name: "James Wilson",
      password: "hashed_password_james",
      role: "cleaner",
      phone: "604-555-3456",
      isAvailable: true,
      ecoOnly: false,
    },
  });

  const cleanerSarah = await prisma.user.create({
    data: {
      email: "sarah@cleaninstead.com",
      name: "Sarah Chen",
      password: "hashed_password_sarah",
      role: "cleaner",
      phone: "604-555-5678",
      isAvailable: true,
      ecoOnly: true,
    },
  });

  const cleanerTom = await prisma.user.create({
    data: {
      email: "tom@cleaninstead.com",
      name: "Tom Baker",
      password: "hashed_password_tom",
      role: "cleaner",
      phone: "604-555-6789",
      isAvailable: false,
      ecoOnly: true,
    },
  });

  await prisma.cleanerProfile.createMany([
    {
      userId: cleanerMaria.id,
      rating: 4.9,
      totalJobs: 142,
      totalEarnings: 18420,
      joinDate: "2023-03-15",
      bio: "Professional eco-friendly cleaner with 3 years of experience.",
      skills: "Regular Cleaning,Deep Cleaning,Eco-Friendly,Move In/Out,Office Cleaning",
      serviceAreas: "Surrey,Vancouver,Burnaby,Richmond",
      isTopRated: true,
    },
    {
      userId: cleanerJames.id,
      rating: 4.7,
      totalJobs: 98,
      totalEarnings: 12600,
      joinDate: "2023-08-01",
      bio: "Specialized in deep cleaning and move-in/move-out services.",
      skills: "Deep Cleaning,Regular Cleaning,Eco-Friendly",
      serviceAreas: "Vancouver,Burnaby,Coquitlam",
      isTopRated: false,
    },
    {
      userId: cleanerSarah.id,
      rating: 4.8,
      totalJobs: 76,
      totalEarnings: 9400,
      joinDate: "2024-01-10",
      bio: "Detail-oriented cleaner specializing in residential and commercial spaces.",
      skills: "Regular Cleaning,Deep Cleaning,Eco-Friendly,Move In/Out",
      serviceAreas: "Vancouver,Richmond,Surrey",
      isTopRated: false,
    },
  ]);

  // Customers
  const customerAmanda = await prisma.user.create({
    data: {
      email: "amanda@example.com",
      name: "Amanda Johnson",
      password: "hashed_password_amanda",
      role: "customer",
      phone: "604-555-7890",
      address: "123 Elm Street",
      city: "Surrey",
    },
  });

  const customerBob = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob Martinez",
      password: "hashed_password_bob",
      role: "customer",
      phone: "604-555-2345",
      address: "456 Oak Avenue",
      city: "Vancouver",
    },
  });

  const customerCarol = await prisma.user.create({
    data: {
      email: "carol@example.com",
      name: "Carol Williams",
      password: "hashed_password_carol",
      role: "customer",
      phone: "604-555-4567",
      address: "789 Pine Road",
      city: "Burnaby",
    },
  });

  const customerDavid = await prisma.user.create({
    data: {
      email: "david@example.com",
      name: "David Thompson",
      password: "hashed_password_david",
      role: "customer",
      phone: "604-555-8901",
      address: "101 Birch Way",
      city: "Richmond",
    },
  });

  const customerEmma = await prisma.user.create({
    data: {
      email: "emma@example.com",
      name: "Emma Davis",
      password: "hashed_password_elena",
      role: "customer",
      phone: "604-555-3210",
      address: "222 Spruce Court",
      city: "Vancouver",
    },
  });

  const customerFrank = await prisma.user.create({
    data: {
      email: "frank@example.com",
      name: "Frank Miller",
      password: "hashed_password_frank",
      role: "customer",
      phone: "604-555-5432",
      address: "555 Willow St",
      city: "Surrey",
    },
  });

  const customerGrace = await prisma.user.create({
    data: {
      email: "grace@example.com",
      name: "Grace Kim",
      password: "hashed_password_grace",
      role: "customer",
      phone: "604-555-6543",
      address: "888 Aspen Drive",
      city: "Burnaby",
    },
  });

  const customerHannah = await prisma.user.create({
    data: {
      email: "hannah@example.com",
      name: "Hannah Brown",
      password: "hashed_password_hannah",
      role: "customer",
      phone: "604-555-7654",
      address: "444 Poplar Ave",
      city: "Vancouver",
    },
  });

  const customerIvan = await prisma.user.create({
    data: {
      email: "ivan@example.com",
      name: "Ivan Chen",
      password: "hashed_password_ivan",
      role: "customer",
      phone: "604-555-8765",
      address: "777 Juniper St",
      city: "Surrey",
    },
  });

  const customerJulia = await prisma.user.create({
    data: {
      email: "julia@example.com",
      name: "Julia Park",
      password:hashed_password_julia,
      role: "customer",
      phone: "604-555-9876",
      address: "333 Hickory Lane",
      city: "Richmond",
    },
  });

  const customerKevin = await prisma.user.create({
    data: {
      email: "kevin@example.com",
      name: "Kevin White",
      password: "hashed_password_kevin",
      role: "customer",
      phone: "604-555-0987",
      address: "999 Redwood Rd",
      city: "Burnaby",
    },
  });

  const customerLaura = await prisma.user.create({
    data: {
      email: "laura@example.com",
      name: "Laura Scott",
      password: "hashed_password_laura",
      role: "customer",
      phone: "604-555-1098",
      address: "111 Chestnut Pl",
      city: "Vancouver",
    },
  });

  await prisma.customerProfile.createMany([
    { userId: customerAmanda.id, totalBookings: 12, loyaltyPoints: 60, totalCleans: 15, referralCode: "AMANDA12", preferredTime: "morning", petFriendly: true, ecoProducts: true },
    { userId: customerBob.id, totalBookings: 8, loyaltyPoints: 40, totalCleans: 10, referralCode: "BOB25", preferredTime: "afternoon", petFriendly: false, ecoProducts: false },
    { userId: customerCarol.id, totalBookings: 15, loyaltyPoints: 75, totalCleans: 20, referralCode: "CAROL88", preferredTime: "morning", petFriendly: true, ecoProducts: true },
    { userId: customerDavid.id, totalBookings: 6, loyaltyPoints: 30, totalCleans: 8, referralCode: "DAVID07", preferredTime: "evening", petFriendly: true, ecoProducts: false },
    { userId: customerEmma.id, totalBookings: 4, loyaltyPoints: 20, totalCleans: 5, referralCode: "EMMA44", preferredTime: "morning", petFriendly: false, ecoProducts: true },
    { userId: customerFrank.id, totalBookings: 10, loyaltyPoints: 50, totalCleans: 13, referralCode: "FRANK99", preferredTime: "afternoon", petFriendly: true, ecoProducts: false },
    { userId: customerGrace.id, totalBookings: 3, loyaltyPoints: 15, totalCleans: 4, referralCode: "GRACE56", preferredTime: "morning", petFriendly: true, ecoProducts: true },
    { userId: customerHannah.id, totalBookings: 5, loyaltyPoints: 25, totalCleans: 6, referralCode: "HANNAH3", preferredTime: "afternoon", petFriendly: false, ecoProducts: true },
    { userId: customerIvan.id, totalBookings: 7, loyaltyPoints: 35, totalCleans: 9, referralCode: "IVAN21", preferredTime: "morning", petFriendly: true, ecoProducts: false },
    { userId: customerJulia.id, totalBookings: 2, loyaltyPoints: 10, totalCleans: 3, referralCode: "JULIA67", preferredTime: "evening", petFriendly: true, ecoProducts: true },
    { userId: customerKevin.id, totalBookings: 9, loyaltyPoints: 45, totalCleans: 12, referralCode: "KEVIN33", preferredTime: "morning", petFriendly: false, ecoProducts: false },
    { userId: customerLaura.id, totalBookings: 11, loyaltyPoints: 55, totalCleans: 14, referralCode: "LAURA77", preferredTime: "afternoon", petFriendly: true, ecoProducts: true },
  ]);

  // ============ BOOKINGS ============
  const bookingData = [
    { num: 1028, customerId: customerLaura.id, cleanerId: cleanerSarah.id, service: "Regular Clean", date: "2026-03-22", start: "9:00 AM", end: "11:00 AM", amount: 120, address: "456 Oak Avenue, Vancouver", city: "Vancouver", status: "completed" },
    { num: 1035, customerId: customerBob.id, cleanerId: cleanerJames.id, service: "Deep Clean", date: "2026-03-29", start: "1:00 PM", end: "3:00 PM", amount: 180, address: "456 Oak Avenue, Vancouver", city: "Vancouver", status: "completed" },
    { num: 1042, customerId: customerAmanda.id, cleanerId: cleanerMaria.id, service: "Regular Clean", date: "2026-04-05", start: "9:00 AM", end: "11:00 AM", amount: 120, address: "123 Elm Street, Surrey", city: "Surrey", status: "completed" },
    { num: 1049, customerId: customerAmanda.id, cleanerId: cleanerSarah.id, service: "Move In/Out Clean", date: "2026-04-12", start: "10:00 AM", end: "12:00 PM", amount: 250, address: "456 Oak Avenue, Vancouver", city: "Vancouver", status: "completed", specialInstructions: "Focus on kitchen and bathrooms." },
    { num: 1056, customerId: customerAmanda.id, cleanerId: cleanerMaria.id, service: "Regular Clean", date: "2026-04-19", start: "9:00 AM", end: "11:00 AM", amount: 120, address: "123 Elm Street, Surrey", city: "Surrey", status: "completed" },
    { num: 1057, customerId: customerAmanda.id, cleanerId: cleanerMaria.id, service: "Regular Clean", date: "2026-04-26", start: "9:00 AM", end: "11:00 AM", amount: 120, address: "123 Elm Street, Surrey", city: "Surrey", status: "confirmed" },
    { num: 1058, customerId: customerAmanda.id, cleanerId: cleanerJames.id, service: "Deep Clean", date: "2026-04-30", start: "2:00 PM", end: "4:00 PM", amount: 180, address: "123 Elm Street, Surrey", city: "Surrey", status: "confirmed" },
    { num: 1059, customerId: customerBob.id, cleanerId: cleanerMaria.id, service: "Regular Clean", date: "2026-04-19", start: "12:00 PM", end: "2:00 PM", amount: 120, address: "456 Oak Avenue, Vancouver", city: "Vancouver", status: "completed" },
    { num: 1060, customerId: customerCarol.id, cleanerId: cleanerMaria.id, service: "Eco Clean", date: "2026-04-19", start: "3:00 PM", end: "4:30 PM", amount: 95, address: "789 Pine Road, Burnaby", city: "Burnaby", status: "completed", specialInstructions: "Use only eco-friendly products." },
    { num: 1061, customerId: customerDavid.id, cleanerId: cleanerMaria.id, service: "Regular Clean", date: "2026-04-21", start: "10:00 AM", end: "12:00 PM", amount: 120, address: "101 Birch Way, Richmond", city: "Richmond", status: "completed" },
    { num: 1062, customerId: customerEmma.id, cleanerId: cleanerJames.id, service: "Move In/Out", date: "2026-04-22", start: "9:00 AM", end: "11:30 AM", amount: 220, address: "222 Spruce Court, Vancouver", city: "Vancouver", status: "confirmed" },
    { num: 1063, customerId: customerFrank.id, cleanerId: cleanerJames.id, service: "Eco Clean", date: "2026-04-22", start: "1:00 PM", end: "2:30 PM", amount: 95, address: "555 Willow St, Surrey", city: "Surrey", status: "confirmed" },
    { num: 1064, customerId: customerGrace.id, cleanerId: cleanerJames.id, service: "Deep Clean", date: "2026-04-23", start: "10:00 AM", end: "12:00 PM", amount: 180, address: "888 Aspen Drive, Burnaby", city: "Burnaby", status: "confirmed" },
    { num: 1065, customerId: customerHannah.id, cleanerId: cleanerMaria.id, service: "Regular Clean", date: "2026-04-24", start: "9:00 AM", end: "11:00 AM", amount: 120, address: "444 Poplar Ave, Vancouver", city: "Vancouver", status: "pending" },
    { num: 1066, customerId: customerIvan.id, cleanerId: cleanerJames.id, service: "Deep Clean", date: "2026-04-25", start: "1:00 PM", end: "3:30 PM", amount: 180, address: "777 Juniper St, Surrey", city: "Surrey", status: "pending" },
    { num: 1067, customerId: customerJulia.id, cleanerId: cleanerMaria.id, service: "Eco Clean", date: "2026-04-25", start: "10:00 AM", end: "11:30 AM", amount: 95, address: "333 Hickory Lane, Richmond", city: "Richmond", status: "pending" },
    { num: 1068, customerId: customerKevin.id, cleanerId: cleanerSarah.id, service: "Move In/Out", date: "2026-04-26", start: "8:00 AM", end: "12:00 PM", amount: 250, address: "999 Redwood Rd, Burnaby", city: "Burnaby", status: "confirmed" },
    { num: 1069, customerId: customerLaura.id, cleanerId: cleanerSarah.id, service: "Regular Clean", date: "2026-04-26", start: "2:00 PM", end: "4:00 PM", amount: 120, address: "111 Chestnut Pl, Vancouver", city: "Vancouver", status: "pending" },
  ];

  for (const b of bookingData) {
    await prisma.booking.create({
      data: {
        bookingNumber: b.num,
        customerId: b.customerId,
        cleanerId: b.cleanerId,
        serviceType: b.service,
        date: b.date,
        startTime: b.start,
        endTime: b.end,
        amount: b.amount,
        address: b.address,
        city: b.city,
        status: b.status,
      },
    });
  }

  // Create cleaner jobs for non-cancelled bookings
  const allBookings = await prisma.booking.findMany();
  for (const booking of allBookings) {
    if (booking.status === "completed" || booking.status === "confirmed" || booking.status === "in_progress") {
      await prisma.cleanerJob.create({
        data: {
          bookingId: booking.id,
          cleanerId: booking.cleanerId!,
          status: booking.status === "completed" ? "completed" : "scheduled",
          progress: booking.status === "completed" ? 100 : 0,
          completedAt: booking.status === "completed" ? new Date() : null,
        },
      });
    }
  }

  // ============ TRANSACTIONS ============
  const completedBookings = allBookings.filter((b) => b.status === "completed");
  for (const booking of completedBookings) {
    await prisma.transaction.create({
      data: {
        transactionId: `txn_${booking.bookingNumber}`,
        bookingId: booking.id,
        customerId: booking.customerId,
        amount: booking.amount,
        status: "captured",
        method: "card",
        capturedAt: new Date(),
        createdAt: new Date(booking.date + "T" + booking.startTime),
      },
    });
  }
  for (const booking of allBookings.filter((b) => b.status === "confirmed")) {
    await prisma.transaction.create({
      data: {
        transactionId: `txn_${booking.bookingNumber}`,
        bookingId: booking.id,
        customerId: booking.customerId,
        amount: booking.amount,
        status: "pending",
        method: "card",
        createdAt: new Date(booking.date + "T" + booking.startTime),
      },
    });
  }

  // ============ REVIEWS ============
  await prisma.review.createMany([
    { bookingId: allBookings[0].id, customerId: customerLaura.id, cleanerId: cleanerSarah.id, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: "Sarah was incredibly thorough. The apartment looked spotless! Highly recommend.", isPublic: true, isApproved: true },
    { bookingId: allBookings[1].id, customerId: customerBob.id, cleanerId: cleanerJames.id, rating: 5, punctuality: 4, quality: 5, profession: 5, communication: 4, comment: "Outstanding deep clean. James tackled some tough stains I thought were permanent. The oven looks like new!", isPublic: true, isApproved: true },
    { bookingId: allBookings[2].id, customerId: customerAmanda.id, cleanerId: cleanerMaria.id, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: "Maria did an amazing job! Very thorough and professional. My place has never looked better.", isPublic: true, isApproved: true },
    { bookingId: allBookings[3].id, customerId: customerAmanda.id, cleanerId: cleanerSarah.id, rating: 4, punctuality: 5, quality: 4, profession: 4, communication: 5, comment: "Great move-in clean. The place looked brand new. Sarah was thorough with the kitchen and bathrooms.", isPublic: true, isApproved: true },
    { bookingId: allBookings[4].id, customerId: customerAmanda.id, cleanerId: cleanerMaria.id, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: "Another perfect clean from Maria. She's our go-to cleaner! The eco products smell amazing.", isPublic: true, isApproved: true },
    { bookingId: allBookings[8].id, customerId: customerCarol.id, cleanerId: cleanerMaria.id, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: "Maria used only eco products as requested and the results were fantastic. No allergic reactions!", isPublic: true, isApproved: true },
    { bookingId: allBookings[9].id, customerId: customerBob.id, cleanerId: cleanerMaria.id, rating: 4, punctuality: 5, quality: 4, profession: 5, communication: 4, comment: "Maria's eco clean was great. Will book again!", isPublic: true, isApproved: true },
    { bookingId: allBookings[10].id, customerId: customerDavid.id, cleanerId: cleanerMaria.id, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: "Great attention to detail. Maria cleaned every corner of our home.", isPublic: true, isApproved: true },
    { bookingId: allBookings[11].id, customerId: customerAmanda.id, cleanerId: cleanerJames.id, rating: 4, punctuality: 4, quality: 5, profession: 4, communication: 5, comment: "James did a solid deep clean. The kitchen looks amazing.", isPublic: true, isApproved: false },
    { bookingId: allBookings[7].id, customerId: customerAmanda.id, cleanerId: cleanerMaria.id, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: "Maria exceeded expectations again. Our apartment is always sparkling after her visits.", isPublic: true, isApproved: true },
  ]);

  // Pending review
  await prisma.review.create({
    data: {
      bookingId: allBookings[3].id, customerId: customerAmanda.id, cleanerId: cleanerSarah.id, rating: 5, punctuality: 5, quality: 5, profession: 4, communication: 5, comment: "Sarah was very professional during the move-in clean. Would recommend to friends!", isPublic: true, isApproved: false,
    createdAt: new Date("2026-04-13"),
    },
  });

  // ============ OFFERS ============
  await prisma.offer.createMany([
    { code: "WELCOME15", type: "percentage", value: 15, minBooking: 50, maxUses: 500, usedCount: 342, isActive: true, expiresAt: "2026-12-31" },
    { code: "SPRING30", type: "percentage", value: 30, minBooking: 100, maxUses: 200, usedCount: 87, isActive: true, expiresAt: "2026-06-30" },
    { code: "DEEP25", type: "fixed", value: 25, minBooking: 150, maxUses: 100, usedCount: 45, isActive: true, expiresAt: "2026-09-30" },
    { code: "ECO20", type: "percentage", value: 20, minBooking: 0, maxUses: 300, usedCount: 156, isActive: true, expiresAt: "2026-12-31" },
    { code: "SUMMER50", type: "fixed", value: 50, minBooking: 200, maxUses: 50, usedCount: 50, isActive: false, expiresAt: "2026-08-31" },
    { code: "REFER15", type: "fixed", value: 15, minBooking: 0, maxUses: 999, usedCount: 128, isActive: true, expiresAt: "2027-12-31" },
    { code: "FIRST10", type: "percentage", value: 10, minBooking: 0, maxUses: 1000, usedCount: 654, isActive: true, expiresAt: "2027-06-30" },
    { code: "VIP500", type: "fixed", value: 500, minBooking: 500, maxUses: 10, usedCount: 2, isActive: true, expiresAt: "2026-12-31" },
  ]);

  // ============ INVENTORY ============
  await prisma.inventory.createMany([
    { name: "All-Purpose Cleaner", category: "Cleaning Solutions", quantity: 24, unit: "bottles", minStock: 5, costPerUnit: 4.50 },
    { name: "Glass Cleaner", category: "Cleaning Solutions", quantity: 3, unit: "bottles", minStock: 5, costPerUnit: 5.99 },
    { name: "Floor Cleaner Concentrate", category: "Cleaning Solutions", quantity: 8, unit: "bottles", minStock: 4, costPerUnit: 7.99 },
    { name: "Bathroom Disinfectant", category: "Cleaning Solutions", quantity: 18, unit: "bottles", minStock: 10, costPerUnit: 3.99 },
    { name: "Eco Multi-Surface Spray", category: "Cleaning Solutions", quantity: 15, unit: "bottles", minStock: 8, costPerUnit: 6.50 },
    { name: "Microfiber Cloths (Pack of 5)", category: "Supplies", quantity: 120, unit: "pcs", minStock: 20, costPerUnit: 2.50 },
    { name: "Microfiber Mop Pads (Pack of 3)", category: "Supplies", quantity: 45, unit: "pcs", minStock: 10, costPerUnit: 3.99 },
    { name: "HEPA Vacuum Bags (Pack of 3)", category: "Supplies", quantity: 30, unit: "pcs", minStock: 8, costPerUnit: 12.99 },
    { name: "Paper Towels (Rolls)", category: "Supplies", quantity: 200, unit: "rolls", minStock: 50, costPerUnit: 1.20 },
    { name: "Trash Bags (Box of 100)", category: "Supplies", quantity: 8, unit: "boxes", minStock: 3, costPerUnit: 8.50 },
    { name: "Latex Gloves (Box of 100)", category: "Supplies", quantity: 12, unit: "boxes", minStock: 5, costPerUnit: 7.99 },
    { name: "Scrub Brush", category: "Tools & Equipment", quantity: 6, unit: "pcs", minStock: 2, costPerUnit: 5.50 },
    { name: "Grout Brush", category: "Tools & Equipment", quantity: 4, unit: "pcs", minStock: 2, costPerUnit: 4.99 },
    { name: "Squeegee", category: "Tools & Equipment", quantity: 3, unit: "pcs", minStock: 1, costPerUnit: 8.99 },
    { name: "Bucket (5 Gallon)", category: "Tools & Equipment", quantity: 4, unit: "pcs", minStock: 2, costPerUnit: 6.99 },
    { name: "Extendable Duster", category: "Tools & Equipment", quantity: 2, unit: "pcs", minStock: 1, costPerUnit: 12.99 },
    { name: "Cobweb Duster", category: "Tools & Equipment", quantity: 2, unit: "pcs", minStock: 1, costPerUnit: 9.99 },
    { name: "Wood Polish", category: "Cleaning Solutions", quantity: 10, unit: "bottles", minStock: 3, costPerUnit: 6.99 },
    { name: "Stainless Steel Polish", category: "Cleaning Solutions", quantity: 6, unit: "bottles", minStock: 2, costPerUnit: 8.50 },
    { name: "Oven Cleaner Gel", category: "Cleaning Solutions", quantity: 0, unit: "bottles", minStock: 3, costPerUnit: 7.99 },
    { name: "Window Cleaner (32oz)", category: "Cleaning Solutions", quantity: 12, unit: "bottles", minStock: 5, costPerUnit: 3.99 },
  ]);

  // ============ REFERRALS ============
  await prisma.referral.createMany([
    { referrerId: customerAmanda.id, referredId: customerCarol.id, referralCode: "AMANDA12", creditsEarned: 15, status: "rewarded", completedAt: new Date("2026-03-15") },
    { referrerId: customerAmanda.id, referredId: customerBob.id, referralCode: "AMANDA12", creditsEarned: 15, status: "rewarded", completedAt: new Date("2026-02-28") },
    { referrerId: customerAmanda.id, referredId: customerDavid.id, referralCode: "AMANDA12", creditsEarned: 15, status: "rewarded", completedAt: new Date("2026-01-10") },
    { referrerId: customerCarol.id, referredId: customerGrace.id, referralCode: "CAROL88", creditsEarned: 15, status: "rewarded", completedAt: new Date("2026-04-01") },
    { referrerId: customerLaura.id, referredId: customerHannah.id, referralCode: "LAURA77", creditsEarned: 15, status: "pending" },
    { referrerId: customerLaura.id, referredId: customerIvan.id, referralCode: "LAURA77", creditsEarned: 0, status: "pending" },
    { referrerId: customerHannah.id, referredId: customerIvan.id, referralCode: "HANNAH3", creditsEarned: 0, status: "pending" },
  ]);

  // ============ MESSAGES ============
  await prisma.message.createMany([
    { senderId: customerAmanda.id, receiverId: cleanerMaria.id, content: "Hi Maria! Will you be able to come a bit earlier tomorrow? I need to head out by noon.", isRead: true, createdAt: new Date("2026-04-19T14:15:00"), readAt: new Date("2026-04-19T14:20:00") },
    { senderId: cleanerMaria.id, receiverId: customerAmanda.id, content: "I can definitely try to arrive by 8:30 AM! That should give us enough time.", isRead: true, createdAt: new Date("2026-04-19T14:20:00"), readAt: new Date("2026-04-19T14:22:00") },
    { senderId: customerAmanda.id, receiverId: cleanerMaria.id, content: "That would be amazing! Yes, 8:30 works perfectly. Thank you so much!", isRead: true, createdAt: new Date("2026-04-19T14:22:00"), readAt: new Date("2026-04-19T14:25:00") },
    { senderId: cleanerMaria.id, receiverId: customerAmanda.id, content: "You're welcome! See you tomorrow at 8:30 AM. Don't forget to leave the key under the mat if you're not home.", isRead: false, createdAt: new Date("2026-04-19T14:25:00") },
    { senderId: customerBob.id, receiverId: cleanerMaria.id, content: "Thanks for the great clean today! The kitchen looks amazing.", isRead: true, createdAt: new Date("2026-04-19T17:00:00"), readAt: new Date("2026-04-19T17:05:00") },
    { senderId: cleanerMaria.id, receiverId: customerBob.id, content: "That means a lot! The grout in the master bathroom shower took some extra work but it came out great too.", isRead: true, createdAt: new Date("2026-04-19T17:10:00"), readAt: new Date("2026-04-19T17:18:00") },
    { senderId: customerCarol.id, receiverId: cleanerMaria.id, content: "Can you use the eco products for next week's clean? My allergies have been acting up.", isRead: true, createdAt: new Date("2026-04-19T15:00:00"), readAt: new Date("2026-04-19T15:10:00") },
    { senderId: cleanerMaria.id, receiverId: customerCarol.id, content: "Of course! I always use the eco-friendly products for your home. I'll make sure to bring the extra-gentle solutions this time.", isRead: true, createdAt: new Date("2026-04-19T15:10:00"), readAt: new Date("2026-04-19T15:15:00") },
    { senderId: admin.id, receiverId: cleanerMaria.id, content: "Hi Maria, your performance review for last month is now available in your profile.", isRead: true, createdAt: new Date("2026-04-18T09:00:00"), readAt: new Date("2026-04-18T10:00:00") },
    { senderId: cleanerMaria.id, receiverId: admin.id, content: "Thank you! I'll take a look at it today.", isRead: true, createdAt: new Date("2026-04-18T10:00:00"), readAt: new Date("2026-04-18T10:10:00") },
    { senderId: admin.id, receiverId: cleanerMaria.id, content: "Your schedule for next week has been updated. You have 6 jobs scheduled. Please review and confirm by Friday.", isRead: true, createdAt: new Date("2026-04-18T10:05:00"), readAt: new Date("2026-04-18T10:10:00") },
    { senderId: cleanerMaria.id, receiverId: admin.id, content: "Will do! I'll check the schedule right away. Thanks for the heads up!", isRead: true, createdAt: new Date("2026-04-18T10:10:00") },
  ]);

  // ============ TIPS ============
  await prisma.tip.createMany([
    { customerId: customerAmanda.id, cleanerId: cleanerMaria.id, bookingId: allBookings[4].id, amount: 20 },
    { customerId: customerBob.id, cleanerId: cleanerMaria.id, bookingId: allBookings[8].id, amount: 35 },
    { customerId: customerEmma.id, cleanerId: cleanerJames.id, bookingId: allBookings[11].id, amount: 15 },
    { customerId: customerCarol.id, cleanerId: cleanerMaria.id, bookingId: allBookings[7].id, amount: 10 },
    { customerId: customerDavid.id, cleanerId: cleanerMaria.id, bookingId: allBookings[9].id, amount: 25 },
    { customerId: customerLaura.id, cleanerId: cleanerSarah.id, bookingId: allBookings[0].id, amount: 10 },
  ]);

  console.log("✅ Database seeded successfully!");
  console.log(`   - ${13} users (1 admin, 4 cleaners, 8 customers)`);
  console.log(`   - ${20} bookings`);
  console.log(`   - ${17} transactions`);
  console.log(`   - ${13} reviews`);
  console.log(`   - ${9} offers`);
  console.log(`   - ${22} inventory items`);
  console.log(`   - ${6} referrals`);
  console.log(`   - ${10} messages`);
  console.log(`   - ${6} tips`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:");
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
