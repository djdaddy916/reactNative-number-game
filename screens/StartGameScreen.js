import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState  } from "react";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";

function StartGameScreen({onPickedNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }
    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number', 
                'Number has to be between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        onPickedNumber(chosenNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Guess My Number</Text>
        
            <Card>
                <Text style={styles.instructionText}>
                    Enter a Number
                </Text>

                <TextInput 
                    style={styles.numberInput} 
                    maxLength={2} 
                    keyboardType="number-pad" 
                    autoCapitalize="none" 
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>

                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
                </Card>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    instructionText: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily: 'open-sans'
    },
    numberInput: {
        textAlign: 'center',
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    title: {
        fontSize: 24,
        color: Colors.accent500,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
        
    }
});