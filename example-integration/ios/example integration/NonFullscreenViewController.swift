import UIKit
import React

class NonFullscreenViewController: UIViewController {
    
    var count = 0
    
    public required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        MockDB.instance().setRandomCounter()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Non Fullscreen"
    }
    
    @IBAction func openReactNative() {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let reactNativeView = RCTFabricSurfaceHostingProxyRootView(bridge: appDelegate.bridge!, moduleName: "Counter", initialProperties: ["initialCount": MockDB.instance().getCounter()])
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
        MockDB.instance().increment()
        self.openReactNative()
    }
    
    @IBAction func decrement() {
        MockDB.instance().decrement()
        self.openReactNative()
    }
}
