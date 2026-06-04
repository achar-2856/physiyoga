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
            kannada: "ಯಮ",
            physio: "Load Regulation Behavior",
            title: "Regulation of Movement Behavior",
            text: "Represents the ability to avoid maladaptive loading behaviors such as repetitive joint stress, sustained faulty postures, and overuse without recovery.",
            bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
            icon: "images/icon_root.png",
            iconColor: "#ef4444"
        },
        {
            yogic: "Niyama",
            kannada: "ನಿಯಮ",
            physio: "Rehabilitation Adherence",
            title: "Internal Discipline & Self-Maintenance",
            text: "Focuses on personal observances like adherence to therapeutic exercise, sleep optimization, and gradual exposure to functional load.",
            bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
            icon: "images/icon_sacral.png",
            iconColor: "#f97316"
        },
        {
            yogic: "Asana",
            kannada: "ಆಸನ",
            physio: "Biomechanical Positioning",
            title: "Structured Postural Control",
            text: "Uses physical posture to optimize joint centration, balance muscular force couples, and improve segmental mobility–stability ratios.",
            bg: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)",
            icon: "images/icon_solar.png",
            iconColor: "#eab308"
        },
        {
            yogic: "Pranayama",
            kannada: "ಪ್ರಾಣಾಯಾಮ",
            physio: "Respiratory-Motor Control",
            title: "Respiratory–Neuromuscular Regulation",
            text: "Utilizes breathing as a neuromotor control mechanism to influence intra-abdominal pressure, core stabilization, and autonomic balance.",
            bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
            icon: "images/icon_heart.png",
            iconColor: "#22c55e"
        },
        {
            yogic: "Pratyahara",
            kannada: "ಪ್ರತ್ಯಾಹಾರ",
            physio: "Sensory-Motor Modulation",
            title: "Sensory Integration & Modulation",
            text: "Involves refinement of sensory-motor processing, reducing nociceptive hypersensitivity and enhancing proprioceptive accuracy.",
            bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            icon: "images/icon_throat.png",
            iconColor: "#3b82f6"
        },
        {
            yogic: "Dharana",
            kannada: "ಧಾರಣ",
            physio: "Directed Motor Control",
            title: "Directed Motor Attention",
            text: "Uses focused attention to improve muscle recruitment precision, timing of activation, and movement accuracy for motor relearning.",
            bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
            icon: "images/icon_ajna.png",
            iconColor: "#6366f1"
        },
        {
            yogic: "Dhyana",
            kannada: "ಧ್ಯಾನ",
            physio: "Motor Efficiency",
            title: "Sustained Neuromotor Integration",
            text: "Achieves automaticity of efficient movement where repeated practice leads to reduced cognitive load and energy-efficient biomechanics.",
            bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
            icon: "images/icon_crown.png",
            iconColor: "#a855f7"
        },
        {
            yogic: "Samadhi",
            kannada: "ಸಮಾಧಿ",
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
                    <h2 class="slide-title" style="line-height: 1.15;">
                        <span style="font-family: 'Bandipura'; font-size: 1.4rem; color: var(--accent); display: block; margin-bottom: 0.2rem; font-weight: normal; text-transform: none;">${item.kannada}</span>
                        ${item.yogic}
                    </h2>
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
        const footerLinksElement = document.getElementById('footer-quick-links') || document.querySelector('.footer-links');
        if (footerLinksElement) {
            if (!footerLinksElement.querySelector('a[href="documents.html"]')) {
                const docLi = document.createElement('li');
                docLi.innerHTML = '<a href="documents.html">Documentation</a>';
                footerLinksElement.appendChild(docLi);
            }
        }
    }

    // --- Booking Form Submission Channel Modal ---
    const bookingForm = document.getElementById('appointment-form');
    const channelModal = document.getElementById('booking-channel-modal');
    const closeChannelModal = document.getElementById('close-booking-modal');
    
    if (bookingForm && channelModal) {
        let submissionData = {};

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            submissionData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value || 'Not provided',
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                message: document.getElementById('message').value || 'None'
            };

            // Format date nicely
            if (submissionData.date) {
                const dateObj = new Date(submissionData.date);
                submissionData.formattedDate = dateObj.toLocaleDateString('en-US', {
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                });
            } else {
                submissionData.formattedDate = 'Not specified';
            }

            // Open selection modal
            channelModal.style.display = 'block';
        });

        // Close Modal Events
        if (closeChannelModal) {
            closeChannelModal.onclick = () => {
                channelModal.style.display = 'none';
            };
        }

        window.addEventListener('click', (event) => {
            if (event.target === channelModal) {
                channelModal.style.display = 'none';
            }
        });

        // WhatsApp Submission Handler
        const btnWa = document.getElementById('submit-whatsapp');
        if (btnWa) {
            btnWa.addEventListener('click', () => {
                const messageText = `Hello Physiyoga! I would like to request an appointment.

*Appointment Request:*
• *Name:* ${submissionData.name}
• *Phone:* ${submissionData.phone}
• *Email:* ${submissionData.email}
• *Service:* ${submissionData.service}
• *Preferred Date:* ${submissionData.formattedDate}
• *Preferred Time:* ${submissionData.time}
• *Condition / Notes:* ${submissionData.message}`;

                const encodedText = encodeURIComponent(messageText);
                const whatsappUrl = `https://wa.me/919606044310?text=${encodedText}`;
                
                channelModal.style.display = 'none';
                window.open(whatsappUrl, '_blank');
            });
        }

        // Email Submission Handler
        const btnMail = document.getElementById('submit-email');
        if (btnMail) {
            btnMail.addEventListener('click', () => {
                const emailSubject = `Appointment Request - ${submissionData.name}`;
                const emailBody = `Hello Physiyoga!

I would like to request an appointment at your clinic. Here are my details:

• Name: ${submissionData.name}
• Phone: ${submissionData.phone}
• Email: ${submissionData.email}
• Selected Service: ${submissionData.service}
• Preferred Date: ${submissionData.formattedDate}
• Preferred Time: ${submissionData.time}

Condition / Additional Notes:
${submissionData.message}

Please confirm my availability. Thank you!`;

                channelModal.style.display = 'none';
                window.location.href = `mailto:dr.swetha@physiyoga.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            });
        }
    }

    // --- Floating Assistant Chatbot Widget ---
    if (!document.querySelector('.chatbot-widget')) {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'chatbot-widget';
        chatbotContainer.innerHTML = `
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">P</div>
                        <div class="chatbot-header-text">
                            <span class="chatbot-header-title">Physiyoga Assistant</span>
                            <span class="chatbot-header-status">Online</span>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatbot-close" aria-label="Close Chat">&times;</button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="chatbot-msg bot">
                        <p>Hello! 👋 Welcome to Physiyoga Clinic.</p>
                        <p>I am Dr. Swetha's AI Assistant. How can I help you today?</p>
                    </div>
                </div>
                <div class="chatbot-chips" id="chatbot-chips">
                    <button class="chatbot-chip" data-query="book">📅 Book Appointment</button>
                    <button class="chatbot-chip" data-query="services">💼 Our Services</button>
                    <button class="chatbot-chip" data-query="location">📍 Clinic Location</button>
                    <button class="chatbot-chip" data-query="hours">🕒 Clinic Hours</button>
                </div>
                <form class="chatbot-footer" id="chatbot-form">
                    <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Type a message..." required autocomplete="off">
                    <button type="submit" class="chatbot-send" aria-label="Send Message">
                        <svg viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </form>
            </div>
            <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open Chat">
                <svg viewBox="0 0 24 24" id="chat-icon-open" style="width: 28px; height: 28px;">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                </svg>
                <svg viewBox="0 0 24 24" id="chat-icon-close" style="display: none; width: 28px; height: 28px;">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                <div class="badge-ping" id="chatbot-badge"></div>
            </button>
        `;
        document.body.appendChild(chatbotContainer);

        const toggleBtn = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chatbot-window');
        const badge = document.getElementById('chatbot-badge');
        const chatIconOpen = document.getElementById('chat-icon-open');
        const chatIconClose = document.getElementById('chat-icon-close');
        const closeBtn = document.getElementById('chatbot-close');
        const messagesContainer = document.getElementById('chatbot-messages');
        const chatForm = document.getElementById('chatbot-form');
        const chatInput = document.getElementById('chatbot-input');
        const chipsContainer = document.getElementById('chatbot-chips');

        // Check if previously opened in session to hide badge
        if (sessionStorage.getItem('chatbotOpened') === 'true') {
            if (badge) badge.style.display = 'none';
        }

        function toggleChat() {
            const isOpen = chatWindow.classList.toggle('open');
            toggleBtn.classList.toggle('active', isOpen);
            if (isOpen) {
                chatIconOpen.style.display = 'none';
                chatIconClose.style.display = 'block';
                if (badge) badge.style.display = 'none';
                sessionStorage.setItem('chatbotOpened', 'true');
                // Scroll to bottom on open
                setTimeout(() => {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 100);
            } else {
                chatIconOpen.style.display = 'block';
                chatIconClose.style.display = 'none';
            }
        }

        toggleBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        function addMessage(text, sender = 'bot') {
            const msgElement = document.createElement('div');
            msgElement.className = `chatbot-msg ${sender}`;
            msgElement.innerHTML = text;
            messagesContainer.appendChild(msgElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        const chipData = {
            book: { text: "📅 Book Appointment", query: "book" },
            services: { text: "💼 Our Services", query: "services" },
            location: { text: "📍 Clinic Location", query: "location" },
            hours: { text: "🕒 Clinic Hours", query: "hours" },
            pain: { text: "🦴 Joint/Muscle Pain", query: "pain" },
            pregnancy: { text: "🤰 Pregnancy Rehab", query: "pregnancy" },
            sports: { text: "🏃 Sports Conditioning", query: "sports" },
            yoga: { text: "🧘 Yoga Integration", query: "yoga" }
        };

        function renderChips(chipsList) {
            chipsContainer.innerHTML = '';
            if (chipsList.length === 0) {
                chipsContainer.style.display = 'none';
                return;
            }
            chipsContainer.style.display = 'flex';
            chipsList.forEach(key => {
                const data = chipData[key];
                if (data) {
                    const chip = document.createElement('button');
                    chip.className = 'chatbot-chip';
                    chip.textContent = data.text;
                    chip.onclick = () => {
                        addMessage(data.text, 'user');
                        handleBotResponse(data.query);
                    };
                    chipsContainer.appendChild(chip);
                }
            });
        }

        function handleBotResponse(userText) {
            const text = userText.toLowerCase().trim();

            // Typing indicator
            const typingElement = document.createElement('div');
            typingElement.className = 'chatbot-msg bot typing-indicator';
            typingElement.innerHTML = `
                <div style="display: flex; gap: 4px; align-items: center; height: 16px;">
                    <span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:blink 1.4s infinite both;"></span>
                    <span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:blink 1.4s infinite both 0.2s;"></span>
                    <span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:blink 1.4s infinite both 0.4s;"></span>
                </div>
            `;
            messagesContainer.appendChild(typingElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            setTimeout(() => {
                typingElement.remove();

                let response = '';
                let showChips = [];

                if (text.includes('book') || text.includes('appoint') || text.includes('schedule') || text.includes('consult')) {
                    response = `<p>To book an appointment, you can fill out our form on the <a href="contact.html">Contact Page</a> which will redirect you to WhatsApp. Alternatively, you can message us directly on WhatsApp right now!</p>
                    <a href="https://wa.me/919606044310?text=Hello%20Physiyoga%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" class="chatbot-btn-link">
                        Chat on WhatsApp
                    </a>`;
                    showChips = ['services', 'location', 'hours'];
                } else if (text.includes('service') || text.includes('treat') || text.includes('therapy') || text.includes('rehab')) {
                    response = `<p>We offer specialized, evidence-based physiotherapy & yoga rehabilitation:</p>
                    <ul>
                        <li><b>Musculoskeletal Physiotherapy</b> (joint/muscle pain)</li>
                        <li><b>Antenatal & Postnatal Care</b> (pregnancy health)</li>
                        <li><b>Movement & Biomechanical Assessment</b></li>
                        <li><b>Return to Sport Conditioning</b></li>
                        <li><b>Motor Control & Joint Stability</b></li>
                    </ul>
                    <p>Which area are you interested in?</p>`;
                    showChips = ['pain', 'pregnancy', 'sports', 'yoga'];
                } else if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('map') || text.includes('clinic')) {
                    response = `<p><b>Clinic Address:</b><br>No 9, First Floor, Bharath Housing Society, 60 Feet Road, Thurahalli Rd, near Gubbalala Lake, Bengaluru, Karnataka 560061</p>
                    <p>📍 <a href="https://maps.app.goo.gl/MJdLWusp6R1fvdPx8" target="_blank">Open in Google Maps</a></p>`;
                    showChips = ['book', 'hours', 'services'];
                } else if (text.includes('hour') || text.includes('time') || text.includes('timing') || text.includes('open') || text.includes('schedule')) {
                    response = `<p><b>Our Clinic Hours:</b></p>
                    <ul>
                        <li><b>Monday – Friday:</b> 9:00 AM – 8:00 PM</li>
                        <li><b>Saturday:</b> 9:00 AM – 5:00 PM</li>
                        <li><b>Sunday:</b> Closed</li>
                    </ul>`;
                    showChips = ['book', 'location', 'services'];
                } else if (text.includes('pain') || text.includes('back') || text.includes('neck') || text.includes('joint') || text.includes('injury') || text.includes('muscle') || text.includes('spine') || text.includes('disc')) {
                    response = `<p>Dr. Swetha specializes in treating mechanical spine conditions, disk injuries, neck/back pain, and postural strain.</p>
                    <p>We use thorough biomechanical assessment combined with therapeutic yoga movements to target the root cause.</p>`;
                    showChips = ['book', 'services', 'hours'];
                } else if (text.includes('pregnancy') || text.includes('maternal') || text.includes('postnatal') || text.includes('baby') || text.includes('antenatal') || text.includes('delivery')) {
                    response = `<p>Our maternal program provides safe rehabilitation during pregnancy and after delivery, focusing on core recovery, pelvic stability, and pain management.</p>`;
                    showChips = ['book', 'services', 'hours'];
                } else if (text.includes('sport') || text.includes('run') || text.includes('athlete') || text.includes('exercise') || text.includes('gym')) {
                    response = `<p>Our Return to Sport program bridges the gap between basic pain relief and high-performance athletic activity, targeting biomechanical efficiency.</p>`;
                    showChips = ['book', 'services', 'location'];
                } else if (text.includes('yoga') || text.includes('asana') || text.includes('pranayama')) {
                    response = `<p>We utilize clinical yoga integration, taking movement principles from yoga and applying them as precise therapeutic tools under clinical supervision.</p>`;
                    showChips = ['services', 'book', 'hours'];
                } else if (text.includes('fee') || text.includes('cost') || text.includes('price') || text.includes('charge')) {
                    response = `<p>Our session fees depend on the specific assessment and treatment plans required. Please contact Dr. Swetha on WhatsApp at <b>9606044310</b> for details.</p>
                    <a href="https://wa.me/919606044310?text=Hello%20Physiyoga%2C%20could%20you%20please%20share%20the%20pricing%20details%3F" target="_blank" class="chatbot-btn-link">Inquire Pricing</a>`;
                    showChips = ['book', 'location', 'hours'];
                } else if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('good morning') || text.includes('good afternoon')) {
                    response = `<p>Hello! How can I help you with your clinical health and movement goals today?</p>`;
                    showChips = ['book', 'services', 'location', 'hours'];
                } else {
                    response = `<p>I want to make sure you get the most accurate support! For detailed medical inquiries, it is best to speak with Dr. Swetha.</p>
                    <p>Feel free to call or WhatsApp us at <b>9606044310</b>.</p>
                    <a href="https://wa.me/919606044310" target="_blank" class="chatbot-btn-link">WhatsApp Doctor</a>`;
                    showChips = ['book', 'services', 'location', 'hours'];
                }

                addMessage(response, 'bot');
                renderChips(showChips);

            }, 800);
        }

        // Attach user chat form handler
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const queryText = chatInput.value.trim();
            if (!queryText) return;

            addMessage(queryText, 'user');
            chatInput.value = '';
            handleBotResponse(queryText);
        });

        // Initialize preset chips click handlers
        document.querySelectorAll('.chatbot-chip').forEach(chip => {
            const query = chip.getAttribute('data-query');
            chip.onclick = () => {
                addMessage(chip.textContent, 'user');
                handleBotResponse(query);
            };
        });
    }

    // --- PWA Service Worker ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => {
                    console.log('Service Worker: Registered');
                    // Check if there is an update waiting
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content available, trigger update
                                console.log('New service worker installed; skipWaiting active.');
                            }
                        });
                    });
                })
                .catch(err => console.log('Service Worker: Error: ', err));
        });

        // Reload the page when the new service worker takes over control
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload();
                refreshing = true;
            }
        });
    }
});
