#import "RTNExampleIntegrationSpec.h"
#import "RTNCounterModule.h"
#import <React/RCTLog.h>

#import "example_integration-Swift.h"

@implementation RTNCounterModule

RCT_EXPORT_MODULE()

//- (void)set:(double)counter {
//    RCTLogInfo(@"Log from React Native, counter: %f", counter);
//}

RCT_REMAP_METHOD(set, setA: (double) counter) {
    return [self set:counter];
}

//RCT_EXTERN_METHOD(
//                  set: (double) counter
//                  )

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCounterModuleSpecJSI>(params);
}

- (void)set:(double)counter {
    [CounterModule setWithCounter:counter];
}

@end
