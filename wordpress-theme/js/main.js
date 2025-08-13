/**
 * Global Entretenimento IPTV - JavaScript Principal
 */

(function() {
    'use strict';

    // Configurações
    const config = {
        testimonialInterval: 5000,
        notificationInterval: 8000,
        notificationDuration: 4000,
        firstNotificationDelay: 3000
    };

    // Dados dos depoimentos
    const testimonials = [
        {
            name: "Maria Silva",
            city: "São Paulo - SP",
            text: "Melhor serviço que já usei! Qualidade incrível e nunca trava. Recomendo!",
            rating: 5
        },
        {
            name: "João Santos",
            city: "Rio de Janeiro - RJ",
            text: "Atendimento excelente e preço justo. Já indiquei para toda família!",
            rating: 5
        },
        {
            name: "Ana Costa",
            city: "Belo Horizonte - MG",
            text: "Funciona perfeitamente na minha Smart TV. Canais em HD sempre!",
            rating: 5
        },
        {
            name: "Pedro Lima",
            city: "Brasília - DF",
            text: "Suporte muito rápido e eficiente. Problema resolvido em minutos!",
            rating: 5
        },
        {
            name: "Carla Mendes",
            city: "Salvador - BA",
            text: "Preço justo e qualidade excepcional. Melhor investimento que fiz!",
            rating: 5
        },
        {
            name: "Roberto Oliveira",
            city: "Porto Alegre - RS",
            text: "Nunca mais vou precisar de TV a cabo. Serviço perfeito!",
            rating: 5
        }
    ];

    // Dados das notificações de compra
    const purchaseNotifications = [
        "Lucas de São Paulo acabou de comprar o plano de 3 meses",
        "Maria do Rio de Janeiro acabou de comprar o plano de 1 mês",
        "João de Brasília acabou de comprar o plano de 6 meses",
        "Ana de Belo Horizonte acabou de comprar o plano de 3 meses",
        "Pedro de Salvador acabou de comprar o plano de 1 mês",
        "Carla de Fortaleza acabou de comprar o plano de 3 meses",
        "Roberto de Porto Alegre acabou de comprar o plano de 6 meses",
        "Juliana de Recife acabou de comprar o plano de 1 mês",
        "Carlos de Curitiba acabou de comprar o plano de 3 meses",
        "Patrícia de Goiânia acabou de comprar o plano de 1 mês"
    ];

    // Regiões para geolocalização
    const regions = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 
        'Brasília', 'Salvador', 'Fortaleza', 'Curitiba', 
        'Porto Alegre', 'Recife', 'Goiânia'
    ];

    // Variáveis de controle
    let currentTestimonial = 0;
    let currentNotification = 0;
    let isPageVisible = true;
    let testimonialTimer = null;
    let notificationTimer = null;

    // Utilitários
    const utils = {
        // Verificar se elemento existe
        exists: function(selector) {
            return document.querySelector(selector) !== null;
        },

        // Obter elemento
        get: function(selector) {
            return document.querySelector(selector);
        },

        // Obter todos os elementos
        getAll: function(selector) {
            return document.querySelectorAll(selector);
        },

        // Adicionar classe
        addClass: function(element, className) {
            if (element) {
                element.classList.add(className);
            }
        },

        // Remover classe
        removeClass: function(element, className) {
            if (element) {
                element.classList.remove(className);
            }
        },

        // Toggle classe
        toggleClass: function(element, className) {
            if (element) {
                element.classList.toggle(className);
            }
        },

        // Verificar se tem classe
        hasClass: function(element, className) {
            return element ? element.classList.contains(className) : false;
        },

        // Animar elemento
        animate: function(element, animation, duration = 1000) {
            if (!element) return;
            
            element.style.animation = `${animation} ${duration}ms ease-out`;
            
            setTimeout(() => {
                element.style.animation = '';
            }, duration);
        },

        // Debounce
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // Sistema de visibilidade da página
    const pageVisibility = {
        init: function() {
            // Eventos de visibilidade
            const visibilityEvents = [
                'visibilitychange',
                'webkitvisibilitychange',
                'mozvisibilitychange',
                'msvisibilitychange'
            ];

            visibilityEvents.forEach(event => {
                document.addEventListener(event, this.handleVisibilityChange.bind(this));
            });

            // Fallback para navegadores antigos
            window.addEventListener('focus', () => {
                isPageVisible = true;
                this.resumeAnimations();
            });

            window.addEventListener('blur', () => {
                isPageVisible = false;
                this.pauseAnimations();
            });
        },

        handleVisibilityChange: function() {
            isPageVisible = !document.hidden;
            
            if (isPageVisible) {
                this.resumeAnimations();
            } else {
                this.pauseAnimations();
            }
        },

        pauseAnimations: function() {
            if (testimonialTimer) {
                clearInterval(testimonialTimer);
                testimonialTimer = null;
            }
            if (notificationTimer) {
                clearInterval(notificationTimer);
                notificationTimer = null;
            }
        },

        resumeAnimations: function() {
            testimonialSystem.start();
            notificationSystem.start();
        }
    };

    // Sistema de geolocalização
    const geoLocation = {
        init: function() {
            this.setRandomRegion();
            
            // Tentar obter localização real (com timeout)
            if (navigator.geolocation) {
                const timeoutId = setTimeout(() => {
                    this.setRandomRegion();
                }, 5000);

                navigator.geolocation.getCurrentPosition(
                    () => {
                        clearTimeout(timeoutId);
                        this.setRandomRegion();
                    },
                    () => {
                        clearTimeout(timeoutId);
                        this.setRandomRegion();
                    },
                    { 
                        timeout: 5000, 
                        enableHighAccuracy: false 
                    }
                );
            }
        },

        setRandomRegion: function() {
            const geoElement = utils.get('#geo-location');
            if (geoElement) {
                const randomRegion = regions[Math.floor(Math.random() * regions.length)];
                geoElement.textContent = randomRegion;
            }
        }
    };

    // Sistema de depoimentos
    const testimonialSystem = {
        init: function() {
            this.updateTestimonial();
            this.start();
        },

        start: function() {
            if (testimonialTimer) {
                clearInterval(testimonialTimer);
            }

            testimonialTimer = setInterval(() => {
                if (isPageVisible) {
                    this.nextTestimonial();
                }
            }, config.testimonialInterval);
        },

        nextTestimonial: function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            this.updateTestimonial();
        },

        updateTestimonial: function() {
            const testimonial = testimonials[currentTestimonial];
            const textElement = utils.get('#testimonial-text');
            const nameElement = utils.get('#testimonial-name');
            const locationElement = utils.get('#testimonial-location');
            const container = utils.get('#testimonial-container');

            if (textElement && nameElement && locationElement) {
                // Animação de saída
                if (container) {
                    utils.addClass(container, 'fade-out');
                }

                setTimeout(() => {
                    textElement.textContent = `"${testimonial.text}"`;
                    nameElement.textContent = testimonial.name;
                    locationElement.textContent = testimonial.city;

                    // Animação de entrada
                    if (container) {
                        utils.removeClass(container, 'fade-out');
                        utils.addClass(container, 'fade-in');
                    }
                }, 300);
            }
        }
    };

    // Sistema de notificações
    const notificationSystem = {
        init: function() {
            // Primeira notificação após delay
            setTimeout(() => {
                this.showNotification();
            }, config.firstNotificationDelay);

            this.start();
        },

        start: function() {
            if (notificationTimer) {
                clearInterval(notificationTimer);
            }

            notificationTimer = setInterval(() => {
                if (isPageVisible) {
                    this.showNotification();
                }
            }, config.notificationInterval);
        },

        showNotification: function() {
            const notification = utils.get('#purchase-notification');
            const textElement = utils.get('#notification-text');

            if (notification && textElement) {
                textElement.textContent = purchaseNotifications[currentNotification];
                
                // Mostrar notificação
                notification.style.display = 'block';
                utils.addClass(notification, 'slide-in');

                // Ocultar após duração configurada
                setTimeout(() => {
                    utils.addClass(notification, 'slide-out');
                    
                    setTimeout(() => {
                        notification.style.display = 'none';
                        utils.removeClass(notification, 'slide-in');
                        utils.removeClass(notification, 'slide-out');
                    }, 500);
                }, config.notificationDuration);

                currentNotification = (currentNotification + 1) % purchaseNotifications.length;
            }
        }
    };

    // Sistema de FAQ
    const faqSystem = {
        init: function() {
            const faqButtons = utils.getAll('.faq-question');
            faqButtons.forEach(button => {
                button.addEventListener('click', this.toggleFAQ.bind(this));
            });
        },

        toggleFAQ: function(event) {
            const button = event.currentTarget;
            const answer = button.nextElementSibling;
            const icon = button.querySelector('.faq-icon');
            const isActive = utils.hasClass(answer, 'active');

            if (isActive) {
                // Fechar FAQ atual
                utils.removeClass(answer, 'active');
                if (icon) icon.textContent = '+';
                utils.animate(answer, 'slideUp', 300);
            } else {
                // Fechar todas as outras FAQs
                utils.getAll('.faq-answer.active').forEach(item => {
                    utils.removeClass(item, 'active');
                    utils.animate(item, 'slideUp', 300);
                });

                utils.getAll('.faq-icon').forEach(item => {
                    item.textContent = '+';
                });

                // Abrir FAQ atual
                utils.addClass(answer, 'active');
                if (icon) icon.textContent = '−';
                utils.animate(answer, 'slideDown', 300);
            }
        }
    };

    // Sistema de scroll suave
    const smoothScroll = {
        init: function() {
            const links = utils.getAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', this.handleClick.bind(this));
            });
        },

        handleClick: function(event) {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href');
            const target = utils.get(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Compensar header fixo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Sistema de lazy loading para imagens
    const lazyLoading = {
        init: function() {
            if ('IntersectionObserver' in window) {
                this.setupIntersectionObserver();
            } else {
                // Fallback para navegadores antigos
                this.loadAllImages();
            }
        },

        setupIntersectionObserver: function() {
            const images = utils.getAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        },

        loadAllImages: function() {
            const images = utils.getAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    };

    // Sistema de performance
    const performance = {
        init: function() {
            this.preloadCriticalResources();
            this.optimizeAnimations();
        },

        preloadCriticalResources: function() {
            // Preload de fontes críticas
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
            fontLink.as = 'style';
            document.head.appendChild(fontLink);
        },

        optimizeAnimations: function() {
            // Reduzir animações se o usuário preferir
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            }
        }
    };

    // Sistema de analytics (placeholder)
    const analytics = {
        init: function() {
            this.trackPageView();
            this.setupEventTracking();
        },

        trackPageView: function() {
            // Implementar tracking de página
            console.log('Page view tracked');
        },

        trackEvent: function(category, action, label) {
            // Implementar tracking de eventos
            console.log('Event tracked:', category, action, label);
        },

        setupEventTracking: function() {
            // Tracking de cliques em CTAs
            const ctaButtons = utils.getAll('.cta-button');
            ctaButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.trackEvent('CTA', 'Click', button.textContent);
                });
            });

            // Tracking de FAQ
            const faqButtons = utils.getAll('.faq-question');
            faqButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.trackEvent('FAQ', 'Toggle', button.textContent);
                });
            });
        }
    };

    // Inicialização principal
    const app = {
        init: function() {
            // Aguardar DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.start.bind(this));
            } else {
                this.start();
            }
        },

        start: function() {
            try {
                // Inicializar todos os sistemas
                pageVisibility.init();
                geoLocation.init();
                testimonialSystem.init();
                notificationSystem.init();
                faqSystem.init();
                smoothScroll.init();
                lazyLoading.init();
                performance.init();
                analytics.init();

                console.log('Global Entretenimento IPTV - Sistema inicializado com sucesso');
            } catch (error) {
                console.error('Erro na inicialização:', error);
            }
        }
    };

    // Expor funções globais necessárias
    window.toggleFAQ = faqSystem.toggleFAQ.bind(faqSystem);

    // Inicializar aplicação
    app.init();

})();