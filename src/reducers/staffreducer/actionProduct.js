const work = 0;

var reducer = (state = work, action) => {
    switch(action.type) {
        case "add" : {
            return 0;
        }
        case "update" : {
            return 1;
        }
        default: return state;
    }
}

export default reducer