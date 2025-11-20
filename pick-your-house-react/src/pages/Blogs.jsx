import React from 'react';

const Blogs = () => {
    const blogPosts = [
        {
            id: 1,
            tag: 'SaaS',
            date: 'Nov 11, 2025',
            title: 'Top 11 No-Code SaaS Tools for Your SaaS in 2025',
            author: 'FAHMI DANI',
            role: 'PRODUCT DESIGNER @JIMO',
            image: '/1183405_20-350x350.jpg'
        },
        {
            id: 2,
            tag: 'SaaS',
            date: 'Oct 20, 2025',
            title: 'In-App Guidance as the New Help Desk by Leveraging Zero-Click Search Behavior',
            author: 'FAHMI DANI',
            role: 'PRODUCT DESIGNER @JIMO',
            image: '/1183405_20-350x350.jpg'
        },
        {
            id: 3,
            tag: 'SaaS',
            date: 'Oct 8, 2025',
            title: 'How to Select the Perfect Digital Adoption Platform (Your 2025 Guide)',
            author: 'RAPHAËL ALEXANDRE',
            role: 'CPO @JIMO',
            image: '/1183405_20-350x350.jpg'
        },
        {
            id: 4,
            tag: 'Onboarding',
            date: 'Oct 3, 2025',
            title: 'What\'s the Best Way to Onboard Users? A Complete Guide for 2025',
            author: 'FAHMI DANI',
            role: 'PRODUCT DESIGNER @JIMO',
            image: '/1183405_20-350x350.jpg'
        },
        {
            id: 5,
            tag: 'Interviews',
            date: 'Sep 30, 2025',
            title: 'From Delhi to Berlin: How To Build Empathy into Product Management with Srishti Shah at HelloFresh',
            author: 'SARA CUTTING HOLLSTRÖM',
            role: 'PRODUCT MARKETING @JIMO',
            image: '/1183405_20-350x350.jpg'
        },
        {
            id: 6,
            tag: 'SaaS',
            date: 'Sep 24, 2025',
            title: 'The Ultimate Guide to Creating Better First Experiences in 2025',
            author: 'FAHMI DANI',
            role: 'PRODUCT DESIGNER @JIMO',
            image: '/1183405_20-350x350.jpg'
        }
    ];

    return (
        <section className="blog-section">
            <h1 className="text-wrapper">All Blogs</h1>
            <div className="blog-container">
                {blogPosts.map((post) => (
                    <article key={post.id} className="blog-card">
                        <div className="card-image-wrapper">
                            <img src={post.image} alt="Placeholder image for blog post" className="card-image" />
                        </div>
                        <div className="card-content">
                            <div className="card-meta-top">
                                <span className="card-tag">{post.tag}</span>
                                <span className="card-date">{post.date}</span>
                            </div>
                            <h3 className="card-title">{post.title}</h3>
                            <div className="card-author">
                                <img src={post.image} alt="Author avatar" className="author-avatar" />
                                <div className="author-info">
                                    <p className="author-name">{post.author}</p>
                                    <p className="author-role">{post.role}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Blogs;
