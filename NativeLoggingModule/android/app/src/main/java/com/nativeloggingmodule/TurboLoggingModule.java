package com.nativeloggingmodule;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.rtnlogging.NativeLoggingSpec;

public class TurboLoggingModule extends NativeLoggingSpec {
    public TurboLoggingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void log(String title, String body, Promise promise) {
        if (title.isEmpty() || body.isEmpty()) {
            promise.reject("log", "no title or body specified");
            return;
        }
        Log.i("TurboLoggingModule", String.format("Log from React Native, title: %s, body: %s", title, body));
        promise.resolve("success");
    }
}
