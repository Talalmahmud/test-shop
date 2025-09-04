// components/orders-table-simple.tsx
"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrder } from "@/services/order";

interface Order {
  id: number;
  code: string;
  user_id: number;
  payment_type: string;
  payment_status: string;
  payment_status_string: string;
  delivery_status: string;
  delivery_status_string: string;
  grand_total: string;
  date: string;
  links: {
    details: string;
  };
}

export default function OrdersTableSimple() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getOrder();
        setOrders(ordersData.data || []);
      } catch (err) {
        setError("Failed to load orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Get status badge variant
  const getPaymentStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "default";
      case "unpaid":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getDeliveryStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "default";
      case "shipped":
        return "default";
      case "processing":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center text-destructive">{error}</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center text-muted-foreground">No orders found</div>
      </div>
    );
  }

  return (
    <div className="">
      <p className="text-center py-4 font-bold text-2xl">Order List</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Delivery Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.code}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="font-semibold">
                {order.grand_total}
              </TableCell>
              <TableCell>
                <Badge variant={getPaymentStatusVariant(order.payment_status)}>
                  {order.payment_status_string}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={getDeliveryStatusVariant(order.delivery_status)}
                >
                  {order.delivery_status_string}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
