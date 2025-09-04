import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Camera,
  Package,
  AlertCircle,
} from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Returns & Exchange Policy
          </h1>
          <p className="text-gray-600">
            We want you to be completely satisfied with your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle>3-Day Window</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Contact us within 3 days of delivery for damaged or faulty
                products
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Camera className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle>Visual Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Provide clear pictures or videos showing product flaws
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Package className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle>Original Packaging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Return products in original undamaged packaging without stickers
                or tape
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                What&apos;s Eligible for Return
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Damaged or faulty products reported within 3 days
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Unused, unworn, unwashed products without flaws
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Products in original undamaged packaging
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Exchanges requested on the same day of delivery
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-600" />
                What&apos;s Not Eligible
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-600 mt-0.5">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Products reported after 3 days of delivery
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-600 mt-0.5">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Used, worn, washed, or flawed products
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-600 mt-0.5">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Products without original packaging
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-600 mt-0.5">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-gray-700">
                    Packages with tape or stickers on them
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Return Process</CardTitle>
            <CardDescription>
              Follow these steps to return a product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-6">
              <li className="flex items-start">
                <Badge
                  variant="outline"
                  className="h-8 w-8 flex items-center justify-center rounded-full mr-4 mt-0.5"
                >
                  1
                </Badge>
                <div>
                  <h3 className="font-semibold">Contact Us Immediately</h3>
                  <p className="text-gray-600 mt-1">
                    Reach out to us within 3 days at{" "}
                    <strong>01786633874</strong> for damaged or faulty products
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Badge
                  variant="outline"
                  className="h-8 w-8 flex items-center justify-center rounded-full mr-4 mt-0.5"
                >
                  2
                </Badge>
                <div>
                  <h3 className="font-semibold">Provide Visual Evidence</h3>
                  <p className="text-gray-600 mt-1">
                    Take clear pictures or videos showing the flaws of the
                    product you received
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Badge
                  variant="outline"
                  className="h-8 w-8 flex items-center justify-center rounded-full mr-4 mt-0.5"
                >
                  3
                </Badge>
                <div>
                  <h3 className="font-semibold">Pack Properly</h3>
                  <p className="text-gray-600 mt-1">
                    Place the product in its original undamaged packaging
                    without adding tape or stickers
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Badge
                  variant="outline"
                  className="h-8 w-8 flex items-center justify-center rounded-full mr-4 mt-0.5"
                >
                  4
                </Badge>
                <div>
                  <h3 className="font-semibold">Wait for Instructions</h3>
                  <p className="text-gray-600 mt-1">
                    We will provide return instructions and address after
                    reviewing your case
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-6 w-6" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                For exchanges, you must inform us on the same day of delivery
              </li>
              <li>
                If a product is returned in inadequate condition, we reserve the
                right to send it back to you
              </li>
              <li>
                Return shipping costs may apply depending on the reason for
                return
              </li>
              <li>
                Refunds will be processed to the original payment method within
                7-10 business days after we receive the returned item
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Need Help with a Return?</h3>
              <p className="text-gray-600">
                Contact our support team for assistance
              </p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
            <Phone className="h-4 w-4 mr-2" />
            Call 01786633874
          </Button>
        </div>
      </div>
    </div>
  );
}
