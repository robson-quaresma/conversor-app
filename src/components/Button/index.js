import { Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'


export function Button({variant='primary', title='Testando', onPress}) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[
                styles.button,
                variant === 'primary' ? styles.buttoPrimary : styles.buttonSecondary
            ]}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}