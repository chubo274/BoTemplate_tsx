import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IDictionary, IReducer } from "src/data/interfaces/common";
import { IGetSectionRequest } from "src/data/interfaces/request/home/IGetSectionRequest";
import { PersonModel } from "src/data/models/PersonModel";
import { getSectionRequest } from "src/modules/redux/actions/tutorialAction/home";
import { RootState } from "src/modules/redux/reducers";
import theme from "src/shared/theme";
import { AppText } from "../appText";

interface IDemoModalContent {
    idUser?: number;
}

export const DemoModalContent = (props: IDemoModalContent) => {
    const dispatch = useDispatch();
    const { idUser } = props;
    const friendReducer: IReducer<IDictionary<PersonModel[]>> = useSelector((state: RootState) => state.homeReducer.friendReducer);
    const data = friendReducer?.data?.[idUser?.toString()!];
    const requestSection: IGetSectionRequest = {
        page: 1,
        pageSize: 3,
    }

    const onRefresh = () => {

    }

    const onLoadMore = () => {

    }

    useEffect(() => {
        dispatch(getSectionRequest({ ...requestSection, sectionId: idUser }));
    }, []);

    const renderListUserData = ({ item, index }: { item: PersonModel, index: number }) => {
        return <View style={styles.viewItem}>
            <AppText children={item.name} />
        </View>
    }

    if (!data) return null;

    return <FlatList
        keyExtractor={(item: PersonModel, index: number) => item.id.toString()}
        data={data}
        ListHeaderComponent={<View />}
        ListFooterComponent={<View />}
        contentContainerStyle={styles.container}
        refreshing={friendReducer.isFetching}
        renderItem={renderListUserData}
        onRefresh={onRefresh}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
    />
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
    },
    viewItem: {
        backgroundColor: 'white',
        padding: theme.dimensions.p8,
        borderBottomWidth: 1,
    }
});