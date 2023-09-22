import UIKit
import React

class FullscreenViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Fullscreen"
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        self.view = RCTFabricSurfaceHostingProxyRootView(bridge: appDelegate.bridge!, moduleName: "Counter", initialProperties: ["initialCount": MockDB.instance().setRandomCounter()])
    }
}
