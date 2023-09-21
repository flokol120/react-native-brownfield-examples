import UIKit

class ReactProgressBar: UIProgressView {
  
  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }
  
  @objc var onPress: RCTBubblingEventBlock?
  
  override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
      guard let onPress = self.onPress else {
        super.touchesEnded(touches, with: event)
        return
      }
      onPress(nil)
      super.touchesEnded(touches, with: event)
  }
  
  @objc override var progress: Float {
    didSet {
      super.progress = self.progress
    }
  }
  
}
