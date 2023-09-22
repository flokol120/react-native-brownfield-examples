//
//  MockDB.swift
//  example integration
//
//  Created by admin on 11.08.23.
//

import Foundation

@objc
class MockDB: NSObject {
    private static var dbInstance: MockDB? = nil
    
    @objc
    public static func instance() -> MockDB {
        if(dbInstance == nil) {
            dbInstance = MockDB()
        }
        return dbInstance!
    }
    
    private var counter: Int = 0
    
    @objc
    public func setCounter(counter: Int) {
        self.counter = counter
    }
    @objc
    public func getCounter() -> Int {
        return self.counter
    }
    
    public func increment() {
        self.counter += 1
    }
    
    public func decrement() {
        self.counter -= 1
    }
    
    public func setRandomCounter() -> Int {
        self.counter = Int.random(in: 1..<101)
        return self.counter
    }
 }
