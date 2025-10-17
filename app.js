import { db } from './database.js';

// FNTD WORLD App State Management
class FNTDWorldApp {
    constructor() {
        this.currentPage = 'mainPage';
        this.isAnimating = false;
        this.db = db; // Supabase database instance
        
        // Device detection
        this.deviceType = this.detectDeviceType();
        this.screenSize = this.getScreenSize();
        
        this.userData = {
            currency: 0,
            inventory: [],
            stats: {
                totalSpins: 0,
                itemsOwned: 0,
                daysActive: 1,
                tradeCount: 0
            },
            profile: {
                name: 'User',
                username: '@username',
                avatar: 'U'
            }
        };

        // Casino units for spinning
        this.casinoUnits = [
            {
                id: 'golden_freddy',
                name: 'Golden Freddy',
                rarity: 'legendary',
                chance: 5,
                icon: '🐻',
                value: 5000
            },
            {
                id: 'nightmare_fredbear',
                name: 'Nightmare Fredbear',
                rarity: 'epic',
                chance: 10,
                icon: '👹',
                value: 2500
            },
            {
                id: 'springtrap',
                name: 'Springtrap',
                rarity: 'epic',
                chance: 10,
                icon: '🐰',
                value: 2500
            },
            {
                id: 'foxy',
                name: 'Foxy',
                rarity: 'rare',
                chance: 15,
                icon: '🦊',
                value: 1000
            },
            {
                id: 'chica',
                name: 'Chica',
                rarity: 'rare',
                chance: 15,
                icon: '🐤',
                value: 1000
            },
            {
                id: 'bonnie',
                name: 'Bonnie',
                rarity: 'rare',
                chance: 15,
                icon: '🐇',
                value: 1000
            },
            {
                id: 'freddy',
                name: 'Freddy',
                rarity: 'common',
                chance: 15,
                icon: '🎩',
                value: 500
            },
            {
                id: 'endo',
                name: 'Endo',
                rarity: 'common',
                chance: 15,
                icon: '🤖',
                value: 500
            }
        ];

        // Available items in the game
        this.availableItems = {
            'golden_freddy': {
                name: 'Golden Freddy',
                rarity: 'legendary',
                icon: '🐻',
                value: 5000,
                description: 'Legendary animatronic with special abilities'
            },
            'nightmare_fredbear': {
                name: 'Nightmare Fredbear',
                rarity: 'epic',
                icon: '👹',
                value: 2500,
                description: 'Epic nightmare variant with enhanced stats'
            },
            'springtrap': {
                name: 'Springtrap',
                rarity: 'epic',
                icon: '🐰',
                value: 2500,
                description: 'Damaged but dangerous springlock suit'
            }
        };

        // Admin usernames
        this.adminUsernames = ['@ave4ge', '@NAVARRLO'];

        // Store all users data
        this.allUsers = {};

        this.isSpinning = false;
        this.settings = {
            language: 'ru',
            theme: 'dark'
        };
        this.init();
    }

    // Device detection methods
    detectDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /mobile|android|iphone|ipad|ipod|windows phone/i.test(userAgent);
        const isTablet = /tablet|ipad/i.test(userAgent) && !/mobile/i.test(userAgent);
        
