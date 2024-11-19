import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useFetch } from '@/hooks/FetchContext'


export default function InvoiceModal({id, amount, payment_status, setLoading}) {

  const [isOpen, setIsOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('initial') // 'initial', 'processing', 'success', 'failed'
  const { toast } = useToast()
  const {put: postTransaction } = useFetch()


  const handlePayment = () => {
    if (phoneNumber.trim() === '') {
      alert('Please enter a phone number')
      return
    }
    setPaymentStatus('processing')
    toast({
      title: "Info",
      description: "Please Check Your Phone to Complete the Payment!",
    })

    async function sendstk() {
      const data = {
          "amount": amount,
          "phone": phoneNumber
      };
  
      try {
          const response = await fetch("https://dns1.boogiecoin.org", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Api-Secret': 'gbv67890'
              },
              body: JSON.stringify(data)
          });
  
          const result = await response.json();
          
          if (result.Status) {
            setPaymentStatus('success')
            await postTransaction(`transactions/${id}`, {"payment_status": "Paid"})
            setLoading(null)
          } else {
            setPaymentStatus('failed')
            

            toast({
              title: "Declined",
              description: "Payment Declined!",
              variant: "destructive",
            })
        
          }
        } catch (error) {
          toast({
            title: "Order",
            description: "Order Failed try again LATER!",
            variant: "destructive",
          })
      }
  }
  sendstk()
  }

  const resetModal = () => {
    setPhoneNumber('')
    setPaymentStatus('initial')
    setIsOpen(false)
  }

  return (
    <div className="flex items-center justify-center ">
      <Button onClick={() => setIsOpen(payment_status == 'Paid' ? false : true)} 
       className={payment_status == 'Paid' ? "bg-green-700" : null}>
        
        {payment_status == 'Paid' ? "Paid" : "Pay Invoice"}
        </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invoice Order</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-center">Your invoice is #{id}</p>
            <p className="text-center font-bold">Amount: KES {amount}</p>
            <p className="text-center">Please enter phone number to pay:</p>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                className="col-span-3"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
              />
            </div>
          </div>
          <DialogFooter>
            {paymentStatus === 'initial' && (
              <Button onClick={handlePayment}>Pay Now</Button>
            )}
            {paymentStatus === 'processing' && (
              <Button disabled>Please wait...</Button>
            )}
            {paymentStatus === 'success' && (
              <>
                <p className="text-green-600 font-bold">Order purchased successfully!</p>
                <Button onClick={resetModal}>Close</Button>
              </>
            )}
            {paymentStatus === 'failed' && (
              <>
                <p className="text-red-600 font-bold">Payment declined. Please try again.</p>
                <Button onClick={() => setPaymentStatus('initial')}>Retry</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}