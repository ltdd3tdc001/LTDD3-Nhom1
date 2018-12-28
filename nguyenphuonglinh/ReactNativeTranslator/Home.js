import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';

import AutoExpandingInput from './app/com/AutoExpandingInput';
import APINetDataCom from './app/com/APINetDataCom';
import NetDataCom from './app/com/NetDataCom';
import LocalDataCom from './app/com/LocalDataCom';
import TranslucentModal from './app/com/TranslucentModal';
import MultiSelector from './app/com/MultiSelector';

import language from './app/lib/language';
import startwith from './app/lib/dictionary';
import google from './app/lib/google';
import common from './app/lib/common-result';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            querytext: "",
            showTemp: false,
            localres: [],
            netres: [],
            clickData: "",
            googleData: null,
            commonData: null,
            from: 'auto',
            to: 'zh',
            modalVisible: false,
            useGoogle: true,
        };
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    // return a list contains selected engines
    getSelectedEngine = () => ['useGoogle'].filter(value => this.state[value])

    onSelectEngine = (status) => {
        this.setState(status);
        this.setModalVisible(false);
    }

    getPressData = (newData) => {

        if (this.state.from == this.state.to) {
            alert('The two languages are the same');
            return;
        }

        this.setState({
            querytext: newData,
            googleData:null,
            commonData:null,
        });

        common(newData, this.state.from, this.state.to).then(result => {
            this.setState({
                commonData: result,
                showTemp: true,
            })
        });


        if (this.state.useGoogle)
            google(newData, this.state.from, this.state.to).then(result => {
                this.setState({
                    googleData: result,
                    showTemp: true,
                })
            });
    }

    _onChangeText = (text) => {
        this.setState({
            showTemp: false,
            localres: startwith(text),
            querytext: text,
        })
    }

    _findText = () => {
        var tempData = this.state.querytext;
        this.getPressData(tempData);
    }

    render() {
        return (
            <View>
                <ScrollView>

                    <View style={{ flexDirection: 'row' }}>
                        <ModalDropdown style={styles.dropdown}
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            options={language.from}
                            defaultValue={'From'}
                            defaultIndex={1}
                            onSelect={(idx, value) => this.setState({ from: idx })}
                        />

                        <TouchableHighlight style={styles.btn} onPress={() => this.setModalVisible(true)}>
                            <Text>
                                Interface
                            </Text>
                        </TouchableHighlight>

                        <ModalDropdown style={styles.dropdown}
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            options={language.to}
                            defaultValue={'To'}
                            defaultIndex={1}
                            onSelect={(idx, value) => this.setState({ to: idx })}
                        />
                    </View>

                    <View style={styles.container}>
                        <AutoExpandingInput onChangeText={this._onChangeText}
                            queryValue={this.state.querytext}
                            style={{ flex: 1 }}
                        />
                        {this.state.querytext == "" ? <Text /> :
                            <TouchableHighlight underlayColor='white' onPress={this._findText}>
                                <Image
                                    source={require('./app/res/search.png')}
                                    style={{ width: 50, height: 50, marginRight: 10 }}
                                />
                            </TouchableHighlight>
                        }
                    </View>

                    {this.state.showTemp ?
                        <NetDataCom
                            googleData={this.state.googleData}
                            commonData={this.state.commonData}
                        /> : <LocalDataCom
                            localData={this.state.localres}
                            onPressData={this.getPressData}
                        />}

                        {/* luu tu vung */}
                  
                   
                </ScrollView>

                <TranslucentModal visible={this.state.modalVisible}>
                    <View style={{ flex: 6 }}></View>

                    <MultiSelector
                        
                        defaultSelected={this.getSelectedEngine()}
                        onDone={this.onSelectEngine}
                        flex={4}
                    />
                </TranslucentModal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        alignItems: 'center'
    },
    btn: {
        flex: 1,
        width: 100,
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FF5622',
    },
    dropdown: {
        flex: 1,
        width: 100,
        margin: 12,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
    },

    dropdown_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_dropdown: {
        width: 100,
        height: 300,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
});