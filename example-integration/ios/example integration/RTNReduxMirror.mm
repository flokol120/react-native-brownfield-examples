#import "RTNExampleIntegrationSpec.h"
#import "RTNReduxMirror.h"
#import <React/RCTLog.h>

#import "example_integration-Swift.h"

@interface RTNReduxMirror () <ReduxMirrorDelegate>

@end

@implementation RTNReduxMirror

ReduxMirror *reduxMirror;

- (instancetype)init {
    self = [super init];
    if(self) {
        reduxMirror = [ReduxMirror new];
        ReduxMirror.delegate = self;
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return [ReduxMirror supportedEvents];
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(update, updateA: (NSDictionary *) data) {
    return [self update:data];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeReduxMirrorSpecJSI>(params);
}

- (void)update:(NSDictionary *)data {
    [ReduxMirror updateWithData:data];
}

- (void)sendEventWithName:(NSString * _Nonnull)name payload:(NSDictionary * _Nonnull)payload {
    [self sendEventWithName:name body:payload];
}

@end
