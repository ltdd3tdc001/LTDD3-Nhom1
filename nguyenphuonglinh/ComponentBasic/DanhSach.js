/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import SanPham from './SanPham';

export default class DanhSach extends Component {
  render() {
    return (
      <View >
 <SanPham masp="sp001" tensp="áo"></SanPham>

  <SanPham masp="sp002" tensp="quần"></SanPham>


      </View>
    );
  }
}

