import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import DefaultNotificationHandler, { INotificationHandler } from './NotificationHandler';
import PushNotification from 'react-native-push-notification';

export interface IPermissionCallback {
    onPermission: (granted: boolean) => void;
}

export interface IDeviceTokenCallback {
    onDeviceTokenReceived: (deviceToken: string) => void;
}

class NotificationHelper {
    notificationHandler: INotificationHandler;
    NOTIFICATION_CHANNEL = 'OnPeople';
    private onMessageListener?: any;

    constructor() {
        this.notificationHandler = new DefaultNotificationHandler();
        this.createDefaultChannel();
    }

    createDefaultChannel = () => {
        PushNotification.channelExists(this.NOTIFICATION_CHANNEL, (exists: any) => {
            console.info('channel exists: ', exists);
            if (exists) {
                return;
            }
            PushNotification.createChannel({
                channelId: this.NOTIFICATION_CHANNEL,
                channelName: this.NOTIFICATION_CHANNEL,
            }, (created: any) => {
                console.info(`Created channel ${this.NOTIFICATION_CHANNEL}: `, created);
            });
        });
    }

    askPermissionAndRegisterDeviceToken = async (permissionCallback: IPermissionCallback, deviceTokenCallBack?: IDeviceTokenCallback) => {
        try {
            const granted = await messaging().requestPermission();
            const enabled =
                granted === messaging.AuthorizationStatus.AUTHORIZED ||
                granted === messaging.AuthorizationStatus.PROVISIONAL;
            if (permissionCallback) {
                permissionCallback.onPermission(enabled);
            }

            // if (enabled) {
            //     const fcmToken = await messaging().getToken();
            //     if (fcmToken && deviceTokenCallBack) {
            //         // user has a device token
            //         deviceTokenCallBack.onDeviceTokenReceived(fcmToken);
            //     }
            // }
        } catch (error) {
            if (permissionCallback) {
                permissionCallback.onPermission(false);
            }
        }
    };

    hasPermission = () => messaging().hasPermission();
    getDeviceToken = async () => await messaging().getToken();

    registerUserTopic = async (userId: string) => {
        const granted = await messaging().hasPermission();
        if (granted) {
            messaging().subscribeToTopic(userId).then(() => {
                console.info('subscribe to topic: ', userId);
            }).catch((error: any) => {
                console.warn('subscribe topic error: ', error);
            });
        }
    }

    unregisterUserTopic = (userId: string) => {
        messaging().unsubscribeFromTopic(userId).then(() => console.info('unsubscribe topic: ', userId)).catch(console.warn);
    }

    listenOnNotification = async (notificationHandler: INotificationHandler) => {
        try {
            const granted = await messaging().hasPermission();
            if (granted) {
                // user has permissions
                this.detachListeners();
                this.onMessageListener = messaging().onMessage((notification: FirebaseMessagingTypes.RemoteMessage) => {
                    // Process your notification as required
                    console.info('receive remote notification: ', notification);
                    notificationHandler.onMessage(notification);
                });
            }
        } catch (error) {

        }
    };

    detachListeners = () => {
        if (this.onMessageListener && typeof this.onMessageListener === 'function') {
            this.onMessageListener();
        }
    };
}

export default new NotificationHelper();
