import React from 'react';
import Colors from "../constants/Colors";
import {FlatList} from 'react-native'
import {Header, Icon, Input, Item, View} from 'native-base';
import {TV_MAZE_URL} from "../constants/Config";
import FavoriteItem from "../components/FavoriteItem";

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Search'
    };
    state = {
        query: '',
        items: [],
        loading: false
    };
    timeout = 0;

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return <View style={styles.container}>
            <Header searchBar style={{
                // paddingTop: 0,
                borderBottomColor: Colors.white(1),
                backgroundColor: Colors.white(1),
                shadowColor: Colors.primary(1),
                shadowOffset: {
                    x: 3,
                    y: 0
                },
                shadowRadius: 5,
                shadowOpacity: 0.1
            }}>
                <Item style={{backgroundColor: Colors.white(1)}}>
                    <Icon name="ios-search" style={{backgroundColor: Colors.white(1), borderBottomWidth: 0}}/>
                    <Input placeholder="Search" style={{backgroundColor: Colors.white(1)}} value={this.state.query}
                           onChange={this.setSearchText.bind(this)}/>
                    {/*<Icon name="ios-people" />*/}
                </Item>
            </Header>

            <FlatList
                vertical
                data={this.state.items}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <FavoriteItem item={item} onClicked={() => this.props.navigation.navigate('Overview', {show: item})}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>;
    }

    setSearchText(event) {
        let query = event.nativeEvent.text;
        this.setState({query, loading: true});
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            fetch(`${TV_MAZE_URL}/search/shows?q=${this.state.query}`, {
                method: 'GET',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    res.json().then((json) => {
                        this.setState({items: json.map(j => j.show), loading: false});
                    });
                })
                .catch(err => {
                    console.log('there was an error 1', err);
                    this.setState({
                        loading: false
                    });
                });
        }, 300);
    }
}

export const styles = {
    container: {
        flex: 1,
        backgroundColor: Colors.white(1)
    }
};


{/*<Header searchBar rounded>*/
}
{/*<Item>*/
}
{/*<Icon name="ios-search" />*/
}
{/*<Input placeholder="Search" />*/
}
{/*<Icon name="ios-people" />*/
}
{/*</Item>*/
}
{/*<Button transparent>*/
}
{/*<Text>Search</Text>*/
}
{/*</Button>*/
}
{/*</Header>*/
}