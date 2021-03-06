import React from 'react';
import {View, Text} from 'react-native';
import {FormInput, FormLabel, Button} from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-reactnative-otpapp.cloudfunctions.net';

export default class SignInForm extends React.Component {
    state = { phone: '', code: ''};

    handleSubmit = async () => {
        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOTP`,{
                phone: this.state.phone,
                code: this.state.code
            });

            firebase.auth().signInAndRetrieveDataWithCustomToken(data.token);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View>
				<View style={{ marginBottom: 10}}>
					<FormLabel>Enter Phone Number</FormLabel>
					<FormInput 
						value={this.state.phone}
						onChangeText={phone => this.setState({phone})}
					/>
				</View>

                <View style={{ marginBottom: 10}}>
					<FormLabel>Enter Code</FormLabel>
					<FormInput 
						value={this.state.code}
						onChangeText={code => this.setState({code})}
					/>
				</View>

				<Button title="Submit" 
					onPress={this.handleSubmit}
				/>
			</View>
        );
    }
}