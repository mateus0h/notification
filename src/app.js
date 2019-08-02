import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, PushNotificationIOS} from 'react-native';

import PushNotification from 'react-native-push-notification';
import { addListener } from 'cluster';

export default class App extends Component{
    getNotification(){
        PushNotification.localNotification({
            title: "My Notify",
            message: "This my notification",
        });
    }

    render() {
        return (
            <View style={StyleSheet.container}>
                <Text style={StyleSheet.welcome}>Welcome to React</Text>
                <Button
                    title={"Get notification"}
                    onPress={this.getNotification}
                />
            </View>
        );
    }
}

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log('TOKEN:', token);

  },
  
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: '609774712490',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});