import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { server } from "../app/constants";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51OpjH7SDc5faNaMa9ZAIGAZ7lYBsNHpvltOaJqB4qTz8wm74orVCiGlH8LvdreKY8xN8hXawKY6PssB4xbLEgOoj00c0Vb6KsX").catch(error=> console.error('failed to load stripe.js',error)) ;

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(state=>state.order.currentOrder);
  useEffect(() => { 
    // Create PaymentIntent as soon as the page loads
    fetch(`${server}/create-payment-intent`, {
      credentials:"include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      body:JSON.stringify(currentOrder),
     
    })
      .then((res) => res.json())
      // .catch(error=>{
      //   console.log("this is error from frontend:",error)
      // })
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
 
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}