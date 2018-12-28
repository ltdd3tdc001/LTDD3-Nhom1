import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
export default class SanPham extends Component {
  constructor(props)  {
    super(props);
    this.state={
      soluong:0
    }
  }
  TangSL=()=>{
    //alert("tang");
    console.log("tang");
    this.setState({
      soluong:this.state.soluong+1
    })
  }
  GiamSL=()=>{    
    console.log("giam");
    this.setState({
      soluong:this.state.soluong-1
    })
  }
  render() {
    return (
      <View >
        <Text style={styles.sp} >   Mã sản phẩm: {this.props.masp}  </Text>       
        <Text style={styles.sp} >  Tên sản phẩm: {this.props.tensp}  </Text> 
        <TouchableOpacity onPress={()=>{this.TangSL()}}>  
        <Text style={styles.button} >  Tăng số lương  </Text>
        </TouchableOpacity>       
        <Text style={styles.sp} >   Số lương tồn: {this.state.soluong}  </Text>  
        <TouchableOpacity onPress={()=>{this.GiamSL()}}>
        <Text style={styles.button} >  giảm số lương  </Text>   
        </TouchableOpacity>       
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  sp: {    
    margin:5,   
    backgroundColor: '#80ff00',    
  },
  button: {    
    margin:5,   
    backgroundColor: '#0080ff',    
  },
  
});
