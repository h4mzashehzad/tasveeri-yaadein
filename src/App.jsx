import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Camera, Users, DollarSign, Home, Briefcase } from 'lucide-react';

// ====================
// CONTENT DATA - EASY TO EDIT
// ====================

// Website Content - Edit these easily
const WEBSITE_CONFIG = {
  name: "Tasveeri Yaadein",
  tagline: "Capturing Moments, Creating Memories",
  contact: {
    phone: "+92 300 1234567",
    email: "info@tasveeriyaadein.com",
    address: "Studio 12, Creative Hub, Gulberg III, Lahore, Pakistan"
  }
};

// Sample Portfolio Items - ADD/EDIT YOUR CONTENT HERE
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    type: 'photo',
    category: 'Real Estate',
    tags: ['Real Estate'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=600&fit=crop',
    caption: 'Our Own Client',
    aspectRatio: 'square'
  },
  {
    id: 2,
    type: 'photo',
    category: 'Medical',
    tags: ['Medical'],
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop',
    caption: 'Our Own Client',
    aspectRatio: 'square'
  },
  {
    id: 3,
    type: 'photo',
    category: 'Food',
    tags: ['Food'],
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop',
    caption: 'Worked with Creative Agency for Restaurant XYZ',
    aspectRatio: 'wide'
  },
  {
    id: 4,
    type: 'photo',
    category: 'Clothing',
    tags: ['Clothing'],
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop',
    caption: 'Worked with Fashion House for Brand ABC',
    aspectRatio: 'tall'
  },
  {
    id: 5,
    type: 'photo',
    category: 'Construction',
    tags: ['Construction'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
    caption: 'Our Own Client',
    aspectRatio: 'wide'
  },
  {
    id: 6,
    type: 'photo',
    category: 'Real Estate',
    tags: ['Real Estate'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop',
    caption: 'Worked with Property Plus for Luxury Homes',
    aspectRatio: 'tall'
  },
  {
    id: 7,
    type: 'photo',
    category: 'Food',
    tags: ['Food'],
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop',
    caption: 'Our Own Client',
    aspectRatio: 'square'
  },
  {
    id: 8,
    type: 'photo',
    category: 'Clothing',
    tags: ['Clothing'],
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
    caption: 'Worked with Style Studio for Fashion Week',
    aspectRatio: 'tall'
  }
];

// Team Members - ADD/EDIT YOUR TEAM HERE
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Lead Photographer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    experience: "8+ years"
  },
  {
    id: 2,
    name: "Sara Ali",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
    experience: "6+ years"
  },
  {
    id: 3,
    name: "Hassan Sheikh",
    role: "Video Editor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    experience: "5+ years"
  },
  {
    id: 4,
    name: "Fatima Malik",
    role: "Photographer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    experience: "4+ years"
  }
];

