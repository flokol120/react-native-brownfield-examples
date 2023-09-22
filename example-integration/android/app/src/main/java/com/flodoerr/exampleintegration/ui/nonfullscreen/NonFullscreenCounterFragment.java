package com.flodoerr.exampleintegration.ui.nonfullscreen;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.facebook.react.ReactFragment;
import com.flodoerr.exampleintegration.MockDB;
import com.flodoerr.exampleintegration.R;
import com.flodoerr.exampleintegration.databinding.FragmentNonFullscreenBinding;

public class NonFullscreenCounterFragment extends Fragment {

    private FragmentNonFullscreenBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        NonFullscreenCounterViewModel nonFullscreenCounterViewModel =
                new ViewModelProvider(this).get(NonFullscreenCounterViewModel.class);

        binding = FragmentNonFullscreenBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        final TextView textView = binding.textGallery;
        nonFullscreenCounterViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);

        Button button = root.findViewById(R.id.openReactNative);
        button.setOnClickListener(v -> createReactNativeView());

        root.findViewById(R.id.increment).setOnClickListener(v -> {
            MockDB.instance().increment();
            createReactNativeView();
        });
        root.findViewById(R.id.decrement).setOnClickListener(v -> {
            MockDB.instance().decrement();
            createReactNativeView();
        });

        return root;
    }

    private void createReactNativeView() {
        Bundle options = new Bundle();
        options.putInt("initialCount", MockDB.instance().getCounter());
        Fragment reactNativeFragment = new ReactFragment.Builder()
                .setComponentName("Counter")
                .setLaunchOptions(options)
                .setFabricEnabled(true)
                .build();
        getChildFragmentManager().beginTransaction().add(R.id.react_native_counter, reactNativeFragment).commit();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}