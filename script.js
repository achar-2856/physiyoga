document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navLinks.classList.contains('active') ? '✕' : '☰';
            mobileBtn.textContent = icon;
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileBtn.textContent = '☰';
                }
            }
        });
    });

    // --- Animation Observer ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);


    // --- Carousel Logic ---
    // --- Carousel Logic ---
    const carouselData = [
        {
            yogic: "Yama",
            physio: "Load Regulation Behavior",
            title: "Regulation of Movement Behavior",
            text: "Represents the ability to avoid maladaptive loading behaviors such as repetitive joint stress, sustained faulty postures, and overuse without recovery.",
            bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
            icon: "images/icon_root.png",
            iconColor: "#ef4444"
        },
        {
            yogic: "Niyama",
            physio: "Rehabilitation Adherence",
            title: "Internal Discipline & Self-Maintenance",
            text: "Focuses on personal observances like adherence to therapeutic exercise, sleep optimization, and gradual exposure to functional load.",
            bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
            icon: "images/icon_sacral.png",
            iconColor: "#f97316"
        },
        {
            yogic: "Asana",
            physio: "Biomechanical Positioning",
            title: "Structured Postural Control",
            text: "Uses physical posture to optimize joint centration, balance muscular force couples, and improve segmental mobility–stability ratios.",
            bg: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)",
            icon: "images/icon_solar.png",
            iconColor: "#eab308"
        },
        {
            yogic: "Pranayama",
            physio: "Respiratory-Motor Control",
            title: "Respiratory–Neuromuscular Regulation",
            text: "Utilizes breathing as a neuromotor control mechanism to influence intra-abdominal pressure, core stabilization, and autonomic balance.",
            bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
            icon: "images/icon_heart.png",
            iconColor: "#22c55e"
        },
        {
            yogic: "Pratyahara",
            physio: "Sensory-Motor Modulation",
            title: "Sensory Integration & Modulation",
            text: "Involves refinement of sensory-motor processing, reducing nociceptive hypersensitivity and enhancing proprioceptive accuracy.",
            bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            icon: "images/icon_throat.png",
            iconColor: "#3b82f6"
        },
        {
            yogic: "Dharana",
            physio: "Directed Motor Control",
            title: "Directed Motor Attention",
            text: "Uses focused attention to improve muscle recruitment precision, timing of activation, and movement accuracy for motor relearning.",
            bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
            icon: "images/icon_ajna.png",
            iconColor: "#6366f1"
        },
        {
            yogic: "Dhyana",
            physio: "Motor Efficiency",
            title: "Sustained Neuromotor Integration",
            text: "Achieves automaticity of efficient movement where repeated practice leads to reduced cognitive load and energy-efficient biomechanics.",
            bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
            icon: "images/icon_crown.png",
            iconColor: "#a855f7"
        },
        {
            yogic: "Samadhi",
            physio: "Functional System Integration",
            title: "Global Movement System Harmony",
            text: "The culmination of functional integration, ensuring balanced mobility, efficient load transfer, and coordinated neuromuscular function.",
            bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            icon: "images/icon_breath.png",
            iconColor: "#06b6d4"
        }
    ];

    const bannerContainer = document.getElementById('main-banner');
    const navContainer = document.getElementById('carousel-nav');

    if (bannerContainer && navContainer) {
        let currentIndex = 0;
        let autoPlayInterval;

        // Render Slides and Nav
        carouselData.forEach((item, index) => {
            // Create Slide
            const slide = document.createElement('div');
            slide.className = `carousel-slide${index === 0 ? ' active' : ''}`;
            slide.style.background = item.bg;
            slide.innerHTML = `
                <div class="slide-content">
                    <h2 class="slide-title">${item.yogic}</h2>
                    <div class="slide-subtitle">
                        <span>${item.physio}</span>
                    </div>
                    <p style="font-size: 1.25rem; color: var(--secondary); max-width: 500px;">${item.text}</p>
                </div>
                <div class="slide-bg-watermark" style="background-image: url('${item.icon}');"></div>
            `;
            bannerContainer.appendChild(slide);

            // Create Nav Item
            const navBtn = document.createElement('button');
            navBtn.className = `nav-circle${index === 0 ? ' active' : ''}`;
            navBtn.onclick = () => goToSlide(index);
            navBtn.innerHTML = `
                <div class="circle-graphic" style="border-color: ${item.iconColor};">
                     <img src="${item.icon}" class="circle-icon-img" alt="${item.yogic} icon">
                </div>
                <div class="nav-label">${item.physio}</div>
                <div class="nav-sublabel">${item.yogic}</div>
            `;

            // Style adjustment for concentric circles coloring
            const graphic = navBtn.querySelector('.circle-graphic');
            const styleElement = document.createElement('style');
            // We use inline styles for dynamic colors handled in CSS usually, but here we can modify
            // the border colors dynamically if we used CSS variables. 
            // Simplified: we just set the main border color above.

            navContainer.appendChild(navBtn);
        });

        function goToSlide(index) {
            // Remove active classes
            document.querySelectorAll('.carousel-slide').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-circle').forEach(n => n.classList.remove('active'));

            // Add active classes
            bannerContainer.children[index].classList.add('active');
            navContainer.children[index].classList.add('active');

            currentIndex = index;
            resetTimer();
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % carouselData.length;
            goToSlide(nextIndex);
        }

        function resetTimer() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        // Start AutoPlay
        resetTimer();
    }

    // --- Services Data & Modal Logic ---
    const servicesData = [
        {
            title: "Musculoskeletal Physiotherapy",
            summary: "This service addresses pain and dysfunction arising from joints, muscles, tendons, and faulty movement mechanics.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
            details: `
                <h3>Musculoskeletal Physiotherapy</h3>
                <p>This service addresses pain and dysfunction arising from joints, muscles, tendons, and faulty movement mechanics.</p>
                <h4>Commonly Managed Conditions</h4>
                <ul>
                    <li>Mechanical neck pain and cervicogenic conditions</li>
                    <li>Mechanical low back pain</li>
                    <li>Disc-related pain</li>
                    <li>Shoulder impingement, rotator cuff overload, and instability</li>
                    <li>Elbow and wrist overuse injuries</li>
                    <li>Hip pain related to mobility or control deficits</li>
                    <li>Knee pain, patellofemoral pain syndrome</li>
                    <li>Ankle instability and recurrent sprains</li>
                    <li>Tendinopathies (Achilles, patellar, rotator cuff, lateral elbow)</li>
                    <li>Postural and repetitive strain disorders</li>
                </ul>
                <p><strong>Focus:</strong> Restore optimal joint mechanics, reduce abnormal tissue stress, and prevent recurrence.</p>
            `
        },
        {
            title: "Movement Assessment & Biomechanical Analysis",
            summary: "This service identifies movement faults and compensations that contribute to pain or repeated injury.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
            details: `
                <h3>Movement Assessment & Biomechanical Analysis</h3>
                <p>This service identifies movement faults and compensations that contribute to pain or repeated injury.</p>
                <h4>Commonly Assessed Issues</h4>
                <ul>
                    <li>Poor postural alignment</li>
                    <li>Altered gait patterns</li>
                    <li>Faulty squat, lunge, or hinge mechanics</li>
                    <li>Asymmetrical loading patterns</li>
                    <li>Mobility–stability imbalances</li>
                    <li>Poor movement control under load</li>
                </ul>
                <p><strong>Outcome:</strong> A precise movement diagnosis that directs targeted rehabilitation rather than generic exercise programs.</p>
            `
        },
        {
            title: "Antenatal & Postnatal Physiotherapy",
            summary: "For women during pregnancy and after delivery, supporting safe movement, strength, and maternal recovery.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 22c4.5 0 8-2 8-6 0-3-3-4.5-8-4.5s-8 1.5-8 4.5c0 4 3.5 6 8 6Z"/><circle cx="12" cy="15" r="2"/></svg>`,
            details: `
                <h3>Antenatal & Postnatal Physiotherapy</h3>
                <p>For women during pregnancy and after delivery, supporting safe movement and physical well-being.</p>
                <h4>Key Benefits & Support</h4>
                <ul>
                    <li>Improve strength, stability, and body awareness through guided care</li>
                    <li>Focus on restoring function and building confidence in daily activities</li>
                    <li>Integrated physiotherapy and yoga approach for complete maternal recovery</li>
                    <li>Management of gestational pelvic girdle pain (PGP) and low back pain</li>
                    <li>Diastasis Recti Abdominis (DRA) evaluation and recovery</li>
                    <li>Safe progression of core and pelvic floor loading exercises</li>
                </ul>
                <p><strong>Goal:</strong> Complete physical well-being, functional recovery, and confident movement throughout the maternal journey.</p>
            `
        },
        {
            title: "Motor Control & Joint Stability Training",
            summary: "Designed for individuals with recurrent pain, joint instability, or inefficient movement control.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
            details: `
                <h3>Motor Control & Joint Stability Training</h3>
                <p>Designed for individuals with recurrent pain, joint instability, or inefficient movement control.</p>
                <h4>Commonly Addressed Problems</h4>
                <ul>
                    <li>Recurrent low back or neck pain</li>
                    <li>Scapular dyskinesis</li>
                    <li>Lumbopelvic instability</li>
                    <li>Hip–knee join pathologies</li>
                    <li>Poor core control during activity</li>
                    <li>Kinesiophobia - Fear of Movement</li>
                </ul>
                <p><strong>Focus:</strong> Improve movement precision, joint protection, and load tolerance.</p>
            `
        },
        {
            title: "Post-Injury & Post-Surgical Rehabilitation",
            summary: "Structured rehabilitation following orthopaedic injury or surgery, guided by tissue healing timelines.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
            details: `
                <h3>Post-Injury & Post-Surgical Rehabilitation</h3>
                <p>Structured rehabilitation following orthopaedic injury or surgery, guided by tissue healing timelines.</p>
                <h4>Commonly Managed Cases</h4>
                <ul>
                    <li>ACL reconstruction</li>
                    <li>Meniscus injury or repair</li>
                    <li>Rotator cuff repair</li>
                    <li>Shoulder dislocation and instability</li>
                    <li>Ligament injuries</li>
                    <li>Fractures (upper and lower limb)</li>
                    <li>Joint replacement rehabilitation (hip, knee)</li>
                </ul>
                <p><strong>Rehabilitation progresses from:</strong> Mobility → Stability → Strength → Function.</p>
            `
        },
        {
            title: "Return to Sport & Activity Conditioning",
            summary: "This service bridges the gap between rehabilitation and full participation in sport, fitness, or physically demanding activity.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
            details: `
                <h3>Return to Sport & Activity Conditioning</h3>
                <p>This service bridges the gap between rehabilitation and full participation in sport, fitness, or physically demanding activity.</p>
                <h4>Commonly Managed Scenarios</h4>
                <ul>
                    <li>Athletes returning after ACL or meniscus surgery</li>
                    <li>Shoulder injuries in overhead sports</li>
                    <li>Recurrent ankle sprains</li>
                    <li>Tendon injuries requiring graded loading</li>
                    <li>Deconditioning after injury</li>
                    <li>Fear of movement or reinjury</li>
                </ul>
                <h4>Focus Areas</h4>
                <ul>
                    <li>Progressive loading and impact tolerance</li>
                    <li>Strength and power development</li>
                    <li>Movement quality under fatigue</li>
                    <li>Sport- or task-specific movement patterns</li>
                    <li>Injury risk reduction strategies</li>
                </ul>
                <p><strong>Goal:</strong> Safe, confident, and sustainable return to sport or activity.</p>
            `
        },
        {
            title: "Therapeutic Movement Integration",
            summary: "Selected movement principles inspired by Ashtanga Yoga are used as therapeutic movement tools.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
            details: `
                <h3>Therapeutic Movement Integration (Physiotherapy-Led)</h3>
                <p>This is not general yoga practice. Selected movement principles inspired by Ashtanga Yoga are used as therapeutic movement tools.</p>
                <h4>To Improve:</h4>
                <ul>
                    <li>Controlled joint mobility</li>
                    <li>Alignment awareness</li>
                    <li>Closed-chain stability</li>
                    <li>Movement sequencing</li>
                </ul>
                <p>All movements are modified, pathology-specific, and clinically supervised.</p>
            `
        },
        {
            title: "Breathing Mechanics & Postural Re-education",
            summary: "Breathing and posture influence spinal loading, core stability, and endurance.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 13h6"/><path d="M13.5 13h6"/><path d="M6 10h2.5"/><path d="M10 16h5"/><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>`,
            details: `
                <h3>Breathing Mechanics & Postural Re-education</h3>
                <p>Breathing and posture influence spinal loading, core stability, and endurance.</p>
                <h4>Commonly Addressed Issues</h4>
                <ul>
                    <li>Respiratory Training</li>
                </ul>
                <p><strong>Outcome:</strong> Improved postural control, movement efficiency, and fatigue resistance.</p>
            `
        },
        {
            title: "Workplace Ergonomics & Corporate Programs",
            summary: "Designed to reduce work-related musculoskeletal strain and injury.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
            details: `
                <h3>Workplace Ergonomics & Corporate Programs</h3>
                <p>Designed to reduce work-related musculoskeletal strain and injury.</p>
                <h4>Commonly Addressed Problems</h4>
                <ul>
                    <li>Neck and back pain related to desk work</li>
                    <li>Prolonged sitting or standing strain</li>
                    <li>Repetitive task overload</li>
                    <li>Poor workstation setup</li>
                    <li>Ergonomic Advice</li>
                    <li>Work Hardening & Work Conditioning</li>
                </ul>
                <p>Services include ergonomic assessment, posture education, and injury prevention strategies.</p>
            `
        }
    ];

    const serviceList = document.getElementById('home-services-list');
    const modal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Function to render services
    function renderServices(container, limit = null) {
        if (!container) return;

        // Clear container
        container.innerHTML = '';

        const data = limit ? servicesData.slice(0, limit) : servicesData;

        data.forEach((service, loopIndex) => {
            const card = document.createElement('div');
            card.className = 'service-card animate-on-scroll';

            // If we are showing a limited set, the loopIndex is 0, 1, 2...
            // But we want the index for the modal to be the index in the original servicesData array.
            // Since we are just slicing from 0, the loopIndex IS the original index for the first N items.
            // However, to be robust if we ever change logic:
            const originalIndex = servicesData.indexOf(service);

            card.innerHTML = `
                <h3>${service.title}</h3>
                <p style="color: var(--gray); margin: 1rem 0;">${service.summary}</p>
                <button class="btn-read-more" style="color: var(--primary); font-weight: 600; background: none; border: none; padding: 0; cursor: pointer; font-size: 1rem;" onclick="openModal(${originalIndex})">Read More →</button>
            `;
            container.appendChild(card);
        });

        // Re-run observer for new elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    // Render 3 services on home page
    if (serviceList) {
        renderServices(serviceList, 3);
    }

    // Render all services on services page
    const allServicesList = document.getElementById('all-services-list');
    if (allServicesList) {
        renderServices(allServicesList);
    }

    // Modal Functions
    window.openModal = function (index) {
        // Find the index in the original full dataset. 
        // Note: The index passed here assumes the order of rendering matches the 'servicesData' order.
        // If we limited the render, the index 0-3 still matches 0-3 in 'servicesData'.
        const service = servicesData[index];
        if (service && modal && modalBody) {
            modalBody.innerHTML = service.details;
            modal.style.display = 'block';
        }
    }

    if (closeModal) {
        closeModal.onclick = function () {
            modal.style.display = "none";
        }
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- Dynamic Documentation Navbar Link ---
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        // Add to main navbar
        const navLinksElement = document.querySelector('.nav-links');
        if (navLinksElement) {
            if (!navLinksElement.querySelector('a[href="documents.html"]')) {
                const docLi = document.createElement('li');
                docLi.innerHTML = '<a href="documents.html" class="nav-link">Documentation</a>';
                
                // Highlight active link if on documents page
                const docLink = docLi.querySelector('a');
                if (window.location.pathname.endsWith('documents.html') && docLink) {
                    docLink.style.color = 'var(--primary)';
                }

                // Insert before the last item (Book Appointment button)
                const lastLi = navLinksElement.querySelector('li:last-child');
                if (lastLi) {
                    navLinksElement.insertBefore(docLi, lastLi);
                } else {
                    navLinksElement.appendChild(docLi);
                }
            }
        }

        // Add to footer
        const footerLinksElement = document.querySelector('.footer-links');
        if (footerLinksElement) {
            if (!footerLinksElement.querySelector('a[href="documents.html"]')) {
                const docLi = document.createElement('li');
                docLi.innerHTML = '<a href="documents.html">Documentation</a>';
                footerLinksElement.appendChild(docLi);
            }
        }
    }

    // --- PWA Service Worker ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('Service Worker: Registered'))
                .catch(err => console.log('Service Worker: Error: ', err));
        });
    }
});
