# Global Entretenimento IPTV - Tema WordPress

## Descrição
Tema WordPress profissional para sites de IPTV Premium com design moderno, responsivo e otimizado para conversões.

## Características
- ✅ Design responsivo e moderno
- ✅ Otimizado para SEO
- ✅ Sistema de depoimentos rotativos
- ✅ Notificações de compra em tempo real
- ✅ FAQ interativo
- ✅ Integração com WhatsApp
- ✅ Performance otimizada
- ✅ Compatibilidade cross-browser
- ✅ Acessibilidade (WCAG 2.1)

## Instalação

### Método 1: Upload via Admin WordPress
1. Faça o download de todos os arquivos
2. Compacte a pasta `wordpress-theme` em um arquivo ZIP
3. No admin do WordPress, vá em **Aparência > Temas**
4. Clique em **Adicionar Novo > Enviar Tema**
5. Selecione o arquivo ZIP e clique em **Instalar Agora**
6. Ative o tema após a instalação

### Método 2: FTP
1. Faça upload da pasta `wordpress-theme` para `/wp-content/themes/`
2. Renomeie a pasta para `global-entretenimento`
3. No admin do WordPress, vá em **Aparência > Temas**
4. Ative o tema "Global Entretenimento IPTV"

## Configuração

### Configurações Básicas
1. Vá em **Aparência > Personalizar**
2. Configure o logo da empresa
3. Ajuste as cores se necessário
4. Configure os menus

### Configuração do WhatsApp
Edite os links do WhatsApp nos arquivos:
- `index.php` - Altere o número `5511920040932`
- `functions.php` - Atualize o shortcode padrão

### Personalização de Conteúdo
- **Depoimentos**: Edite o array `testimonials` em `js/main.js`
- **Notificações**: Edite o array `purchaseNotifications` em `js/main.js`
- **Planos**: Modifique a seção de planos em `index.php`

## Estrutura de Arquivos

```
wordpress-theme/
├── style.css           # Estilos principais do tema
├── index.php          # Template principal
├── header.php         # Cabeçalho do site
├── footer.php         # Rodapé do site
├── functions.php      # Funções do tema
├── js/
│   └── main.js       # JavaScript principal
├── screenshot.png     # Screenshot do tema (1200x900px)
└── README.md         # Este arquivo
```

## Funcionalidades Principais

### Sistema de Depoimentos
- Rotação automática a cada 5 segundos
- Pausa quando a página não está visível
- Animações suaves de transição

### Notificações de Compra
- Primeira notificação após 3 segundos
- Notificações subsequentes a cada 8 segundos
- Auto-dismiss após 4 segundos

### FAQ Interativo
- Accordion responsivo
- Animações suaves
- Acessível via teclado

### Otimizações de Performance
- Lazy loading de imagens
- Preload de recursos críticos
- Minificação de CSS/JS
- Otimização de fontes

## Shortcodes Disponíveis

### Botão WhatsApp
```php
[whatsapp number="5511920040932" message="Sua mensagem" text="Texto do botão"]
```

### Seção de Planos
```php
[plans]
```

## Customização Avançada

### Cores do Tema
Edite as variáveis CSS em `style.css`:
```css
:root {
    --primary-color: #dc2626;
    --secondary-color: #b91c1c;
    --dark-color: #111827;
    --gray-color: #1f2937;
}
```

### Configurações JavaScript
Edite o objeto `config` em `js/main.js`:
```javascript
const config = {
    testimonialInterval: 5000,    // Intervalo dos depoimentos (ms)
    notificationInterval: 8000,   // Intervalo das notificações (ms)
    notificationDuration: 4000,   // Duração das notificações (ms)
    firstNotificationDelay: 3000  // Delay da primeira notificação (ms)
};
```

## Compatibilidade
- WordPress 5.0+
- PHP 7.4+
- Navegadores modernos (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Dispositivos móveis e tablets

## Suporte a SEO
- Meta tags otimizadas
- Schema markup
- Open Graph tags
- Twitter Cards
- URLs amigáveis
- Sitemap XML compatível

## Acessibilidade
- Contraste adequado (WCAG 2.1 AA)
- Navegação por teclado
- ARIA labels
- Suporte a leitores de tela
- Respeita preferências de movimento reduzido

## Segurança
- Sanitização de dados
- Nonces para formulários
- Escape de output
- Validação de entrada
- Proteção contra XSS

## Troubleshooting

### Problema: Notificações não aparecem
**Solução**: Verifique se o JavaScript está carregando corretamente e se não há conflitos com outros plugins.

### Problema: Depoimentos não rotacionam
**Solução**: Verifique o console do navegador para erros JavaScript e certifique-se de que a página está visível.

### Problema: FAQ não abre/fecha
**Solução**: Verifique se há conflitos de CSS ou JavaScript com outros temas/plugins.

### Problema: Layout quebrado no mobile
**Solução**: Limpe o cache do navegador e verifique se não há CSS customizado conflitante.

## Changelog

### Versão 1.0.0
- Lançamento inicial
- Sistema completo de IPTV
- Design responsivo
- Otimizações de performance
- Sistema de notificações
- FAQ interativo

## Suporte
Para suporte técnico, entre em contato através do WhatsApp: (11) 92004-0932

## Licença
Este tema é proprietário e destinado exclusivamente para uso da Global Entretenimento IPTV.

---

**Desenvolvido com ❤️ para Global Entretenimento IPTV**