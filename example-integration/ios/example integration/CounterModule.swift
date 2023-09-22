//
//  CounterModule.swift
//  example integration
//
//  Created by admin on 11.08.23.
//

import Foundation

@objc
class CounterModule: NSObject {
    @objc public static func set(counter: Int) -> Void {
        MockDB.instance().setCounter(counter: counter)
        print("new counter: ");
        print(counter);
    }
}
