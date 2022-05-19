import React, { MutableRefObject } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import theme from 'src/shared/theme';

export interface IAppModalProps extends ModalizeProps {
    refModal: MutableRefObject<Modalize | undefined>;
    contentContainerStyle?: ViewStyle;
}

export const AppModal = React.memo((props: IAppModalProps) => {
    const { refModal, children, contentContainerStyle, modalStyle, onClose } = props;

    return (<Portal>
        <Modalize
            ref={refModal}
            scrollViewProps={{
                keyboardShouldPersistTaps: "handled",
                scrollEnabled: false,
            }}
            disableScrollIfPossible
            adjustToContentHeight
            modalStyle={[styles.defaultModalStyle, modalStyle]}
            onOverlayPress={() => refModal.current?.close()}
            onClose={onClose}
            withHandle={false}
        >
            <View style={[styles.viewContent, contentContainerStyle]}>
                <View style={styles.viewHolder} />
                {children}
            </View>
        </Modalize>
    </Portal>
    );
});

const styles = StyleSheet.create({
    defaultModalStyle: {
    },
    viewHolder: {
        backgroundColor: '#CACFDA',
        borderRadius: 3,
        height: 3,
        width: 40,
        alignSelf: 'center',
        marginBottom: theme.dimensions.p16,
        marginTop: theme.dimensions.p12,
    },
    viewContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: theme.dimensions.p32,
        paddingBottom: theme.dimensions.p20,
    }
});