import { Platform } from "react-native";

export const AppFont = {
    Medium: Platform.OS === 'ios' ? 'TestSohne-Kraftig' : 'Sohne-Medium',
    Regular: Platform.OS === 'ios' ? 'TestSohne-Buch' : 'Sohne-Regular',
    SemiBold: Platform.OS === 'ios' ? 'TestSohne-Halbfett' : 'Sohne-SemiBold',
    Bold: Platform.OS === 'ios' ? 'TestSohne-Dreiviertelfett' : 'Sohne-Bold',
    ExtraBold: Platform.OS === 'ios' ? 'TestSohne-Extrafett' : 'Sohne-ExtraBold',
    Light: Platform.OS === 'ios' ? 'TestSohne-Leicht' : 'Sohne-Light',
}