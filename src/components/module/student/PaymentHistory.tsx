"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrderByUser } from "@/services/OrderServices";

interface Payment {
  id: string;
  amount: number;
  status: string;
  date: string;
}

const PaymentHistory = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user?.userId) return;

      try {
        setLoading(true);
        const orders = await getOrderByUser(user.userId);

        if (orders && orders.data) {
          // Transform orders to payment format if needed
          const paymentData = orders.data.map((order: any) => ({
            id: order.id || `order-${Math.random().toString(36).substr(2, 9)}`,
            amount: order.totalPrice || 0,
            status: order.paymentStatus || "Pending",
            date: order.createdAt || new Date().toISOString(),
          }));

          setPayments(paymentData);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user?.userId]);

  return (
    <Card className="p-4 max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Payment History</h2>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Amount</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Add unique keys for skeleton rows
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  </TableRow>
                ))
            ) : payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id || `payment-${Math.random()}`}>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    ${payment?.amount ? payment.amount.toFixed(2) : "0.00"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-md ${
                        payment.status === "Paid"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="no-data">
                <TableCell colSpan={3} className="text-center py-4">
                  No payment history found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default PaymentHistory;
