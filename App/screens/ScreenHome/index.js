// @flow

import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator, Platform } from 'react-native'
import Button from 'react-native-buttonex'
import { connect } from 'react-redux'
import tinycolor from 'tinycolor2'

import COLOR from '../../config/color';
import AppNavigator, { AppNavigatorUtils } from '../../routes/AppNavigator'
import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { fetchWeekUsers } from '../../store/session'

import ScoreItem from './ScoreItem'
import WeekForm from './WeekForm'
import Gap from '../../components/Gap'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { User, UserId } from '../../store/session'
import type { Shape as AppShape } from '../../store'

type OwnProps = {|
    navigation:{|
        addListener: () => void
    |}
|}

type Props = {|
    ...OwnProps,
    // connected
    dispatch: Dispatch,
    sessionUserId: UserId
|}

type State = {|
    isFetching: boolean,
    error?: string,
    users?: User[]
|}

function extractUserId(item: User, index: number) {
    return item.id.toString();
}

class ScreenHomeDumb extends Component<Props, State> {
    static navigationOptions = {
        title: 'Trusted Score'
    }

    state = {
        isFetching: true,
        users: undefined
    }

    lastIndex: number = -1

    didFocusListener = this.props.navigation.addListener('didFocus', () => {
        this.didFocusListener.remove();
        LoginNavigatorUtils.getNavigation().popToTop();
        delete this.didFocusListener;
    })

    componentDidMount() {
        this.fetchWeek();
    }

    render() {
        const { sessionUserId } = this.props;
        const { isFetching, error, users } = this.state;

        const data = (users || []).filter(user => user.id !== sessionUserId);

        let emptyComponent;
        if (!data.length) {
            emptyComponent = (
                <View style={styles.empty}>
                    { isFetching && <ActivityIndicator size="large" /> }
                    {/* error is always undefined when isFetching is true, so no need for isFetching && */}
                    { !!error && <Text>{error}</Text> }
                    { !isFetching && !!users && users.length === 1 && <Text>Only you have submitted a score so far this week.</Text> }
                    { !isFetching && !!users && !users.length && <Text>No one has submitted a score this week yet.</Text> }
                    { !isFetching &&
                        <View style={styles.refreshButtonWrap}>
                            <Button title="Refresh" onPress={this.fetchWeek} bordered={Platform.OS !== 'ios'} />
                        </View>
                    }
                </View>
            )
        }

        this.lastIndex = data.length - 1;

        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <FlatList style={styles.list} ListHeaderComponent={WeekForm} data={data} renderItem={this.renderItem} keyExtractor={extractUserId} />
                    { emptyComponent }
                </View>
            // </ScrollView>
        )
    }

    gotoProfile = (id?: UserId) => AppNavigatorUtils.getNavigation().navigate({ routeName:'profile', key:id, params:{ id } })
    gotoYourProfile = () => this.gotoProfile()

    handleScoreItemPress = ({ userId }, kind) => this.gotoProfile(userId)

    fetchWeek = async () => {
        const { dispatch } = this.props;

        this.setState(() => ({ isFetching:true, error:undefined }));

        let users;
        try {
            users = await dispatch(fetchWeekUsers()).promise;
        } catch (error) {
            if (typeof error === 'string') {
                if (this.state.users == false) {
                    this.setState(() => ({ error }))
                } else {
                    alert(error);
                }
                return;
            } else {
                throw error;
            }
        }

        this.setState(() => ({ isFetching:false, users }))
    }

    renderItem = ({ item:user, index }) => <ScoreItem name={user.name} {...user.score} pressPayload={{ userId:user.id }} onPress={this.handleScoreItemPress} dividerTop={index === 0} dividerBottom={index === this.lastIndex} />
}

const ScreenHomeConnected = connect(
    function({session:{user:{ id }}}: AppShape) {
        return {
            sessionUserId: id
        }
    }
)

const ScreenHome = ScreenHomeConnected(ScreenHomeDumb)

export default ScreenHome
