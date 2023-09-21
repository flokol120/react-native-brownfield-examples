package com.nativeloggingmodule;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;
import java.util.TimerTask;

public class EventEmitterModule extends ReactContextBaseJavaModule {

    @Override
    public void initialize() {
        super.initialize();

        Timer logTimer = new Timer();
        logTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    emitLogToReactNative("React Native initialized!");
                } catch (Exception e) {
                    Log.d("EventEmitterModule", "React Native not initialized yet");
                }
            }

        }, 0, 1000);
    }

    private static ReactApplicationContext context;

    public EventEmitterModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    public static void emitLogToReactNative(String message) throws Exception {
        if(context == null) {
            throw new Exception("Event Emitter not initialized yet!");
        }
        WritableMap params = Arguments.createMap();
        params.putString("message", message);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("logToReactNative", params);
    }

    @NonNull
    @Override
    public String getName() {
        return "EventEmitterModule";
    }
}
