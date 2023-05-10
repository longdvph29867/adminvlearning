export const ADMIN_USER_SIGNIN = 'ADMIN_USER_SIGNIN'
export const localService = {
    get: () => {
        let jsonData = localStorage.getItem(ADMIN_USER_SIGNIN);
        return JSON.parse(jsonData);
    },
    set: (data) => {
        let jsonData = JSON.stringify(data);
        localStorage.setItem(ADMIN_USER_SIGNIN, jsonData);
    },
    remove: () => {
        localStorage.removeItem(ADMIN_USER_SIGNIN);
    }
}