"use client";
import React, { useEffect, useState, Fragment } from "react";
import { ReviewInterface, ProductInterface } from "../types/interfacesModels";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

/*
const itemExample = {
  "product_id": 101,
  "name": "Embroidery Thread Set",
  "price": 19.99,
  "stock": 45,
  "description": "A set of 50 assorted threads, perfect for hand embroidery and other creative sewing projects.",
  "big_picture": "https://example.com/images/embroidery-thread-big.jpg",
  "small_picture": "https://example.com/images/embroidery-thread-small.jpg",
  "category": "Embroidery",
  "Artisan_Artisan_id": 12
}

*/ 

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ProductInterface;
  onSubmit: (review: ReviewInterface) => void;
}

export function ModalReviews({
  isOpen,
  onClose,
  item,
  onSubmit,
}: ReviewModalProps) {
    const listOtherReviews: ReviewInterface[] = [
  {
    "review_id": 1,
    "content": "I loved the variety of colors. Perfect for beginners and experts.",
    "date": "2025-09-24",
    "product_product_id": 101,
    "user_user_id": 201
  },
  {
    "review_id": 2,
    "content": "The threads are strong and of good quality. I'll buy again.",
    "date": "2025-09-22",
    "product_product_id": 101,
    "user_user_id": 202
  },
  {
    "review_id": 3,
    "content": "I bought a watercolor painting kit, but the colors were opaque and didn’t mix well.",
    "date": "2025-09-20",
    "product_product_id": 102,
    "user_user_id": 203
  },
  {
    "review_id": 4,
    "content": "The modeling tools arrived on time and were well packaged.",
    "date": "2025-09-18",
    "product_product_id": 103,
    "user_user_id": 204
  },
  {
    "review_id": 5,
    "content": "The decoupage glue didn't work as expected. It's too runny.",
    "date": "2025-09-15",
    "product_product_id": 104,
    "user_user_id": 205
  }
]

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <DialogTitle className="text-lg font-bold text-teal-700">
                Leave a Review
              </DialogTitle>

              <div className="mt-4">

                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Write your review..."
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded bg-teal-700 text-white">
                  Submit
                </button>
              </div>


              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold text-teal-700 mb-2">
                  Other users have shared their opinions:
                </h3>
                <div className="space-y-4">
                  {listOtherReviews
                    .filter((review) => review.product_product_id === item.product_id)
                    .map((review) => (
                      <div key={review.review_id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-700">{review.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          <em>Reviewed on {new Date(review.date).toLocaleDateString()}</em>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
