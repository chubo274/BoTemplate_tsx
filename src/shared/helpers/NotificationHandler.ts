import NavigationService from './NavigationService';
import { DeviceEventEmitter, EmitterSubscription, Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import PushNotification, { ReceivedNotification } from 'react-native-push-notification';
import { v4 as uuidv4 } from 'uuid';
import NotificationHelper from './NotificationHelper';
import { EmitType } from './constant';
import { appState } from 'src/modules/App';
import { RouteNames } from 'src/modules/navigations/routeName';
export interface INotificationOpenData {
    collapse_key?: string,
    dataId?: string,
    dataTypeId?: string,
    from?: string,
    messageId?: string,
    messageTypeId?: string,
}
export interface INotificationHandler {
    onMessage: (message: FirebaseMessagingTypes.RemoteMessage) => void;
    onNotificationDisplayed?: (notification: any) => void;
    onNotificationOpened?: (notificationOpen: ReceivedNotification, isForeground: boolean) => void;
}
export default class DefaultNotificationHandler implements INotificationHandler {
    subscription?: EmitterSubscription;

    onMessage = (notification: FirebaseMessagingTypes.RemoteMessage) => {
        // DeviceEventEmitter.emit(EmitType.RefreshNotification);
        this.displayNotification(notification);
    };

    /**
     * when app state is ready
     * process navigation of deeplink
     */
    handleOpenNotification = (_notificationOpen: ReceivedNotification) => {
        const data: INotificationOpenData = _notificationOpen?.data;
        // switch (type) {
        //     case NotiMessTypeId.HasPayslip:
                // NavigationService.navigate(RouteNames.PaycheckScreen);
        //         break;
        //     default:
        //         break;
        // }
    };

    onNotificationOpened = (notificationOpen: ReceivedNotification, isForeground: boolean) => {
        console.info('Opened Notification: ', notificationOpen);
        console.info('isForeground: ', isForeground);

        /**
         * Using emitter when open notif from background
         * Wait until all setup steps are done
         */
        if (!isForeground) {
            this.subscription?.remove();
            if (appState.readyForAuth) { // check app state is ready
                this.handleOpenNotification(notificationOpen);
            } else {
                this.subscription = DeviceEventEmitter.addListener(EmitType.AppReadyForAuth, () => {
                    console.info('app init success emit');
                    this.handleOpenNotification(notificationOpen);
                });
            }
        } else {
            this.handleOpenNotification(notificationOpen);
        }
    };

    displayNotification = (notification: FirebaseMessagingTypes.RemoteMessage) => {
        const payload = notification?.data || {};
        const notificationContent = notification?.notification || {};
        console.info('display noti: ', notification);
        if (notificationContent && notificationContent.body && notificationContent.title) {
            if (Platform.OS === 'ios') {
                PushNotificationIOS.addNotificationRequest({
                    id: uuidv4(),
                    body: notificationContent.body,
                    title: notificationContent.title,
                    userInfo: payload
                });
            } else {
                PushNotification.presentLocalNotification({
                    message: notificationContent.body,
                    title: notificationContent.title,
                    userInfo: payload,
                    channelId: NotificationHelper.NOTIFICATION_CHANNEL
                });
            }
        }
    };
}
