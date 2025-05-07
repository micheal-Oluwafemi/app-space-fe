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
    link: "/dashboard/store/chat-settings",
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

export const productMockData = [
  {
    ref: "9eoihoed83e9ueu203",
    collection: "Food & Beverages",
    primary_name: "Pizza",
    price: 30822,
    variation: "Happy",
    status: "Success",
    in_stock: "Courier",
    channel: "pass",
  },
  {
    ref: "7kj4h3k2j4h32k4",
    collection: "Electronics",
    primary_name: "Smartphone",
    price: 89999,
    variation: "Pro",
    status: "Pending",
    in_stock: "Store",
    channel: "online",
  },
  {
    ref: "2p9i8u7y6t5r4e3",
    collection: "Fashion",
    primary_name: "T-Shirt",
    price: 2499,
    variation: "Large",
    status: "Success",
    in_stock: "Warehouse",
    channel: "retail",
  },
  {
    ref: "5m4n3b2v1c9x8z",
    collection: "Home & Living",
    primary_name: "Coffee Maker",
    price: 12999,
    variation: "Deluxe",
    status: "Processing",
    in_stock: "Courier",
    channel: "direct",
  },
  {
    ref: "1q2w3e4r5t6y7u",
    collection: "Sports",
    primary_name: "Running Shoes",
    price: 8999,
    variation: "Sport",
    status: "Success",
    in_stock: "Store",
    channel: "wholesale",
  },
];

export const customerMockData = [
  {
    name: "John Smith",
    phone: "+1-555-123-4567",
    email: "john.smith@email.com",
    username: "johnsmith",
    status: "Active",
  },
  {
    name: "Sarah Johnson",
    phone: "+1-555-234-5678",
    email: "sarah.j@email.com",
    username: "sarahj",
    status: "Inactive",
  },
  {
    name: "Michael Brown",
    phone: "+1-555-345-6789",
    email: "michael.b@email.com",
    username: "mikebrown",
    status: "Inactive",
  },
  {
    name: "Emily Davis",
    phone: "+1-555-456-7890",
    email: "emily.davis@email.com",
    username: "emilyd",
    status: "Active",
  },
  {
    name: "David Wilson",
    phone: "+1-555-567-8901",
    email: "david.w@email.com",
    username: "davidw",
    status: "Active",
  },
];

export const orderMockData = [
  {
    order_number: "ORD-2023-001",
    date: "2023-10-15",
    customer: "John Smith",
    total: 299.99,
    products: "Running Shoes, Sports Watch",
    payment_status: "success",
    fulfillment_status: "pending",
    delivery_method: "Express Shipping",
    channel: "online",
  },
  {
    order_number: "ORD-2023-002",
    date: "2023-10-14",
    customer: "Sarah Johnson",
    total: 159.5,
    products: "Yoga Mat, Water Bottle",
    payment_status: "pending",
    fulfillment_status: "pending",
    delivery_method: "Standard Shipping",
    channel: "retail",
  },
  {
    order_number: "ORD-2023-003",
    date: "2023-10-13",
    customer: "Michael Brown",
    total: 499.99,
    products: "Tennis Racket, Sports Bag, Tennis Balls",
    payment_status: "failed",
    fulfillment_status: "failed",
    delivery_method: "Store Pickup",
    channel: "wholesale",
  },
  {
    order_number: "ORD-2023-004",
    date: "2023-10-12",
    customer: "Emily Davis",
    total: 89.99,
    products: "Fitness Tracker",
    payment_status: "success",
    fulfillment_status: "success",
    delivery_method: "Standard Shipping",
    channel: "online",
  },
  {
    order_number: "ORD-2023-005",
    date: "2023-10-11",
    customer: "David Wilson",
    total: 199.99,
    products: "Basketball, Sports Shoes",
    payment_status: "success",
    fulfillment_status: "success",
    delivery_method: "Express Shipping",
    channel: "retail",
  },
];
