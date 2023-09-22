import Foundation

@objc
class ReduxMirror: NSObject {
    
    @objc weak static var delegate: ReduxMirrorDelegate? = nil
    
    private static var state: NSDictionary = [:]
    
    private static var sharedInstance: ReduxMirror? = nil
    
    override init() {
        super.init()
        ReduxMirror.sharedInstance = self
      }
    
    @objc public static func update(data: NSDictionary) -> Void {
        print("updated state")
        state = data;
    }
    
    @objc public static func setState(action: String, payload: NSDictionary?) {
        let options: NSMutableDictionary = ["action": action]
        if(payload != nil) {
            options["payload"] = payload
        }
        delegate?.sendEvent(name: "triggerAction", payload: options)
    }
    
    public static func getApplicationState() -> NSDictionary? {
        return state["ApplicationState"] as! NSDictionary?
    }
    
    public static func getCounter() -> Int? {
        if let applicationState: NSDictionary = getApplicationState() {
            return applicationState["counter"] as? Int
        }
        return nil
    }
}

extension ReduxMirror {
    // List of emittable events
    enum Event: String, CaseIterable {
        case triggerAction
    }
    
    @objc
    static var supportedEvents: [String] {
        return Event.allCases.map(\.rawValue);
    }
}

@objc protocol ReduxMirrorDelegate {
    func sendEvent(name: String, payload: NSDictionary)
}
