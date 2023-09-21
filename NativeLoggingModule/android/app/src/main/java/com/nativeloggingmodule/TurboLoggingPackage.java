package com.nativeloggingmodule;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;
import com.nativeloggingmodule.TurboLoggingModule;

import java.util.HashMap;
import java.util.Map;

public class TurboLoggingPackage extends TurboReactPackage {

    @Nullable
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        Log.d("TurboLoggingPackage", name);
        if (name.equals(TurboLoggingModule.NAME)) {
            return new TurboLoggingModule(reactContext);
        } else {
            return null;
        }
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
            moduleInfos.put(
                    TurboLoggingModule.NAME,
                    new ReactModuleInfo(
                            TurboLoggingModule.NAME,
                            TurboLoggingModule.NAME,
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