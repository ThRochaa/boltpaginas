<!-- Footer -->
<footer class="site-footer">
    <div class="container">
        <div class="footer-logo">
            <div style="width: 2rem; height: 2rem; color: #dc2626;">📺</div>
            <span style="font-size: 1.5rem; font-weight: bold;">
                GLOBAL <span class="highlight">ENTRETENIMENTO</span>
            </span>
        </div>
        <p class="footer-text">© <?php echo date('Y'); ?> IPTV Premium. Todos os direitos reservados.</p>
        <p class="footer-contact">
            Suporte: WhatsApp (11) 92004-0932 | Atendimento Todo Dia
        </p>
    </div>
</footer>

<script>
// FAQ Toggle
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        icon.textContent = '+';
    } else {
        // Fechar todas as outras FAQs
        document.querySelectorAll('.faq-answer.active').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.faq-icon').forEach(item => {
            item.textContent = '+';
        });
        
        // Abrir a FAQ clicada
        answer.classList.add('active');
        icon.textContent = '−';
    }
}

// Sistema de Depoimentos
const testimonials = [
    {
        name: "Maria Silva",
        city: "São Paulo - SP",
        text: "Melhor serviço que já usei! Qualidade incrível e nunca trava. Recomendo!"
    },
    {
        name: "João Santos",
        city: "Rio de Janeiro - RJ",
        text: "Atendimento excelente e preço justo. Já indiquei para toda família!"
    },
    {
        name: "Ana Costa",
        city: "Belo Horizonte - MG",
        text: "Funciona perfeitamente na minha Smart TV. Canais em HD sempre!"
    },
    {
        name: "Pedro Lima",
        city: "Brasília - DF",
        text: "Suporte muito rápido e eficiente. Problema resolvido em minutos!"
    },
    {
        name: "Carla Mendes",
        city: "Salvador - BA",
        text: "Preço justo e qualidade excepcional. Melhor investimento que fiz!"
    },
    {
        name: "Roberto Oliveira",
        city: "Porto Alegre - RS",
        text: "Nunca mais vou precisar de TV a cabo. Serviço perfeito!"
    }
];

let currentTestimonial = 0;

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    const textElement = document.getElementById('testimonial-text');
    const nameElement = document.getElementById('testimonial-name');
    const locationElement = document.getElementById('testimonial-location');
    
    if (textElement && nameElement && locationElement) {
        textElement.textContent = `"${testimonial.text}"`;
        nameElement.textContent = testimonial.name;
        locationElement.textContent = testimonial.city;
    }
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Sistema de Notificações
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

let currentNotification = 0;

function showNotification() {
    const notification = document.getElementById('purchase-notification');
    const textElement = document.getElementById('notification-text');
    
    if (notification && textElement) {
        textElement.textContent = purchaseNotifications[currentNotification];
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 4000);
        
        currentNotification = (currentNotification + 1) % purchaseNotifications.length;
    }
}

// Controle de visibilidade da página
let isPageVisible = true;

function handleVisibilityChange() {
    isPageVisible = !document.hidden;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar depoimentos
    updateTestimonial();
    
    // Rotação de depoimentos a cada 5 segundos
    setInterval(() => {
        if (isPageVisible) {
            updateTestimonial();
        }
    }, 5000);
    
    // Primeira notificação após 3 segundos
    setTimeout(showNotification, 3000);
    
    // Notificações subsequentes a cada 8 segundos
    setInterval(() => {
        if (isPageVisible) {
            showNotification();
        }
    }, 8000);
    
    // Controle de visibilidade
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', () => isPageVisible = true);
    window.addEventListener('blur', () => isPageVisible = false);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
</script>

<?php wp_footer(); ?>
</body>
</html>