from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

import market.routing


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter(
            market.routing.websocket_urls_patterns
        )
    )
})