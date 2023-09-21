package com.nativeloggingmodule;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LoggingModule extends ReactContextBaseJavaModule {

    public LoggingModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "LoggingModule";
    }

    @ReactMethod
    public void log(String title, String body, Promise promise) {
        if (title.isEmpty() || body.isEmpty()) {
            promise.reject("log", "no title or body specified");
            return;
        }
        Log.i("LoggingModule", String.format("Log from React Native, title: %s, body: %s", title, body));
        promise.resolve("success");
    }
}
