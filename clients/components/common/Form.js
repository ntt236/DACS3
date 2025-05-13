import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const types = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
};

const CommonForm = ({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
}) => {
    const renderInputByComponent = (getControlItem) => {
        const value = formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
            case types.INPUT:
                return (
                    <TextInput
                        style={styles.input}
                        placeholder={getControlItem.placeholder}
                        value={value}
                        onChangeText={(text) =>
                            setFormData({ ...formData, [getControlItem.name]: text })
                        }
                    />
                );

            case types.TEXTAREA:
                return (
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder={getControlItem.placeholder}
                        value={value}
                        multiline
                        numberOfLines={4}
                        onChangeText={(text) =>
                            setFormData({ ...formData, [getControlItem.name]: text })
                        }
                    />
                );

            case types.SELECT:
                return (
                    <RNPickerSelect
                        onValueChange={(val) =>
                            setFormData({ ...formData, [getControlItem.name]: val })
                        }
                        value={value}
                        placeholder={{ label: getControlItem.label, value: null }}
                        items={
                            getControlItem.options?.map((optionItem) => ({
                                label: optionItem.label,
                                value: optionItem.id,
                            })) || []
                        }
                        style={pickerSelectStyles}
                    />
                );

            default:
                return (
                    <TextInput
                        style={styles.input}
                        placeholder={getControlItem.placeholder}
                        value={value}
                        onChangeText={(text) =>
                            setFormData({ ...formData, [getControlItem.name]: text })
                        }
                    />
                );
        }
    };

    return (
        <View style={styles.form}>
            {formControls.map((controlItem) => (
                <View key={controlItem.name} style={styles.formGroup}>
                    <Text style={styles.label}>{controlItem.label}</Text>
                    {renderInputByComponent(controlItem)}
                </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>{buttonText || 'Submit'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CommonForm;

const styles = StyleSheet.create({
    form: {
        padding: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        color: '#000',
        backgroundColor: '#fff',
        marginBottom: 10,

    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        color: '#000',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
});
