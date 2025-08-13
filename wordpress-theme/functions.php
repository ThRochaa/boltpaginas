<?php
/**
 * Global Entretenimento IPTV Theme Functions
 */

// Evitar acesso direto
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Configuração do tema
 */
function global_entretenimento_setup() {
    // Suporte a título dinâmico
    add_theme_support('title-tag');
    
    // Suporte a imagens destacadas
    add_theme_support('post-thumbnails');
    
    // Suporte a HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Suporte a feeds automáticos
    add_theme_support('automatic-feed-links');
    
    // Suporte a logo customizável
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Registrar menus
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'global-entretenimento'),
        'footer'  => __('Menu Footer', 'global-entretenimento'),
    ));
}
add_action('after_setup_theme', 'global_entretenimento_setup');

/**
 * Enfileirar estilos e scripts
 */
function global_entretenimento_scripts() {
    // Estilo principal
    wp_enqueue_style('global-entretenimento-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', array(), null);
    
    // Script principal
    wp_enqueue_script('global-entretenimento-script', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true);
    
    // Localizar script para AJAX
    wp_localize_script('global-entretenimento-script', 'ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('global_entretenimento_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'global_entretenimento_scripts');

/**
 * Registrar áreas de widgets
 */
function global_entretenimento_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar Principal', 'global-entretenimento'),
        'id'            => 'sidebar-1',
        'description'   => __('Adicione widgets aqui.', 'global-entretenimento'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Widget 1', 'global-entretenimento'),
        'id'            => 'footer-1',
        'description'   => __('Área de widget do footer.', 'global-entretenimento'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'global_entretenimento_widgets_init');

/**
 * Customizar o excerpt
 */
function global_entretenimento_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'global_entretenimento_excerpt_length', 999);

function global_entretenimento_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'global_entretenimento_excerpt_more');

/**
 * Adicionar classes CSS ao body
 */
function global_entretenimento_body_classes($classes) {
    if (!is_sidebar_active('sidebar-1')) {
        $classes[] = 'no-sidebar';
    }
    
    return $classes;
}
add_filter('body_class', 'global_entretenimento_body_classes');

/**
 * Customizar o login do WordPress
 */
function global_entretenimento_login_logo() { ?>
    <style type="text/css">
        #login h1 a, .login h1 a {
            background-image: none;
            background-color: #dc2626;
            color: white;
            text-decoration: none;
            width: 320px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            font-size: 18px;
            font-weight: bold;
        }
        #login h1 a:before {
            content: "GLOBAL ENTRETENIMENTO";
        }
        .login form {
            border-color: #dc2626;
        }
        .wp-core-ui .button-primary {
            background: #dc2626;
            border-color: #dc2626;
        }
        .wp-core-ui .button-primary:hover {
            background: #b91c1c;
            border-color: #b91c1c;
        }
    </style>
<?php }
add_action('login_enqueue_scripts', 'global_entretenimento_login_logo');

/**
 * Alterar URL do logo de login
 */
function global_entretenimento_login_logo_url() {
    return home_url();
}
add_filter('login_headerurl', 'global_entretenimento_login_logo_url');

/**
 * Alterar título do logo de login
 */
function global_entretenimento_login_logo_url_title() {
    return 'Global Entretenimento IPTV';
}
add_filter('login_headertitle', 'global_entretenimento_login_logo_url_title');

/**
 * Remover versão do WordPress do head
 */
remove_action('wp_head', 'wp_generator');

/**
 * Desabilitar XML-RPC
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Remover links desnecessários do head
 */
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

/**
 * Otimizações de performance
 */
function global_entretenimento_remove_query_strings($src) {
    $parts = explode('?ver', $src);
    return $parts[0];
}
add_filter('script_loader_src', 'global_entretenimento_remove_query_strings', 15, 1);
add_filter('style_loader_src', 'global_entretenimento_remove_query_strings', 15, 1);

/**
 * Adicionar meta tags personalizadas
 */
function global_entretenimento_meta_tags() {
    if (is_home() || is_front_page()) {
        echo '<meta name="description" content="IPTV Premium com mais de 3.500 canais, 40.000 filmes e séries em qualidade 4K. Suporte 24/7 e garantia de 7 dias.">' . "\n";
        echo '<meta name="keywords" content="IPTV, TV Online, Canais Premium, Filmes, Séries, 4K, Streaming, Brasil">' . "\n";
    }
}
add_action('wp_head', 'global_entretenimento_meta_tags');

