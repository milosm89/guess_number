import { Text, StyleSheet, Platform} from "react-native";

function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: Platform.OS === 'ios' ? 2 : 0,
        borderColor: 'white',
        padding: 12
    }
 });