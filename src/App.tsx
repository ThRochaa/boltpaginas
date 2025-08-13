import React, { useState, useEffect, useRef } from 'react';
import { Play, Tv, Film, Users, Shield, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react';

// Dados de configuração do site
const siteConfig = {
  branding: {
    name: "GLOBAL ENTRETENIMENTO",
    tagline: "Sua diversão sem limites"
  },
  plans: [
    {
      id: 1,
      name: "PLANO 1 MÊS",
      price: "R$ 29,90",
      originalPrice: "R$ 59,90",
      discount: "50% OFF",
      benefits: [
        "✅ +3.500 Canais HD/4K",
        "✅ +40.000 Filmes e Séries",
        "✅ Canais Premium",
        "✅ Esportes ao Vivo",
        "✅ Suporte Todo Dia",
        "✅ Sem Travamentos",
        "✅ Qualidade 4K"
      ],
      popular: false,
      whatsappLink: "https://wa.me/5511920040932?text=Vi%20seu%20Site%20agora%20e%20Quero%20o%20plano%20de%201%20mês!"
    },
    {
      id: 2,
      name: "PLANO 3 MESES",
      price: "R$ 83,90",
      originalPrice: "R$ 157,00",
      discount: "50% OFF",
      benefits: [
        "✅ +3.500 Canais HD/4K",
        "✅ +40.000 Filmes e Séries",
        "✅ Canais Premium",
        "✅ Esportes ao Vivo",
        "✅ Suporte Todo Dia",
        "✅ Sem Travamentos",
        "✅ Qualidade 4K",
        "🎁 BÔNUS: Filmes Lançamentos"
      ],
      popular: true,
      whatsappLink: "https://wa.me/5511920040932?text=Vi%20seu%20Site%20agora%20e%20Quero%20o%20plano%20de%203%20meses!"
    },
    {
      id: 3,
      name: "PLANO 6 MESES",
      price: "R$ 159,90",
      originalPrice: "R$ 320,00",
      discount: "50% OFF",
      benefits: [
        "✅ +3.500 Canais HD/4K",
        "✅ +40.000 Filmes e Séries",
        "✅ Canais Premium",
        "✅ Esportes ao Vivo",
        "✅ Suporte Todo Dia",
        "✅ Sem Travamentos",
        "✅ Qualidade 4K",
        "🎁 BÔNUS: Filmes Lançamentos",
        "🎁 BÔNUS: Séries Exclusivas"
      ],
      popular: false,
      whatsappLink: "https://wa.me/5511920040932?text=Vi%20seu%20Site%20agora%20e%20Quero%20o%20plano%20de%206%20meses!"
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Maria Silva",
      city: "São Paulo - SP",
      text: "Melhor serviço que já usei! Qualidade incrível e nunca trava. Recomendo!",
      rating: 5
    },
    {
      id: 2,
      name: "João Santos",
      city: "Rio de Janeiro - RJ",
      text: "Atendimento excelente e preço justo. Já indiquei para toda família!",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Costa",
      city: "Belo Horizonte - MG",
      text: "Funciona perfeitamente na minha Smart TV. Canais em HD sempre!",
      rating: 5
    },
    {
      id: 4,
      name: "Pedro Lima",
      city: "Brasília - DF",
      text: "Suporte muito rápido e eficiente. Problema resolvido em minutos!",
      rating: 5
    },
    {
      id: 5,
      name: "Carla Mendes",
      city: "Salvador - BA",
      text: "Preço justo e qualidade excepcional. Melhor investimento que fiz!",
      rating: 5
    },
    {
      id: 6,
      name: "Roberto Oliveira",
      city: "Porto Alegre - RS",
      text: "Nunca mais vou precisar de TV a cabo. Serviço perfeito!",
      rating: 5
    }
  ],
  purchaseNotifications: [
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
  ],
  faq: [
    {
      question: "Como funciona o teste de 7 dias?",
      answer: "Após a compra, você terá 7 dias para testar todos os recursos. Se não gostar, devolvemos 100% do seu dinheiro."
    },
    {
      question: "Funciona em qualquer dispositivo?",
      answer: "Sim! Nossa IPTV funciona em Smart TV, celular, tablet, notebook, TV Box e qualquer dispositivo com internet."
    },
    {
      question: "Preciso de internet rápida?",
      answer: "Recomendamos uma conexão de pelo menos 10MB para HD e 25MB para 4K. Mas funciona com velocidades menores em qualidade reduzida."
    },
    {
      question: "Como é feita a ativação?",
      answer: "Após o pagamento, sua conta é ativada automaticamente em até 5 minutos. Você receberá os dados de acesso por WhatsApp."
    },
    {
      question: "Posso usar em mais de um dispositivo?",
      answer: "Sim! Você pode usar simultaneamente em até 3 dispositivos diferentes."
    },
    {
      question: "Tem suporte técnico?",
      answer: "Temos suporte todos os dias da semana via WhatsApp para tirar todas suas dúvidas e resolver qualquer problema."
    }
  ]
};

// Hook personalizado para visibilidade da página
const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Suporte para diferentes navegadores
    const visibilityEvents = [
      'visibilitychange',
      'webkitvisibilitychange',
      'mozvisibilitychange',
      'msvisibilitychange'
    ];

    visibilityEvents.forEach(event => {
      document.addEventListener(event, handleVisibilityChange);
    });

    // Fallback para navegadores antigos
    window.addEventListener('focus', () => setIsVisible(true));
    window.addEventListener('blur', () => setIsVisible(false));

    return () => {
      visibilityEvents.forEach(event => {
        document.removeEventListener(event, handleVisibilityChange);
      });
      window.removeEventListener('focus', () => setIsVisible(true));
      window.removeEventListener('blur', () => setIsVisible(false));
    };
  }, []);

  return isVisible;
};

