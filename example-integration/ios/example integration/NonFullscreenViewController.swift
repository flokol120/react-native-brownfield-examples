import UIKit

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
