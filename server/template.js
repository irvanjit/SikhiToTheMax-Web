import marinate from 'marinate';
import { ONLINE_COLOR } from '../common/constants';

export default ({ bodyClass, title, description }) => marinate`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="${ONLINE_COLOR}">

  <!-- Open Graph and Twitter -->
  <meta property="og:type" content="website">
  <meta property="og:author" content="https://khalisfoundation.org/">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="/assets/images/sttm_logo.png">
  <meta property="og:image:width" content="1138">
  <meta property="og:image:height" content="250">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:site" content="@khalisfound">
  <meta property="twitter:creator" content="@khalisfound">
  <meta property="twitter:title" content="${title}">
  <meta property="twitter:description" content="${description}">
  <meta property="twitter:image:src" content="/assets/images/sttm_logo.png">
  <meta property="twitter:image:width" content="1138">
  <meta property="twitter:image:height" content="250">

  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="stylesheet" href="/assets/css/vendor/foundation.min.css?v=6.2.4">

  <!-- TODO: Get asset_version -->
  <link rel="stylesheet" href="/assets/css/bundle.css">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  <link rel="manifest" href="manifest.json">

  <!-- Safari iOS config -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="STTM">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon-precomposed.png">

  <!-- Windows Tile -->
  <meta name="msapplication-config" content="ieconfig.xml">
  <meta name="application-name" content="STTM">

  <!-- Preload Images -->
  <link async rel="preload" href="/assets/images/sttm_logo.png" as="image">
  <link async rel="preload" href="/assets/images/logo-192x192.png" as="image">
  <link async rel="preload" href="/assets/images/Sach Kaur.png" as="image">

  <!-- Preload Fonts -->
  <link async rel="preload" href="/assets/fonts/GurbaniAkharHeavyTrue.ttf?v=1" as="font">
  <link async rel="preload" href="/assets/fonts/AnmolLipiSG.ttf?v=1" as="font">

  <!-- Preload JavaScript -->
  <link async rel="preload" href="assets/js/chunks/Ang~Hukamnama~Search~Shabad.js" as="script">
  <link async rel="preload" href="assets/js/chunks/Ang~Hukamnama~Shabad.js" as="script">
  <link async rel="preload" href="assets/js/chunks/Search.js" as="script">
  <link async rel="preload" href="assets/js/chunks/Shabad.js" as="script">
</head>

<body class="${bodyClass}">
  <div id="toast-notification" class="toast-notification hidden"></div>

  <div id="app-root"></div>

  <footer>
    <div class="footer row">
      <ul class="menu footer-menu">
        <li>
          <a href="/help">Help</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
        <li>
          <a href="https://form.jotform.com/80266126732151" target="_blank">Feedback</a>
        </li>
        <li>
          <a href="/terms-of-service">Legal</a>
        </li>
        <li>
          <a href="https://khalisfoundation.org/portfolio/sikhitothemax-everywhere/" target="_blank">Desktop App</a>
        </li>
      </ul>
      <div class="copyright">
        Copyright © 2018 Khalis Foundation
        <span>, SikhiToTheMax Trademark SHARE Charities, UK</span>
      </div>
    </div>
  </footer>

  <script>
    var ga;
    if (document.location.hostname === 'www.sikhitothemax.org') {
      /* GA script here */
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
          m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    } else {
      ga = function () { console.log('ga:', Array.prototype.slice.call(arguments)); };
    }
    ga('create', 'UA-47386101-5', 'auto');
  </script>

  <!-- Polyfills -->
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Object.entries,Array.prototype.includes,String.prototype.includes,Map,Set,requestAnimationFrame,Array.prototype.@@iterator"></script>

  <script src="/assets/js/chunks/vendor.js"></script>
  <script src="/assets/js/app.js"></script>
</body>

</html>
`;
