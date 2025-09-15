import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-serif">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-yellow-500 max-w-2xl mx-auto text-xl font-light italic">
            Your privacy and security are our top priorities at NamSropa
          </p>
        </motion.div>
      </div>

      {/* Security Guarantee Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p
            className="text-lg font-medium text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-yellow-600 font-bold text-xl">
              Your Transaction is secure.
            </span>{" "}
            And information provided by you will be kept confidential. Two
            simple guarantees that mean you can shop without fear at{" "}
            <span className="text-yellow-600 font-bold">NamSropa.com</span>.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Privacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b-2 border-amber-300 pb-4">
              Privacy
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Registering with us is entirely voluntary on your part. And all
                information collected from you when you buy at{" "}
                <span className="text-yellow-600 font-semibold">
                  NamSropa.in
                </span>{" "}
                is used mainly to effect shipment and to keep you informed about
                the status of your order. It may also be used to identify groups
                of similar respondents for statistical purposes.
              </p>
              <p>
                If you sign up to receive regular email updates from us, or for
                any of the other services offered on the site, the information
                so provided will be used strictly for the purpose/s intended.
              </p>
              <p>
                Occasionally, we will send you email with information about new
                products and offers on our site, but you will always have the
                option of declining to receive such information.
              </p>
              <p>
                Other than to Stripe and your card issuer's bank for credit card
                validation, under no circumstances will information submitted by
                you be divulged to any third party for any reason whatsoever.
              </p>
              <p className="font-semibold text-yellow-600 italic text-xl mt-8">
                And that's a promise!
              </p>
            </div>
          </motion.div>

          {/* Third-party login Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b-2 border-amber-300 pb-4">
              Third-party login
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                <span className="text-yellow-600 font-semibold">Facebook:</span>{" "}
                We store your Facebook account data in order to provide a smooth
                shopping experience for you. Your data is only used for basic
                transactional purposes and is not shared with any third parties.
              </p>
              <p>
                At any point of time, you may choose to delete the data you've
                shared with{" "}
                <span className="text-yellow-600 font-semibold">NamSropa</span>{" "}
                through your Facebook account by following these steps:
              </p>
              <ol className="list-decimal pl-8 space-y-4 my-6">
                <li className="pl-2">
                  Log in to your Facebook account and go to "Settings & Privacy"
                </li>
                <li className="pl-2">
                  Select "Apps and Websites" from the menu on the left, select
                  "NamSropa" and click on "Remove"
                </li>
                <li className="pl-2">
                  Click on the "View removed apps and websites" button at the
                  bottom of the page, select "NamSropa" and click on "Send
                  request"
                </li>
              </ol>
              <p>
                This will remove all data stored by NamSropa in association with
                your Facebook account.
              </p>
            </div>
          </motion.div>

          {/* Terms of Use Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b-2 border-amber-300 pb-4">
              TERMS OF USE
            </h2>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              User and Blogger Submissions
            </h3>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                You may post or upload content you have created, including
                without limitation, photographs, your social media handle,
                videos, and comments (collectively, "User and Blogger
                Submissions") to your social media accounts. By posting and
                uploading User and Bloggers Submissions that you have tagged
                with{" "}
                <span className="text-yellow-600 font-semibold">#NamSropa</span>{" "}
                or other NamSropa brand hashtags or that you have featured free
                samples from NamSropa as part of our blogger outreach programs,
                you grant to{" "}
                <span className="text-yellow-600 font-semibold">
                  NamSropa.com LLC
                </span>
                , its third-party service providers who provide content
                management services, and its retail partners (collectively, the
                "Licensed Parties") the perpetual, irrevocable, royalty-free,
                fully-paid, non-exclusive, transferable right to use your
                NamSropa-tagged User and Blogger Submissions in any manner to be
                determined in the Licensed Parties' sole discretion, including
                but not limited to on their webpages, social media pages
                operated by NamSropa, and in other marketing, promotional and
                advertising initiatives, in any media now or hereafter known.
              </p>
              <p>
                NamSropa may use, display, reproduce, distribute, transmit,
                create derivative works from, combine with other materials,
                alter and/or edit your User and Blogger Submissions in any
                manner in its sole discretion, with no obligation to you
                whatsoever. You grant the Licensed Parties the right to use your
                username, real name, image, likeness, caption, location or other
                identifying information in connection with any use of your User
                and Blogger Submissions.
              </p>
              <p>
                You hereby represent and warrant that (i) you own all rights in
                and to your User and Blogger Submissions, (ii) you have
                permission from all person(s) appearing in your User and Blogger
                Submissions to grant the rights granted herein; (iii) you are
                not a minor, and (iv) the Licensed Parties' use of your User and
                Blogger Submissions as described herein will not violate the
                rights of any third party or any law. You hereby release,
                discharge and agree to hold NamSropa, the Licensed Parties, and
                any person acting on NamSropa's or their behalf harmless from
                any liability related in any way to the Licensed Parties' use of
                your User and Blogger Submissions.
              </p>
            </div>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b-2 border-amber-300 pb-4">
              SECURITY
            </h2>
            <motion.div
              className="bg-amber-50 p-8 rounded-xl border border-amber-200 mb-10 shadow-sm"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xl font-medium text-gray-800 text-center">
                Your Transaction is secure. And information provided by you will
                be kept confidential. Two simple guarantees that mean you can
                shop without fear at{" "}
                <span className="text-yellow-600 font-bold">NamSropa.com</span>
              </p>
            </motion.div>

            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Security
            </h3>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                <span className="text-yellow-600 font-semibold">NamSropa</span>{" "}
                is associated with Stripe - a trusted third party credit card
                authorizing agency, to ensure the security of your credit card
                information.
              </p>
              <p>
                Whenever you are ready to buy at NamSropa, you will
                automatically enter the secure server at Stripe.
              </p>
              <p>
                Credit card information is entered by you within the secure
                server, and this is encrypted using 128 bit Secure Socket Layer
                (SSL) technology - the current state of the art for Internet
                security.
              </p>
              <p>
                The information is sent to your card issuer's bank over a
                secure, proprietary connection. When the authorization process
                is complete - this takes around five seconds - you receive an
                approval or decline response in your browser, and we are
                informed appropriately to initiate the shipping process.
              </p>
              <p className="font-semibold text-yellow-600 italic text-xl mt-8">
                That's how concerned we are of your security.
              </p>
            </div>
          </motion.div>

          {/* More Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b-2 border-amber-300 pb-4">
              More Information
            </h2>
            <p className="mb-8 text-lg">
              Choose a link below for more information on our services:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href="/shipping"
                className="block p-6 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-semibold text-yellow-600 mb-3 text-xl">
                  Shipping Information
                </h3>
                <p className="text-gray-700">
                  Learn about our shipping policies and delivery times
                </p>
              </motion.a>
              <motion.a
                href="/returns"
                className="block p-6 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-semibold text-yellow-600 mb-3 text-xl">
                  Returns & Exchanges
                </h3>
                <p className="text-gray-700">
                  Our hassle-free return and exchange policy
                </p>
              </motion.a>
              <motion.a
                href="/terms"
                className="block p-6 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-semibold text-yellow-600 mb-3 text-xl">
                  Terms & Conditions
                </h3>
                <p className="text-gray-700">
                  Read our complete terms and conditions
                </p>
              </motion.a>
              <motion.a
                href="/contact"
                className="block p-6 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-semibold text-yellow-600 mb-3 text-xl">
                  Contact Us
                </h3>
                <p className="text-gray-700">
                  Get in touch with our customer support team
                </p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
