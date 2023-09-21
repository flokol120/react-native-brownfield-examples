import Foundation

@objc(EventEmitterModule)
class EventEmitterModule: RCTEventEmitter {
  
  @objc override static func requiresMainQueueSetup() -> Bool { return false }
  
  private static var sharedInstance: EventEmitterModule? = nil
  
  override init() {
    super.init()
    EventEmitterModule.sharedInstance = self
    Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
      do {
        try EventEmitterModule.emitLogToReactNative(message: "React Native initialized")
      } catch {
        print("React Native not initialized!")
      }
    }
  }
  
  public static func emitLogToReactNative(message: String) throws {
    if(sharedInstance == nil) {
      throw EventEmitterError.uninitialize
    }
    sharedInstance?.sendEvent(withName: "logToReactNative", body: ["message": message])
  }
  
  /// Base overide for RCTEventEmitter.
  ///
  /// - Returns: all supported events
  @objc open override func supportedEvents() -> [String] {
    // Append all events here
    return ["logToReactNative"]
  }
  
}

enum EventEmitterError: String, Error {
  case uninitialize = "Event Emitter not initialized yet!"
}
