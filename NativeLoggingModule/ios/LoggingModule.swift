import Foundation

@objc(LoggingModule)
class LoggingModule: NSObject {
    
    @objc static func requiresMainQueueSetup() -> Bool { return false }
    
    @objc
    func log(_ title: String, body: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
      if(title == "" || body == "") {
        reject("log", "no title or body specified", nil)
        return
      }
      print("Log from React Native, title: \(title), body: \(body)")
      resolve("success")
    }
}
