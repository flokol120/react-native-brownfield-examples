import UIKit
import React

class NonFullscreenViewController: UIViewController {
    
    var count = 0
    
    public required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.count = Int.random(in: 1..<101)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Non Fullscreen"
    }
    
    @IBAction func openReactNative() {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let reactNativeView = RCTFabricSurfaceHostingProxyRootView(bridge: appDelegate.bridge!, moduleName: "Counter", initialProperties: ["initialCount": self.count])
        self.view.addSubview(reactNativeView)
        reactNativeView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            reactNativeView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            reactNativeView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])
        let anchor = self.view.viewWithTag(1)!
        NSLayoutConstraint.activate([
            reactNativeView.topAnchor.constraint(equalTo: anchor.bottomAnchor)
        ])
        NSLayoutConstraint.activate([
            reactNativeView.heightAnchor.constraint(equalToConstant: 200)
        ])
    }
    
    @IBAction func increment() {
        self.count += 1
        self.openReactNative()
    }
    
    @IBAction func decrement() {
        self.count -= 1
        self.openReactNative()
    }
}
