import React, { useMemo } from "react";
import NextHead from "next/head";
import { useForm } from "react-hook-form";
import Close from "../../assets/svg/Close";
import { useAppDispatch } from "../../hooks/useStoreHooks";
import { hideModal } from "../../reducers/ui";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements, ElementsConsumer } from "@stripe/react-stripe-js";
import Loader from "react-loader-spinner";
import { LoaderIcon } from "react-hot-toast";
import useResponsiveFontSize from "../../hooks/useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );
};

function StripeModal() {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const { register, watch, reset } = useForm();

  const dispatch = useAppDispatch();

  console.log(!stripe, !elements, "check these");

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    console.log("submitt", event);
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    //  const payload = await stripe.createPaymentMethod({
    //    type: "card",
    //    card: elements.getElement(CardElement),
    //  });
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    console.log(result, "the results");

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
        <ElementsConsumer>
          {({ stripe, elements }) => (
            // <form className="my-4" onSubmit={(e) => handleSubmit(e)}>
            //   <div className="mt-10">
            //     <CardElement
            //       options={options}
            //       onReady={() => {
            //         console.log("CardElement [ready]");
            //       }}
            //       onChange={(event) => {
            //         console.log("CardElement [change]", event);
            //       }}
            //       onBlur={() => {
            //         console.log("CardElement [blur]");
            //       }}
            //       onFocus={() => {
            //         console.log("CardElement [focus]");
            //       }}
            //     />
            //   </div>
            //   <div>
            //     <button disabled={!stripe || !elements} className="stripePaymentBtn">
            //       Pay now
            //     </button>
            //   </div>
            // </form>

            <form onSubmit={handleSubmit}>
              <label>
                Card details
                <CardElement
                  // options={options}
                  onReady={() => {
                    console.log("CardElement [ready]");
                  }}
                  onChange={(event) => {
                    console.log("CardElement [change]", event);
                  }}
                  onBlur={() => {
                    console.log("CardElement [blur]");
                  }}
                  onFocus={() => {
                    console.log("CardElement [focus]");
                  }}
                />
              </label>
              <button type="submit" disabled={!stripe}>
                Pay
              </button>
            </form>
          )}
        </ElementsConsumer>
      </div>
    </>
  );
}

export default StripeModal;
