#import "RTNLoggingSpec.h"
#import "RTNLogging.h"
#import <React/RCTLog.h>

@implementation RTNLogging

RCT_EXPORT_MODULE()

- (void)log:(NSString *)title
       body:(NSString *)body
    resolve:(RCTPromiseResolveBlock)resolve
     reject:(RCTPromiseRejectBlock)reject {
  if([title isEqual: @""] || [body isEqual: @""]) {
    reject(@"log", @"no title or body specified", nil);
    return;
  }
  RCTLogInfo(@"Log from React Native, title: %@, body: %@", title, body);
  resolve(@"success");
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeLoggingSpecJSI>(params);
}

@end
