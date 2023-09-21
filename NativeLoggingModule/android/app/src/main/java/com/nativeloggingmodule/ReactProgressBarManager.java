package com.nativeloggingmodule;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class ReactProgressBarManager extends SimpleViewManager<ReactProgressBar> {

    private final ReactApplicationContext mCallerContext;

    public ReactProgressBarManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "RTNProgressBar";
    }

    @NonNull
    @Override
    protected ReactProgressBar createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        ReactProgressBar bar = new ReactProgressBar(themedReactContext, null, android.R.attr.progressBarStyleHorizontal);
        bar.setProgress(0);
        return bar;
    }

    @ReactProp(name = "progress", defaultFloat = 0.0f)
    public void setProgress(ReactProgressBar bar, @Nullable float progress) {
        bar.setProgress((int) (progress * 100));
    }

    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put(
                "onPress",
                MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onPress")
                )
        ).build();
    }
}
