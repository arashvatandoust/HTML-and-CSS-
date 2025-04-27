document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
        } else {
            header.style.padding = '20px 0';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            if (menuToggle.classList.contains('active')) {
                menuToggle.querySelector('span:first-child').style.transform = 'rotate(45deg) translate(5px, 5px)';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '0';
                menuToggle.querySelector('span:last-child').style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                menuToggle.querySelector('span:first-child').style.transform = 'none';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('span:last-child').style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on menu items
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.querySelector('span:first-child').style.transform = 'none';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('span:last-child').style.transform = 'none';
            }
        });
    });

    // Active Navigation Link
    function setActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    setActiveNav();

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialItems[n].classList.add('active');
        dots[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= testimonialItems.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    // Initialize the slider
    showSlide(currentSlide);
    
    // Automatic slide change
    setInterval(nextSlide, 5000);
    
    // Click on dots to change slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                valid = false;
                showError(nameInput, 'İsim alanı gereklidir');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                valid = false;
                showError(emailInput, 'E-posta alanı gereklidir');
            } else if (!isValidEmail(emailInput.value)) {
                valid = false;
                showError(emailInput, 'Geçerli bir e-posta adresi giriniz');
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                valid = false;
                showError(subjectInput, 'Konu alanı gereklidir');
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                valid = false;
                showError(messageInput, 'Mesaj alanı gereklidir');
            } else {
                removeError(messageInput);
            }
            
            if (valid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                submitBtn.disabled = true;
                submitBtn.innerText = 'Gönderiliyor...';
                
                setTimeout(() => {
                    // Form submission simulation
                    contactForm.reset();
                    alert('Mesajınız başarıyla gönderildi!');
                    
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                }, 2000);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('small');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.classList.add('error-message');
            errorElement.style.color = 'red';
            errorElement.style.display = 'block';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.innerText = message;
        input.style.borderColor = 'red';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 