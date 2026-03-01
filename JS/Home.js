    // Data
    const cruises = [
        {
            image: "https://images.unsplash.com/photo-1713273253005-f5970d8aba25?w=600",
            title: "Caribbean Paradise",
            description: "Explore the stunning islands of the Caribbean with pristine beaches and crystal-clear waters",
            duration: "7 Days / 6 Nights",
            destination: "Caribbean Islands",
            capacity: "Up to 2,500 guests",
            price: "$1,299",
            
        },
        {
            image: "https://images.unsplash.com/photo-1758970434851-80415c4b45ea?w=600",
            title: "Mediterranean Escape",
            description: "Discover ancient cities and breathtaking coastal towns across the Mediterranean",
            duration: "10 Days / 9 Nights",
            destination: "Mediterranean Coast",
            capacity: "Up to 3,000 guests",
            price: "$2,499",
        
        },
        {
            image: "https://images.unsplash.com/photo-1751156736427-ecb55e7244bb?w=600",
            title: "Alaska Adventure",
            description: "Witness majestic glaciers and incredible wildlife in the pristine Alaskan wilderness",
            duration: "8 Days / 7 Nights",
            destination: "Alaska & Canada",
            capacity: "Up to 2,000 guests",
            price: "$1,899",
        
        }
    ];

    const destinations = [
        {
            image: "https://images.unsplash.com/photo-1667604987970-4bbd6ed51d0d?w=600",
            title: "Sunset Voyages",
            description: "Experience breathtaking sunsets across the Pacific Ocean",
            cruises: 12
        },
        {
            image: "https://images.unsplash.com/photo-1667604946733-c7dd5b992d2e?w=600",
            title: "Luxury Suites",
            description: "Indulge in our premium accommodations and world-class amenities",
            cruises: 18
        },
        {
            image: "https://images.unsplash.com/photo-1575110445943-15b543686b56?w=600",
            title: "Ocean Explorer",
            description: "Set sail on unforgettable journeys across the seven seas",
            cruises: 24
        }
    ];

    const features = [
        {
            icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="2"/>`,
            title: "Safe & Secure",
            description: "Travel with confidence knowing your safety is our top priority"
        },
        {
            icon: `<circle cx="12" cy="8" r="7" stroke-width="2"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" stroke-width="2"/>`,
            title: "Award Winning",
            description: "Recognized globally for excellence in cruise experiences"
        },
        {
            icon: `<path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 11-5.8-1.6" stroke-width="2"/>`,
            title: "24/7 Support",
            description: "Our dedicated team is here to help you anytime, anywhere"
        },
        {
            icon: `<circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke-width="2"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke-width="2"/>`,
            title: "Global Destinations",
            description: "Explore over 100+ destinations across 6 continents"
        }
    ];

    const loginBtn = document.getElementById("loginBtn");
const userProfileBox = document.getElementById("userProfileBox");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const avatarText = document.getElementById("avatarText");
const profileMenu = document.getElementById("profileMenu");

// Get logged in user
let user = JSON.parse(sessionStorage.getItem("loggedUser"));

// If user is logged in
if (user) {
  loginBtn.style.display = "none";
  userProfileBox.style.display = "flex";

  profileName.innerText = user.name || "User";
  profileEmail.innerText = user.email || "user@email.com";
  avatarText.innerText = (user.name?.charAt(0) || "U").toUpperCase();
} 
else {
  loginBtn.style.display = "inline-block";
  userProfileBox.style.display = "none";
}

// Toggle dropdown
function toggleProfileMenu() {
  profileMenu.style.display =
    profileMenu.style.display === "flex" ? "none" : "flex";
}

// Logout function
function logout() {
  sessionStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}
    window.onload = function () {

  let user = JSON.parse(sessionStorage.getItem("loggedUser"));

  let loginBtn = document.getElementById("loginBtn");
  let profileBox = document.getElementById("profileBox");
  let userEmail = document.getElementById("userEmail");

  if (user) {
    // ✅ Hide Sign In
    loginBtn.style.display = "none";

    // ✅ Show Profile
    profileBox.style.display = "flex";
    userEmail.textContent = user.email;
  } 
  else {
    // ✅ If not logged in
    loginBtn.style.display = "inline-block";
    profileBox.style.display = "none";
  }
};


// ✅ LOGOUT FUNCTION
function logout() {
  sessionStorage.removeItem("loggedUser");
  window.location.href = "Home.html";
}
    

    // Render Cruises
    function renderCruises() {
        const grid = document.getElementById('cruises-grid');
        grid.innerHTML = cruises.map((cruise, index) => `
            <div class="cruise-card" style="transition-delay: ${index * 0.1}s">
                <div class="cruise-image">
                    <img src="${cruise.image}" alt="${cruise.title}">
                    <div class="badge">Featured</div>
                    <div class=""> </div>
                </div>
                <div class="cruise-content">
                    <h3>${cruise.title}</h3>
                    <p>${cruise.description}</p>
                    <div class="cruise-details">
                        <div class="detail">📅 ${cruise.duration}</div>
                        <div class="detail">📍 ${cruise.destination}</div>
                        <div class="detail">👥 ${cruise.capacity}</div>
                    </div>
                    <div class="cruise-footer">
                        <div class="price-info">
                            <p>Starting from</p>
                            <div class="price">${cruise.price}</div>
                        </div>
                        <button class="btn btn-primary btn-small">View Details</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Destinations
    function renderDestinations() {
        const grid = document.getElementById('destinations-grid');
        grid.innerHTML = destinations.map((dest, index) => `
            <div class="destination-card" style="transition-delay: ${index * 0.15}s">
                <img src="${dest.image}" alt="${dest.title}">
                <div class="destination-overlay"></div>
                <div class="destination-content">
                    <h3>${dest.title}</h3>
                    <p>${dest.description}</p>
                    <div class="destination-footer">
                        <span>${dest.cruises} cruises available</span>
                        <button class="btn btn-outline btn-small">Explore</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Features
    function renderFeatures() {
        const grid = document.getElementById('features-grid');
        grid.innerHTML = features.map((feature, index) => `
            <div class="feature-card" style="transition-delay: ${index * 0.1}s">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        ${feature.icon}
                    </svg>
                </div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');
    }

    // Intersection Observer for scroll animations
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all animatable elements
        document.querySelectorAll('.cruise-card, .destination-card, .feature-card, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        renderCruises();
        renderDestinations();
        renderFeatures();
        setupScrollAnimations();
    });

    // Handle View Details click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    const card = e.target.closest(".cruise-card");
    const cruiseTitle = card.querySelector("h3").textContent;
    localStorage.setItem("selectedCruise", cruiseTitle);
    window.location.href = "cruise_details.html";
  }
});


    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // --- Feedback Form ---
document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        alert(`🌊 Thank you, ${name}! Your feedback has been received.`);
        this.reset();
      } else {
        alert("⚠️ Please fill all fields before submitting.");
      }
    });
  }
});



    });
