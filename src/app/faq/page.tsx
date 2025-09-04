"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Truck,
  RefreshCw,
  CreditCard,
  Shield,
  Package,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const faqData = [
    {
      category: "shipping",
      icon: <Truck className="h-5 w-5" />,
      questions: [
        {
          question: "How long is the shipping process?",
          answer:
            "It usually takes 2 days inside Dhaka and 2-3 days outside Dhaka.",
        },
        {
          question: "How long do you take to deliver?",
          answer:
            "We deliver inside Dhaka within 2 days max and outside Dhaka within 3-4 days.",
        },
        {
          question: "I didn't receive my package.",
          answer:
            "Try contacting us over phone at 01786633874 or our social media.",
        },
      ],
    },
    {
      category: "returns",
      icon: <RefreshCw className="h-5 w-5" />,
      questions: [
        {
          question: "What is the return policy?",
          answer:
            "If you want to change a product you need to call us at 01786633874. You can also contact us through our social media so that we can communicate.",
        },
        {
          question: "What is the exchange policy?",
          answer:
            "If you want to change a product you need to call us at 01786633874. You can also contact us through our social media so that we can communicate.",
        },
      ],
    },
    {
      category: "payment",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "What methods of payment are accepted?",
          answer: "We accept cash on delivery and bKash.",
        },
      ],
    },
    {
      category: "warranty",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "Warranty information?",
          answer: "No warranty is provided with our products.",
        },
      ],
    },
    {
      category: "care",
      icon: <Package className="h-5 w-5" />,
      questions: [
        {
          question: "How should I protect/store my jewelry?",
          answer:
            "Try to keep it in a box after using it. And try to avoid too much water contact.",
        },
      ],
    },
  ];

  const categories = [
    {
      id: "all",
      name: "All FAQs",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    { id: "shipping", name: "Shipping", icon: <Truck className="h-4 w-4" /> },
    {
      id: "returns",
      name: "Returns & Exchange",
      icon: <RefreshCw className="h-4 w-4" />,
    },
    {
      id: "payment",
      name: "Payment",
      icon: <CreditCard className="h-4 w-4" />,
    },
    { id: "warranty", name: "Warranty", icon: <Shield className="h-4 w-4" /> },
    { id: "care", name: "Product Care", icon: <Package className="h-4 w-4" /> },
  ];

  // Filter FAQs based on search query and active category
  const filteredFaqs = faqData
    .filter(
      (category) =>
        activeCategory === "all" || category.category === activeCategory
    )
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search questions..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* FAQ Content */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-6">
            {filteredFaqs.map((category) => (
              <Card key={category.category} className="overflow-hidden">
                <CardHeader className="bg-blue-50 py-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="text-blue-600">{category.icon}</div>
                    {categories.find((c) => c.id === category.category)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                          <Badge variant="outline" className="mr-3 mt-1">
                            Q
                          </Badge>
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 ml-9 flex">
                          <Badge variant="secondary" className="mr-3 mt-1">
                            A
                          </Badge>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                We couldn&apos;t find any FAQs matching &quot;{searchQuery}
                &quot;. Try different keywords or browse all categories.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Contact Support */}
        <Card className="mt-10 bg-blue-50 border-blue-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Phone className="h-6 w-6" />
              Still need help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              Can&apos;t find the answer you&apos;re looking for? Please contact
              our friendly team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Call 01786633874
              </Button>
              <Button
                variant="outline"
                className="border-blue-300 text-blue-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message on Social Media
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle>Delivery Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Inside Dhaka: 2 days</p>
              <p className="text-gray-600">Outside Dhaka: 2-3 days</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <RefreshCw className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle>Return Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Contact us within 3 days for returns or exchanges
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CreditCard className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Cash on Delivery</p>
              <p className="text-gray-600">bKash</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
