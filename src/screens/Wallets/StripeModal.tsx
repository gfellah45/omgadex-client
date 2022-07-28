import React from "react";
import NextHead from "next/head";
import { useForm } from "react-hook-form";
import Close from "../../assets/svg/Close";
import { useAppDispatch } from "../../hooks/useStoreHooks";
import { hideModal } from "../../reducers/ui";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements, ElementsConsumer } from "@stripe/react-stripe-js";

function StripeModal() {
  const stripe = useStripe();
  const elements = useElements();
  const { register, watch, reset } = useForm();

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <div className="w-full relative">
            <div
              onClick={() => {
                dispatch(hideModal());
              }}
              className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-0"
            >
              <Close />
            </div>
            <h1 className="text-center w-8/12 mx-auto font-semibold">Transfer money via stripe</h1>
            <form className="my-4" onSubmit={(e) => handleSubmit(e)}>
              <div className="mt-10">
                <CardElement />
              </div>
              <div>
                <button disabled={!stripe || !elements} className="stripePaymentBtn">
                  Pay now
                </button>
              </div>
            </form>
          </div>
        )}
      </ElementsConsumer>
    </>
  );
}

export default StripeModal;
