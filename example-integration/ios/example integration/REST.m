//
//  REST.m
//  example integration
//
//  Created by admin on 22.09.23.
//

#import "REST.h"
#import "example_integration-Swift.h"
#import "GCDWebServerDataResponse.h"
#import "GCDWebServerDataRequest.h"
#import "GCDWebServerURLEncodedFormRequest.h"

@implementation REST

- (void)initRESTApi
{
    _webServer = [[GCDWebServer alloc] init];
    
    MockDB *mockDb = [MockDB instance];
    
    [_webServer addHandlerForMethod:@"GET" path:@"/ping" requestClass:[GCDWebServerRequest class] processBlock:^GCDWebServerResponse *(GCDWebServerRequest* request) {
        
        return [GCDWebServerDataResponse responseWithJSONObject:@{ @"response" : @"pong"}];
    }];
    
    [_webServer addHandlerForMethod:@"GET" path:@"/counter" requestClass:[GCDWebServerRequest class] processBlock:^GCDWebServerResponse *(GCDWebServerRequest* request) {
        MockDB *mockDb = [MockDB instance];
        return [GCDWebServerDataResponse responseWithJSONObject:@{ @"response" : [NSNumber numberWithInt:[mockDb getCounter]]}];
    }];
    
    [_webServer addHandlerForMethod:@"POST" path:@"/counter" requestClass:[GCDWebServerDataRequest class] processBlock:^GCDWebServerResponse *(GCDWebServerDataRequest* request) {
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:request.data options:0 error:nil];
        NSString* value = [dic valueForKey: @"counter"];
        [mockDb setCounterWithCounter: [value intValue]];
        return [GCDWebServerDataResponse responseWithText: @"OK"];
    }];
    
    // Start server on port 3001
    [_webServer startWithPort:3001 bonjourName:nil];
    NSLog(@"Visit %@ in your web browser", _webServer.serverURL);
}

@end
