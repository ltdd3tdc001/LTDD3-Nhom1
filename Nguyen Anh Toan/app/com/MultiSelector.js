import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';

export default class MultiSelector extends Component {
    constructor(props) {
        super(props);
        props.defaultSelected = props.defaultSelected || []
        this.state = {
            status: {},
            buttonDisabled: props.defaultSelected.length === 0,
            buttonTitle: props.defaultSelected.length === 0 ? 'At least one' : 'Done'
        };
        // set all checkboxes' status false
        props.choice.forEach(item => { this.state.status[item[1]] = false; });
        // set those default selected boxes true
        props.defaultSelected.forEach(value => { this.state.status[value] = true; });
    }

    onSelect(item) {
        this.setState((prevState) => {
            // deep copy of prevState.status
            prevState.status = JSON.parse(JSON.stringify(prevState.status));
            prevState.status[item[1]] = !prevState.status[item[1]];

            // count how many boxes are selected
            let count = 0;
            for (let k in prevState.status) {
                count += prevState.status[k];
            }

            prevState.buttonDisabled = count === 0;
            prevState.buttonTitle = count === 0 ? 'At least one' : 'Done';

            return prevState;
        });
    }

    _renderItem = ({ item }) => (
        <CheckBox
            center
            title={item[0]}
            checked={this.state.status[item[1]]}
            onPress={() => this.onSelect(item)}
            onIconPress={() => this.onSelect(item)}
        />
    );

    render() {
        return (
            <View style={{ flex: this.props.flex, backgroundColor: 'white' }}>
                <View>
                    <FlatList
                        data={this.props.choice}
                        extraData={this.state.status}
                        keyExtractor={(item, index) => index}
                        renderItem={this._renderItem}
                    />
                </View>
                <Button
                    raised
                    disabled={this.state.buttonDisabled}
                    title={this.state.buttonTitle}
                    onPress={() => this.props.onDone(this.state.status)}
                    backgroundColor={'#4d90fe'}
                    icon={{ name: 'done-all' }}
                    fontSize={20}
                />
            </View>
        );
    }
}