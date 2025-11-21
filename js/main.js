// Funcionalidad para el comparador de imágenes antes/después
function initBeforeAfterComparison() {
    try {
        const comparisons = document.querySelectorAll('.image-compare');
        if (!comparisons.length) return;

        comparisons.forEach(comparison => {
            const slider = comparison.querySelector('.slider-handle');
            const afterImage = comparison.querySelector('.after-image');

            if (!slider || !afterImage) {
                console.warn('Elementos del comparador no encontrados');
                return;
            }

            // Función para mover el slider
            const moveSlider = (x) => {
                try {
                    const rect = comparison.getBoundingClientRect();
                    let position = (x - rect.left) / rect.width;
                    position = Math.max(0, Math.min(1, position));
                    requestAnimationFrame(() => {
                        slider.style.left = `${position * 100}%`;
                        afterImage.style.clipPath = `polygon(${position * 100}% 0, 100% 0, 100% 100%, ${position * 100}% 100%)`;
                    });
                } catch (error) {
                    console.error('Error al mover el slider:', error);
                }
            };

            // Event listeners para mouse
            const onMouseMove = (e) => moveSlider(e.clientX);
            const onTouchMove = (e) => {
                if (e.touches && e.touches[0]) {
                    moveSlider(e.touches[0].clientX);
                }
            };

            const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

            const onTouchEnd = () => {
                window.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('touchend', onTouchEnd);
            };

            // Eventos de mouse
            slider.addEventListener('mousedown', (e) => {
                e.preventDefault();
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
            });

            // Eventos táctiles para móviles
            slider.addEventListener('touchstart', (e) => {
                e.preventDefault();
                window.addEventListener('touchmove', onTouchMove);
                window.addEventListener('touchend', onTouchEnd);
            });

            // Establecer posición inicial (50%)
            moveSlider(comparison.getBoundingClientRect().left + comparison.getBoundingClientRect().width / 2);
        });
    } catch (error) {
        console.error('Error al inicializar el comparador:', error);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initBeforeAfterComparison();
});

// Dentistas.com.pa - Main JavaScript
// Animaciones sutiles y funcionalidades interactivas

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const contactForm = document.getElementById('contact-form');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial slider functionality
    let currentSlide = 0;

    function showSlide(index) {
        // Reset current slide
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show new slide
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'block';
            dots[index].classList.add('active');
            currentSlide = index;
        }
    }

    // Initialize slider
    if (testimonialCards.length > 0) {
        showSlide(0);
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= testimonialCards.length) {
                    nextSlide = 0;
                }
                showSlide(nextSlide);
            });
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let prevSlide = currentSlide - 1;
                if (prevSlide < 0) {
                    prevSlide = testimonialCards.length - 1;
                }
                showSlide(prevSlide);
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto slide (optional)
        setInterval(function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonialCards.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        }, 5000);
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            
            if (!name || !email || !phone || !service) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Simulate API call
            setTimeout(function() {
                submitBtn.textContent = '¡Enviado con éxito!';
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 3000);
                
                // Show success message
                alert('¡Gracias por contactarnos! Nos comunicaremos contigo pronto.');
            }, 1500);
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature, .testimonial-card, .about-image, .hero-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Add animation class to CSS elements
    const serviceCards = document.querySelectorAll('.service-card');
    const features = document.querySelectorAll('.feature');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});