// Pricing Packages - EDIT YOUR PACKAGES HERE
const PRICING_PACKAGES = [
  {
    id: 1,
    name: "Basic Package",
    price: "Rs. 25,000",
    features: [
      "2-3 hours photo session",
      "50+ edited photos",
      "High-resolution images",
      "Basic retouching",
      "Online gallery"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Professional Package",
    price: "Rs. 50,000",
    features: [
      "Full day photo session",
      "150+ edited photos",
      "High-resolution images",
      "Advanced retouching",
      "Online gallery",
      "Print-ready files",
      "2 revision rounds"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Premium Package",
    price: "Rs. 85,000",
    features: [
      "2-day photo session",
      "300+ edited photos",
      "4K video highlights",
      "Professional retouching",
      "Online gallery",
      "Print-ready files",
      "Unlimited revisions",
      "Same-day preview"
    ],
    popular: false
  }
];

// ====================
// MAIN COMPONENT
// ====================

const TasveeriYaadeinPortfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  
  // Infinite scroll states
  const [visibleItems, setVisibleItems] = useState(8); // Start with 8 items
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const categories = ['all', 'Real Estate', 'Medical', 'Clothing', 'Food', 'Construction'];

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== 'home') return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger load more when user is 200px from bottom
      if (scrollTop + windowHeight >= documentHeight - 200 && !isLoading && hasMore) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, isLoading, hasMore, visibleItems]);

  const loadMoreItems = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const newVisibleItems = visibleItems + 4;
      setVisibleItems(newVisibleItems);
      
      // Check if we've loaded all items
      if (newVisibleItems >= PORTFOLIO_ITEMS.length) {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 800);
  };

  // Reset infinite scroll when page changes
  useEffect(() => {
    if (currentPage === 'home') {
      setVisibleItems(8);
      setHasMore(true);
    }
  }, [currentPage]);

  // Get filtered items based on current page and category
  const getFilteredItems = () => {
    let items = PORTFOLIO_ITEMS;
    
    if (currentPage === 'portfolio' && selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    // For homepage, limit to visible items for infinite scroll
    if (currentPage === 'home') {
      items = items.slice(0, visibleItems);
    }
    
    return items;
  };

  // ====================
  // HEADER COMPONENT
  // ====================
  const Header = () => (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">{WEBSITE_CONFIG.name}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${currentPage === 'home' ? 'text-blue-400' : ''}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setPortfolioDropdownOpen(!portfolioDropdownOpen)}
                className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${currentPage === 'portfolio' ? 'text-blue-400' : ''}`}
              >
                <Briefcase className="h-4 w-4" />
                <span>Portfolio</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {portfolioDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-gray-900 rounded-md shadow-lg min-w-48 border border-gray-700">
                  {categories.slice(1).map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setCurrentPage('portfolio');
                        setSelectedCategory(category);
                        setPortfolioDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setCurrentPage('team')}
              className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${currentPage === 'team' ? 'text-blue-400' : ''}`}
            >
              <Users className="h-4 w-4" />
              <span>Team</span>
            </button>
            
            <button 
              onClick={() => setCurrentPage('pricing')}
              className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${currentPage === 'pricing' ? 'text-blue-400' : ''}`}
            >
              <DollarSign className="h-4 w-4" />
              <span>Pricing</span>
            </button>
            
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${currentPage === 'contact' ? 'text-blue-400' : ''}`}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </nav>

          {/* CTA Button */}
          <button 
            onClick={() => setCurrentPage('contact')}
            className="hidden md:block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            Start Project
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="text-left hover:text-blue-400 transition-colors"
              >
                Home
              </button>
              <div className="space-y-2">
                <span className="text-gray-400">Portfolio</span>
                {categories.slice(1).map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setCurrentPage('portfolio');
                      setSelectedCategory(category);
                      setMobileMenuOpen(false);
                    }}
                    className="block ml-4 text-left hover:text-blue-400 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => { setCurrentPage('team'); setMobileMenuOpen(false); }}
                className="text-left hover:text-blue-400 transition-colors"
              >
                Team
              </button>
              <button 
                onClick={() => { setCurrentPage('pricing'); setMobileMenuOpen(false); }}
                className="text-left hover:text-blue-400 transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                className="text-left hover:text-blue-400 transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  // ====================
  // PORTFOLIO GRID COMPONENT
  // ====================
  const PortfolioGrid = ({ items, showFilters = false, showLoadingSpinner = false }) => {
  const [activeImageId, setActiveImageId] = useState(null);

  const toggleCaption = (id) => {
    setActiveImageId(activeImageId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      )}

      {/* ✅ Masonry layout */}
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map(item => (
          <div 
            key={item.id} 
            className="relative w-full break-inside-avoid overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            onClick={() => toggleCaption(item.id)}
          >
            <img 
              src={item.image} 
              alt={item.caption}
              className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
            />

            {/* ✅ Overlay shown on hover (desktop) or click (mobile) */}
            <div
              className={`
                absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 
                ${activeImageId === item.id ? 'bg-black/60 opacity-100' : 'group-hover:bg-black/60 group-hover:opacity-100 opacity-0'}
              `}
            >
              <p className="text-white text-sm">{item.caption}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-600 bg-opacity-90 text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spinner / End message */}
      {showLoadingSpinner && isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 mt-2">Loading more...</p>
        </div>
      )}

      {showLoadingSpinner && !hasMore && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-400">You've reached the end of our portfolio!</p>
        </div>
      )}
    </div>
  );
};



  // ====================
  // PAGE COMPONENTS
  // ====================

  const HomePage = () => (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {WEBSITE_CONFIG.name}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {WEBSITE_CONFIG.tagline}
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-white font-semibold transition-colors"
          >
            Start Your Project
          </button>
        </div>
      </section>

      {/* Portfolio with Infinite Scroll */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Our Latest Work</h2>
          <p className="text-gray-400">Discover our recent photography and videography projects</p>
        </div>
        <PortfolioGrid 
          items={getFilteredItems()} 
          showLoadingSpinner={true}
        />
      </section>
    </div>
  );

  const PortfolioPage = () => (
    <div className="bg-black min-h-screen">
      <section className="py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Our Portfolio</h1>
          <p className="text-gray-400">Explore our work across different categories</p>
        </div>
        <PortfolioGrid items={getFilteredItems()} showFilters={true} />
      </section>
    </div>
  );

  const TeamPage = () => (
    <div className="bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Meet Our Team</h1>
            <p className="text-gray-400">The creative minds behind every perfect shot</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map(member => (
              <div key={member.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const PricingPage = () => (
    <div className="bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Our Pricing</h1>
            <p className="text-gray-400">Choose the perfect package for your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PACKAGES.map(pkg => (
              <div key={pkg.id} className={`bg-gray-900 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300 ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {pkg.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-blue-400">{pkg.price}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ContactPage = () => (
    <div className="bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-gray-400">Let's discuss your next project</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-gray-400">{WEBSITE_CONFIG.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">{WEBSITE_CONFIG.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="text-white font-semibold">Address</h3>
                  <p className="text-gray-400">{WEBSITE_CONFIG.contact.address}</p>
                </div>
              </div>
            </div>

            {/* ✅ Corrected Form Starts Here */}
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Project Type</label>
                  <select className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select project type</option>
                    <option>Real Estate</option>
                    <option>Medical</option>
                    <option>Clothing</option>
                    <option>Food</option>
                    <option>Construction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  // ====================
  // FOOTER COMPONENT
  // ====================
  const Footer = () => (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">{WEBSITE_CONFIG.name}</span>
            </div>
            <p className="text-gray-400">{WEBSITE_CONFIG.tagline}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <div className="space-y-2">
              <button onClick={() => setCurrentPage('home')} className="block text-gray-400 hover:text-white transition-colors">Home</button>
              <button onClick={() => setCurrentPage('portfolio')} className="block text-gray-400 hover:text-white transition-colors">Portfolio</button>
              <button onClick={() => setCurrentPage('team')} className="block text-gray-400 hover:text-white transition-colors">Team</button>
              <button onClick={() => setCurrentPage('pricing')} className="block text-gray-400 hover:text-white transition-colors">Pricing</button>
              <button onClick={() => setCurrentPage('contact')} className="block text-gray-400 hover:text-white transition-colors">Contact</button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              {categories.slice(1).map(category => (
                <button 
                  key={category}
                  onClick={() => {
                    setCurrentPage('portfolio');
                    setSelectedCategory(category);
                  }}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p>{WEBSITE_CONFIG.contact.phone}</p>
              <p>{WEBSITE_CONFIG.contact.email}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {WEBSITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // ====================
  // MAIN RENDER
  // ====================
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Close dropdowns when clicking outside */}
      <div onClick={() => setPortfolioDropdownOpen(false)}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'portfolio' && <PortfolioPage />}
        {currentPage === 'team' && <TeamPage />}
        {currentPage === 'pricing' && <PricingPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>
      
      <Footer />
    </div>
  );
};

export default TasveeriYaadeinPortfolio;