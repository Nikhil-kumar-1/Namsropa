import React, { useState } from "react";
import { motion } from "framer-motion";

const PaymentsShipping = () => {
  const [activeTab, setActiveTab] = useState("delivery");

  const shippingData = [
    { items: 1, charges: "$12.95", costPerItem: "$12.95" },
    { items: 2, charges: "$16.95", costPerItem: "$8.48" },
    { items: 3, charges: "$19.95", costPerItem: "$6.65" },
    { items: 4, charges: "$23.95", costPerItem: "$5.99" },
    { items: 5, charges: "$26.95", costPerItem: "$5.39" },
    { items: 6, charges: "$29.95", costPerItem: "$4.99" },
    { items: 7, charges: "$32.95", costPerItem: "$4.71" },
  ];

  const taxStates = [
    "District of Columbia",
    "Arizona",
    "Arkansas",
    "California",
    "Connecticut",
    "Colorado",
    "Florida",
    "Georgia",
    "Hawaii",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Michigan",
    "Nebraska",
    "Nevada",
    "North Carolina",
    "Ohio",
    "Oklahoma",
    "South Carolina",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center  justify-center bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif text-white">
            Payments & Shipping
          </h1>
          <p className="text-yellow-600 font-serif max-w-2xl mx-auto text-lg">
            Secure payment options and reliable shipping for your custom orders
          </p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-6">
            {[
              { id: "delivery", label: "Delivery Info" },
              { id: "payment", label: "Payment Options" },
              { id: "shipping", label: "Shipping Details" },
              { id: "tax", label: "Tax Information" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-yellow-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Delivery Information */}
          {activeTab === "delivery" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b border-yellow-400 pb-2">
                When We Deliver
              </h2>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
                <p className="text-lg font-medium text-gray-800">
                  <span className="text-yellow-600 font-bold">
                    Customized to height, size, style.
                  </span>{" "}
                  Made to order. Delivery time approximately{" "}
                  <span className="text-yellow-600 font-bold">2-4 weeks</span>
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800 mt-10">
                Order Processing
              </h3>
              <p className="mb-4 leading-relaxed">
                On successful completion of payment, an order confirmation is
                mailed to the customer's registered email address.{" "}
                <span className="text-yellow-600 font-medium">NamSropa</span>{" "}
                reserves the right to cancel an order within 3 business days of
                receiving the order if we are unable to fulfill the order.
              </p>
              <p className="mb-4 leading-relaxed">
                Orders may be canceled by NamSropa under exceptional
                circumstances, including but not limited to - fabric or trims
                failing quality check, insufficient fabric, inability to comply
                with special instructions requested, incomplete or unsupported
                address location, orders not complying with our coupons usage
                policy, orders at prices that significantly vary from market or
                NamSropa's standard prices due to manual or technical error,
                orders flagged by our technical systems as suspicious usage of
                credit cards or other payment options or any other potential
                abuse of our service.
              </p>
              <p className="mb-4 leading-relaxed">
                In all such cases, NamSropa will inform the customer of the
                cancellation and refund the full order value within 3 business
                days of receiving the order.
              </p>
            </motion.div>
          )}

          {/* Payment Options */}
          {activeTab === "payment" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b border-yellow-400 pb-2">
                PAYMENT OPTIONS
              </h2>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
                <p className="text-lg font-medium text-gray-800">
                  All transactions are processed in{" "}
                  <span className="text-yellow-600 font-bold">
                    US Dollars ($)
                  </span>
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Accepted Payment Methods
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    <span className="text-yellow-600 font-medium">
                      NamSropa
                    </span>{" "}
                    currently accepts Visa, MasterCard, American Express and
                    Discover credit cards, as well as PayPal payments. All
                    orders will be charged immediately upon order confirmation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Gift Coupons & Cards
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Only one gift coupon (purchase discount offers from
                      NamSropa) may be used per order
                    </li>
                    <li>
                      You can use as many gift cards as you like for a single
                      order
                    </li>
                    <li>
                      All promotional discount codes, gift coupons, and gift
                      cards are available for one-time use only and may not be
                      transferred, re-issued, or exchanged for cash, unless
                      explicitly specified
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Minimum Order Value
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    To place an order, your total order value should be minimum{" "}
                    <span className="text-yellow-600 font-medium">$20</span> for
                    assorted mask only orders and{" "}
                    <span className="text-yellow-600 font-medium">$40</span> for
                    mask combo and apparel orders after any promotional
                    discounts.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Shipping Details */}
          {activeTab === "shipping" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b border-yellow-400 pb-2">
                SHIPPING DETAILS
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Where We Deliver
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    We ship only to physical shipping addresses within the
                    contiguous United States. We don't ship to P.O. boxes, APO /
                    FPO addresses.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    How We Deliver
                  </h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Orders may not be shipped to multiple locations</li>
                    <li>
                      Shipping address changes must be requested before the
                      order has been shipped. Once shipped, the address cannot
                      be changed, cancelled, or diverted to a different shipping
                      address
                    </li>
                    <li>
                      Three attempts to deliver your package will be made by our
                      shipping courier. If you're not available during these
                      attempts, our courier will ask you to contact them to
                      arrange a delivery of your package for a time when you'll
                      be present to receive it
                    </li>
                    <li>
                      A delivery confirmation email will be sent to you as soon
                      as we receive a notification of successful order delivery
                      from our courier
                    </li>
                    <li>
                      <span className="font-semibold text-yellow-600">
                        Lost packages:
                      </span>{" "}
                      If you haven't actually received your order after
                      receiving a delivery confirmation email from us, please
                      contact us within 3 business days from the date you
                      receive our delivery confirmation email. NamSropa will not
                      be responsible for the cost or replacement of lost or
                      misplaced packages if notified later than the time frame
                      mentioned above
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    SHIPPING COSTS - UNITED STATES OF AMERICA
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    All NamSropa apparel is custom-made by hand at our
                    production facility in India before being shipped directly
                    to you. We charge shipping and handling fees based on the
                    number of items in your order:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-yellow-600 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left">
                            Number of items
                          </th>
                          <th className="py-3 px-4 text-left">
                            Shipping charges
                          </th>
                          <th className="py-3 px-4 text-left">
                            Shipping cost per item
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippingData.map((item, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className="py-3 px-4 border-b border-gray-200">
                              {item.items}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200 font-medium text-yellow-600">
                              {item.charges}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200">
                              {item.costPerItem}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">
                    * If both items are tops, a lower fee of $13.95 will apply
                    instead of $16.95
                  </p>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">
                      Masks
                    </h4>
                    <p className="text-gray-700">
                      Shipping fees for orders containing only masks will be
                      charged $4.95. In case masks are a part of an order
                      containing other apparel items, no shipping fees will be
                      charged.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tax Information */}
          {activeTab === "tax" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b border-yellow-400 pb-2">
                US SALES TAX
              </h2>

              <div className="space-y-6">
                <p className="leading-relaxed">
                  <span className="text-yellow-600 font-medium">NamSropa</span>{" "}
                  is committed to complying with the tax laws of the countries
                  where we are doing business. We manage our tax compliance by
                  relying on the advice of professionals to ensure that we obey
                  the law and file returns and make payments to the appropriate
                  tax authorities. Items purchased on NamSropa.com and shipped
                  to locations in the United States, may be subject to tax.
                </p>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Tax Calculation
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    The amount of sales tax we collect depends on the purchase
                    price of the item, the type of item purchased, and the
                    destination to which the purchased item is shipped.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    States Where We Collect Sales Tax
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    NamSropa collects sales/use tax on sales of taxable products
                    shipped to destinations in:
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {taxStates.map((state, index) => (
                        <span key={index} className="text-sm text-gray-700">
                          {state}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Unless the sale of the product is not taxable or the
                    purchaser provides evidence indicating that it isn't
                    required to pay sales tax on such purchases.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Taxable Amount
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    The taxable total selling price of an item will generally
                    include shipping charges and discounts. No tax will be
                    collected on the purchase of gift cards, but purchases paid
                    for with gift cards may be subject to tax as discussed
                    above.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Other States
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    NamSropa does not collect sales or use tax, as it is not
                    required to make such collections by law, on shipments to
                    persons in states other than those listed above.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mt-8">
                  <h3 className="text-xl font-semibold mb-3 text-yellow-700">
                    CUSTOM COSTS – UNITED STATES OF AMERICA
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    Personal purchases over $800 in a single day incur US
                    Customs duties. We absorb this fee for customers with orders
                    shipping to the US. Should you still encounter any demand
                    for payment of these duties from our courier, please contact
                    us by email (customerchampion@namsropa.com) or call us
                    toll-free at{" "}
                    <span className="text-yellow-600 font-medium">
                      1 (855) NAM SROPA (626 77672)
                    </span>
                    , and you will be reimbursed.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      
    </div>
  );
};

export default PaymentsShipping;
