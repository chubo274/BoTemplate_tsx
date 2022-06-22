import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { Modalize } from 'react-native-modalize';
import { Host } from 'react-native-portalize';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from 'react-redux';
import images from 'src/assets/images';
import { IReducer } from 'src/data/interfaces/common';
import { IGetDataRequest } from 'src/data/interfaces/request/home/IGetDataRequest';
import { PersonModel } from 'src/data/models/PersonModel';
import { AppButton } from 'src/modules/components/appButton';
import { AppInput } from 'src/modules/components/appInput';
import { AppModal } from 'src/modules/components/appModal';
import { DemoModalContent } from 'src/modules/components/appModal/DemoModal';
import { AppText } from 'src/modules/components/appText';
import { ImageRender } from 'src/modules/components/image/ImageRender';
import { getString } from 'src/shared/localization';
import { getDataLoadMore, getDataRefresh, getDataRequest } from 'src/modules/redux/actions/tutorialAction/home';
import { logoutUser } from 'src/modules/redux/actions/tutorialAction/user';
import { RootState } from 'src/modules/redux/reducers';
import theme from 'src/shared/theme';

interface ITest {
    name: string;
}

const TutorialHomeScreen = () => {
    const dispatch = useDispatch();
    const refModalDemo = useRef<Modalize>();
    const personReducer: IReducer<PersonModel[]> = useSelector((state: RootState) => state.homeReducer.personReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [text, setText] = useState('something');
    const [idUser, setIdUser] = useState<number | undefined>(undefined);

    const request: IGetDataRequest = {
        page: 1,
        pageSize: 3,
    }

    const onChangeText = useCallback((value: string) => {
        setText(value);
    }, [setText]);

    const onLogout = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    const onRefresh = useCallback(() => {
        dispatch(getDataRefresh(request));
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    }, [currentPage]);

    const onLoadMore = useCallback(() => {
        if (personReducer.params?.canLoadMore) {
            dispatch(getDataLoadMore({ ...request, page: currentPage + 1 }));
            setCurrentPage((prevState: number) => prevState + 1);
        }
    }, [personReducer]);

    const onPressPerson = useCallback((id: number) => {
        setIdUser((prevState?: number) => {
            if (prevState !== id) {
                return id;
            }
            return prevState;
        });
    }, [refModalDemo]);

    useEffect(() => {
        if (idUser) {
            refModalDemo.current?.open();
        }
    }, [idUser]);

    useEffect(() => {
        dispatch(getDataRequest(request));
    }, []);

    const renderListUserData = ({ item, index }: { item: PersonModel, index: number }) => {
        return <TouchableOpacity style={styles.viewItem} activeOpacity={0.6} onPress={() => onPressPerson(item.id)}>
            <AppText children={item.name} />
        </TouchableOpacity>
    }

    return (
        <Host>
            <SafeAreaView style={{ backgroundColor: Colors.darker, flex: 1 }}>
                <StatusBar barStyle={'light-content'} />
                <ImageRender source={images.avt} style={{ height: 150, width: 150 }} />
                <AppInput
                    label={'label'}
                    placeholder={'placeholder'}
                    value={text}
                    inputStyle={{ fontSize: 20, color: 'white', fontFamily: theme.font.Bold }}
                    onChangeText={onChangeText}
                />
                <AppButton
                    text='Button'
                    disabled={true}
                    onPress={() => console.log('press AppText')}
                    style={{ backgroundColor: theme.color.blueSky }}
                    rightIcon={<Entypo name={'check'} size={18} color={true ? theme.color.grey2 : theme.color.green2} />}
                />
                <AppModal refModal={refModalDemo} children={<DemoModalContent idUser={idUser} />} onClose={() => setIdUser(undefined)} />
                <FlatList
                    keyExtractor={(item: PersonModel, index: number) => item.id.toString()}
                    data={personReducer.data}
                    refreshing={personReducer.isFetching}
                    renderItem={renderListUserData}
                    onRefresh={onRefresh}
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0.5}
                />
                <AppButton
                    text={getString('logOut')}
                    onPress={onLogout}
                />
            </SafeAreaView>
        </Host>
    );
};

const styles = StyleSheet.create({
    viewItem: {
        backgroundColor: 'white',
        padding: theme.dimensions.p8,
        borderBottomWidth: 1,
    }
});

export default TutorialHomeScreen;