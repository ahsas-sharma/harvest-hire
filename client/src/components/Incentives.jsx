import FarmImage from "../assets/equip3.jpg";
import FlexibleRentalImg from "../assets/flexible-rental.png";
import MaintenanceImg from "../assets/maintenance.png";
import DeliveryImg from "../assets/delivery.png";

const incentives = [
  {
    name: "Flexible Rental Periods",
    imageSrc: FlexibleRentalImg,
    description:
      "Rent equipment for as long as you need, whether it's just a day or several months. We adapt to your project timelines.",
  },
  {
    name: "Maintenance Included",
    imageSrc: MaintenanceImg,
    description:
      "We handle all maintenance and repairs, so you can focus on your work without worrying about equipment downtime.",
  },
  {
    name: "Delivery and Pickup",
    imageSrc: DeliveryImg,
    description:
      "Convenient delivery and pickup services available directly to your site, ensuring you get the equipment when and where you need it.",
  },
];

export default function Incentives() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Dedicated to Exceptional Service and Quality
              </h2>
              <p className="mt-4 text-gray-500">
                At HarvestHire, we founded our business with a commitment to
                providing the best customer service and top-quality equipment to
                meet the diverse needs of our clients. Our ongoing mission is to
                support your projects with reliable machinery and transparent,
                fair pricing—ensuring you receive value every step of the way.
                Trust us to be your partner in achieving success through
                efficient and effective solutions.
              </p>
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
              <img
                alt=""
                src={FarmImage}
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:flex-shrink-0">
                  <img alt="" src={incentive.imageSrc} className="h-16 w-16" />
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
