import React, { forwardRef } from 'react';
import { TextInputMask } from 'react-native-masked-text';

const MaskedInputCNPJ = forwardRef(({ value, onChangeText }, ref) => {
  return (
    <TextInputMask
      type={'cnpj'}
      value={value}
      onChangeText={onChangeText}
      placeholder="00.000.000/0000-00"
      keyboardType="numeric"
      returnKeyType="done"
      ref={ref}
      style={{
        borderBottomWidth: 1,
        marginBottom: 15,
        fontSize: 16,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
      }}
    />
  );
});

export default MaskedInputCNPJ; // ✅ obrigatório!
