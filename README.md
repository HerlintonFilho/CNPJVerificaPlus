# CNPJ Verifica+

Aplicativo mobile desenvolvido em **React Native** para a disciplina de Desenvolvimento Mobile, ministrada pelo professor **Douglas Lopes de Sousa Mendes**. O app tem como objetivo **consultar CNPJs** por meio da [API pública da ReceitaWS](https://receitaws.com.br/) e armazenar localmente os dados se o CNPJ estiver **ativo**.

## 📱 Funcionalidades

- Consulta de CNPJ via API.
- Exibição dos dados da empresa.
- Armazenamento local dos dados de CNPJs ativos.
- Interface simples e intuitiva.

## 🚀 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Axios](https://axios-http.com/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)

## 🛠️ Como executar o projeto

1. Clone o repositório
   git clone https://github.com/HerlintonFilho/CNPJVerificaPlus.git
   cd CNPJVerificaPlus
   
2. Instale as dependências:
   npm install

3. Inicie o projeto com o Expo:
   npx expo start

4. Escaneie o QR Code com o aplicativo do Expo Go no seu celular para testar.

📂 Estrutura de pastas
  📁 CNPJVerificaPlus
   ┣ 📁 assets
   ┣ 📁 components
   ┣ 📁 screens
   ┣ 📁 storage
   ┣ 📄 App.js
   ┗ 📄 package.json

📌 Observações
A API gratuita da ReceitaWS tem um limite de requisições por minuto. Evite fazer consultas em excesso para não ser bloqueado.

Os dados armazenados localmente são salvos apenas se o CNPJ estiver ativo.

📚 Licença
Este projeto é apenas para fins acadêmicos e não possui fins comerciais.
