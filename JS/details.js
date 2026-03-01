document.addEventListener("DOMContentLoaded", function () {
    const cruise = JSON.parse(localStorage.getItem("selectedCruise"));

    if (!cruise) {
        console.log("No cruise data found!");
        return;
    }

    document.getElementById("cruiseImage").src = cruise.image;
    document.getElementById("cruiseTitle").textContent = cruise.title;
    document.getElementById("cruiseDescription").textContent = cruise.description;

    document.getElementById("cruiseDuration").textContent = cruise.duration;
    document.getElementById("cruiseDest").textContent = cruise.destination;
    document.getElementById("cruiseCap").textContent = cruise.capacity;
});

// Facilities Data (PRO Icons + Emojis)
const facilities = [
    { icon: "fa-solid fa-wifi", emoji:"📶", 
        name: "High-Speed WiFi", 
        description: "Stay connected throughout your journey",
        bg : "images/Cafes Bars.jpg" 
    },

    { icon: "fa-solid fa-utensils", 
        emoji:"🍽", name: "Fine Dining",
         description: "5-star restaurants and gourmet buffets" },

    { icon: "fa-solid fa-dumbbell",
         emoji:"🏋", name: "Fitness Center", 
         description: "State-of-the-art gym & workout facility" },

    { icon: "fa-solid fa-music", emoji:"🎵", 
        name: "Live Entertainment", 
        description: "Daily shows, music & performances" },

    { icon: "fa-solid fa-theater-masks", 
        emoji:"🎭", name: "Theater", 
        description: "Broadway-style entertainment shows" },

    { icon: "fa-solid fa-martini-glass", 
        emoji:"🍸", name: "Cafes & Bars",
         description: "Multiple lounges, bars & cafes onboard" },

    { icon: "fa-solid fa-shopping-bag", 
        emoji:"🛍", name: "Duty-Free Shopping",
         description: "Premium shopping brands onboard" },

    { icon: "fa-solid fa-person-swimming", 
        emoji:"🏊", name: "Swimming Pools", 
        description: "Multiple pools and relaxing hot tubs" }
];

const cabinData = [
    {
        title: "Interior Cabin",
        desc: "Cozy interior stateroom with all essential amenities",
        size: "150 sq ft",
        guests: "2 guests",
        price: 2899,
        features: ["Twin beds", "Private bathroom", "TV & Phone", "Safe", "Mini-fridge"],
        bg: "images/cabin-interior.jpg"
    },
    {
        title: "Ocean View Cabin",
        desc: "Comfortable cabin with a window to enjoy ocean views",
        size: "175 sq ft",
        guests: "2–3 guests",
        price: 3399,
        features: ["Ocean view window", "Private bathroom", "TV & Phone", "Safe", "Mini-fridge"],
        bg: "images/cabin-ocean.jpg"
    },
    {
        title: "Balcony Suite",
        desc: "Private balcony with premium features",
        size: "250 sq ft",
        guests: "2–4 guests",
        price: 4299,
        features: ["Private balcony", "Sitting area", "Premium bathroom", "Safe", "Mini-fridge"],
        bg: "images/cabin-balcony.jpg"
    },
    {
        title: "Luxury Suite",
        desc: "Premium suite with panoramic views and exclusive amenities",
        size: "400 sq ft",
        guests: "4 guests",
        price: 5399,
        features: [
            "King bed",
            "Large private balcony",
            "Living room",
            "Luxury bathroom with jacuzzi",
            "Premium TV & Entertainment",
            "Butler service"
        ],
        bg: "images/cabin-luxury.jpg"
    }
];

function renderCabins() {
    const grid = document.getElementById("cabinsGrid");
    grid.innerHTML = cabinData.map((cabin, i) => `
        <div class="cabin-card" style="background-image:url('${cabin.bg}');" onclick="selectCabin(${i})">
            
            <h3>${cabin.title}</h3>
            <p class="desc">${cabin.desc}</p>

            <div class="details">
                <p>📏 ${cabin.size}</p>
                <p>👥 ${cabin.guests}</p>
            </div>

            <p class="feature-title">Features:</p>
            <ul class="features">
                ${cabin.features.map(f => <li>${f}</li>).join("")}
            </ul>

            <div class="price-row">
                <span class="price">Starting from $${cabin.price}</span>
                <button class="select-btn">Select</button>
            </div>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", renderCabins);
let selectedCabin = null;

function selectCabin(index) {
    selectedCabin = cabinData[index];

    document.querySelectorAll(".cabin-card").forEach((card, i) => {
        card.classList.remove("active");
        if (i === index) card.classList.add("active");
    });

    document.getElementById("selectedCabinPrice").innerText = $${selectedCabin.price};
    document.getElementById("bookNowContainer").style.display = "block";
}


// Render Facility Cards
function renderFacilities() {
    const grid = document.getElementById("facilitiesGrid");

    grid.innerHTML = facilities.map(fac => `
    <div class="facility-card" style="background-image: url('${fac.bg}');">
        <div class="facility-icon"><i class="fa-solid ${fac.icon}"></i></div>
        <h3>${fac.name}</h3>
        <p>${fac.description}</p>
    </div>
`).join('');
}

document.addEventListener("DOMContentLoaded", renderFacilities);

