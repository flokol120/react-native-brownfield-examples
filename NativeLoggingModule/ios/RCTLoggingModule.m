// RCTLogginModule.m
#import <UserNotifications/UserNotifications.h>
#import "RCTLoggingModule.h"
#import <React/RCTLog.h>

@implementation RCTLoggingModule

// Modul namens 'NotificationModule' ist nach dem Aufruf in React Native
// verfügbar. Das Modul kann auch umbenannt werden, indem der Name als Argument
// übergeben wird, jedoch nicht als String-Literal, sondern als normaler Text
// (z. B. RCT_EXPORT_MODULE(Test);)
RCT_EXPORT_MODULE(LoggingModuleObjc);
// Das Modul wurde umbenannt, da nur ein Modul den Namen Logging Module
// tragen darf. Aktuell ist das Swift Modul aktiv.

RCT_EXPORT_METHOD(log : (NSString*)title body : (NSString*)body resolver: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject) {
  if([title isEqual: @""] || [body isEqual: @""]) {
    reject(@"log", @"no title or body specified", nil);
    return;
  }
  RCTLogInfo(@"Log from React Native, title: %@, body: %@", title, body);
  resolve(@"success");
}

@end