/**
 * Customizar o admin
 */
function global_entretenimento_admin_style() {
    echo '<style>
        #wpadminbar {
            background: #dc2626 !important;
        }
        #adminmenu .wp-has-current-submenu .wp-submenu-head,
        #adminmenu .wp-menu-arrow,
        #adminmenu .wp-menu-arrow div,
        #adminmenu li.current a.menu-top,
        #adminmenu li.wp-has-current-submenu a.wp-has-current-submenu {
            background: #dc2626 !important;
        }
    </style>';
}
add_action('admin_head', 'global_entretenimento_admin_style');

/**
 * Adicionar suporte a shortcodes em widgets
 */
add_filter('widget_text', 'do_shortcode');

/**
 * Função para obter configurações do tema
 */
function get_theme_option($option, $default = '') {
    $options = get_option('global_entretenimento_options', array());
    return isset($options[$option]) ? $options[$option] : $default;
}

/**
 * Shortcode para botão WhatsApp
 */
function global_entretenimento_whatsapp_shortcode($atts) {
    $atts = shortcode_atts(array(
        'number' => '5511920040932',
        'message' => 'Vi%20seu%20Site%20agora%20e%20Quero%20fazer%20um%20teste!',
        'text' => 'QUERO TESTAR AGORA!',
        'class' => 'cta-button'
    ), $atts);
    
    return sprintf(
        '<a href="https://wa.me/%s?text=%s" class="%s" target="_blank">%s</a>',
        esc_attr($atts['number']),
        esc_attr($atts['message']),
        esc_attr($atts['class']),
        esc_html($atts['text'])
    );
}
add_shortcode('whatsapp', 'global_entretenimento_whatsapp_shortcode');

/**
 * Shortcode para planos
 */
function global_entretenimento_plans_shortcode($atts) {
    ob_start();
    ?>
    <div class="plans-grid">
        <!-- Conteúdo dos planos aqui -->
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('plans', 'global_entretenimento_plans_shortcode');

/**
 * Adicionar suporte a campos personalizados
 */
function global_entretenimento_add_meta_boxes() {
    add_meta_box(
        'global_entretenimento_meta',
        'Configurações da Página',
        'global_entretenimento_meta_callback',
        'page'
    );
}
add_action('add_meta_boxes', 'global_entretenimento_add_meta_boxes');

function global_entretenimento_meta_callback($post) {
    wp_nonce_field('global_entretenimento_meta_nonce', 'global_entretenimento_meta_nonce');
    
    $hide_header = get_post_meta($post->ID, '_hide_header', true);
    $hide_footer = get_post_meta($post->ID, '_hide_footer', true);
    
    echo '<table class="form-table">';
    echo '<tr>';
    echo '<th><label for="hide_header">Ocultar Header</label></th>';
    echo '<td><input type="checkbox" id="hide_header" name="hide_header" value="1" ' . checked(1, $hide_header, false) . ' /></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<th><label for="hide_footer">Ocultar Footer</label></th>';
    echo '<td><input type="checkbox" id="hide_footer" name="hide_footer" value="1" ' . checked(1, $hide_footer, false) . ' /></td>';
    echo '</tr>';
    echo '</table>';
}

function global_entretenimento_save_meta($post_id) {
    if (!isset($_POST['global_entretenimento_meta_nonce']) || !wp_verify_nonce($_POST['global_entretenimento_meta_nonce'], 'global_entretenimento_meta_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    update_post_meta($post_id, '_hide_header', isset($_POST['hide_header']) ? 1 : 0);
    update_post_meta($post_id, '_hide_footer', isset($_POST['hide_footer']) ? 1 : 0);
}
add_action('save_post', 'global_entretenimento_save_meta');

/**
 * Adicionar favicon
 */
function global_entretenimento_favicon() {
    echo '<link rel="icon" type="image/x-icon" href="' . get_template_directory_uri() . '/assets/favicon.ico">';
}
add_action('wp_head', 'global_entretenimento_favicon');