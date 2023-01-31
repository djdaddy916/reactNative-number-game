import { StyleSheet, Text, View } from "react-native-web";
import Colors from "../../constants/colors";

function Title({ children }) {
    return(
        <View>
            <Text style={styles.title}>
                {children}
            </Text>
        </View>
    );
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: Colors.accent500,
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12
    }
})