        if (isMobile) return 'mobile';
        if (isTablet) return 'tablet';
        return 'desktop';
    }

    getScreenSize() {
        const width = window.innerWidth;
        if (width < 768) return 'small';
        if (width < 1024) return 'medium';
        return 'large';
    }

    applyDeviceSpecificStyles() {
        document.body.setAttribute('data-device', this.deviceType);
        document.body.setAttribute('data-screen', this.screenSize);
        
        console.log(`Device: ${this.deviceType}, Screen: ${this.screenSize}`);
        
        this.applyLayoutOptimizations();
    }

    applyLayoutOptimizations() {
        const device = this.deviceType;
        const screen = this.screenSize;
        
        if (device === 'mobile') {
            this.optimizeForMobile();
        }
        
        if (device === 'tablet') {
            this.optimizeForTablet();
        }
        
        if (device === 'desktop') {
            this.optimizeForDesktop();
        }
        
        this.optimizeByScreenSize(screen);
    }

    optimizeForMobile() {
        console.log('Applying mobile optimizations');
        this.reduceAnimations();
        this.optimizeTouchInterface();
        this.adjustElementSizes('mobile');
    }

    optimizeForTablet() {
        console.log('Applying tablet optimizations');
        this.adjustElementSizes('tablet');
        this.optimizeTouchInterface();
    }

    optimizeForDesktop() {
        console.log('Applying desktop optimizations');
        this.enableDesktopFeatures();
        this.adjustElementSizes('desktop');
    }

    optimizeByScreenSize(screenSize) {
        switch(screenSize) {
            case 'small':
                this.applySmallScreenOptimizations();
                break;
            case 'medium':
                this.applyMediumScreenOptimizations();
                break;
            case 'large':
                this.applyLargeScreenOptimizations();
                break;
        }
    }

    reduceAnimations() {
        if (this.deviceType === 'mobile') {
            document.documentElement.style.setProperty('--transition-smooth', '0.1s ease');
        }
    }

    optimizeTouchInterface() {
        if (this.deviceType === 'mobile' || this.deviceType === 'tablet') {
            const touchElements = document.querySelectorAll('.modern-btn, .nav-item, .setting-option');
            touchElements.forEach(el => {
                el.style.minHeight = '44px';
                el.style.minWidth = '44px';
            });
        }
    }

    adjustElementSizes(device) {
        const sizes = {
            'mobile': {
                buttonHeight: '60px',
                fontSize: '14px',
                iconSize: '20px'
            },
            'tablet': {
                buttonHeight: '70px',
                fontSize: '16px',
                iconSize: '24px'
            },
            'desktop': {
                buttonHeight: '80px',
                fontSize: '18px',
                iconSize: '28px'
            }
        };
        
        const config = sizes[device];
        
        document.documentElement.style.setProperty('--button-height', config.buttonHeight);
        document.documentElement.style.setProperty('--base-font-size', config.fontSize);
    }

    enableDesktopFeatures() {
        if (this.deviceType === 'desktop') {
            document.body.classList.add('desktop-hover');
        }
    }

    applySmallScreenOptimizations() {
        const elements = document.querySelectorAll('.card, .stat-card');
        elements.forEach(el => {
            el.style.padding = '12px';
            el.style.marginBottom = '10px';
        });
    }

    applyMediumScreenOptimizations() {
        // Balanced settings for medium screens
    }

    applyLargeScreenOptimizations() {
        if (this.deviceType === 'desktop') {
            const appContainer = document.querySelector('.app-container');
            if (appContainer) {
                appContainer.style.maxWidth = '1400px';
            }
        }
    }

    async init() {
        // Apply device detection first
        this.applyDeviceSpecificStyles();
        
        // Initialize Telegram Web App
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();

            // Initialize user data from Telegram
            await this.initUserFromTelegram(tg);
        } else {
            // Fallback for development
            await this.initUserFromTelegram({
                initDataUnsafe: {
                    user: {
                        first_name: 'Test User',
                        username: 'testuser',
                        id: 123456
                    }
                }
            });
        }

        // Initialize particles background only for non-mobile devices
        if (this.deviceType !== 'mobile') {
            this.initParticles();
        }

        // Initialize countdown timer
        this.initCountdown();

        // Simulate loading
        this.simulateLoading();

        // Initialize UI
        this.updateUI();

        console.log(`FNTD World App initialized for ${this.deviceType} device`);
    }

    async start() {
        // Called after DOM is ready
        await this.init();
    }

    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: '#ffffff' },
                    shape: { type: 'star' },
                    opacity: { value: 0.3, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: false },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' }
                    }
                },
                retina_detect: true
            });
        }
    }

    initCountdown() {
        const releaseDate = new Date('2025-10-18T00:00:00');
        this.updateCountdown(releaseDate);

        // Update every hour
        setInterval(() => {
            this.updateCountdown(releaseDate);
        }, 3600000);
    }

    updateCountdown(releaseDate) {
        const now = new Date();
        const timeLeft = releaseDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.textContent = `${days} ДН. ${hours} ЧАС.`;
            }
        } else {
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.textContent = 'RELEASED!';
            }
        }
    }

    async initUserFromTelegram(tg) {
        const user = tg.initDataUnsafe?.user;
        if (user) {
            this.userData.profile.name = user.first_name || 'User';
            this.userData.profile.username = user.username ? `@${user.username}` : '@user';
            this.userData.profile.avatar = user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U';
            this.userData.profile.id = user.id;

            // Load user data from storage or initialize
            await this.loadUserData();
        }
    }

    async loadUserData() {
        try {
            const userId = this.userData.profile.id;
            let userProfile = await this.db.getUserProfile(userId);

            if (!userProfile) {
                // New user - create profile with starting currency
                userProfile = await this.db.createUserProfile({
                    ...this.userData,
                    currency: 500
                });
            }

            // Update local userData with database data
            this.userData = {
                currency: userProfile.currency,
                inventory: await this.loadUserInventory(userId),
                stats: userProfile.stats,
                profile: {
                    name: userProfile.name,
                    username: userProfile.username,
                    avatar: userProfile.avatar,
                    id: userId
                }
            };

            this.updateUI();
        } catch (error) {
            console.error('Error loading user data:', error);
            this.showNotification('Error loading user data', 'error');
        }
    }

    async loadUserInventory(userId) {
        try {
            const inventory = await this.db.getUserInventory(userId);
            return inventory.map(item => item.item_id);
        } catch (error) {
            console.error('Error loading inventory:', error);
            return [];
        }
    }

    async saveUserData() {
        try {
            const userId = this.userData.profile.id;
            await this.db.updateUserProfile(userId, {
                currency: this.userData.currency,
                stats: this.userData.stats
            });
        } catch (error) {
            console.error('Error saving user data:', error);
            this.showNotification('Error saving data', 'error');
        }
    }

    simulateLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.getElementById('loadingProgress');

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Hide loading screen
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.showNotification('Welcome to FNTD WORLD! 🎮', 'success');
                    }, 500);
                }, 300);
            }

            progressBar.style.width = `${progress}%`;
        }, 200);
    }

    updateUI() {
        // Apply device-specific styles first
        this.applyDeviceSpecificStyles();

        // Update currency displays
        document.querySelectorAll('.currency-amount').forEach(el => {
            el.textContent = this.userData.currency.toLocaleString();
        });

        // Update profile
        const profileNameEl = document.getElementById('profileName');
        if (profileNameEl) profileNameEl.textContent = this.userData.profile.name;

        const profileUsernameEl = document.getElementById('profileUsername');
        if (profileUsernameEl) profileUsernameEl.textContent = this.userData.profile.username;

        const profileAvatarEl = document.getElementById('profileAvatar');
        if (profileAvatarEl) profileAvatarEl.textContent = this.userData.profile.avatar;

        // Update stats
        const totalSpinsEl = document.getElementById('totalSpins');
        if (totalSpinsEl) totalSpinsEl.textContent = this.userData.stats.totalSpins;

        const itemsOwnedEl = document.getElementById('itemsOwned');
        if (itemsOwnedEl) itemsOwnedEl.textContent = this.userData.inventory.length;

        const daysActiveEl = document.getElementById('daysActive');
        if (daysActiveEl) daysActiveEl.textContent = this.userData.stats.daysActive;

        const tradeCountEl = document.getElementById('tradeCount');
        if (tradeCountEl) tradeCountEl.textContent = this.userData.stats.tradeCount;

        // Update inventory
        this.updateInventoryDisplay();

        // Show/hide admin button based on username (case-insensitive)
        const adminBtn = document.getElementById('adminBtn');
        const adminBtnHeader = document.getElementById('adminBtnHeader');
        const currentUsername = (this.userData.profile.username || '').toLowerCase();
        const isLocalAdmin = this.adminUsernames.some(u => (u || '').toLowerCase() === currentUsername);
        if (isLocalAdmin) {
            if (adminBtn) adminBtn.style.display = 'flex';
            if (adminBtnHeader) adminBtnHeader.style.display = 'flex';
        } else {
            if (adminBtn) adminBtn.style.display = 'none';
            if (adminBtnHeader) adminBtnHeader.style.display = 'none';
        }

        // Update casino button state
        this.updateCasinoButton();
    }

    updateCasinoButton() {
        const spinButton = document.getElementById('spinButton');
        if (!spinButton) return;

        if (this.userData.currency < 1000) {
            spinButton.disabled = true;
            spinButton.textContent = 'NEED 1,000 💰';
        } else {
            spinButton.disabled = false;
            spinButton.textContent = 'SPIN ROULETTE';
        }
    }

    updateInventoryDisplay() {
        const inventoryGrid = document.getElementById('inventoryGrid');
        const emptyInventory = document.getElementById('emptyInventory');

        if (this.userData.inventory.length === 0) {
            inventoryGrid.style.display = 'none';
            emptyInventory.style.display = 'block';
        } else {
            inventoryGrid.style.display = 'grid';
            emptyInventory.style.display = 'none';

            inventoryGrid.innerHTML = '';
            this.userData.inventory.forEach((itemId, index) => {
                const item = this.availableItems[itemId];
                if (item) {
                    const itemEl = document.createElement('div');
                    itemEl.className = 'inventory-item';
                    itemEl.innerHTML = `
                        <div class="item-icon">${item.icon}</div>
                        <div class="item-name">${item.name}</div>
                        <div class="item-rarity rarity-${item.rarity}">${item.rarity.toUpperCase()}</div>
                        <div class="item-action" onclick="app.sellItem(${index})">SELL (${item.value}💰)</div>
                    `;
                    inventoryGrid.appendChild(itemEl);
                }
            });
        }
    }

    // Navigation
    showPage(pageId) {
        if (this.isAnimating || pageId === this.currentPage) return;

        this.isAnimating = true;
        const currentPage = document.querySelector('.page.active');
        const targetPage = document.getElementById(pageId);

        if (!targetPage) {
            this.isAnimating = false;
            return;
        }

        // Update bottom nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Update bottom nav based on page
        if (pageId === 'mainPage') {
            document.querySelector('.nav-item:nth-child(1)').classList.add('active');
        } else if (pageId === 'profilePage') {
            document.querySelector('.nav-item:nth-child(2)').classList.add('active');
        }

        // Start page transition
        if (currentPage) {
            currentPage.classList.remove('active');
            setTimeout(() => {
                targetPage.classList.add('active');
                this.currentPage = pageId;

                // Load specific page content
                if (pageId === 'wikiPage') {
                    this.loadWikiContent();
                } else if (pageId === 'updatesPage') {
                    this.loadUpdatesContent();
                } else if (pageId === 'tradesPage') {
                    this.loadTradesContent();
                }

                setTimeout(() => {
                    this.isAnimating = false;
                }, 300);
            }, 300);
        } else {
            targetPage.classList.add('active');
            this.currentPage = pageId;

            // Load specific page content
            if (pageId === 'wikiPage') {
                this.loadWikiContent();
            } else if (pageId === 'updatesPage') {
                this.loadUpdatesContent();
            } else if (pageId === 'tradesPage') {
                this.loadTradesContent();
            }

            setTimeout(() => {
                this.isAnimating = false;
            }, 300);
        }
    }

    async showSection(section) {
        const pageMap = {
            'calculator': 'calculatorPage',
            'trades': 'tradesPage',
            'wiki': 'wikiPage',
            'updates': 'updatesPage',
            'casino': 'casinoPage',
            'inventory': 'inventoryPage',
            'admin': 'adminPage',
            'settings': 'settingsPage'
        };

        const targetPage = pageMap[section];
        if (targetPage) {
            // Protect admin page on client-side as well
            if (section === 'admin') {
                try {
                    const localAllow = this.adminUsernames.some(u => (u || '').toLowerCase() === (this.userData.profile.username || '').toLowerCase());
                    const remoteAllow = await this.db.isAdmin(this.userData.profile.username);
                    const isAdmin = localAllow || remoteAllow;
                    if (!isAdmin) {
                        this.showNotification('Unauthorized access', 'error');
                        return;
                    }
                } catch (err) {
                    console.error('Error checking admin status:', err);
                    this.showNotification('Error checking permissions', 'error');
                    return;
                }
            }
            this.showPage(targetPage);

            // Show section-specific notification
            if (section === 'casino') {
                this.showNotification('Good luck! May the odds be in your favor! 🎰', 'info');
            } else if (section === 'inventory') {
                this.updateInventoryDisplay();
            }
        } else {
            console.log('Section not found:', section);
        }
    }

    // Content loading methods
    loadWikiContent() {
        const content = document.getElementById('wikiContent');
        if (content) {
            content.innerHTML = this.getWikiContent();
        }
    }

    loadUpdatesContent() {
        const content = document.getElementById('updatesContent');
        if (content) {
            content.innerHTML = this.getUpdatesContent();
        }
    }

    loadTradesContent() {
        const content = document.getElementById('tradesContent');
        if (content) {
            content.innerHTML = this.getTradesContent();
        }
    }

    getWikiContent() {
        return `
            <div class="wiki-section">
                <h3>🤖 UNITS</h3>
                <h4>Юниты и их характеристики</h4>
                <p>Все доступные юниты в FNTD 2 с их статистикой, способностями и редкостями.</p>
                <ul>
                    <li>Common - базовые юниты для начальных волн</li>
                    <li>Uncommon - улучшенные версии базовых юнитов</li>
                    <li>Rare - специализированные юниты с уникальными способностями</li>
                    <li>Epic - мощные юниты для поздних волн</li>
                    <li>Mythic - легендарные юниты с особыми эффектами</li>
                    <li>Secret - редчайшие юниты с уникальными механиками</li>
                    <li>Apex - максимальная редкость с невероятной силой</li>
                </ul>
            </div>
            
            <div class="wiki-section">
                <h3>✨ ENCHANTMENTS</h3>
                <h4>Система зачарований</h4>
                <p>Зачарования улучшают характеристики юнитов и добавляют новые способности.</p>
                <ul>
                    <li>Damage - увеличивает урон</li>
                    <li>Speed - увеличивает скорость атаки</li>
                    <li>Range - увеличивает радиус атаки</li>
                    <li>Special - добавляет уникальные эффекты</li>
                </ul>
            </div>
        `;
    }

    getUpdatesContent() {
        return `
            <div class="updates-container">
                <div class="update-item">
                    <div class="update-date">18 октября 2025</div>
                    <div class="update-title">🚀 РЕЛИЗ FNTD 2</div>
                    <div class="update-content">
                        Официальный релиз!<br><br>
                        <strong>Основные факты:</strong><br>
                        • Heroes имеют уникальные способы получения и привязаны к аккаунту<br>
                        • Heroes нельзя торговать<br>
                        • Торговля не будет доступна на релизе, появится в первом сезоне<br>
                        • Те же редкости что в FNTD 1, фокус на низких редкостях<br>
                        • Apex и Forgotten будут выходить реже
                    </div>
                </div>
            </div>
        `;
    }

    getTradesContent() {
        return `
            <div class="wiki-section">
                <h3>📈 ИНФОРМАЦИЯ О ТОРГОВЛЕ</h3>
                <div class="fact-list">
                    <div class="fact-item">Торговля не будет доступна на релизе</div>
                    <div class="fact-item">Появится в первом сезоне игры</div>
                    <div class="fact-item">Heroes нельзя будет торговать</div>
                    <div class="fact-item">Обычные юниты можно будет обменивать</div>
                </div>
            </div>
            
            <div class="coming-soon-section">
                <div class="coming-soon-icon">🔄</div>
                <h3>СИСТЕМА ТОРГОВЛИ</h3>
                <p>Торговая система будет добавлена в первом сезоне</p>
                <br>
                <p>Следите за обновлениями...</p>
            </div>
        `;
    }

    // Casino functionality
    spinRoulette() {
        if (this.isSpinning || this.userData.currency < 1000) return;

        this.isSpinning = true;
        const spinButton = document.getElementById('spinButton');
        const tape = document.getElementById('rouletteTape');
        const winDisplay = document.getElementById('winDisplay');
        const wonUnit = document.getElementById('wonUnit');

        // Deduct currency
        this.userData.currency -= 1000;
        this.userData.stats.totalSpins++;
        this.saveUserData();
        this.updateUI();

        // Disable spin button
        spinButton.disabled = true;
        spinButton.textContent = 'SPINNING...';
        spinButton.classList.add('spinning');

        // Hide previous result
        winDisplay.classList.remove('show');

        // Generate items for roulette
        const items = [];
        for (let i = 0; i < 50; i++) {
            items.push(this.getRandomCasinoUnit());
        }

        // Set winning item
        const winningUnit = this.getRandomCasinoUnit();
        items[25] = winningUnit;

        // Create roulette items
        tape.innerHTML = '';
        items.forEach((unit, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'roulette-item';
            itemEl.style.background = this.getRarityColor(unit.rarity);
            itemEl.innerHTML = `
                <div style="font-size: 40px; margin-bottom: 5px;">${unit.icon}</div>
                <div class="item-rarity rarity-${unit.rarity}" style="margin-top: 5px; font-size: 10px; font-weight: 900;">${unit.rarity.toUpperCase()}</div>
                <div style="margin-top: 8px; font-size: 8px; text-align: center; font-weight: 900;">${unit.name}</div>
            `;
            tape.appendChild(itemEl);
        });

        // Calculate position to center the winning item
        const itemWidth = this.deviceType === 'mobile' ? 120 : 170;
        const containerCenter = document.querySelector('.roulette-container').offsetWidth / 2;
        const winningItemPosition = 25 * itemWidth + (itemWidth / 2);
        const finalPosition = containerCenter - winningItemPosition;
        const randomOffset = (Math.random() - 0.5) * 30;
        const exactFinalPosition = finalPosition + randomOffset;

        // Start spin animation
        tape.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
        tape.style.transform = `translateX(${exactFinalPosition}px)`;

        // Show result after spin
        setTimeout(() => {
            // Add item to inventory
            this.userData.inventory.push(winningUnit.id);
            this.userData.stats.itemsOwned = this.userData.inventory.length;
            this.saveUserData();

            // Show win display
            wonUnit.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 15px;">${winningUnit.icon}</div>
                <div class="item-rarity rarity-${winningUnit.rarity}" style="font-size: 16px; font-weight: 900; padding: 8px 15px; border-radius: 8px;">${winningUnit.rarity.toUpperCase()}</div>
                <div class="item-name" style="margin-top: 15px; font-size: 18px; font-weight: 900; color: #ffffff;">${winningUnit.name}</div>
                <div style="margin-top: 10px; color: var(--text-secondary);">Value: ${winningUnit.value} 💰</div>
            `;
            winDisplay.classList.add('show');

            this.showNotification(`You won ${winningUnit.name}! ${winningUnit.icon}`, 'success');

            // Re-enable spin button
            setTimeout(() => {
                this.isSpinning = false;
                spinButton.classList.remove('spinning');
                this.updateCasinoButton();
            }, 1000);
        }, 4000);
    }

    getRandomCasinoUnit() {
        const random = Math.random() * 100;
        let currentChance = 0;

        for (const unit of this.casinoUnits) {
            currentChance += unit.chance;
            if (random <= currentChance) {
                return unit;
            }
        }

        return this.casinoUnits[0];
    }

    getRarityColor(rarity) {
        const colors = {
            'common': '#6b7280',
            'rare': '#3b82f6',
            'epic': '#8b5cf6',
            'legendary': '#f59e0b'
        };
        return colors[rarity] || '#333333';
    }

    // Inventory functionality
    sellItem(index) {
        if (index >= 0 && index < this.userData.inventory.length) {
            const itemId = this.userData.inventory[index];
            const item = this.availableItems[itemId];

            if (item) {
                this.userData.currency += item.value;
                this.userData.inventory.splice(index, 1);
                this.userData.stats.itemsOwned = this.userData.inventory.length;
                this.saveUserData();
                this.updateUI();

                this.showNotification(`Sold ${item.name} for ${item.value} 💰`, 'success');
            }
        }
    }

    // Settings functionality
    setLanguage(lang) {
        this.settings.language = lang;
        this.updateLanguageUI(lang);
        this.applySettings();
    }

    updateLanguageUI(lang) {
        // Update language selection buttons
        const langButtons = document.querySelectorAll('.setting-option[onclick*="setLanguage"]');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.onclick.toString().includes(`'${lang}'`)) {
                btn.classList.add('active');
            }
        });

        // Update text content based on language
        if (lang === 'en') {
            this.updateTextContent({
                'НАСТРОЙКИ': 'SETTINGS',
                'Язык / Language': 'Language',
                'Тема / Theme': 'Theme',
                'О приложении': 'About App'
            });
        } else {
            // Reset to Russian
            this.updateTextContent({
                'SETTINGS': 'НАСТРОЙКИ',
                'Language': 'Язык / Language',
                'Theme': 'Тема / Theme',
                'About App': 'О приложении'
            });
        }
    }

    updateTextContent(translations) {
        Object.keys(translations).forEach(key => {
            const elements = document.querySelectorAll(`*:not(script):not(style)`);
            elements.forEach(el => {
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                    if (el.textContent.trim() === key) {
                        el.textContent = translations[key];
                    }
                }
            });
        });
    }

    setTheme(theme) {
        this.settings.theme = theme;

        // Update theme selection buttons
        const themeButtons = document.querySelectorAll('.setting-option[onclick*="setTheme"]');
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.onclick.toString().includes(`'${theme}'`)) {
                btn.classList.add('active');
            }
        });

        // Apply theme to body
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }

        this.applySettings();
    }

    applySettings() {
        // Store settings in memory
        console.log('Settings applied:', this.settings);
    }

    showAbout() {
        const aboutText = this.settings.language === 'en'
            ? 'FNTD WORLD v2.0\n\nYour ultimate companion for Five Nights Tower Defense 2!\n\nFeatures:\n• Game calculators\n• Trading tools\n• Wiki database\n• Latest updates\n• Casino with roulette\n• Inventory system\n• Admin panel\n\nDeveloped for the FNTD 2 community.'
            : 'FNTD WORLD v2.0\n\nВаш лучший помощник для Five Nights Tower Defense 2!\n\nВозможности:\n• Игровые калькуляторы\n• Инструменты для торговли\n• База знаний Wiki\n• Последние обновления\n• Казино с рулеткой\n• Система инвентаря\n• Панель администратора\n\nРазработано для сообщества FNTD 2.';

        alert(aboutText);
    }

    // Admin functionality
    async showAdminModal(modalType) {
        try {
            // Verify admin status before showing modal
            const isAdmin = await this.db.isAdmin(this.userData.profile.username);
            if (!isAdmin) {
                this.showNotification('Unauthorized access', 'error');
                return;
            }

            const modal = document.getElementById(`${modalType}Modal`);
            if (modal) {
                modal.classList.add('active');
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
            this.showNotification('Error checking permissions', 'error');
        }
    }

    hideAdminModal(modalType) {
        const modal = document.getElementById(`${modalType}Modal`);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    async addCurrencyToUser() {
        try {
            const username = document.getElementById('currencyUsername').value.trim();
            const amount = parseInt(document.getElementById('currencyAmountInput').value);

            if (!username || !amount || amount <= 0) {
                this.showNotification('Please enter valid username and amount', 'error');
                return;
            }

            await this.db.addCurrency(username, amount);
            this.showNotification(`Added ${amount.toLocaleString()} currency to ${username}`, 'success');
            this.hideAdminModal('addCurrency');

            // Clear inputs
            document.getElementById('currencyUsername').value = '';
            document.getElementById('currencyAmountInput').value = '';
        } catch (error) {
            console.error('Error adding currency:', error);
            this.showNotification('Error adding currency', 'error');
        }
    }

    async giveItemToUser() {
        try {
            const username = document.getElementById('itemUsername').value.trim();
            const itemId = document.getElementById('itemSelect').value;

            if (!username) {
                this.showNotification('Please enter a username', 'error');
                return;
            }

            const user = await this.db.getUserByUsername(username);
            if (!user) {
                this.showNotification('User not found', 'error');
                return;
            }

            await this.db.addInventoryItem(user.user_id, itemId);
            const itemName = this.availableItems[itemId]?.name || itemId;
            this.showNotification(`Gave ${itemName} to ${username}`, 'success');
            this.hideAdminModal('addItem');
            document.getElementById('itemUsername').value = '';
        } catch (error) {
            console.error('Error giving item:', error);
            this.showNotification('Error giving item', 'error');
        }
    }

    async banUser() {
        const username = document.getElementById('banUsername').value.trim();
        if (!username) {
            this.showNotification('Please enter a username', 'error');
            return;
        }
        try {
            await this.db.banUser(username);
            this.showNotification(`Banned user ${username}`, 'success');
            this.hideAdminModal('banUser');
            document.getElementById('banUsername').value = '';
        } catch (error) {
            console.error('Error banning user:', error);
            this.showNotification('Error banning user', 'error');
        }
    }

    async giveItemToAll() {
        try {
            const itemId = document.getElementById('giveAllItemSelect').value;
            const result = await this.db.addInventoryItemToAllUsers(itemId);
            const updated = result?.length || 0;
            const itemName = this.availableItems[itemId]?.name || itemId;
            if (updated > 0) {
                this.showNotification(`Gave ${itemName} to ${updated} users`, 'success');
                this.hideAdminModal('giveAll');
            } else {
                this.showNotification('No users found', 'error');
            }
        } catch (error) {
            console.error('Error giving to all:', error);
            this.showNotification('Error giving item to all', 'error');
        }
    }

    // Utility functions
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'notificationSlide 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Initialize app and expose to window for inline handlers
const app = new FNTDWorldApp();
window.app = app;

// Start the app after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.start());
} else {
    app.start();
}

// Global functions for HTML onclick handlers
window.showMain = () => app.showPage('mainPage');
window.showSettings = () => app.showPage('settingsPage');
window.showSection = (section) => app.showSection(section);
window.spinRoulette = () => app.spinRoulette();
window.setLanguage = (lang) => app.setLanguage(lang);
window.setTheme = (theme) => app.setTheme(theme);
window.showAbout = () => app.showAbout();
window.showAdminModal = (modalType) => app.showAdminModal(modalType);
window.hideAdminModal = (modalType) => app.hideAdminModal(modalType);
window.addCurrencyToUser = () => app.addCurrencyToUser();
window.giveItemToUser = () => app.giveItemToUser();
window.banUser = () => app.banUser();
window.giveItemToAll = () => app.giveItemToAll();

// Handle window resize for dynamic adaptation
window.addEventListener('resize', () => {
    app.screenSize = app.getScreenSize();
    app.applyDeviceSpecificStyles();
    app.updateUI();
});

// Handle device orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        app.screenSize = app.getScreenSize();
        app.applyDeviceSpecificStyles();
        app.updateUI();
    }, 300);
});

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.modern-btn') || e.target.closest('.spin-button') || e.target.closest('.btn')) {
        const btn = e.target.closest('.modern-btn') || e.target.closest('.spin-button') || e.target.closest('.btn');

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 20px;
            height: 20px;
            left: 50%;
            top: 50%;
            margin-left: -10px;
            margin-top: -10px;
        `;

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        app.updateUI();
    }
});

console.log('FNTD World App loaded successfully!');