package com.flodoerr.exampleintegration.rest;

// cannot use record? :(
public class CounterEntity {
    private int counter;

    public CounterEntity() {

    }

    public CounterEntity(int counter) {
        this.counter = counter;
    }

    public int getCounter() {
        return counter;
    }
}
