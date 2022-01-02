(function betterttv() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://127.0.0.1:8125/betterttv.js';
    const head = document.getElementsByTagName('head')[0];
    if (!head) return;
    head.appendChild(script);
})()