import moment from "moment";

const expenses = [{
    id: "1",
    description: "Electricity Bills",
    note: "electric",
    amount: 9,
    createdAt: 0
}, {
    id: "2",
    description: "Coffee",
    note: "coffee",
    amount: 10,
    createdAt: moment(0).subtract(4, "days").valueOf()
}, {
    id: "3",
    description: "Tea",
    note: "tea",
    amount: 80,
    createdAt: moment(0).add(4, "days").valueOf()
}, {
    id: "4",
    description: "Rent",
    note: "rent",
    amount: 70,
    createdAt: moment(0).add(200, "days").valueOf()
}];

export default expenses;