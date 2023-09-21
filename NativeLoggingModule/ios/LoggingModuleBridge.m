
#import "React/RCTBridgeModule.h"
#import <Foundation/Foundation.h>

#import "UIKit/UIKit.h"

@interface RCT_EXTERN_MODULE(LoggingModule, NSObject)

RCT_EXTERN_METHOD(
                    log: (NSString *)title
                    body: (NSString *)body
                    resolver: (RCTPromiseResolveBlock)resolve
                    rejecter: (RCTPromiseRejectBlock)reject
                 )

@end
