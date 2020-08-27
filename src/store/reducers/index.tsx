
export default function (store = 0, action) {
    switch (action.type) {
        case 'add':
            return store + 1
        case 'min':
            return store - 1
        case 'async':
            return 22
        default:
            return store
    }
}