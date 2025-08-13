<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="IPTV Premium com mais de 3.500 canais, 40.000 filmes e séries em qualidade 4K">
    <meta name="keywords" content="IPTV, TV Online, Canais Premium, Filmes, Séries, 4K, Streaming">
    <meta name="author" content="Global Entretenimento">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph -->
    <meta property="og:title" content="<?php bloginfo('name'); ?> - IPTV Premium">
    <meta property="og:description" content="Mais de 3.500 canais, 40.000 filmes e séries em qualidade 4K">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo home_url(); ?>">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/og-image.jpg">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php bloginfo('name'); ?> - IPTV Premium">
    <meta name="twitter:description" content="Mais de 3.500 canais, 40.000 filmes e séries em qualidade 4K">
    
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Notificação de Geolocalização -->
<div style="background-color: #dc2626; color: white; text-align: center; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 600;">
    🔥 Pessoas de <span id="geo-location">sua região</span> acabaram de comprar!
</div>

<!-- Header -->
<header class="site-header">
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <div style="width: 2rem; height: 2rem; color: #dc2626;">📺</div>
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: bold; color: white; margin: 0;">
                        GLOBAL <span class="highlight">ENTRETENIMENTO</span>
                    </h1>
                    <p style="font-size: 0.875rem; color: #9ca3af; margin: 0;">Sua diversão sem limites</p>
                </div>
            </div>
            <div class="status-online">
                🟢 ONLINE AGORA
            </div>
        </div>
    </div>
</header>

<script>
// Geolocalização
document.addEventListener('DOMContentLoaded', function() {
    const regions = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 
        'Brasília', 'Salvador', 'Fortaleza', 'Curitiba', 
        'Porto Alegre', 'Recife', 'Goiânia'
    ];
    
    const geoElement = document.getElementById('geo-location');
    if (geoElement) {
        const randomRegion = regions[Math.floor(Math.random() * regions.length)];
        geoElement.textContent = randomRegion;
    }
});
</script>