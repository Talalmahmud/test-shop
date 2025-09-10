import ProductLoading from "@/components/shared/product-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  variation: string;
  price: string;
  tax: string;
  shipping_cost: string;
  coupon_discount: string;
  quantity: number;
  payment_status: string;
  payment_status_string: string;
  delivery_status: string;
  delivery_status_string: string;
  refund_section: boolean;
  refund_button: boolean;
  refund_label: string;
  refund_request_status: number;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookie = await cookies();

  let product = null;
  let error = null;

  try {
    const productResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-history-items/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")?.value}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!productResponse.ok) {
      throw new Error(`Product not found: ${productResponse.status}`);
    }

    const productData = await productResponse.json();
    product = productData.data;
  } catch (err) {
    console.error("Error fetching product:", err);
    error = err instanceof Error ? err.message : "Failed to load product";
  }
  console.log(product);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist or is
            unavailable.
          </p>
          <a
            href="/products"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Browse all products
          </a>
        </div>
      </div>
    );
  }

  if (!product) {
    return <ProductLoading />;
  }
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link href={"/user/order"}>
        {" "}
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
      </Link>
      {product?.map((orderData: OrderItem, index: number) => (
        <div key={index} className=" w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Order Details</h1>
            <Badge variant="outline" className="text-sm">
              Order ID: #{orderData.id}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Order Summary Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Product details and pricing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 py-4">
                  <div className="bg-gray-200 rounded-md w-20 h-20 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Product Image</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{orderData.product_name}</h3>
                    <p className="text-sm text-gray-600">
                      Variant: {orderData.variation}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-bold">{orderData.price}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {orderData.quantity}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{orderData.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Cost</span>
                    <span>{orderData.shipping_cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{orderData.tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coupon Discount</span>
                    <span className="text-green-600">
                      {orderData.coupon_discount}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{orderData.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>Current status of your order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Payment Status</span>
                    <Badge
                      variant={
                        orderData.payment_status === "unpaid"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {orderData.payment_status_string}
                    </Badge>
                  </div>
                  {orderData.payment_status === "unpaid" && (
                    <Button className="w-full mt-2">Pay Now</Button>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Delivery Status</span>
                    <Badge variant="secondary">
                      {orderData.delivery_status_string}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div
                        className={`rounded-full h-3 w-3 ${
                          orderData.delivery_status === "pending"
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="ml-2 text-sm">Order Placed</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`rounded-full h-3 w-3 ${
                          orderData.delivery_status === "shipped"
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="ml-2 text-sm">Shipped</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`rounded-full h-3 w-3 ${
                          orderData.delivery_status === "delivered"
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="ml-2 text-sm">Delivered</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Refund Status</h4>
                  {orderData.refund_section ? (
                    <div>
                      <Badge variant="outline">{orderData.refund_label}</Badge>
                      {orderData.refund_button && (
                        <Button variant="outline" className="w-full mt-2">
                          Request Refund
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No refund requested</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Section */}
          {/* <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline">Download Invoice</Button>
            <Button>Contact Support</Button>
          </div> */}
        </div>
      ))}
    </div>
  );
}
