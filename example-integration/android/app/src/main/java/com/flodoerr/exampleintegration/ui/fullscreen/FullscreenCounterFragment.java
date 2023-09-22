package com.flodoerr.exampleintegration.ui.fullscreen;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.facebook.react.ReactFragment;
import com.flodoerr.exampleintegration.R;

import java.util.Random;

public class FullscreenCounterFragment extends Fragment {

    private ReactFragment reactNativeFragment;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        if(reactNativeFragment != null) {
            // needs to be destroyed if already displayed or an exception would be thrown
            reactNativeFragment.onDestroy();
        }
        View view = inflater.inflate(R.layout.react_native_view, container, false);
        Bundle options = new Bundle();
        options.putInt("initialCount", new Random().nextInt(100) + 1);
        if (reactNativeFragment == null) {
            reactNativeFragment = new ReactFragment.Builder()
                    .setComponentName("Counter")
                    .setLaunchOptions(options)
                    .setFabricEnabled(false)
                    .build();
            getChildFragmentManager().beginTransaction().add(R.id.react_native_fragment, reactNativeFragment).commit();
        }
        return view;
    }
}