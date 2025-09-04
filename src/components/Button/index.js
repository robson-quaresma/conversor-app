import { Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'


export function Button({variant='primary', onPress, currency}) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[
                styles.button,
                variant === 'primary' ? styles.buttoPrimary : styles.buttonSecondary
            ]}
        >
            <Text style={styles.buttonText}>
                {currency.code}
            </Text>
        </TouchableOpacity>
    )
}