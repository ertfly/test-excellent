import { ACTION_PRODUCT_IMAGE_LIST } from "../actions/productImages";
import { ACTION_PRODUCT_STOCK_LIST } from "../actions/productStocks";
import { ACTION_PRODUCT_LIST, ACTION_PRODUCT_VIEW } from "../actions/products";

let initialReducer = {
    products: {
        list: {
            rows: [],
            total: 0,
            pagination: [],
        },
        view: {
            name: '',
            price: '',
        },
    },
    productStocks: {
        list: {
            rows: [],
            total: 0,
            pagination: [],
        },
    },
    productImages: {
        list: {
            rows: [],
            total: 0,
            pagination: [],
        },
    },
}

let ProductReducers = (state = initialReducer, action) => {
    switch (action.type) {
        case ACTION_PRODUCT_LIST.type:
            return {
                ...state,
                products: {
                    ...state.products,
                    list: {
                        rows: action.payload.rows,
                        total: action.payload.total,
                        pagination: action.payload.pagination
                    },
                }
            };
        case ACTION_PRODUCT_VIEW.type:
            return {
                ...state,
                products: {
                    ...state.products,
                    view: {
                        name: action.payload.name,
                        price: action.payload.price,
                    },
                },
            };
        case ACTION_PRODUCT_STOCK_LIST.type:
            return {
                ...state,
                productStocks: {
                    ...state.productStocks,
                    list: {
                        rows: action.payload.rows,
                        total: action.payload.total,
                        pagination: action.payload.pagination
                    },
                }
            };
        case ACTION_PRODUCT_IMAGE_LIST.type:
            return {
                ...state,
                productImages: {
                    ...state.productImages,
                    list: {
                        rows: action.payload.rows,
                        total: action.payload.total,
                        pagination: action.payload.pagination
                    },
                }
            };
        default:
            return state;
    }
}

export default ProductReducers