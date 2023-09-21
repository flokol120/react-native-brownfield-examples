package com.flodoerr.exampleintegration.ui.nonfullscreen;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class NonFullscreenCounterViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public NonFullscreenCounterViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is a non fullscreen react native view. This view has existing native elements.");
    }

    public LiveData<String> getText() {
        return mText;
    }
}