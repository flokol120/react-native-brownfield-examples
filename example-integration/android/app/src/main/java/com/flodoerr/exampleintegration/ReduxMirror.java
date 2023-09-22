package com.flodoerr.exampleintegration;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ReduxMirror extends NativeReduxMirrorSpec {

    private static ReadableMap state;
    private static ReactApplicationContext context;

    public ReduxMirror(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    public static void set(String action) {
        set(action, null);
    }

    @Override
    public void update(ReadableMap data) {
        Log.d("ReduxMirror", "Updated state");
        state = data;
    }

    @Override
    public void addListener(String eventType) {
    }

    @Override
    public void removeListeners(double count) {
    }

    public static ReadableMap getState() {
        return state;
    }

    public static ReadableMap getApplicationState() {
        return state.getMap("ApplicationState");
    }

    public static int getCounter() {
        return getApplicationState().getInt("counter");
    }

    public static void set(String action, WritableMap payload) {
        WritableMap options = Arguments.createMap();
        options.putString("action", action);
        if(payload != null) {
            options.putMap("payload", payload);
        }
        Log.d("ReduxMirror", "triggering action " + action);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("triggerAction", options);
    }
}
