import React, { useState } from "react";

const Checkout = () => {
  const [Manager, setManager] = useState("XXXX XXXX");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [Amount, setAmount] = useState("$XX.XX");
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const formattedDateTime = currentDateTime.toLocaleString();

  const validateCreditCard = () => {
    const cardRegex = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    return cardRegex.test(cardNumber);
  };

  const validateExpiryDate = () => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    return expiryRegex.test(expiryDate);
  };

  const validateCvc = () => {
    const cvcRegex = /^[0-9]{3}$/;
    return cvcRegex.test(cvc);
  };

  const validateCardHolder = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(cardHolder);
  };

  const handlePlaceOrder = async () => {
    const errors = {};

    if (!validateCardHolder()) {
      errors.cardHolder = "Please enter a valid name.";
    }

    if (!validateCreditCard()) {
      errors.cardNumber = "Please enter a valid credit card number.";
    }

    if (!validateExpiryDate()) {
      errors.expiryDate = "Please enter a valid expiry date (MM/YY).";
    }

    if (!validateCvc()) {
      errors.cvc = "Please enter a valid CVC.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await fetch(
          "https://v-designers-b441a-default-rtdb.firebaseio.com/transactions.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Manager,
              cardHolder,
              cardNumber,
              expiryDate,
              cvc,
              Amount,
              formattedDateTime,
            }),
          }
        );

        if (res.ok) {
          setOrderPlaced(true);
          alert("Plan is Activated");
          console.log("Order placed successfully!");
        } else {
          console.error("Failed to place order");
        }
      } catch (error) {
        console.error("Error occurred while placing the order", error);
      }
    }
  };

  return (
    <>
      <div className="justify-center flex flex-wrap -m-4">
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                required
                type="text"
                id="card-holder"
                name="card-holder"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className={`w-full rounded-md border ${
                  errors.cardHolder ? "border-red-500" : "border-gray-200"
                } px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder="Your full name here"
              />
            </div>
            {errors.cardHolder && (
              <p className="text-red-500 mt-1">{errors.cardHolder}</p>
            )}

            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={`w-full rounded-md border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-200"
                  } px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
              </div>
              <input
                type="text"
                name="credit-expiry"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className={`w-full rounded-md border ${
                  errors.expiryDate ? "border-red-500" : "border-gray-200"
                } px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className={`w-1/6 flex-shrink-0 rounded-md border ${
                  errors.cvc ? "border-red-500" : "border-gray-200"
                } px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder="CVC"
              />
            </div>

            {errors.cardNumber && (
              <p className="text-red-500 mt-1">{errors.cardNumber}</p>
            )}
            {errors.expiryDate && (
              <p className="text-red-500 mt-1">{errors.expiryDate}</p>
            )}
            {errors.cvc && <p className="text-red-500 mt-1">{errors.cvc}</p>}

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">$XX.XX</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">$XX.XX</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className={`mt-4 mb-8 w-full rounded-md ${
                orderPlaced
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } px-6 py-3 font-medium text-white `}
              disabled={orderPlaced}
            >
              {orderPlaced ? "Plan is Activated" : "Pay via Stripe"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
