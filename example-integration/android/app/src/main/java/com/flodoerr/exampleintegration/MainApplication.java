package com.flodoerr.exampleintegration;

import android.app.Application;

import androidx.annotation.NonNull;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.react.bridge.JSIModuleProvider;
import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JSIModuleType;
import com.facebook.react.bridge.UIManager;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.fabric.ComponentFactory;
import com.facebook.react.fabric.CoreComponentsRegistry;
import com.facebook.react.fabric.FabricJSIModuleProvider;
import com.facebook.react.fabric.ReactNativeConfig;
import com.facebook.react.uimanager.ViewManagerRegistry;
import com.facebook.soloader.SoLoader;

import java.util.ArrayList;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();
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
            packages.add(new ExampleIntegrationPackage());
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @NonNull
        @Override
        protected JSIModulePackage getJSIModulePackage() {
            return (reactApplicationContext, jsContext) -> {
                final List<JSIModuleSpec> specs = new ArrayList<>();
                specs.add(new JSIModuleSpec() {
                    @Override
                    public JSIModuleType getJSIModuleType() {
                        return JSIModuleType.UIManager;
                    }

                    @Override
                    public JSIModuleProvider<UIManager> getJSIModuleProvider() {
                        final ComponentFactory componentFactory = new ComponentFactory();
                        CoreComponentsRegistry.register(componentFactory);
                        final ReactInstanceManager reactInstanceManager = getReactInstanceManager();

                        ViewManagerRegistry viewManagerRegistry =
                                new ViewManagerRegistry(
                                        reactInstanceManager.getOrCreateViewManagers(
                                                reactApplicationContext));

                        return new FabricJSIModuleProvider(
                                reactApplicationContext,
                                componentFactory,
                                ReactNativeConfig.DEFAULT_CONFIG,
                                viewManagerRegistry);
                    }
                });
                return specs;
            };
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
