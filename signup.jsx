import React, { Component } from 'react';
import { View, ImageBackground, Alert, StyleSheet, Text } from 'react-native';
import { Button, Input, Icon } from '@rneui/base';

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            pass: "",
            rpass: "",
            error: "",
            succe: ""
        }
    }

    webroot = "https://appiclass.000webhostapp.com/";

    signup = () => {
        this.setState({error: ""});
        this.setState({succe: ""});

        let creds = {user: this.state.user, pass: this.state.pass, rpass: this.state.rpass};

        if(creds.user === "" || creds.pass === "" || creds.rpass === ""){
            this.setState({error: "Se requieren todos los campos!"});
            return;
        }

        if(creds.pass !== creds.rpass){
            this.setState({error: "Las Contraseñas no son iguales!"});
            return;
        }

        const {navigation} = this.props;
        fetch(this.webroot + "signup.php/",  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds),
          })
        .then(response => {
            if(response.ok){
                // Convertir la respuesta JSON en un objeto JavaScript
                return response.json();
            }
        })
        .then(data => {
            if(data.st === "si"){
                this.setState({succe: data.message + "\Cuenta creada con exito..."});
                this.setState({user: "", pass: "", rpass: ""});
            }else{
                this.setState({error: data.message});
            }
        })
        .catch(error => {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            console.error('Error:', error);
        });
    }

    goLogin = () => {
        this.setState({error: ""});
        const {navigation} = this.props;

        navigation.navigate("Login");
    }

  render() {
    return (
      <View>
        <View>
                <ImageBackground source={require('./imagenes/fondo2.jpg')} style={{width: 600, height: 1000}}>
                    <Text style={{position: "absolute", fontSize: 60, fontWeight: 500, color: "white", left: 90, top: 100}}>
                        SING UP
                    </Text>
                    <View style={{position: "absolute", bottom: 400, left: 80}}>
                    <Button
                        title="CREATE ACCOUNT"
                        icon={{
                            name: "user-plus",
                            type: "font-awesome",
                            size: 15,
                            color: "white"
                        }}
                        iconRight
                        iconContainerStyle={{marginLeft: 10}}
                        titleStyle={{fontWeight: "700"}}
                        buttonStyle={{
                            backgroundColor: "rgba(150,0,200,1)",
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 30
                        }}
                        containerStyle={{
                            width: 300,
                            marginHorizontal: -10,
                            marginVertical: 10
                        }}
                        onPress={this.signup}
                    ></Button>
                    <Button
                        title="RETURN"
                        icon={{
                            name: 'user',
                            type: 'font-awesome',
                            size: 25,
                            color: 'white',
                        }}
                        iconRight
                        iconContainerStyle={{marginLeft: 10}}
                        titleStyle={{fontWeight: "700", color: "black",marginLeft:20}}
                        buttonStyle={{
                            backgroundColor: "white",
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 30
                        }}
                        containerStyle={{
                            width: 300,
                            marginHorizontal: -10,
                            marginVertical: 10
                        }}
                        onPress={this.goLogin}
                        />
                    </View>
                    <View style={{width: 400, left: 30, top: 200}}>
                        <Input
                            placeholder='USER'
                            onChangeText={user => this.setState({user: user})}
                            placeholderTextColor="white"
                            leftIcon={{ type: 'font-awesome', name: 'user', color: "yellow" }} // Cambia el color del icono y el texto a blanco
                            inputStyle={{ color: "white" }} // Cambia el color del texto a blanco
                            containerStyle={styles.inputContainer}
                        />
                        <Input
                            secureTextEntry={true}
                            placeholder='PASSWORD'
                            onChangeText={pass => this.setState({pass: pass})}
                            placeholderTextColor="white"
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: "yellow" }} // Cambia el color del icono y el texto a blanco
                            inputStyle={{ color: "white" }} // Cambia el color del texto a blanco
                            containerStyle={styles.inputContainer}
                        />
                        <Input
                            secureTextEntry={true}
                            placeholder='REPEAT PASSWORD'
                            onChangeText={pass => this.setState({rpass: pass})}
                            placeholderTextColor="white"
                            leftIcon={{ type: 'font-awesome', name: 'repeat', color: "yellow" }} // Cambia el color del icono y el texto a blanco
                            inputStyle={{ color: "white",width:'200px' }} // Cambia el color del texto a blanco
                            containerStyle={styles.inputContainer}
                        />
                        <Text style={{color: "red", textAlign: "center", fontSize: 20, fontWeight: "500"}}>
                            {this.state.error}
                        </Text>
                        <Text style={{color: "green", textAlign: "center", fontSize: 20, fontWeight: "500"}}>
                            {this.state.succe}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    buttonContainer: {
      flex: 1,
      marginHorizontal: 10,
    },
    buttonTitle: {
      fontWeight: '700',
    },
    loginButton: {
      backgroundColor: 'rgba(90, 154, 230, 1)',
      borderRadius: 30,
    },
    signupButton: {
      backgroundColor: 'rgba(42, 86, 150, 1)',
      borderRadius: 30,
    },
    formContainer: {
      width: '80%',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: 20,
      borderRadius: 10,
    },
    inputContainer: {
      marginBottom: 20,
    },
    submitButtonContainer: {
      marginTop: 20,
    },
    submitButton: {
      backgroundColor: 'red',
      borderRadius: 30,
    },
  });
  