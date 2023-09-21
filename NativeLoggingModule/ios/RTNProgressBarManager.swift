@objc(RTNProgressBarManager)
class RTNProgressBarManager: RCTViewManager {
 
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
 
  override func view() -> UIView! {
    return ReactProgressBar()
  }
   
}
