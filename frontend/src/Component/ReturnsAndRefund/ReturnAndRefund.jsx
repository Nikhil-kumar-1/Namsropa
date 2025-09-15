import React, { useState } from "react";
import { motion } from "framer-motion";

const ReturnsCancellations = () => {
  const [activeSection, setActiveSection] = useState("policy");

  return (
    <div className="min-h-screen bg-white text-gray-800 font-serif">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Returns & Cancellations
          </h1>
          <p className="text-yellow-600 max-w-2xl mx-auto text-lg">
            Our policies to ensure you have a seamless shopping experience
          </p>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-6">
            {[
              { id: "policy", label: "Return Policy" },
              { id: "changes", label: "Changes & Cancellations" },
              { id: "process", label: "Return Process" },
              { id: "shipping", label: "Return Shipping" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === tab.id
                    ? "bg-yellow-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
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
          {/* Policy Section */}
          {activeSection === "policy" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-600">
                  Returns Policy
                </h2>
                <p className="text-gray-600 mb-4 italic">
                  Effective March 5, 2023
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We accept returns of all our merchandise (except items listed
                  in Sale section) within 30 days from the date of order
                  delivery (as recorded by the shipping provider), and they must
                  be in their original and resalable condition.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The items being returned must be unworn, unwashed, and
                  unaltered with all tags intact. In the event of the returned
                  merchandise not meeting the required conditions, we reserve
                  the right to withhold refunds.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Please note that we do not accept returns of face masks for
                  health and hygiene reasons.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our returns policy for leather is different as we will be
                  refunding only as Store Credit. So we need to work together to
                  ensure that you give us accurate measurements and we in turn
                  work hard to give you the perfect leather garment that you can
                  be proud of.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                    FIRST-TIME CUSTOMERS
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Returning non-customized clothing
                    </h4>
                    <p className="text-gray-600">
                      You may opt for cash back or a store credit per NamSropa's
                      Returns Policy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Returning customized clothing
                    </h4>
                    <p className="text-gray-600">
                      Store credit will be provided for returns per NamSropa's
                      Returns Policy.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                    REPEAT CUSTOMERS
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Returning non-customized clothing
                    </h4>
                    <p className="text-gray-600">
                      You may opt for cash back or store credit per NamSropa's
                      Returns Policy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Returning customized clothing
                    </h4>
                    <p className="text-gray-600">
                      Store credit will be provided for returns per NamSropa's
                      Returns Policy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                  Return Charges
                </h3>
                <p className="text-gray-700 mb-4">
                  $4 per item of clothing will be charged to the customer for
                  shipping to our Returns Center.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-medium text-yellow-600 mb-2">
                      Cash Back
                    </h4>
                    <p className="text-gray-600">
                      Where cash back is applicable, the customer will be
                      refunded the purchase price less customization fee and
                      shipping fee collected.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-600 mb-2">
                      Store Credit
                    </h4>
                    <p className="text-gray-600">
                      Where store credit is applicable, the customer will be
                      refunded the purchase price and the customization fee.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-700 mb-2">
                    Important Notes:
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>
                      Gift Card: Returned items purchased with a gift card are
                      not eligible for a cash refund.
                    </li>
                    <li>
                      Overstock: Return of overstock will be refunded only in
                      the form of a gift card with a one-year validity. Please
                      note that shipping costs incurred for overstock items will
                      not be refunded.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Changes & Cancellations Section */}
          {activeSection === "changes" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600">
                  Changes and Cancellations
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We sincerely hope you enjoy your NamSropa item, but we
                  understand that sometimes customers change their minds. Please
                  read our newly updated policies below before placing your
                  order to ensure there are no surprises with processing any
                  changes, cancellations, or returns.
                </p>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                  <p className="text-yellow-700 font-medium">
                    If you wish to modify a confirmed order, please write to us
                    at{" "}
                    <span className="underline">
                      customerchampion@namsropa.com
                    </span>{" "}
                    within 24 hours from the receipt of your order confirmation
                    email. Our representatives will be happy to assist you!
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                    Order Modification Guidelines
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-3">
                    <li>
                      Changes to size, style, or customization can only be made
                      within 24 hours of order confirmation
                    </li>
                    <li>
                      After 24 hours, orders enter production and cannot be
                      modified
                    </li>
                    <li>
                      Cancellations are only possible before the order enters
                      production
                    </li>
                    <li>
                      Customized items cannot be cancelled once production has
                      begun
                    </li>
                    <li>
                      Standard shipping fees may apply for re-shipment of
                      modified orders
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Return Process Section */}
          {activeSection === "process" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600">
                  RETURNS PROCESS
                </h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                    Preparing Your Return
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Please initiate your returns online through the following
                    steps:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-3">
                    <li>
                      Sign in to www.namsropa.com and scroll through your name
                      in the top right. A drop-down menu will appear.
                    </li>
                    <li>
                      Go to "My Orders" and scroll down to the order you would
                      like to return. Click on "RETURN" in the top right corner
                      to raise a return request for that order.
                    </li>
                    <li>
                      Select the products you would like to return on the next
                      screen along with the reason for the return. This will
                      help us serve you better in the future.
                    </li>
                    <li>
                      Select the mode of refund (cash/gift card) and click on
                      "Proceed" to successfully raise your Return Authorization
                      Request (RAR). Print the request and include it in your
                      return package.
                    </li>
                  </ol>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-700 text-sm">
                      If you are unable to print it out, please write the
                      following information from the Returns Authorization
                      Request screen on a sheet of paper and include that in
                      your returns package:
                    </p>
                    <p className="text-gray-600 mt-2">
                      - Return Authorization Request # ____________
                      <br />- Order ID: ____________
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                    Packing & Shipping Your Return
                  </h3>
                  <p className="text-gray-700 mb-4">
                    For USA returns, please follow these instructions:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-3">
                    <li>
                      We provide a prepaid return label enclosed within a blue
                      envelope with each order as a convenience for our
                      customers.
                    </li>
                    <li>
                      Fill in your name and address on the pre-paid label
                      included with your original order and affix it on the top
                      of the box.
                    </li>
                    <li>
                      Remove or strike out any other mailing address information
                      from previous uses of the same box.
                    </li>
                    <li>
                      Seal your package securely and check which return label
                      you have. We send 2 types of return labels: UPS and
                      Xindus.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Return Shipping Section */}
          {activeSection === "shipping" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600">
                  RETURN SHIPPING
                </h2>
                <p className="text-gray-600 mb-4 italic">
                  Effective Sept 12, 2023
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-yellow-600">
                      Pre-paid Returns Labels
                    </h3>
                    <p className="text-gray-700 mb-4">
                      We provide a prepaid return label with each order as a
                      convenience for our customers.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">
                      Lost or Damaged Labels
                    </h4>
                    <p className="text-gray-600">
                      If you happen to misplace or damage your prepaid label, we
                      kindly request that you arrange the return shipment at
                      your own expense. We will reimburse the return shipping
                      cost (up to $20) in the form of a gift card. Please email
                      to{" "}
                      <span className="underline">
                        customerchampion@namsropa.com
                      </span>{" "}
                      for further details.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-yellow-600">
                      Additional Returns
                    </h3>
                    <p className="text-gray-700">
                      In case you have already used the Return label/return
                      reimbursement for an order and wish to return an
                      additional product from that order, it needs to be
                      returned at your own expense. Only 1 return per order will
                      be borne by NamSropa.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-yellow-600">
                      Using Previous Labels
                    </h3>
                    <p className="text-gray-700">
                      In case you have a return label from any of the previous
                      orders you can use the same and let us know the tracking
                      details along with the order # and the style # you have
                      returned.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-yellow-600 mb-2">
                        UPS Labels
                      </h4>
                      <p className="text-gray-600">
                        If it is a UPS label then leave the sealed package for
                        your USPS postal carrier or take it to your nearest USPS
                        post office. USPS accepts UPS return shipping labels.
                        You may also take the package to your nearest UPS store.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-yellow-600 mb-2">
                        Xindus Labels
                      </h4>
                      <p className="text-gray-600">
                        If it is a Xindus label then please take the sealed
                        package to your nearest UPS store.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Support Section */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-600">
            Need Help With Your Return?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to assist you
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="mailto:customerchampion@namsropa.com"
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Email Us
            </a>
            <a
              href="tel:185562677672"
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg border border-gray-300 transition duration-300"
            >
              Call: 1 (855) NAM-SROPA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsCancellations;
