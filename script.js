document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.querySelectorAll('#currentYear').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Hero slider functionality
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        const dots = heroSlider.querySelectorAll('.hero-dot');
        let currentSlide = 0;
        let slideInterval;

        // Function to change slide
        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        // Auto slide change
        function startSlideShow() {
            slideInterval = setInterval(() => {
                let nextSlide = (currentSlide + 1) % slides.length;
                goToSlide(nextSlide);
            }, 8000);
        }

        // Click on dots to change slide
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                goToSlide(parseInt(this.getAttribute('data-index')));
                startSlideShow();
            });
        });

        // Start the slideshow
        startSlideShow();
    }

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs, .anime-tabs, .manga-tabs');
            
            if (tabContainer) {
                // Remove active class from all buttons and contents
                tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                tabContainer.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                
                const tabContent = tabContainer.querySelector(`#${tabName}-tab`) || 
                                  tabContainer.querySelector(`[id$="${tabName}-tab"]`);
                
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            }
        });
    });

    // Generate anime cards
    function generateAnimeCards(container, count, featured = false) {
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const card = document.createElement('div');
            card.className = 'anime-card';
            
            // Random episode number and rating
            const episode = Math.floor(Math.random() * 24) + 1;
            const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Anime" alt="Anime title">
                    <div class="card-badge">HD</div>
                    <div class="card-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>${rating}</span>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${featured ? 'My Hero Academia' : 'Anime Title Here'}</h3>
                    <p class="card-info">Episode ${episode}</p>
                </div>
            `;
            
            // Add play button overlay on hover
            const cardImage = card.querySelector('.card-image');
            
            cardImage.addEventListener('mouseenter', function() {
                const overlay = document.createElement('div');
                overlay.className = 'card-overlay';
                overlay.innerHTML = `
                    <div class="play-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                `;
                
                // Add overlay styles
                const style = document.createElement('style');
                style.textContent = `
                    .card-overlay {
                        position: absolute;
                        inset: 0;
                        background-color: rgba(0, 0, 0, 0.6);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .card-image:hover .card-overlay {
                        opacity: 1;
                    }
                    .play-button {
                        background-color: var(--primary-color);
                        border-radius: 50%;
                        width: 48px;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: scale(0.8);
                        transition: transform 0.3s ease;
                    }
                    .card-image:hover .play-button {
                        transform: scale(1);
                    }
                `;
                
                document.head.appendChild(style);
                cardImage.appendChild(overlay);
            });
            
            container.appendChild(card);
        }
    }

    // Generate manga cards
    function generateMangaCards(container, count, featured = false) {
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const card = document.createElement('div');
            card.className = 'manga-card';
            
            // Random chapter number and rating
            const chapter = Math.floor(Math.random() * 120) + 1;
            const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Manga" alt="Manga title">
                    ${featured ? '<div class="card-badge">NEW</div>' : ''}
                    <div class="card-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>${rating}</span>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${featured ? 'One Piece' : 'Manga Title Here'}</h3>
                    <p class="card-info">Chapter ${chapter}</p>
                </div>
            `;
            
            // Add read button overlay on hover
            const cardImage = card.querySelector('.card-image');
            
            cardImage.addEventListener('mouseenter', function() {
                const overlay = document.createElement('div');
                overlay.className = 'card-overlay';
                overlay.innerHTML = `
                    <div class="read-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    </div>
                `;
                
                // Add overlay styles
                const style = document.createElement('style');
                style.textContent = `
                    .card-overlay {
                        position: absolute;
                        inset: 0;
                        background-color: rgba(0, 0, 0, 0.6);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .card-image:hover .card-overlay {
                        opacity: 1;
                    }
                    .read-button {
                        background-color: var(--secondary-color);
                        border-radius: 50%;
                        width: 48px;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: scale(0.8);
                        transition: transform 0.3s ease;
                    }
                    .card-image:hover .read-button {
                        transform: scale(1);
                    }
                `;
                
                document.head.appendChild(style);
                cardImage.appendChild(overlay);
            });
            
            container.appendChild(card);
        }
    }

    // Generate trending cards
    function generateTrendingCards(container, count) {
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const card = document.createElement('div');
            card.className = 'trending-card';
            
            card.innerHTML = `
                <div class="trending-image">
                    <img src="https://via.placeholder.com/400x225/1a1a2e/ffffff?text=Trending+Anime+${i+1}" alt="Trending anime">
                    <div class="card-badge">HD</div>
                    <div class="card-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>4.9</span>
                    </div>
                </div>
                <div class="trending-content">
                    <h3 class="trending-title">Demon Slayer: Entertainment District Arc</h3>
                    <p class="card-info">Episode 11 • 24 min</p>
                    <div class="trending-info">
                        <span class="trending-genre">Action, Fantasy</span>
                        <button class="like-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        }
    }

    // Generate cards for homepage
    const animeGrid = document.querySelector('.anime-grid');
    const mangaGrid = document.querySelector('.manga-grid');
    const trendingGrid = document.querySelector('.trending-grid');
    const popularMangaGrid = document.querySelector('.popular-manga-grid');

    if (animeGrid) generateAnimeCards(animeGrid, 12);
    if (mangaGrid) generateMangaCards(mangaGrid, 12);
    if (trendingGrid) generateTrendingCards(trendingGrid, 4);
    if (popularMangaGrid) generateMangaCards(popularMangaGrid, 6, true);

    // Generate cards for anime page
    const allAnimeGrid = document.getElementById('all-anime-grid');
    const airingAnimeGrid = document.getElementById('airing-anime-grid');
    const upcomingAnimeGrid = document.getElementById('upcoming-anime-grid');
    const popularAnimeGrid = document.getElementById('popular-anime-grid');

    if (allAnimeGrid) generateAnimeCards(allAnimeGrid, 30, true);
    if (airingAnimeGrid) generateAnimeCards(airingAnimeGrid, 18);
    if (upcomingAnimeGrid) generateAnimeCards(upcomingAnimeGrid, 12);
    if (popularAnimeGrid) generateAnimeCards(popularAnimeGrid, 24, true);

    // Generate cards for manga page
    const allMangaGrid = document.getElementById('all-manga-grid');
    const newMangaGrid = document.getElementById('new-manga-grid');
    const popularMangaGrid2 = document.getElementById('popular-manga-grid');
    const completedMangaGrid = document.getElementById('completed-manga-grid');

    if (allMangaGrid) generateMangaCards(allMangaGrid, 30, true);
    if (newMangaGrid) generateMangaCards(newMangaGrid, 18, true);
    if (popularMangaGrid2) generateMangaCards(popularMangaGrid2, 24, true);
    if (completedMangaGrid) generateMangaCards(completedMangaGrid, 12);

    // Add animation to cards
    const animateCards = () => {
        const cards = document.querySelectorAll('.anime-card, .manga-card, .trending-card');
        
        cards.forEach((card, index) => {
            // Add animation delay based on index
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.transitionDelay = `${index * 0.05}s`;
            
            // Use Intersection Observer to trigger animation when card is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        observer.unobserve(card);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(card);
        });
    };
    
    // Call animation function after cards are generated
    setTimeout(animateCards, 100);

    // Auto-update timestamp
    const updateTimestamp = () => {
        const now = new Date();
        const minutes = Math.floor(Math.random() * 10) + 1; // Random number between 1-10
        
        const updateInfoElements = document.querySelectorAll('.update-info span');
        updateInfoElements.forEach(el => {
            el.textContent = `Auto-updated ${minutes} minutes ago`;
        });
    };
    
    updateTimestamp();
    setInterval(updateTimestamp, 60000); // Update every minute
});