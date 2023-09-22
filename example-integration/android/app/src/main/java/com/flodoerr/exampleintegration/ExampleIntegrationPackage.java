package com.flodoerr.exampleintegration;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class ExampleIntegrationPackage extends TurboReactPackage {


    @Nullable
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        Log.d("TurboLoggingPackage", name);
        if (name.equals(CounterModule.NAME)) {
            return new CounterModule(reactContext);
        } else {
            return null;
        }
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
            moduleInfos.put(
                    CounterModule.NAME,
                    new ReactModuleInfo(
                            CounterModule.NAME,
                            CounterModule.NAME,
                            true, // canOverrideExistingModule
                            true, // needsEagerInit
                            false, // hasConstants
                            false, // isCxxModule
                            true // isTurboModule
                    ));
            return moduleInfos;
        };
    }
}
