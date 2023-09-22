import UIKit
import React

let url = URL(string: "http://localhost:3000")

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
        let reactNativeView = RCTRootView(bridge: AppDelegate.bridge!, moduleName: "Counter", initialProperties: ["initialCount": MockDB.instance().getCounter()])
        self.view.addSubview(reactNativeView)
        reactNativeView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            reactNativeView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            reactNativeView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])
        let anchor = self.view.viewWithTag(1)!
        NSLayoutConstraint.activate([
            reactNativeView.topAnchor.constraint(equalTo: anchor.bottomAnchor),
            reactNativeView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
    
    @IBAction func increment() {
        MockDB.instance().increment()
        let task = URLSession.shared.dataTask(with: url!.appendingPathComponent("increment"))
        task.resume()
    }
    
    @IBAction func decrement() {
        MockDB.instance().decrement()
        let task = URLSession.shared.dataTask(with: url!.appendingPathComponent("decrement"))
        task.resume()
    }
}
