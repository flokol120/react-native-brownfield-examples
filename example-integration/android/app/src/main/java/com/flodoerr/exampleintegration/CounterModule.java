package com.flodoerr.exampleintegration;

import com.facebook.react.bridge.ReactApplicationContext;

public class CounterModule extends NativeCounterModuleSpec {

    public CounterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void set(double counter) {
        MockDB.instance().setCounter((int) counter);
    }
}
