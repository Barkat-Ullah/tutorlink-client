import PaymentHistory from '@/components/module/student/PaymentHistory';
import { getOrder } from '@/services/OrderServices';
import React from 'react';

const Payment = async() => {
    const payments = await getOrder()
    return (
        <div>
            <PaymentHistory payments={payments}/>
        </div>
    );
};

export default Payment;