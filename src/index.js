import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';

export default class App extends Component{

	componentDidMount(){
		fetch('https://onesignal.com/api/v1/notifications', {
			method: 'POST',
			headers: {
				Authorization: 'Basic NzU5OWVhYTctOGJkNy00MGY5LThmM2EtODIyOTNkNGM5MmY2',
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({
				'app_id': "7cf2906b-2f2a-4a7b-a780-c667c976486a",
				'headings': {"en": "Bom vindo!"},
				'contents': {"en": "Oproveite nossas promoções de inauguração."},
				'buttons': [{"id": "teste", "text": "Confirmar"}],
				// 'small_icon': 'http://10.0.2.140/Aplicativos/notify/src/assets/send.png',
				// 'large_icon' : 'http://10.0.2.140/Aplicativos/notify/src/assets/send.png',
				// 'android_background_layout': {"image": "http://10.0.2.140/Aplicativos/notify/src/assets/like.png", "headings_color": "#000", "contents_color": "#000"}, 
				'android_visibility': 0,
				'android_group': ["All"],
				'included_segments': ["All"],

			}),
		});
	}
	
	constructor(properties) {
		
		super(properties);
		OneSignal.init("7cf2906b-2f2a-4a7b-a780-c667c976486a");
	}

	getNotification(){
		PushNotification.localNotification({
			title: "My Notify",
			message: "This my notification",
		});
	}
	render() {
		return (
			<View>
				<Text>Welcome to React</Text>

				<Button
					title={"Get notification"}
					onPress={this.getNotification}
				/>
			</View>
		);
	}
}
PushNotification.configure({

	// (optional) Called when Token is generated (iOS and Android);
	onRegister: function(token) {
		console.log('TOKEN:', token);
	},

	// (required) Called when a remote or local notification is opened or received;
	onNotification: function(notification) {

		console.log('NOTIFICATION:', notification);

		// alert('hey hey hey');

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