import UIKit
import React

class FullscreenViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Fullscreen"
        self.view = RCTRootView(bridge: AppDelegate.bridge!, moduleName: "Counter", initialProperties: ["initialCount": Int.random(in: 1..<101)])
    }
}
