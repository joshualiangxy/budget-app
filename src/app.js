import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter, sortByName, sortByAmount, sortByDate } from "./actions/filters";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

// store.dispatch(addExpense({ description: "Gas bill", amount: 500, createdAt: 40 }));
// store.dispatch(addExpense({ description: "Water bill", amount: 1000, createdAt: 80 }));
// store.dispatch(addExpense({ description: "Eletricity bill", amount: 1500, createdAt: 120 }));
// store.dispatch(sortByName());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));