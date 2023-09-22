package com.flodoerr.exampleintegration.rest;

import android.content.Context;
import android.util.Log;

import com.flodoerr.exampleintegration.MockDB;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Arrays;

import ru.skornei.restserver.annotations.Accept;
import ru.skornei.restserver.annotations.ExceptionHandler;
import ru.skornei.restserver.annotations.Produces;
import ru.skornei.restserver.annotations.RestController;
import ru.skornei.restserver.annotations.methods.GET;
import ru.skornei.restserver.annotations.methods.POST;
import ru.skornei.restserver.server.dictionary.ContentType;
import ru.skornei.restserver.server.protocol.RequestInfo;
import ru.skornei.restserver.server.protocol.ResponseInfo;

@RestController("/counter")
public class CounterController {

    @GET
    @Produces(ContentType.APPLICATION_JSON)
    @Accept(ContentType.ALL)
    public CounterEntity counter(Context context, RequestInfo request, ResponseInfo response, Object body) {
        Log.d("REST", "Requesting current counter");
        return new CounterEntity(MockDB.instance().getCounter());
    }

    @POST
    @Produces(ContentType.TEXT_PLAIN)
    @Accept(ContentType.APPLICATION_JSON)
    public String test(Context context, RequestInfo request, ResponseInfo response, CounterEntity body) {
        MockDB.instance().setCounter(body.getCounter());
        return "OK";
    }

    private static String getStackTrace(Throwable throwable) {
        StringWriter stringWriter = new StringWriter();
        throwable.printStackTrace(new PrintWriter(stringWriter));
        return stringWriter.toString();
    }

    @ExceptionHandler
    @Produces(ContentType.TEXT_PLAIN)
    public void handleThrowable(Throwable throwable, ResponseInfo response) {
        String throwableStr = getStackTrace(throwable);
        response.setBody(throwableStr.getBytes());
    }
}
