import React, { Component } from 'react';
import { View, ImageBackground, Alert, StyleSheet, Text } from 'react-native';
import { Button, Input, Icon } from '@rneui/base';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            pass: "",
            error: ""
        }
    }

    webroot = "https://appiclass.000webhostapp.com/";

    login = () => {

        this.setState({error: ""});

        if(this.state.user === "" || this.state.pass === ""){
            this.setState({error: "Todos los campos deben ser llenados!"});
            return;
        }

        let creds = {user: this.state.user, pass: this.state.pass};
        console.log(creds);
        const {navigation} = this.props;
        if(creds.user === "Allan Rick" && creds.pass === "contiman"){
            navigation.navigate("Dashboard", {username: creds.user});
        }else{
            this.setState({error: "Credenciales Incorrectas!"});
        }
        fetch(this.webroot + "login.php/",  {
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
            if(data.message === "si"){
                navigation.navigate("Dashboard", {username: creds.user});
            }else{
                this.setState({error: "Credenciales Incorrectas!"});
            }
        })
        .catch(error => {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            console.error('Error:', error);
        });
    }

    goSignUp = () => {
        this.setState({error: ""});
        const {navigation} = this.props;

        navigation.navigate("Signup");
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('./imagenes/fondo1.jpg')} style={{width: 600, height: 1000}}>
                    <Text style={{position: "absolute", fontSize: 50, textAlign:'center', fontWeight: 500, color: "white", left: 24, top: 100}}>
                        INICIAR SESION
                    </Text>
                    <View style={{position: "absolute", bottom: 400, left: 80}}>
                    <Button
                        title="LOG IN"
                        icon={{
                            name: "user",
                            type: "font-awesome",
                            size: 15,
                            color: "white"
                        }}
                        iconRight
                        iconContainerStyle={{marginLeft: 10}}
                        titleStyle={{fontWeight: "700"}}
                        buttonStyle={{
                            backgroundColor: "rgba(200,0,100,1)",
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 30
                        }}
                        containerStyle={{
                            width: 300,
                            marginHorizontal:-10,
                            marginVertical: 10
                        }}
                        onPress={this.login}
                    ></Button>
                    <Button
                        title="NEW ACCOUNT"
                        icon={{
                            name: 'smile',
                            type: 'font-awesome',
                            size: 25,
                            color: "black",
                        }}
                        iconRight
                        iconContainerStyle={{marginLeft: 10}}
                        titleStyle={{fontWeight: "700", color: "white"}}
                        buttonStyle={{
                            backgroundColor: "black",
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 300,
                            marginHorizontal:-10,
                            marginVertical: 10,
                        }}
                        onPress={this.goSignUp}
                        />
                    </View>
                    <View style={{width: 400, left: 30, top: 300}}>
                        <Input
                            placeholder='USER'
                            onChangeText={user => this.setState({user: user})}
                            placeholderTextColor="white"
                            leftIcon={{ type: 'font-awesome', name: 'user', color: "white" }} // Cambia el color del icono y el texto a blanco
                            inputStyle={{ color: "white" }} // Cambia el color del texto a blanco
                            containerStyle={styles.inputContainer}
                        />
                        <Input
                            secureTextEntry={true}
                            placeholder='PASSWORD'
                            onChangeText={pass => this.setState({pass: pass})}
                            placeholderTextColor="white"
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: "white" }} // Cambia el color del icono y el texto a blanco
                            inputStyle={{ color: "white" }} // Cambia el color del texto a blanco
                            containerStyle={styles.inputContainer}
                        />
                        <Text style={{color: "red", textAlign: "center", fontSize: 20, fontWeight: "500"}}>
                            {this.state.error}
                        </Text>
                    </View>
                </ImageBackground>
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
  