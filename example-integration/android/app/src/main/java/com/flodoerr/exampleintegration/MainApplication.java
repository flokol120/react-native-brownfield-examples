package com.flodoerr.exampleintegration;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.androidnetworking.AndroidNetworking;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.react.bridge.JSIModuleProvider;
import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JSIModuleType;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UIManager;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.fabric.ComponentFactory;
import com.facebook.react.fabric.CoreComponentsRegistry;
import com.facebook.react.fabric.EmptyReactNativeConfig;
import com.facebook.react.fabric.FabricJSIModuleProvider;
import com.facebook.react.uimanager.ViewManagerRegistry;
import com.facebook.soloader.SoLoader;
import com.flodoerr.exampleintegration.rest.MainRestServer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import ru.skornei.restserver.RestServerManager;

public class MainApplication extends Application implements ReactApplication {

    private final MainRestServer restServer = new MainRestServer();

    @Override
    public void onCreate() {
        super.onCreate();
        RestServerManager.initialize(this);
        AndroidNetworking.initialize(getApplicationContext());
        try {
            restServer.start();
            Log.d("REST", "Rest Server started");
        } catch (IOException e) {
            Log.d("REST", "Rest Server couldn't be started");
        }
        SoLoader.init(this, false);
    }

    private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here
            // This includes self-written packages as described in the thesis
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
