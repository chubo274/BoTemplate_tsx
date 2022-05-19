import RNCalendarEvents, { AuthorizationStatus, Calendar, CalendarEventWritable, CalendarOptions, ISODateString } from "react-native-calendar-events";

class CalendarEvents {
    capelCalendarId = '';
    calendarName = 'Capel';
    constructor() {
        this.setPermissionNCalendar();
    }

    // SETUP
    setPermissionNCalendar = async () => {
        try {
            const authorizationStatus: AuthorizationStatus = await RNCalendarEvents.checkPermissions();
            if (authorizationStatus != 'authorized') {
                const granted: AuthorizationStatus = await RNCalendarEvents.requestPermissions();
                if (granted === 'authorized') {
                    this.setCalendar();
                }
            } else {
                this.setCalendar();
            }
        } catch (error) {
            console.info('error when setup calendar: ', error)
        }
    }

    setCalendar = async () => {
        const listCalendar: Calendar[] = await RNCalendarEvents.findCalendars();
        const findCapelCalendar = listCalendar.find((el: Calendar) => el.title === this.calendarName);
        if (findCapelCalendar) {
            this.capelCalendarId = findCapelCalendar.id;
        } else {
            const calendar: CalendarOptions = {
                title: this.calendarName,
                color: '#F1592A',
                entityType: 'event',
                name: this.calendarName,
                accessLevel: 'owner',
                ownerAccount: 'ownerAccount',
                source: { name: 'ownerAccount', isLocalAccount: true },
            }
            const savedCalendarId = await RNCalendarEvents.saveCalendar(calendar);
            this.capelCalendarId = savedCalendarId;
        }
    }

    //EVENT Calendar Method
    fetchAllEvents = (startDate: ISODateString, endDate: ISODateString) => RNCalendarEvents.fetchAllEvents(startDate, endDate, [this.capelCalendarId]);

    updateEvent = (title: string, details: CalendarEventWritable, eventId: string, options?: any) => RNCalendarEvents.saveEvent(title, { ...details, calendarId: this.capelCalendarId, id: eventId }, options);

    saveEvent = (title: string, details: CalendarEventWritable, options?: any) => RNCalendarEvents.saveEvent(title, { ...details, calendarId: this.capelCalendarId }, options);

    removeEvent = (id: string, options?: any) => RNCalendarEvents.removeEvent(id, options);

    //Function Calendar Custom Support - can change for suitable with input form
    helpQuickDetail = (startDate: ISODateString, endDate?: ISODateString, notes?: string): CalendarEventWritable => {
        return {
            startDate,
            endDate: endDate || startDate,
            alarms: [{ date: 0 }], // data can be ISODateString | number on IOS, but just number on Android
            allDay: undefined,
            notes: notes,
            location: undefined,
        }
    }
};

export default new CalendarEvents();
