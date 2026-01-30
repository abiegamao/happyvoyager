

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    category: string;
    authorId: string;
    authorName: string; // Added for UI
    publishedAt: string;
    viewCount: number;
    commentCount: number;
}

export interface Comment {
    _id: string;
    blogId: string;
    leadId: string;
    leadName: string; // Added for UI display
    comment: string;
    createdAt: string;
}

export const MOCK_BLOGS: Blog[] = [
    {
        _id: "1",
        title: "The Ultimate Guide to stress-free Travel Planning",
        slug: "ultimate-guide-stress-free-travel",
        excerpt: "Discover the secrets to planning a perfect vacation without the headache. tailored tips for families and solo travelers alike.",
        content: `
      <p>Traveling should be exciting, not exhausting. In this guide, we break down the essential steps to planning a stress-free trip.</p>
      <h2>1. Start Early</h2>
      <p>The earlier you start, the more options you have. Booking flights and accommodations in advance can save you money and stress.</p>
      <h2>2. Pack Smart</h2>
      <p>Don't overpack. Create a checklist and stick to it. Remember, you can usually buy what you forget.</p>
      <h2>3. Be Flexible</h2>
      <p>Sometimes things don't go as planned. Embrace the unexpected and enjoy the journey.</p>
    `,
        featuredImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop",
        category: "Travel Tips",
        authorId: "auth-1",
        authorName: "Sarah Jenkins",
        publishedAt: "2024-05-15T10:00:00Z",
        viewCount: 1250,
        commentCount: 5
    },
    {
        _id: "2",
        title: "Top 10 Hidden Gems in Southeast Asia",
        slug: "top-10-hidden-gems-southeast-asia",
        excerpt: "Move over Bali and Phuket. Here are 10 breathtaking destinations in Southeast Asia that acturally serve peace and quiet.",
        content: `
      <p>Southeast Asia is full of popular tourist spots, but there are still plenty of hidden gems waiting to be discovered.</p>
      <h2>1. Pai, Thailand</h2>
      <p>A small town in northern Thailand known for its relaxed atmosphere and beautiful scenery.</p>
      <h2>2. Kep, Cambodia</h2>
      <p>A coastal town famous for its crab market and abandoned french colonial villas.</p>
    `,
        featuredImage: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=1000&auto=format&fit=crop",
        category: "Destinations",
        authorId: "auth-2",
        authorName: "Mike Chen",
        publishedAt: "2024-06-02T14:30:00Z",
        viewCount: 890,
        commentCount: 2
    },
    {
        _id: "3",
        title: "How to Travel Sustainable in 2024",
        slug: "how-to-travel-sustainably",
        excerpt: "Eco-friendly travel is more than just a buzzword. Learn practical ways to reduce your footprint while exploring the world.",
        content: `
      <p>Sustainable travel is about making simple choices that lessen your negative impact on the destinations you visit.</p>
      <ul>
        <li>Choose eco-friendly accommodations.</li>
        <li>Support local businesses.</li>
        <li>Reduce plastic waste.</li>
      </ul>
    `,
        featuredImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
        category: "Sustainability",
        authorId: "auth-1",
        authorName: "Sarah Jenkins",
        publishedAt: "2024-06-10T09:15:00Z",
        viewCount: 2100,
        commentCount: 12
    }
];

export const MOCK_COMMENTS: Comment[] = [
    {
        _id: "c1",
        blogId: "1",
        leadId: "l1",
        leadName: "John Doe",
        comment: "This guide is exactly what I needed! I always get so stressed planinng trips.",
        createdAt: "2024-05-16T11:20:00Z"
    },
    {
        _id: "c2",
        blogId: "1",
        leadId: "l2",
        leadName: "Alice Smith",
        comment: "Great tips! I especially agree about packing smart.",
        createdAt: "2024-05-17T09:45:00Z"
    }
];
