import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await db.tip.deleteMany()
  await db.message.deleteMany()
  await db.cleanerJob.deleteMany()
  await db.review.deleteMany()
  await db.transaction.deleteMany()
  await db.booking.deleteMany()
  await db.referral.deleteMany()
  await db.inventory.deleteMany()
  await db.offer.deleteMany()
  await db.customerProfile.deleteMany()
  await db.cleanerProfile.deleteMany()
  await db.user.deleteMany()

  // =============================================
  // USERS
  // =============================================
  const admin = await db.user.create({
    data: {
      email: 'admin@cleaninstead.com',
      name: 'Admin User',
      password: 'admin123',
      role: 'admin',
      phone: '604-555-0001',
      avatar: null,
      address: '100 HQ Street, Vancouver',
      city: 'Vancouver',
    },
  })

  const cleanerMaria = await db.user.create({
    data: {
      email: 'maria@cleaninstead.com',
      name: 'Maria Santos',
      password: 'cleaner123',
      role: 'cleaner',
      phone: '604-555-1001',
      address: '55 Main St, Vancouver',
      city: 'Vancouver',
      isAvailable: true,
      notificationsEnabled: true,
    },
  })

  const cleanerJames = await db.user.create({
    data: {
      email: 'james@cleaninstead.com',
      name: 'James Wilson',
      password: 'cleaner123',
      role: 'cleaner',
      phone: '604-555-1002',
      address: '88 Oak Ave, Burnaby',
      city: 'Burnaby',
      isAvailable: true,
      notificationsEnabled: true,
    },
  })

  const cleanerSarah = await db.user.create({
    data: {
      email: 'sarah@cleaninstead.com',
      name: 'Sarah Chen',
      password: 'cleaner123',
      role: 'cleaner',
      phone: '604-555-1003',
      address: '220 Pine Rd, Vancouver',
      city: 'Vancouver',
      isAvailable: true,
      notificationsEnabled: true,
    },
  })

  // Additional cleaners (not in hardcoded auth but used for data)
  const cleanerTom = await db.user.create({
    data: {
      email: 'tom@cleaninstead.com',
      name: 'Tom Kumar',
      password: 'cleaner123',
      role: 'cleaner',
      phone: '604-555-1004',
      address: '44 Cedar Blvd, Coquitlam',
      city: 'Coquitlam',
      isAvailable: false,
      notificationsEnabled: true,
    },
  })

  const cleanerLisa = await db.user.create({
    data: {
      email: 'lisa@cleaninstead.com',
      name: 'Lisa Park',
      password: 'cleaner123',
      role: 'cleaner',
      phone: '604-555-1005',
      address: '310 Maple Dr, Vancouver',
      city: 'Vancouver',
      isAvailable: true,
      notificationsEnabled: true,
    },
  })

  const cleanerOmar = await db.user.create({
    data: {
      email: 'omar@cleaninstead.com',
      name: 'Omar Hassan',
      password: 'cleaner123',
      role: 'cleaner',
      phone: '604-555-1006',
      address: '77 Birch Ln, Surrey',
      city: 'Surrey',
      isAvailable: false,
      notificationsEnabled: false,
    },
  })

  const customerAmanda = await db.user.create({
    data: {
      email: 'amanda@example.com',
      name: 'Amanda Johnson',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-7890',
      address: '123 Elm Street, Surrey, BC V3R 1M7',
      city: 'Surrey',
      ecoOnly: true,
      notificationsEnabled: true,
    },
  })

  const customerBob = await db.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Martinez',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-3456',
      address: '456 Oak Avenue, Vancouver',
      city: 'Vancouver',
      notificationsEnabled: true,
    },
  })

  const customerCarol = await db.user.create({
    data: {
      email: 'carol@example.com',
      name: 'Carol Williams',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-4567',
      address: '789 Pine Road, Burnaby',
      city: 'Burnaby',
      ecoOnly: true,
      notificationsEnabled: true,
    },
  })

  const customerDavid = await db.user.create({
    data: {
      email: 'david@example.com',
      name: 'David Thompson',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-5678',
      address: '101 Birch Way, Richmond',
      city: 'Richmond',
      notificationsEnabled: true,
    },
  })

  // Additional customers (not in hardcoded auth)
  const customerMichael = await db.user.create({
    data: {
      email: 'michael@example.com',
      name: 'Michael Chen',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-2345',
      address: '789 Pine St, Burnaby',
      city: 'Burnaby',
      notificationsEnabled: true,
    },
  })

  const customerEmily = await db.user.create({
    data: {
      email: 'emily@example.com',
      name: 'Emily Davis',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-6789',
      address: '987 Birch Rd, Vancouver',
      city: 'Vancouver',
      notificationsEnabled: true,
    },
  })

  const customerJennifer = await db.user.create({
    data: {
      email: 'jennifer@example.com',
      name: 'Jennifer Martinez',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-8901',
      address: '741 Spruce Way, North Vancouver',
      city: 'North Vancouver',
      notificationsEnabled: true,
    },
  })

  const customerRobert = await db.user.create({
    data: {
      email: 'robert@example.com',
      name: 'Robert Taylor',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-9012',
      address: '369 Ash Ct, Port Moody',
      city: 'Port Moody',
      notificationsEnabled: true,
    },
  })

  const customerChristopher = await db.user.create({
    data: {
      email: 'christopher@example.com',
      name: 'Christopher Lee',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-0123',
      address: '852 Willow Dr, West Vancouver',
      city: 'West Vancouver',
      notificationsEnabled: true,
    },
  })

  const customerThomas = await db.user.create({
    data: {
      email: 'thomas@example.com',
      name: 'Thomas Anderson',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-1234',
      address: '963 Redwood Pl, Langley',
      city: 'Langley',
      notificationsEnabled: true,
    },
  })

  const customerLisaCust = await db.user.create({
    data: {
      email: 'lisac@example.com',
      name: 'Lisa Park Customer',
      password: 'customer123',
      role: 'customer',
      phone: '604-555-2346',
      address: '258 Walnut Ave, Coquitlam',
      city: 'Coquitlam',
      notificationsEnabled: true,
    },
  })

  // More customers for stats
  const additionalCustomers = []
  const firstNames = ['Sarah', 'Grace', 'Frank', 'Emma', 'David', 'Tom', 'Kevin', 'Nancy', 'Olivia', 'Jason', 'Megan', 'Ryan', 'Sophie', 'Daniel', 'Rachel', 'Mark', 'Laura', 'Steve', 'Anna', 'Brian']
  const lastNames = ['Lee', 'Kim', 'Miller', 'Davis', 'Brown', 'Baker', 'Taylor', 'Wilson', 'Moore', 'Clark', 'Hall', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Adams', 'Baker', 'Nelson', 'Hill']
  const cities = ['Vancouver', 'Burnaby', 'Richmond', 'Surrey', 'North Vancouver', 'West Vancouver', 'Coquitlam', 'Port Moody', 'New Westminster', 'Langley', 'Delta', 'White Rock']

  for (let i = 0; i < 20; i++) {
    additionalCustomers.push(await db.user.create({
      data: {
        email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@example.com`,
        name: `${firstNames[i]} ${lastNames[i]}`,
        password: 'customer123',
        role: 'customer',
        phone: `604-555-${String(2000 + i).padStart(4, '0')}`,
        city: cities[i % cities.length],
        notificationsEnabled: i % 3 !== 0,
        ecoOnly: i % 5 === 0,
      },
    }))
  }

  console.log(`✅ Created ${1 + 6 + 4 + 6 + 1 + 20} users`)

  // =============================================
  // CLEANER PROFILES
  // =============================================
  await db.cleanerProfile.create({
    data: {
      userId: cleanerMaria.id,
      rating: 4.9,
      totalJobs: 142,
      totalEarnings: 18420,
      joinDate: new Date('2023-03-15'),
      bio: 'Experienced professional cleaner with 5+ years in residential cleaning. Specialized in eco-friendly cleaning products and techniques.',
      skills: 'Deep Clean,Eco Clean,Move In/Out',
      serviceAreas: 'Vancouver,Burnaby,Richmond',
      isTopRated: true,
    },
  })

  await db.cleanerProfile.create({
    data: {
      userId: cleanerJames.id,
      rating: 4.7,
      totalJobs: 98,
      totalEarnings: 12800,
      joinDate: new Date('2023-06-20'),
      bio: 'Detail-oriented cleaner focusing on deep cleaning services. Known for thorough kitchen and bathroom cleaning.',
      skills: 'Regular Clean,Deep Clean',
      serviceAreas: 'Surrey,Langley,White Rock',
      isTopRated: false,
    },
  })

  await db.cleanerProfile.create({
    data: {
      userId: cleanerSarah.id,
      rating: 4.8,
      totalJobs: 115,
      totalEarnings: 15200,
      joinDate: new Date('2023-01-10'),
      bio: 'Certified eco-clean specialist. Passionate about using environmentally friendly products without compromising on quality.',
      skills: 'Eco Clean,Regular Clean,Move In/Out',
      serviceAreas: 'Vancouver,North Vancouver,West Vancouver',
      isTopRated: true,
    },
  })

  await db.cleanerProfile.create({
    data: {
      userId: cleanerTom.id,
      rating: 4.6,
      totalJobs: 67,
      totalEarnings: 7800,
      joinDate: new Date('2025-01-05'),
      bio: 'Reliable cleaner specializing in regular and deep cleaning. Quick learner and team player.',
      skills: 'Regular Clean,Deep Clean',
      serviceAreas: 'Coquitlam,Port Moody,New Westminster',
      isTopRated: false,
    },
  })

  await db.cleanerProfile.create({
    data: {
      userId: cleanerLisa.id,
      rating: 4.9,
      totalJobs: 128,
      totalEarnings: 16900,
      joinDate: new Date('2022-11-22'),
      bio: 'Top-rated cleaner with extensive experience in move-in/move-out cleaning and eco-friendly services.',
      skills: 'Eco Clean,Move In/Out,Deep Clean',
      serviceAreas: 'Vancouver,Burnaby,Richmond,Surrey',
      isTopRated: true,
    },
  })

  await db.cleanerProfile.create({
    data: {
      userId: cleanerOmar.id,
      rating: 4.5,
      totalJobs: 53,
      totalEarnings: 5900,
      joinDate: new Date('2024-04-18'),
      bio: 'Professional cleaner with experience in residential and commercial spaces.',
      skills: 'Regular Clean,Eco Clean',
      serviceAreas: 'Surrey,Delta,Langley',
      isTopRated: false,
    },
  })

  console.log('✅ Created 6 cleaner profiles')

  // =============================================
  // CUSTOMER PROFILES
  // =============================================
  await db.customerProfile.create({
    data: {
      userId: customerAmanda.id,
      totalBookings: 12,
      loyaltyPoints: 60,
      totalCleans: 10,
      referralCode: 'AMANDA12',
      preferredTime: 'morning',
      petFriendly: true,
      ecoProducts: true,
      specialInstructions: 'Please be careful with the antique dining table. Use only provided microfiber cloths.',
    },
  })

  await db.customerProfile.create({
    data: {
      userId: customerBob.id,
      totalBookings: 8,
      loyaltyPoints: 40,
      totalCleans: 6,
      referralCode: 'BOB34',
      preferredTime: 'afternoon',
      petFriendly: false,
      ecoProducts: false,
      specialInstructions: 'Focus on kitchen and bathrooms.',
    },
  })

  await db.customerProfile.create({
    data: {
      userId: customerCarol.id,
      totalBookings: 5,
      loyaltyPoints: 25,
      totalCleans: 4,
      referralCode: 'CAROL56',
      preferredTime: 'morning',
      petFriendly: true,
      ecoProducts: true,
      specialInstructions: 'No scented products due to allergies.',
    },
  })

  await db.customerProfile.create({
    data: {
      userId: customerDavid.id,
      totalBookings: 6,
      loyaltyPoints: 30,
      totalCleans: 5,
      referralCode: 'DAVID78',
      preferredTime: 'morning',
      petFriendly: false,
      ecoProducts: true,
    },
  })

  // Profiles for additional customers
  for (let i = 0; i < additionalCustomers.length; i++) {
    await db.customerProfile.create({
      data: {
        userId: additionalCustomers[i].id,
        totalBookings: Math.floor(Math.random() * 10) + 1,
        loyaltyPoints: Math.floor(Math.random() * 100),
        totalCleans: Math.floor(Math.random() * 8) + 1,
        referralCode: `${firstNames[i].toUpperCase()}${String(i * 10 + 10)}`,
        preferredTime: i % 2 === 0 ? 'morning' : 'afternoon',
        petFriendly: i % 3 !== 0,
        ecoProducts: i % 4 !== 0,
      },
    })
  }

  console.log('✅ Created customer profiles')

  // =============================================
  // BOOKINGS
  // =============================================
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  const threeDaysAgo = new Date(today)
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
  const fourDaysAgo = new Date(today)
  fourDaysAgo.setDate(fourDaysAgo.getDate() - 4)
  const fiveDaysAgo = new Date(today)
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date(today)
  dayAfter.setDate(dayAfter.getDate() + 2)

  // Helper to create dates relative to today
  function daysFromNow(days: number): string {
    const d = new Date(today)
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }

  // Create bookings with incrementing booking numbers
  let bookingNum = 1001

  // Completed bookings (for past bookings data)
  const completedBookings = [
    { customer: customerAmanda, cleaner: cleanerMaria, service: 'Regular Clean', daysAgo: 7, start: '09:00', end: '11:00', amount: 120, address: '123 Elm Street, Surrey' },
    { customer: customerAmanda, cleaner: cleanerSarah, service: 'Move-In Clean', daysAgo: 14, start: '10:00', end: '12:00', amount: 250, address: '456 Oak Avenue, Vancouver' },
    { customer: customerAmanda, cleaner: cleanerJames, service: 'Deep Clean', daysAgo: 21, start: '13:00', end: '15:00', amount: 180, address: '123 Elm Street, Surrey' },
    { customer: customerAmanda, cleaner: cleanerMaria, service: 'Regular Clean', daysAgo: 28, start: '09:00', end: '11:00', amount: 120, address: '123 Elm Street, Surrey' },
    { customer: customerAmanda, cleaner: cleanerSarah, service: 'Regular Clean', daysAgo: 35, start: '09:00', end: '11:00', amount: 120, address: '123 Elm Street, Surrey' },
    { customer: customerEmily, cleaner: cleanerJames, service: 'Regular Clean', daysAgo: 2, start: '09:00', end: '11:00', amount: 120, address: '987 Birch Rd, Vancouver' },
    { customer: customerEmily, cleaner: cleanerJames, service: 'Deep Clean', daysAgo: 5, start: '13:00', end: '16:00', amount: 220, address: '987 Birch Rd, Vancouver' },
    { customer: customerBob, cleaner: cleanerMaria, service: 'Regular Clean', daysAgo: 3, start: '12:00', end: '14:00', amount: 180, address: '456 Oak Avenue, Vancouver' },
    { customer: customerCarol, cleaner: cleanerMaria, service: 'Eco Clean', daysAgo: 4, start: '15:00', end: '16:30', amount: 95, address: '789 Pine Road, Burnaby' },
    { customer: customerDavid, cleaner: cleanerSarah, service: 'Regular Clean', daysAgo: 6, start: '10:00', end: '12:00', amount: 120, address: '101 Birch Way, Richmond' },
    { customer: customerDavid, cleaner: cleanerLisa, service: 'Eco Clean', daysAgo: 10, start: '09:00', end: '12:00', amount: 180, address: '101 Birch Way, Richmond' },
    { customer: customerJennifer, cleaner: cleanerLisa, service: 'Eco Clean', daysAgo: 3, start: '09:00', end: '12:00', amount: 180, address: '741 Spruce Way, North Vancouver' },
    { customer: customerMichael, cleaner: cleanerSarah, service: 'Deep Clean', daysAgo: 5, start: '10:00', end: '13:00', amount: 220, address: '789 Pine St, Burnaby' },
    { customer: customerMichael, cleaner: cleanerMaria, service: 'Regular Clean', daysAgo: 8, start: '09:00', end: '11:00', amount: 120, address: '789 Pine St, Burnaby' },
    { customer: customerChristopher, cleaner: cleanerLisa, service: 'Regular Clean', daysAgo: 3, start: '14:00', end: '16:00', amount: 110, address: '852 Willow Dr, West Vancouver' },
    { customer: customerThomas, cleaner: cleanerLisa, service: 'Eco Clean', daysAgo: 2, start: '10:00', end: '13:00', amount: 170, address: '963 Redwood Pl, Langley' },
    { customer: customerRobert, cleaner: cleanerJames, service: 'Move In Clean', daysAgo: 1, start: '10:00', end: '15:00', amount: 300, address: '369 Ash Ct, Port Moody' },
    { customer: customerLisaCust, cleaner: cleanerJames, service: 'Regular Clean', daysAgo: 1, start: '08:00', end: '10:00', amount: 100, address: '258 Walnut Ave, Coquitlam' },
  ]

  const completedBookingRecords = []
  for (const b of completedBookings) {
    const record = await db.booking.create({
      data: {
        bookingNumber: bookingNum++,
        customerId: b.customer.id,
        cleanerId: b.cleaner.id,
        serviceType: b.service,
        date: daysFromNow(-b.daysAgo),
        startTime: b.start,
        endTime: b.end,
        amount: b.amount,
        address: b.address,
        city: b.customer.city,
        status: 'completed',
        reviewed: Math.random() > 0.4,
        notes: null,
        createdAt: new Date(today.getTime() - b.daysAgo * 86400000),
      },
    })
    completedBookingRecords.push(record)
  }

  // Active/In-progress bookings
  const activeBookings = [
    { customer: customerMichael, cleaner: cleanerSarah, service: 'Deep Clean', daysAgo: 0, start: '10:00', end: '13:00', amount: 220, address: '789 Pine St, Burnaby', status: 'in_progress' },
    { customer: customerChristopher, cleaner: cleanerLisa, service: 'Regular Clean', daysAgo: 0, start: '14:00', end: '16:00', amount: 110, address: '852 Willow Dr, West Vancouver', status: 'in_progress' },
  ]

  for (const b of activeBookings) {
    await db.booking.create({
      data: {
        bookingNumber: bookingNum++,
        customerId: b.customer.id,
        cleanerId: b.cleaner.id,
        serviceType: b.service,
        date: daysFromNow(0),
        startTime: b.start,
        endTime: b.end,
        amount: b.amount,
        address: b.address,
        city: b.customer.city,
        status: b.status,
      },
    })
  }

  // Confirmed bookings
  const confirmedBookings = [
    { customer: customerAmanda, cleaner: cleanerMaria, service: 'Regular Clean', daysAgo: 0, start: '09:00', end: '11:00', amount: 120, address: '123 Elm Street, Surrey' },
    { customer: customerDavid, cleaner: cleanerMaria, service: 'Eco Clean', daysAgo: 0, start: '14:00', end: '16:00', amount: 150, address: '654 Cedar Ln, Richmond' },
    { customer: customerJennifer, cleaner: cleanerMaria, service: 'Eco Clean', daysAgo: 0, start: '09:00', end: '12:00', amount: 180, address: '741 Spruce Way, North Vancouver' },
    { customer: customerThomas, cleaner: cleanerLisa, service: 'Eco Clean', daysAgo: 0, start: '10:00', end: '13:00', amount: 170, address: '963 Redwood Pl, Langley' },
    // Future bookings
    { customer: customerAmanda, cleaner: cleanerMaria, service: 'Regular Clean', daysAgo: 7, start: '09:00', end: '11:00', amount: 120, address: '123 Elm Street, Surrey' },
    { customer: customerAmanda, cleaner: cleanerJames, service: 'Deep Clean', daysAgo: 11, start: '14:00', end: '16:00', amount: 180, address: '123 Elm Street, Surrey' },
  ]

  for (const b of confirmedBookings) {
    await db.booking.create({
      data: {
        bookingNumber: bookingNum++,
        customerId: b.customer.id,
        cleanerId: b.cleaner.id,
        serviceType: b.service,
        date: daysFromNow(b.daysAgo),
        startTime: b.start,
        endTime: b.end,
        amount: b.amount,
        address: b.address,
        city: b.customer.city,
        status: b.daysAgo === 0 ? 'confirmed' : 'confirmed',
        specialInstructions: b.daysAgo > 5 ? 'Focus on kitchen and bathrooms' : null,
      },
    })
  }

  // Pending bookings
  const pendingBookings = [
    { customer: customerCarol, cleaner: null, service: 'Move Out Clean', daysAgo: 1, start: '08:00', end: '14:00', amount: 350, address: '321 Maple Dr, Surrey' },
    { customer: customerRobert, cleaner: null, service: 'Move In Clean', daysAgo: 1, start: '10:00', end: '15:00', amount: 300, address: '369 Ash Ct, Port Moody' },
    { customer: customerAmanda, cleaner: null, service: 'Deep Clean', daysAgo: 1, start: '08:00', end: '12:00', amount: 200, address: '456 Oak Avenue, Vancouver' },
  ]

  for (const b of pendingBookings) {
    await db.booking.create({
      data: {
        bookingNumber: bookingNum++,
        customerId: b.customer.id,
        cleanerId: b.cleaner?.id,
        serviceType: b.service,
        date: daysFromNow(b.daysAgo),
        startTime: b.start,
        endTime: b.end,
        amount: b.amount,
        address: b.address,
        city: b.customer.city,
        status: 'pending',
      },
    })
  }

  // Cancelled bookings
  await db.booking.create({
    data: {
      bookingNumber: bookingNum++,
      customerId: customerLisaCust.id,
      cleanerId: cleanerJames.id,
      serviceType: 'Regular Clean',
      date: daysFromNow(1),
      startTime: '08:00',
      endTime: '10:00',
      amount: 100,
      address: '258 Walnut Ave, Coquitlam',
      city: 'Coquitlam',
      status: 'cancelled',
    },
  })

  // More bookings for richer stats (spread across last 30 days)
  const serviceTypes = ['Regular Clean', 'Deep Clean', 'Eco Clean', 'Move In Clean', 'Move Out Clean']
  const allCustomers = [customerAmanda, customerBob, customerCarol, customerDavid, customerMichael, customerEmily, customerJennifer, customerRobert, customerChristopher, customerThomas, ...additionalCustomers]
  const allCleaners = [cleanerMaria, cleanerJames, cleanerSarah, cleanerLisa, cleanerTom]

  for (let i = 0; i < 80; i++) {
    const cust = allCustomers[i % allCustomers.length]
    const clean = allCleaners[i % allCleaners.length]
    const svc = serviceTypes[i % serviceTypes.length]
    const daysBack = Math.floor(Math.random() * 60) + 1
    const amounts: Record<string, number> = { 'Regular Clean': 120, 'Deep Clean': 220, 'Eco Clean': 150, 'Move In Clean': 300, 'Move Out Clean': 350 }
    const statuses = ['completed', 'completed', 'completed', 'completed', 'cancelled']
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    await db.booking.create({
      data: {
        bookingNumber: bookingNum++,
        customerId: cust.id,
        cleanerId: clean.id,
        serviceType: svc,
        date: daysFromNow(-daysBack),
        startTime: `${String(8 + (i % 8)).padStart(2, '0')}:00`,
        endTime: `${String(10 + (i % 6)).padStart(2, '0')}:00`,
        amount: amounts[svc] || 120,
        address: `${100 + i} Service St, ${cust.city}`,
        city: cust.city,
        status,
        createdAt: new Date(today.getTime() - daysBack * 86400000),
      },
    })
  }

  console.log(`✅ Created ${bookingNum - 1001} bookings`)

  // =============================================
  // CLEANER JOBS (for Maria Santos - the demo cleaner)
  // =============================================
  // Get Maria's bookings
  const mariaBookings = await db.booking.findMany({
    where: { cleanerId: cleanerMaria.id, status: { in: ['confirmed', 'in_progress', 'completed'] } },
    orderBy: { date: 'asc' },
  })

  for (const booking of mariaBookings) {
    const isCompleted = booking.status === 'completed'
    const isInProgress = booking.status === 'in_progress'
    await db.cleanerJob.create({
      data: {
        bookingId: booking.id,
        cleanerId: cleanerMaria.id,
        status: isCompleted ? 'completed' : isInProgress ? 'in_progress' : 'scheduled',
        progress: isCompleted ? 100 : isInProgress ? 60 : 0,
        startedAt: isCompleted ? new Date(booking.createdAt.getTime() + 3600000) : isInProgress ? new Date(today.getTime() - 1800000) : null,
        completedAt: isCompleted ? new Date(booking.createdAt.getTime() + 7200000) : null,
      },
    })
  }

  // Also create jobs for other cleaners
  const otherCleanerBookings = await db.booking.findMany({
    where: {
      cleanerId: { in: [cleanerJames.id, cleanerSarah.id, cleanerLisa.id] },
      status: { in: ['confirmed', 'in_progress', 'completed'] },
    },
  })

  for (const booking of otherCleanerBookings) {
    const isCompleted = booking.status === 'completed'
    const isInProgress = booking.status === 'in_progress'
    await db.cleanerJob.create({
      data: {
        bookingId: booking.id,
        cleanerId: booking.cleanerId!,
        status: isCompleted ? 'completed' : isInProgress ? 'in_progress' : 'scheduled',
        progress: isCompleted ? 100 : isInProgress ? 45 : 0,
        startedAt: isCompleted ? new Date(booking.createdAt.getTime() + 1800000) : isInProgress ? new Date(today.getTime() - 3600000) : null,
        completedAt: isCompleted ? new Date(booking.createdAt.getTime() + 5400000) : null,
      },
    })
  }

  console.log('✅ Created cleaner jobs')

  // =============================================
  // TRANSACTIONS
  // =============================================
  const paidBookings = await db.booking.findMany({
    where: { status: { in: ['completed', 'confirmed', 'in_progress'] } },
    orderBy: { createdAt: 'desc' },
  })

  let txnCounter = 1
  for (const booking of paidBookings.slice(0, 30)) {
    const isCaptured = booking.status === 'completed' || booking.status === 'confirmed'
    const isRefunded = Math.random() > 0.92 // ~8% refund rate
    await db.transaction.create({
      data: {
        transactionId: `TXN-${today.getFullYear()}-${String(txnCounter++).padStart(3, '0')}`,
        bookingId: booking.id,
        customerId: booking.customerId,
        amount: booking.amount,
        status: isRefunded ? 'refunded' : isCaptured ? 'captured' : 'pending',
        method: Math.random() > 0.3 ? 'card' : 'e_transfer',
        capturedAt: isCaptured ? new Date(booking.createdAt.getTime() + 86400000) : null,
        refundedAt: isRefunded ? new Date(booking.createdAt.getTime() + 259200000) : null,
        createdAt: new Date(booking.createdAt.getTime() + 3600000),
      },
    })
  }

  // A few pending transactions for recent bookings
  const recentPending = await db.booking.findMany({
    where: { status: 'pending' },
    orderBy: { createdAt: 'desc' },
  })
  for (const booking of recentPending.slice(0, 5)) {
    await db.transaction.create({
      data: {
        transactionId: `TXN-${today.getFullYear()}-${String(txnCounter++).padStart(3, '0')}`,
        bookingId: booking.id,
        customerId: booking.customerId,
        amount: booking.amount,
        status: 'pending',
        method: 'card',
        createdAt: new Date(booking.createdAt.getTime() + 1800000),
      },
    })
  }

  console.log('✅ Created transactions')

  // =============================================
  // REVIEWS
  // =============================================
  const reviewData = [
    { booking: completedBookingRecords[0], customer: customerAmanda, cleaner: cleanerMaria, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: 'Absolutely fantastic service! Maria was thorough, professional, and left the apartment spotless. Will definitely book again.', approved: true },
    { booking: completedBookingRecords[1], customer: customerAmanda, cleaner: cleanerSarah, rating: 4, punctuality: 4, quality: 4, profession: 5, communication: 4, comment: 'Great cleaning job. Sarah paid attention to detail and was very punctual. Only minor thing is the windows could have been cleaner.', approved: true },
    { booking: completedBookingRecords[5], customer: customerEmily, cleaner: cleanerJames, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: 'James did an amazing deep clean of our kitchen and bathrooms. Everything looks brand new. Highly recommend!', approved: true },
    { booking: completedBookingRecords[11], customer: customerJennifer, cleaner: cleanerLisa, rating: 3, punctuality: 3, quality: 4, profession: 3, communication: 3, comment: 'The cleaning was okay but took longer than expected. Some areas were missed in the living room.', approved: false },
    { booking: completedBookingRecords[3], customer: customerAmanda, cleaner: cleanerMaria, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 5, comment: 'Maria is the best cleaner we have ever had. She is efficient, friendly, and uses eco-friendly products that smell wonderful.', approved: false },
    { booking: completedBookingRecords[9], customer: customerDavid, cleaner: cleanerSarah, rating: 4, punctuality: 5, quality: 4, profession: 4, communication: 4, comment: 'Very happy with the eco clean service. Sarah explained all the products she used and the results were impressive.', approved: true },
    { booking: completedBookingRecords[6], customer: customerEmily, cleaner: cleanerJames, rating: 5, punctuality: 5, quality: 5, profession: 5, communication: 4, comment: 'Outstanding move-in cleaning service. Every corner was spotless. Made our new home feel welcoming from day one.', approved: true },
    { booking: completedBookingRecords[14], customer: customerChristopher, cleaner: cleanerLisa, rating: 4, punctuality: 4, quality: 4, profession: 5, communication: 4, comment: 'Lisa was very professional and thorough. The apartment looked amazing after her visit. Great value for money.', approved: false },
  ]

  for (const r of reviewData) {
    await db.review.create({
      data: {
        bookingId: r.booking.id,
        customerId: r.customer.id,
        cleanerId: r.cleaner.id,
        rating: r.rating,
        punctuality: r.punctuality,
        quality: r.quality,
        profession: r.profession,
        communication: r.communication,
        comment: r.comment,
        isPublic: r.approved,
        isApproved: r.approved,
        createdAt: new Date(r.booking.createdAt.getTime() + 172800000),
      },
    })
  }

  console.log('✅ Created reviews')

  // =============================================
  // OFFERS
  // =============================================
  await db.offer.createMany({
    data: [
      { code: 'WELCOME10', type: 'percentage', value: 10, minBooking: 80, maxUses: 500, usedCount: 342, isActive: true, expiresAt: '2025-06-30' },
      { code: 'ECO20', type: 'percentage', value: 20, minBooking: 100, maxUses: 200, usedCount: 178, isActive: true, expiresAt: '2025-03-31' },
      { code: 'SPRING25', type: 'fixed', value: 25, minBooking: 150, maxUses: 300, usedCount: 89, isActive: true, expiresAt: '2025-05-31' },
      { code: 'REFER15', type: 'percentage', value: 15, minBooking: 0, maxUses: 1000, usedCount: 567, isActive: true, expiresAt: '2025-12-31' },
      { code: 'CLEAN50', type: 'fixed', value: 50, minBooking: 250, maxUses: 100, usedCount: 45, isActive: false, expiresAt: '2025-02-28' },
      { code: 'VIP30', type: 'percentage', value: 30, minBooking: 200, maxUses: 50, usedCount: 50, isActive: false, expiresAt: '2024-12-31' },
    ],
  })

  console.log('✅ Created offers')

  // =============================================
  // INVENTORY
  // =============================================
  await db.inventory.createMany({
    data: [
      { name: 'All-Purpose Cleaner', category: 'Cleaning Solutions', quantity: 45, unit: 'bottles', minStock: 10, costPerUnit: 5.99 },
      { name: 'Glass Cleaner', category: 'Cleaning Solutions', quantity: 3, unit: 'bottles', minStock: 8, costPerUnit: 4.49 },
      { name: 'Floor Cleaner', category: 'Cleaning Solutions', quantity: 28, unit: 'bottles', minStock: 10, costPerUnit: 7.99 },
      { name: 'Disinfectant Spray', category: 'Cleaning Solutions', quantity: 2, unit: 'bottles', minStock: 8, costPerUnit: 6.99 },
      { name: 'Microfiber Cloths', category: 'Tools & Equipment', quantity: 120, unit: 'pcs', minStock: 20, costPerUnit: 2.99 },
      { name: 'Dusters', category: 'Tools & Equipment', quantity: 35, unit: 'pcs', minStock: 10, costPerUnit: 3.49 },
      { name: 'Trash Bags', category: 'Supplies', quantity: 8, unit: 'boxes', minStock: 12, costPerUnit: 8.99 },
      { name: 'Gloves', category: 'Supplies', quantity: 50, unit: 'pairs', minStock: 15, costPerUnit: 1.99 },
      { name: 'Mop Heads', category: 'Tools & Equipment', quantity: 12, unit: 'pcs', minStock: 5, costPerUnit: 9.99 },
      { name: 'Sponges', category: 'Supplies', quantity: 67, unit: 'pcs', minStock: 20, costPerUnit: 1.49 },
    ],
  })

  console.log('✅ Created inventory items')

  // =============================================
  // REFERRALS
  // =============================================
  await db.referral.create({
    data: {
      referrerId: customerAmanda.id,
      referredId: customerCarol.id,
      referralCode: 'AMANDA12',
      creditsEarned: 15,
      status: 'completed',
      completedAt: new Date('2025-03-15'),
      createdAt: new Date('2025-02-28'),
    },
  })
  await db.referral.create({
    data: {
      referrerId: customerAmanda.id,
      referredId: customerBob.id,
      referralCode: 'AMANDA12',
      creditsEarned: 15,
      status: 'completed',
      completedAt: new Date('2025-02-28'),
      createdAt: new Date('2025-01-20'),
    },
  })
  await db.referral.create({
    data: {
      referrerId: customerAmanda.id,
      referredId: customerDavid.id,
      referralCode: 'AMANDA12',
      creditsEarned: 15,
      status: 'completed',
      completedAt: new Date('2025-01-10'),
      createdAt: new Date('2024-12-15'),
    },
  })

  console.log('✅ Created referrals')

  // =============================================
  // MESSAGES
  // =============================================
  await db.message.createMany({
    data: [
      { senderId: customerAmanda.id, receiverId: cleanerMaria.id, content: 'Hi Maria! Just wanted to confirm our appointment for tomorrow at 9 AM.', isRead: true, readAt: new Date(today.getTime() - 86400000) },
      { senderId: cleanerMaria.id, receiverId: customerAmanda.id, content: 'Hello Amanda! Yes, confirmed for 9 AM tomorrow. I\'ll bring all the eco-friendly products you requested. See you then!', isRead: true, readAt: new Date(today.getTime() - 82800000) },
      { senderId: customerAmanda.id, receiverId: cleanerMaria.id, content: 'Perfect, thank you! My cat might be in the living room - please don\'t let him outside.', isRead: true, readAt: new Date(today.getTime() - 79200000) },
      { senderId: cleanerMaria.id, receiverId: customerAmanda.id, content: 'No worries, I love cats! I\'ll make sure he stays inside. Is the key still under the mat?', isRead: false, readAt: null },
      { senderId: customerBob.id, receiverId: cleanerJames.id, content: 'Hi James, I need to reschedule my deep clean to next week if possible.', isRead: false, readAt: null },
      { senderId: cleanerJames.id, receiverId: customerBob.id, content: 'Hi Bob! Sure, I have availability on Tuesday afternoon. Would that work for you?', isRead: true, readAt: new Date(today.getTime() - 3600000) },
      { senderId: customerCarol.id, receiverId: cleanerSarah.id, content: 'Sarah, the eco clean was amazing! Thank you so much. Can I book you again for next month?', isRead: true, readAt: new Date(today.getTime() - 172800000) },
      { senderId: cleanerSarah.id, receiverId: customerCarol.id, content: 'Thank you Carol! I\'d love to help again. Just let me know your preferred date and I\'ll check my schedule.', isRead: true, readAt: new Date(today.getTime() - 165600000) },
      { senderId: admin.id, receiverId: cleanerMaria.id, content: 'Great job this week Maria! Your ratings have been excellent. Keep up the good work!', isRead: true, readAt: new Date(today.getTime() - 7200000) },
      { senderId: cleanerLisa.id, receiverId: customerJennifer.id, content: 'Hi Jennifer, just following up on your recent cleaning. How was everything?', isRead: false, readAt: null },
    ],
  })

  console.log('✅ Created messages')

  // =============================================
  // TIPS
  // =============================================
  await db.tip.createMany({
    data: [
      { customerId: customerAmanda.id, cleanerId: cleanerMaria.id, bookingId: completedBookingRecords[0].id, amount: 20, createdAt: new Date(completedBookingRecords[0].createdAt.getTime() + 86400000) },
      { customerId: customerBob.id, cleanerId: cleanerMaria.id, bookingId: null, amount: 35, createdAt: new Date(today.getTime() - 86400000) },
      { customerId: customerEmily.id, cleanerId: cleanerJames.id, bookingId: completedBookingRecords[5].id, amount: 15, createdAt: new Date(completedBookingRecords[5].createdAt.getTime() + 172800000) },
      { customerId: customerDavid.id, cleanerId: cleanerSarah.id, bookingId: completedBookingRecords[9].id, amount: 25, createdAt: new Date(completedBookingRecords[9].createdAt.getTime() + 86400000) },
      { customerId: customerJennifer.id, cleanerId: cleanerLisa.id, bookingId: completedBookingRecords[11].id, amount: 10, createdAt: new Date(completedBookingRecords[11].createdAt.getTime() + 259200000) },
      { customerId: customerMichael.id, cleanerId: cleanerSarah.id, bookingId: null, amount: 30, createdAt: new Date(today.getTime() - 432000000) },
      { customerId: customerAmanda.id, cleanerId: cleanerSarah.id, bookingId: completedBookingRecords[1].id, amount: 25, createdAt: new Date(completedBookingRecords[1].createdAt.getTime() + 86400000) },
      { customerId: customerChristopher.id, cleanerId: cleanerLisa.id, bookingId: completedBookingRecords[14].id, amount: 15, createdAt: new Date(completedBookingRecords[14].createdAt.getTime() + 86400000) },
      { customerId: customerRobert.id, cleanerId: cleanerJames.id, bookingId: null, amount: 20, createdAt: new Date(today.getTime() - 345600000) },
      { customerId: customerThomas.id, cleanerId: cleanerLisa.id, bookingId: completedBookingRecords[15].id, amount: 40, createdAt: new Date(completedBookingRecords[15].createdAt.getTime() + 86400000) },
    ],
  })

  console.log('✅ Created tips')
  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
