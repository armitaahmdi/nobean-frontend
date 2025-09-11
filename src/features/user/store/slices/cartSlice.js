import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ product, quantity = 1 }, { getState }) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const state = getState();
        const existingItem = state.cart.items.find(item => item.id === product.id);
        
        if (existingItem) {
            return {
                type: 'update',
                productId: product.id,
                quantity: existingItem.quantity + quantity
            };
        } else {
            return {
                type: 'add',
                product: {
                    ...product,
                    quantity,
                    addedAt: new Date().toISOString()
                }
            };
        }
    }
);

// Async thunk for adding to favorites
export const addToFavorites = createAsyncThunk(
    'cart/addToFavorites',
    async (product, { getState }) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const state = getState();
        const isAlreadyFavorite = state.cart.favorites.some(fav => fav.id === product.id);
        
        if (isAlreadyFavorite) {
            return { type: 'remove', productId: product.id };
        } else {
            return { type: 'add', product };
        }
    }
);

const initialState = {
    items: [],
    favorites: [],
    loading: false,
    error: null,
    isCartOpen: false,
    totalItems: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Increase quantity of an item
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find(item => item.id === productId);
            if (item) {
                item.quantity += 1;
                state.totalItems += 1;
                state.totalPrice += item.price;
            }
        },
        
        // Decrease quantity of an item
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalItems -= 1;
                state.totalPrice -= item.price;
            }
        },
        
        // Remove item from cart
        removeFromCart: (state, action) => {
            const productId = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === productId);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                state.totalItems -= item.quantity;
                state.totalPrice -= (item.price * item.quantity);
                state.items.splice(itemIndex, 1);
            }
        },
        
        // Clear entire cart
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
        
        // Toggle cart visibility
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        
        // Close cart
        closeCart: (state) => {
            state.isCartOpen = false;
        },
        
        // Remove from favorites
        removeFromFavorites: (state, action) => {
            const productId = action.payload;
            state.favorites = state.favorites.filter(fav => fav.id !== productId);
        },
        
        // Clear favorites
        clearFavorites: (state) => {
            state.favorites = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const { type, product, productId, quantity } = action.payload;
                
                if (type === 'add') {
                    state.items.push(product);
                    state.totalItems += product.quantity;
                    state.totalPrice += (product.price * product.quantity);
                } else if (type === 'update') {
                    const item = state.items.find(item => item.id === productId);
                    if (item) {
                        const quantityDifference = quantity - item.quantity;
                        item.quantity = quantity;
                        state.totalItems += quantityDifference;
                        state.totalPrice += (item.price * quantityDifference);
                    }
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            // Add to favorites
            .addCase(addToFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.loading = false;
                const { type, product, productId } = action.payload;
                
                if (type === 'add') {
                    state.favorites.push(product);
                } else if (type === 'remove') {
                    state.favorites = state.favorites.filter(fav => fav.id !== productId);
                }
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    toggleCart,
    closeCart,
    removeFromFavorites,
    clearFavorites
} = cartSlice.actions;

export default cartSlice.reducer;
