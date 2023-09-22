#import <Foundation/Foundation.h>
#import "GCDWebServer.h"

@interface REST : NSObject


@property (strong) GCDWebServer* webServer;

- (void) initRESTApi;

@end
