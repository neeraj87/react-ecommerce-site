import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import {
    Products,
    NavBar,
    Cart,
    Checkout
} from './components';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [ products, setProducts ] = useState([]);
    const [cart, setCart] = useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const addToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        setCart(response.cart);
    };

    const updateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, {quantity: quantity});
        setCart(response.cart);
    };

    const removeFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);
        setCart(response.cart);
    }

    const emptyCart = async () => {
        const response = await commerce.cart.empty();
        setCart(response.cart);
    }

    //useEffect hook to call the fetchProducts function
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <NavBar itemsInCart={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={addToCart}/>
                    </Route>

                    <Route exact path="/cart">
                        <Cart 
                            cart={cart} 
                            updateCartQty={updateCartQty} 
                            removeFromCart={removeFromCart} 
                            emptyCart={emptyCart}
                        />
                    </Route>

                    <Route exact path="/checkout">
                        <Checkout/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
