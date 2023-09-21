#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RTNProgressBarManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(progress, float)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
