import { PublicBlog } from "@/api/blogs.api";

export interface StaticBlogDetail extends PublicBlog {
    content: string;
    author: string;
    categories: string[];
    tags: string[];
}

export const STATIC_BLOGS: StaticBlogDetail[] = [
    {
        _id: "south-korea-001",
        slug: "south-korea-travel-guide-diy-itinerary-for-5-days",
        title: "South Korea Travel Guide, DIY Itinerary for 5 days",
        excerpt: "Whenever there is a seat sale, we honestly feel FOMO (Fear of Missing Out) every time. If you are an employee with limited leaves and a tight budget, these sales can be very tempting and challenging. Discover everything you need to know about planning your first trip to South Korea.",
        featuredImage: "https://blog.happyvoyager.com/wp-content/uploads/2019/07/daniel-lee-gbAcFtunyoI-unsplash-1920x2880.jpg",
        category: "Travel Guide",
        author: "The Happy Voyager",
        createdAt: "2026-02-08T00:00:00Z",
        categories: ["Travel Guide", "Asia", "Seoul"],
        tags: ["Cheap Destinations", "Itinerary", "Seat Sale", "Seoul", "South Korea", "Travel Guide"],
        content: `
<div class="blog-content">
  <p>Whenever there is a seat sale, we honestly feel FOMO (Fear of Missing Out) every time. If you are an employee with limited leaves and a tight budget, these sales can be very tempting and challenging, in a way that you have to plan carefully and wisely. BUT the joy in traveling and experiencing something new makes us wanna push through this kind of opportunity. And so did I book my first ever out-of-country trip that is not work-related – in South Korea.</p>
  
  <p>We will try to cover everything you need to know and the estimated costs. Let us start with...</p>

  <h2>Pre-Travel Guidelines</h2>

  <h3>Background and Overview</h3>
  <p>K-POP, K-Dramas, Samgyeopsal, Korean Cosmetics – some of the basic things most of us are familiar about South Korea. But there is so much more about this beautiful country! It is jam-packed with culinary finds, night-markets, attractions and activities. FOODIES should never skip Korea on their bucket lists!</p>

  <ul>
    <li><strong>Language:</strong> Korean</li>
    <li><strong>Currency:</strong> Korean Won</li>
  </ul>

  <div class="tip-box">
    <p><strong>TIP:</strong> As much as possible, don't convert your money at the Airport. Airport Rates can be as high as an 11% interest rate. A better option would be using your credit card which is only about 3.5%. We got the best rate by converting our US Dollars to Korean Won in Myeongdong. More Forex Competition = Lesser Interest Rates.</p>
  </div>

  <div class="tip-box">
    <p><strong>BONUS TIP:</strong> From my experience, the best way to maximise converting your money to another currency is by converting it first to USD then to that Country's Currency. Avoid doing it in the Airport. Areas with bunch of Foreign Exchangers lining up are most often the best option. These are mostly stationed at City Centres.</p>
  </div>

  <h3>Flight Rates</h3>
  <ul>
    <li><strong>Super Sale Rate:</strong> Php 2,500-4,000</li>
    <li><strong>Regular Promo Rate:</strong> Php 7,000-12,000</li>
    <li><strong>Regular Rate:</strong> Php 12,000-18,000</li>
    <li><strong>Peak Season Rate or Rush Booking:</strong> Php 18,000+</li>
  </ul>

  <p>If you are from Southeast Asia, you may checkout Philippine Airlines, CebuPacific, JetStar, and AirAsia.</p>

  <p><em>PS. I will be posting a separate article soon on how to get crazy cheap seat sales like we did, so stay tuned, and subscribe to be alerted. ^_^</em></p>

  <h3>Things to Bring</h3>
  <ol>
    <li><strong>Passport</strong> - Must be valid 6 months prior to arrival</li>
    <li><strong>Korean Visa</strong> - Kindly check if your passport is allowed to enter Korea. If you are a Third World Country Passport Holder like me, you may need to apply for a Korean Visa.</li>
    <li><strong>Appropriate Clothing</strong> - Bring clothes suited to the type of season you are coming. Coming from a country having only two types of season, wet and dry, experiencing Cherry Blossom for the first time was LOVELY. Not too sunny, yet not too cold. A Season of New Beginnings ~ However, we find it VERY cold during the evening. It is worth noting to bring with you clothes with heat technology and some light WINTER Clothes. You might be shocked how cold it can be during Early Spring or End Of Autumn, what more in Winter?</li>
  </ol>

  <h2>Places To Visit</h2>
  <ol>
    <li><strong>Bukchon Hanok Village</strong> – Fancy Korean Place, Korean dramas use to shoot here.</li>
    <li><strong>Myeongdong</strong> – Food Trip and Shopping! Seoul's most prominent shopping district. Also, the best place to shop for famous Korean Cosmetic brands such as Etude House, Skin Food, Laneige, The Face Shop, Innisfree and more! Freebies like facemasks are everywhere!</li>
    <li><strong>N Seoul Tower</strong> – Lovelocks and Observatory</li>
    <li><strong>Dongdaemun Plaza</strong> – Eat a yummy Crepe in front.</li>
    <li><strong>Star Library</strong> – Huge Instagrammable Library!</li>
    <li><strong>Nami Island</strong> – Korean Craze. A half-moon shaped (462,809㎡) isle, and on it is the grave of General Nami. They have their own passports.</li>
    <li><strong>Petite France</strong> – Europe Feels</li>
    <li><strong>Gyeongbokgung Palace</strong></li>
    <li><strong>Everland</strong></li>
    <li><strong>Garden of Morning Calm</strong></li>
    <li><strong>Lotte World</strong> – a famous amusement park in South Korea</li>
    <li><strong>Dongdaemun</strong> – Largest wholesale and retail shopping district has 26 shopping malls, 30,000 specialty shops, and 50,000 manufacturers</li>
  </ol>

  <h2>Tips for First-Time Visitors</h2>
  <ul>
    <li>Download translation apps as English is not widely spoken outside tourist areas</li>
    <li>Get a T-money card for convenient transportation</li>
    <li>Try the street food – it's delicious and affordable</li>
    <li>Visit markets early in the morning for the freshest food</li>
    <li>Book popular attractions in advance during peak seasons</li>
  </ul>

  <p>South Korea is an incredible destination that offers a perfect blend of traditional culture and modern innovation. Whether you're drawn to the historic palaces, vibrant shopping districts, or stunning natural landscapes, there's something for everyone. With proper planning and these tips in mind, your 5-day Korean adventure will be unforgettable!</p>
</div>
    `.trim(),
    },
];

// Helper function to get all blogs
export const getAllBlogs = (): PublicBlog[] => {
    return STATIC_BLOGS.map(({ content, author, categories, tags, ...blog }) => blog);
};

// Helper function to get blog by slug
export const getBlogBySlug = (slug: string): StaticBlogDetail | undefined => {
    return STATIC_BLOGS.find((blog) => blog.slug === slug);
};
