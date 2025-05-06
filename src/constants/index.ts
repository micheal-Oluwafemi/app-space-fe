import {
  ArrowRightLeft,
  Bot,
  Globe,
  Landmark,
  ShoppingBag,
  Tags,
  Truck,
  UserRound,
} from "lucide-react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";

export const businessTypes = [
  {
    value: "Food & Beverages",
    name: "Food & Beverages (Cafes, Restaurants, Bars)",
  },
  { value: "Fashion & Beauty", name: "Fashion & Beauty (Makeup, hair, bags)" },
  { value: "Grocery", name: "Grocery (Fruits & Vegetables, Butchery)" },
  { value: "Retail", name: "Retail (E-commerce, Home & Living, etc.)" },
  { value: "B2B", name: "B2B (Wholesale, Supplier, etc.)" },
  {
    value: "Digital Creators",
    name: "Digital Creators (Events, Tickets, Courses)",
  },
  { value: "Service", name: "Service (Spa, Salon, etc.)" },
  { value: "Others", name: "Others" },
];

export const productType = [
  {
    value: "Physical",
  },
  {
    value: "Digital",
  },
  {
    value: "Service",
  },
  {
    value: "Online",
  },
  {
    value: "Subscription",
  },
  {
    value: "Hybrid",
  },
  {
    value: "Other",
  },
];

export const menuItems = [
  {
    title: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    link: "/dashboard",
  },
  {
    title: "Products",
    icon: Tags,
    link: "/dashboard/products",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    link: "/dashboard/orders",
  },
  {
    title: "Customers",
    icon: UserRound,
    link: "/dashboard/customers",
  },
  {
    title: "Transactions",
    icon: ArrowRightLeft,
    link: "/dashboard/transactions",
  },
  {
    title: "Coupons",
    icon: RiCoupon2Line,
    link: "/dashboard/coupons",
  },
  {
    title: "Delivery",
    icon: Truck,
    link: "/dashboard/delivery",
  },
];

export const storeMenuItems = [
  {
    title: "Store Information",
    icon: ShoppingBag,
    link: "/dashboard/store/information",
  },
  {
    title: "Bank Details",
    icon: Landmark,
    link: "/dashboard/store/bank-details",
  },
  {
    title: "Domains",
    icon: Globe,
    link: "/dashboard/store/domains",
  },
  {
    title: "Customer Support",
    icon: Bot,
    link: "/dashboard/store/chat",
  },
];

export const transactionMockData = [
  {
    ref: "9eoihoed83e9ueu203",
    date: "12th, April 2005",
    total: 30822,
    payment_status: "Success",
    fulfillment_status: "Success",
    delivery_method: "Courier",
    channel: "pass",
  },
];
