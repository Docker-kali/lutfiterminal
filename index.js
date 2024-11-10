const ASSET_URL = 'https://github.com/v2fly/v2ray-core/releases/download/v4.32.1/v2ray-linux-64.zip';
const CONFIG = {
    "log": {
        "access": "",
        "error": "",
        "loglevel": "warning"
    },
    "inbounds": [{
        "port": 8080,
        "protocol": "vmess",
        "settings": {
            "clients": [{
                "id": "05aedfe6-fa60-490d-9415-16b6aa55a77a", // Ganti dengan UUID Anda
                "alterId": 64
            }]
        },
        "streamSettings": {
            "network": "ws",
            "wsSettings": {
                "path": "/"
            }
        }
    }],
    "outbounds": [{
        "protocol": "freedom",
        "settings": {}
    }]
};

addEventListener(
    "fetch", event => {
        let url = new URL(event.request.url);
        if (url.pathname.startsWith('/yourpath')) {
            event.respondWith(handleRequest(event.request));
        } else {
            event.respondWith(fetch(ASSET_URL));
        }
    }
);

async function handleRequest(request) {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/yourpath')) {
        return new Response(JSON.stringify(CONFIG), {
            headers: { "content-type": "application/json" }
        });
    }
    return fetch(ASSET_URL);
}
