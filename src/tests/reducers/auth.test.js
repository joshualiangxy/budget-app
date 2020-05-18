import authReducer from "../../reducers/auth";

test("Should return login state",
    () => {
        const uid = "123";
        expect(authReducer(undefined, {
            type: "LOGIN",
            uid
        })).toEqual({ uid });
    });

test("Should return logout state",
    () => {
        const initialState = { uid: "123" };
        expect(authReducer(initialState, { type: "LOGOUT" }))
            .toEqual({});
    });