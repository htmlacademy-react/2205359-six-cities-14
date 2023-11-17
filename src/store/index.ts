import {configureStore} from '@reduxjs/toolkit';
import { reducer } from './reducer';

// Инициализируйте (например, в файле src/store/index.ts) новое хранилище
// с помощью функции configureStore из пакета @reduxjs/toolkit.
// Оберните основной компонент приложения (App) в <Provider> из пакета react-redux.
// Через props передайте ему ссылку на созданное хранилище.


// import reducer

export const store = configureStore({reducer});
