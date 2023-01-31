import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
    const [userNumber, setUserNumber] = useState(null);
    const [gameIsOver, setGameIsOver] = useState(true);
    const [appIsReady, setAppIsReady] = useState(false);

    const customFonts = {
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    }

    useEffect(() => {
        async function prepare() {
            try {
                
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();

                await Font.loadAsync(customFonts);
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }
    function gameOverHandler() {
        setGameIsOver(true);
    }

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    }
    if (gameIsOver && userNumber)  {
        screen = <GameOverScreen />
    }

    return (
        <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
            <ImageBackground 
                source={require('./assets/images/background.png')} 
                resizeMode="cover" 
                style={styles.rootScreen} 
                imageStyle={styles.backgroundImage}
                onLayout={onLayoutRootView}
            >
                <SafeAreaView style={styles.rootScreen}>
                    {screen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.25
    }
});
