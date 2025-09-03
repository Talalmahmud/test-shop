// components/orders-table-simple.tsx
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

interface OrdersTableSimpleProps {
  orders: Order[];
}

export default async function OrdersTableSimple() {
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

  const orders = await getOrder();
  return (
    <div className="">
      <p className=" text-center py-4 font-bold text-2xl">Order List</p>
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
          {orders.data.map((order: Order) => (
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