// Componente de Notificação de Compra
const PurchaseNotification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm animate-slide-in-left">
      <div className="bg-white text-gray-900 p-4 rounded-lg shadow-lg border-l-4 border-red-600">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-semibold">🔥 Compra realizada!</p>
            <p className="text-xs text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Depoimento
const TestimonialCard: React.FC<{ testimonial: typeof siteConfig.testimonials[0] }> = ({ testimonial }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg text-center animate-fade-in">
      <div className="mb-4">
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <Star key={i} className="inline w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-xl text-gray-300 mb-6 italic">"{testimonial.text}"</p>
      <div className="border-t border-gray-700 pt-6">
        <h4 className="font-bold text-lg">{testimonial.name}</h4>
        <p className="text-gray-400">{testimonial.city}</p>
      </div>
    </div>
  );
};

// Componente FAQ
const FAQItem: React.FC<{ faq: typeof siteConfig.faq[0]; index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-6 focus:outline-none hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{faq.question}</h3>
          {isOpen ? (
            <ChevronUp className="text-red-600 w-6 h-6 transition-transform" />
          ) : (
            <ChevronDown className="text-red-600 w-6 h-6 transition-transform" />
          )}
        </div>
      </button>
      {isOpen && (
        <div id={`faq-content-${index}`} className="px-6 pb-6 animate-fade-in">
          <p className="text-gray-300">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

// Componente Principal
function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [geoLocation, setGeoLocation] = useState("sua região");
  
  const isPageVisible = usePageVisibility();
  const testimonialIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gerenciar rotação de depoimentos
  useEffect(() => {
    if (!isPageVisible) return;

    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % siteConfig.testimonials.length);
    }, 5000);

    return () => {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, [isPageVisible]);

  // Gerenciar notificações de compra
  useEffect(() => {
    if (!isPageVisible) return;

    // Primeira notificação após 3 segundos
    const firstNotificationTimer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    // Notificações subsequentes
    notificationIntervalRef.current = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % siteConfig.purchaseNotifications.length);
      setShowNotification(true);
    }, 8000);

    return () => {
      clearTimeout(firstNotificationTimer);
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
    };
  }, [isPageVisible]);

  // Geolocalização
  useEffect(() => {
    const regions = [
      'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 
      'Brasília', 'Salvador', 'Fortaleza', 'Curitiba', 
      'Porto Alegre', 'Recife', 'Goiânia'
    ];

    const setRandomRegion = () => {
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      setGeoLocation(randomRegion);
    };

    if (navigator.geolocation) {
      const timeoutId = setTimeout(setRandomRegion, 5000);
      
      navigator.geolocation.getCurrentPosition(
        () => {
          clearTimeout(timeoutId);
          setRandomRegion();
        },
        () => {
          clearTimeout(timeoutId);
          setRandomRegion();
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    } else {
      setRandomRegion();
    }
  }, []);

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Notificação de Geolocalização */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-semibold">
        🔥 Pessoas de {geoLocation} acabaram de comprar!
      </div>

      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tv className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  GLOBAL <span className="text-red-600">ENTRETENIMENTO</span>
                </h1>
                <p className="text-sm text-gray-400">Sua diversão sem limites</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                🟢 ONLINE AGORA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mais de <span className="text-red-600">3.500 Canais</span><br />
              + <span className="text-red-600">40.000</span> Filmes e Séries
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Qualidade 4K • Suporte Todo Dia • Sem Travamentos
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full border border-red-600">
                📺 Canais Premium
              </span>
              <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full border border-red-600">
                🎬 Lançamentos
              </span>
              <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full border border-red-600">
                ⚽ Esportes ao Vivo
              </span>
            </div>
            <a
              href="https://wa.me/5511920040932?text=Vi%20seu%20Site%20agora%20e%20Quero%20fazer%20um%20teste!"
              className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-600/50"
            >
              <Play className="w-6 h-6 mr-2" />
              QUERO TESTAR AGORA!
            </a>
            <p className="text-sm text-gray-400 mt-4">
              ✅ Teste por 7 Dias • ✅ Garantia Total • ✅ Suporte Todo Dia
            </p>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Escolha seu <span className="text-red-600">Plano</span>
            </h2>
            <p className="text-xl text-gray-300">Sem taxa de instalação • Ativação imediata</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gray-900 rounded-lg p-8 border-2 transform transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-red-600 scale-105'
                    : 'border-gray-700 hover:border-red-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    MAIS POPULAR
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-gray-400 line-through text-lg">{plan.originalPrice}</span>
                    <div className="text-4xl font-bold text-red-600 mb-2">{plan.price}</div>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      {plan.discount}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.whatsappLink}
                    className="block w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-6 rounded-lg text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-600/50"
                  >
                    🚀 QUERO TESTAR AGORA!
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Por que escolher nossa <span className="text-red-600">PLATAFORMA</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition-all duration-300">
              <Tv className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">+3.500 Canais</h3>
              <p className="text-gray-300">Canais nacionais e internacionais em HD e 4K</p>
            </div>
            <div className="text-center bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition-all duration-300">
              <Film className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">+40.000 Filmes e Séries</h3>
              <p className="text-gray-300">Catálogo sempre atualizado com os últimos lançamentos</p>
            </div>
            <div className="text-center bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition-all duration-300">
              <Play className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Esportes ao Vivo</h3>
              <p className="text-gray-300">Todos os jogos e campeonatos transmitidos ao vivo</p>
            </div>
            <div className="text-center bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition-all duration-300">
              <Users className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Funciona em Qualquer Dispositivo</h3>
              <p className="text-gray-300">TV, celular, tablet, notebook - onde você estiver</p>
            </div>
            <div className="text-center bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition-all duration-300">
              <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Sem Travamentos</h3>
              <p className="text-gray-300">Servidores de alta velocidade para streaming perfeito</p>
            </div>
            <div className="text-center bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition-all duration-300">
              <Clock className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Suporte Todo Dia</h3>
              <p className="text-gray-300">Atendimento via WhatsApp, 7 dias por semana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              O que nossos <span className="text-red-600">clientes</span> dizem
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <TestimonialCard testimonial={siteConfig.testimonials[currentTestimonial]} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Perguntas <span className="text-red-600">Frequentes</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {siteConfig.faq.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Garantias Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Suas <span className="text-red-600">Garantias</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-900 p-8 rounded-lg">
              <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">7 Dias de Garantia</h3>
              <p className="text-gray-300">Não gostou? Devolvemos seu dinheiro em até 7 dias</p>
            </div>
            <div className="text-center bg-gray-900 p-8 rounded-lg">
              <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Pagamento Seguro</h3>
              <p className="text-gray-300">Seus dados protegidos com criptografia SSL</p>
            </div>
            <div className="text-center bg-gray-900 p-8 rounded-lg">
              <Users className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Suporte 24/7</h3>
              <p className="text-gray-300">Atendimento via WhatsApp todos os dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Métodos de <span className="text-red-600">Pagamento</span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-black font-bold">PIX</span>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-black font-bold">VISA</span>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-black font-bold">MASTERCARD</span>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-black font-bold">ELO</span>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-black font-bold">BOLETO</span>
            </div>
          </div>
          <a
            href="https://wa.me/5511920040932?text=Vi%20seu%20Site%20agora%20e%20Quero%20fazer%20um%20teste!"
            className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-600/50"
          >
            <Play className="w-6 h-6 mr-2" />
            QUERO TESTAR AGORA!
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Tv className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold">
              GLOBAL <span className="text-red-600">ENTRETENIMENTO</span>
            </span>
          </div>
          <p className="text-gray-400 mb-4">© 2024 IPTV Premium. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-500">
            Suporte: WhatsApp (11) 92004-0932 | Atendimento Todo Dia
          </p>
        </div>
      </footer>

      {/* Notificações de Compra */}
      {showNotification && (
        <PurchaseNotification
          message={siteConfig.purchaseNotifications[currentNotification]}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
}

export default App;