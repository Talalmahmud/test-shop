"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

export default function TermsAndConditions() {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const terms = [
    {
      title: "User Accounts",
      content:
        "You may be required to create an account to access certain features of the Website or Services. You are responsible for maintaining the confidentiality of your account information, including your password. You agree to accept responsibility for all activities that occur under your account.",
    },
    {
      title: "Products and Services",
      content:
        "Jolchobi offers a variety of products and services for purchase. We strive to provide accurate information about our products, but we cannot guarantee that all information is error-free. Prices are subject to change without notice.",
    },
    {
      title: "Order Processing and Payment",
      content:
        "When you place an order, you agree to pay the purchase price listed on the Website. We accept various payment methods as specified on the Website. We reserve the right to cancel any order at any time.",
    },
    {
      title: "Shipping and Delivery",
      content:
        "We will ship your order according to the shipping method you select at checkout. Estimated delivery times are for informational purposes only and may vary.",
    },
    {
      title: "Returns and Exchanges",
      content:
        "We offer a return and exchange policy as specified on the Website. You are responsible for the cost of returning unwanted items.",
    },
    {
      title: "Intellectual Property",
      content:
        "The content of the Website and Services, including all trademarks, copyrights, and other intellectual property, is the property of Jolchobi or its licensors. You may not use any of this content without our express written permission.",
    },
    {
      title: "Disclaimer of Liability",
      content:
        "Jolchobi disclaims all warranties, express or implied, including warranties of merchantability and fitness for a particular purpose. We will not be liable for any damages arising from your use of the Website or Services.",
    },
    {
      title: "Limitation of Liability",
      content:
        "In no event will Jolchobi be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Website or Services.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms will be governed by and construed in accordance with the laws of Bangladesh.",
    },
    {
      title: "Dispute Resolution",
      content:
        "Any dispute arising from these Terms will be resolved through binding arbitration in Dhaka, Bangladesh.",
    },
    {
      title: "Entire Agreement",
      content:
        "These Terms constitute the entire agreement between you and Jolchobi concerning your use of the Website and Services.",
    },
    {
      title: "Severability",
      content:
        "If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall remain in full force and effect.",
    },
    {
      title: "Changes to Terms",
      content:
        "Jolchobi may change these Terms at any time by posting the revised Terms on the Website. You are responsible for checking the Terms periodically for updates.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms, please contact us at +8801762588222 or contact@jolchobi.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <Card className=" rounded-none">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white ">
            <CardTitle className="text-3xl font-bold">
              Terms and Conditions
            </CardTitle>
            <CardDescription className="text-blue-100">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <p className="text-gray-700 mb-4">
                These Terms and Conditions (&quot;Terms&quot;) govern your use
                of the Jolchobi website (the &quot;Website&quot;) and the
                services offered by Jolchobi (the &quot;Services&quot;). By
                accessing or using the Website or Services, you agree to be
                bound by these Terms.
              </p>
            </div>

            <div className="space-y-4">
              {terms.map((term, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-left">
                    {index + 1}. {term.title}
                  </h3>

                  <p className="text-gray-700">{term.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-2">
                Important Notice
              </h3>
              <p className="text-amber-700 text-sm">
                This is a sample Terms and Conditions agreement and should be
                adapted to your specific business needs. You may want to consult
                with an attorney to ensure your Terms and Conditions comply with
                all applicable laws. Make sure your Terms and Conditions are
                easily accessible on your website.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700 mr-4"
              >
                Print Terms
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
