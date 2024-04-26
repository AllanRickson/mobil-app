import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component} from 'react'
import { Button } from '@rneui/base';
import MenuDrawer from 'react-native-side-drawer';
import { StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Video from 'react-native-video';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            drawer: false,
            window: 1
        }
    }
    componentDidMount(){
        TrackPlayer.setupPlayer().then(() => {console.log("Reproductor configurado exitosamente");}).catch((error) => {});
        const tracks = [
            {
                id: "track",
                url: "https://appcuceixd.000webhostapp.com/BBBB.mp3",
                title: "ANIME",
                artist: "SMN",
                artwork: "http://waffle.10x.mx/Imagenes/1234.png"
            },
        ]

        TrackPlayer.add(tracks);
    }

    componentWillUnmount(){
        TrackPlayer.stop();
    }

    toggleDrawer = () => {
        this.setState((prevState) => ({
            drawer: !prevState.drawer
        }));
    }

    YourDrawerContentComponent = () => {
        const {route} = this.props;
        return (
            <View style={{backgroundColor: "black", width: 200,left:-10,  height: "100%",zIndex:-1}}>
                <Text style={{color: "white", fontSize: 30, margin: 20, zIndex: 5, textAlign: "center"}}>
                    Bienvenido {route.params.username}!
                </Text>
                <Button
                    title="Cerrar"
                    icon={{
                        name: "times",
                        type: "font-awesome",
                        size: 15,
                        color: "black"
                    }}
                    iconRight
                    iconContainerStyle={{marginLeft: 10}}
                    titleStyle={{fontWeight: "700", color: "black"}}
                    buttonStyle={{
                        margin: 0,
                        backgroundColor: "white",
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 10,
                        width: 100,
                        height: 50,
                        zIndex: 10
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={this.toggleDrawer}
                ></Button>
            </View>
        );
    }
  
    logout = () => {
        const {navigation} = this.props;

        navigation.navigate("Login");
    }

    render() {
        const videoStyle = {
            height: "100%",
            width:'100%',
          };
        
        const viewStyle = {
            display:'flex', 
            alignItems:'center',
            justifyContent:'center', 
            height: "81.5%", 
            width:'100%', 
            };
        return (
            <MenuDrawer  open={this.state.drawer} onChange={open => this.setState({drawer: open})} 
                drawerContent={this.YourDrawerContentComponent()} // Reemplaza YourDrawerContentComponent con el contenido real del cajÃ³n
                drawerPercentage={45}
                animationTime={250}
                style={{backgroundColor: "red"}}
            >
                <View style= {{display:'flex',flexDirection:'column', width:"100%", height:"100%", backgroundColor:'black'}}>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'100%', height:100, backgroundColor: "#011657"}}>
                            <View style={{width: 50, height: 50,}}>
                                <Button title=""
                                    icon={{ name: "bars", type: "font-awesome", size: 15, color: "black"}}
                                    titleStyle={{fontWeight: "700"}}
                                    buttonStyle={{backgroundColor: "white",borderRadius: 10, width: 50, height: 50,}}
                                    onPress={this.toggleDrawer}
                                ></Button>
                            </View>
                            <Text style={{color: "gold", fontWeight:'800',fontSize: 30, textAlign: "center"}}>
                                LEAGUE OF LEGENDS
                            </Text>
                            <View style={{width: 50, height: 50,}}>
                            <Button buttonStyle={{backgroundColor: "white", borderRadius: 10, width: 50, height: 50,}}
                                title=""icon={{ name: "sign-out", type: "font-awesome",size: 15, color: "black"}}
                                titleStyle={{fontWeight: "700"}}
                                onPress={this.logout}
                            ></Button>
                        </View>
                        </View>


                        
                        {/* VIDEO */}

                        {this.state.window === 1 ? 
                            <View style= {{position:'relative'}}>
                                <Image source={require('./imagenes/lol.jpeg')} style={{width: 400, height: 500, left: 10, top: 70, marginBottom:20}}></Image>
                                <Text style={{left: 0,width:410, textAlign:'center', top: 60, fontSize: 30, color: "gold", backgroundColor:'#011657',fontWeight: "900"}}>LEAGUE OF LENGENDS</Text>
                            </View>
                        
                        : null}
                            {this.state.window === 2 ? 
                                <View style={styles.audioControls}>
                                    <TouchableOpacity  onPress={() => {TrackPlayer.play(); console.log("Play!"); this.setState({songMessage: "La cancion se esta reproduciendo!"})}} style={styles.controlButton}>
                                        <Text style={styles.controlButtonText}>PLAY</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {TrackPlayer.pause(); this.setState({songMessage: "Cancion en pausa"})}} style={styles.controlButton}>
                                        <Text style={styles.controlButtonText}>PAUSE</Text>
                                    </TouchableOpacity>
                                    <Text style={{textAlign: "center", fontSize:20, color: "white"}}>
                                        {this.state.songMessage}
                                    </Text>
                                </View>            
                            
                            : null}
                            
                            {this.state.window === 3 ? 
                            
                                <View style={viewStyle}>
                                    <Video source={{ uri: 'https://appcuceixd.000webhostapp.com/PARANOIA.mp4', }}
                                    style={videoStyle}
                                    controls={true}
                                    resizeMode="cover"
                                    hideShutterView={false}
                                    paused={false}
                                    />
                                </View>
                            
                            : null}

                        {/* VIDEO */}

                        <View style={{display:'flex',position:'absolute', bottom:0, justifyContent:'center',width:420,height:60, alignContent:'center', flexDirection: 'row', backgroundColor: "#011657",zIndex:40,}}>
                        <Button buttonStyle={{display:'flex',alignContent:'center',justifyContent:'center', width: 130, backgroundColor: this.state.window === 1 ? "gold" : "grey", borderRadius: 50,height:'100%' }} 
                            title=""icon={{
                                    name: "image",
                                    type: "font-awesome",
                                    size: 15,
                                    color: "black"
                                }}
                                iconRight
                                iconContainerStyle={{}}
                                titleStyle={{fontWeight: "700"}}

                                containerStyle={{
                                    marginVertical: 10
                                }}
                                onPress={() => {this.setState({window: 1})}}
                            ></Button>
                        <Button buttonStyle={{display:'flex', alignContent:'center',justifyContent:'center', width: 130,backgroundColor: this.state.window === 2 ? "gold" : "grey", borderRadius: 50,height:'100%' }} 
                                title=""
                                icon={{
                                    name: "music",
                                    type: "font-awesome",
                                    size: 15,
                                    color: "black"
                                }}
                                iconRight
                                iconContainerStyle={{marginLeft: 10}}
                                titleStyle={{fontWeight: "700"}}

                                containerStyle={{
                                    marginVertical: 10,
                                }}
                                onPress={() => {this.setState({window: 2})}}
                            ></Button>
                        <Button buttonStyle={{display:'flex',alignContent:'center',justifyContent:'center', width: 130,backgroundColor: this.state.window === 3 ? "gold" : "grey", borderRadius: 50,height:'100%' }} 
                                title=""
                                icon={{
                                    name: "play",
                                    type: "font-awesome",
                                    size: 15,
                                    color: "black"
                                }}
                                iconRight
                                iconContainerStyle={{marginLeft: 10}}
                                titleStyle={{fontWeight: "700"}}
                                containerStyle={{
                                    marginVertical: 10,
                                }}
                                onPress={() => {this.setState({window: 3})}}
                            ></Button>
                        </View>
                </View>
            </MenuDrawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      zIndex: 0
    },
    animatedBox: {
      flex: 1,
      backgroundColor: "#38C8EC",
      padding: 10
    },
    body: {
      backgroundColor: '#F04812'
    },

    containerV: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    video: {
    width: '100%',
    height: 300,
    },
    audioControls: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height:'82%',
      },
        controlButton: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        margin:10,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        height: 60,
      },
      controlButtonText: {
        color: 'black',
        fontSize: 20,
    },
  })