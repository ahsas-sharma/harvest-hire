import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
export default function OrderConfirmation({ toggle }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    toggle();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0  bottom-20 flex items-center justify-center">
      <div className="absolute rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              aria-hidden="true"
              className="h-5 w-5 text-green-400"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Order completed
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                pariatur, ipsum similique veniam.
              </p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  View status
                </button>
                <button
                  type="button"
                  className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  onClick={handleClick}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
