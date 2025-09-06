export const products = [
    {
        id: "1",
        title: "کتاب تقویت حافظه",
        type: "book",
        description: "کتابی برای تمرین حافظه و تمرکز",
        price: 120000,
        discount: 10,
        image: "/images/book-memory.jpg",
        stock: 15,
        categories: ["تمرینی", "اختلال یادگیری"],
        ageGroup: "8-12",
        publishedAt: "2023-01-10",
        reviews: [
            { id: "r1", user: "علی", rating: 5, comment: "عالی بود، خیلی مفید!", createdAt: "2025-07-10" },
            { id: "r2", user: "سارا", rating: 4, comment: "خوب ولی میشد بهتر باشه", createdAt: "2025-07-12" },
        ],
        ratingAverage: 4.5
    },
    {
        id: "2",
        title: "مجله مهارت‌های اجتماعی",
        type: "magazine",
        description: "مجله آموزشی مهارت‌های اجتماعی برای کودکان",
        price: 45000,
        image: "/images/magazine-social.jpg",
        stock: 30,
        categories: ["مهارتی"],
        ageGroup: "6-10",
        publishedAt: "2025-03-05",
        ratingAverage: 0
    },
    {
        id: "3",
        title: "پازل آموزشی",
        type: "game",
        description: "بازی فکری برای تقویت حل مسئله و تمرکز",
        price: 80000,
        discount: 5,
        image: "/images/game-puzzle.jpg",
        stock: 20,
        categories: ["تمرینی", "تفریحی"],
        ageGroup: "7-12",
        reviews: [
            { id: "r3", user: "امیر", rating: 5, comment: "بازی خیلی جذاب و آموزنده بود!", createdAt: "2025-07-15" }
        ],
        ratingAverage: 5
    },
    {
        id: "4",
        title: "کتاب خواندن سریع",
        type: "book",
        description: "کتابی برای افزایش سرعت و دقت در خواندن",
        price: 95000,
        discount: 15,
        image: "/images/book-speed.jpg",
        stock: 25,
        categories: ["تمرینی"],
        ageGroup: "10-14",
        publishedAt: "2024-05-20",
        reviews: [
            { id: "r4", user: "مریم", rating: 4, comment: "خوب بود ولی نیاز به مثال بیشتر داشت", createdAt: "2025-07-05" }
        ],
        ratingAverage: 4
    },
    {
        id: "5",
        title: "مجله هنر و خلاقیت",
        type: "magazine",
        description: "مجله‌ای برای تقویت مهارت‌های خلاقانه کودکان",
        price: 50000,
        image: "/images/magazine-art.jpg",
        stock: 40,
        categories: ["مهارتی", "تفریحی"],
        ageGroup: "6-12",
        publishedAt: "2025-04-12",
        ratingAverage: 0
    },
    {
        id: "6",
        title: "بازی فکری اعداد",
        type: "game",
        description: "بازی آموزشی برای تقویت مهارت ریاضی کودکان",
        price: 70000,
        image: "/images/game-numbers.jpg",
        stock: 18,
        categories: ["تمرینی"],
        ageGroup: "7-10",
        reviews: [
            { id: "r5", user: "امیرحسین", rating: 5, comment: "خیلی سرگرم‌کننده و آموزنده!", createdAt: "2025-07-08" }
        ],
        ratingAverage: 5
    },
    {
        id: "7",
        title: "کتاب داستان انگیزشی",
        type: "book",
        description: "کتابی برای افزایش انگیزه و اعتماد به نفس کودکان",
        price: 80000,
        discount: 5,
        image: "/images/book-motivation.jpg",
        stock: 22,
        categories: ["روانشناسی"],
        ageGroup: "8-12",
        publishedAt: "2023-11-01",
        reviews: [
            { id: "r6", user: "زهرا", rating: 4, comment: "خوب بود، اما می‌شد کوتاه‌تر باشد", createdAt: "2025-06-20" }
        ],
        ratingAverage: 4
    },
    {
        id: "8",
        title: "مجله علمی کودکان",
        type: "magazine",
        description: "مجله‌ای برای آشنایی با علوم و تجربیات عملی",
        price: 55000,
        image: "/images/magazine-science.jpg",
        stock: 35,
        categories: ["علمی"],
        ageGroup: "7-12",
        publishedAt: "2025-02-18",
        ratingAverage: 0
    },
    {
        id: "9",
        title: "بازی جورچین رنگ‌ها",
        type: "game",
        description: "تقویت تمرکز و هماهنگی دست و چشم کودکان",
        price: 60000,
        discount: 10,
        image: "/images/game-colors.jpg",
        stock: 20,
        categories: ["تمرینی", "تفریحی"],
        ageGroup: "5-9",
        reviews: [
            { id: "r7", user: "نرگس", rating: 5, comment: "خیلی خوب بود و سرگرم‌کننده!", createdAt: "2025-07-10" }
        ],
        ratingAverage: 5
    },
    {
        id: "10",
        title: "کتاب مهارت حل مسئله",
        type: "book",
        description: "کتابی برای آموزش روش‌های حل مسئله به کودکان",
        price: 100000,
        image: "/images/book-problem-solving.jpg",
        stock: 12,
        categories: ["تمرینی", "اختلال یادگیری"],
        ageGroup: "9-14",
        publishedAt: "2024-08-15",
        reviews: [
            { id: "r8", user: "حسین", rating: 5, comment: "عالی، تمرین‌ها کاربردی هستند", createdAt: "2025-07-12" }
        ],
        ratingAverage: 5
    },
    {
        id: "11",
        title: "مجله داستان‌های کوتاه",
        type: "magazine",
        description: "مجله‌ای شامل داستان‌های کوتاه و آموزنده برای کودکان",
        price: 48000,
        image: "/images/magazine-shortstories.jpg",
        stock: 28,
        categories: ["ادبی", "مهارتی"],
        ageGroup: "6-10",
        publishedAt: "2025-01-25",
        ratingAverage: 0
    },
    {
        id: "12",
        title: "بازی آموزشی حافظه و تمرکز",
        type: "game",
        description: "تمرین حافظه و تمرکز کودکان با بازی سرگرم‌کننده",
        price: 85000,
        discount: 15,
        image: "/images/game-memory-focus.jpg",
        stock: 15,
        categories: ["تمرینی"],
        ageGroup: "7-12",
        reviews: [
            { id: "r9", user: "سمیرا", rating: 4, comment: "خوبه ولی کمی پیچیده بود", createdAt: "2025-07-09" }
        ],
        ratingAverage: 4
    }
];
