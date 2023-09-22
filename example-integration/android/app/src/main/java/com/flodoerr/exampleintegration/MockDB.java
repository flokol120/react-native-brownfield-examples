package com.flodoerr.exampleintegration;

import java.util.Random;

public class MockDB {

    private static MockDB dbInstance;

    public static MockDB instance() {
        if(MockDB.dbInstance == null) {
            MockDB.dbInstance = new MockDB();
        }
        return MockDB.dbInstance;
    }

    private MockDB() { }

    private int counter = 0;

    public void setCounter(int counter) {
        this.counter = counter;
    }

    public int getCounter() {
        return counter;
    }

    public void increment() {
        counter++;
    }

    public void decrement() {
        counter--;
    }

    public int setRandomCounter() {
        counter = new Random().nextInt(100) + 1;
        return counter;
    }
}
