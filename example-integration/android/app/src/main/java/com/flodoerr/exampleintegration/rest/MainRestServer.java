package com.flodoerr.exampleintegration.rest;

import ru.skornei.restserver.annotations.RestServer;
import ru.skornei.restserver.server.BaseRestServer;

@RestServer( port = MainRestServer.PORT,
        converter = JsonConverter.class, //Optional
        controllers = {CounterController.class} )
public class MainRestServer extends BaseRestServer {
    public static final int PORT = 3001;
}
