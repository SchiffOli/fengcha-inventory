export const initialInventory = [
  { id: 1, name: "Jasmine Tea Leaves", category: "Tea Leaves", currentStock: 45, unit: "lbs", minLevel: 20, status: "In Stock", lastRestocked: "Apr 5" },
  { id: 2, name: "Oolong Tea", category: "Tea Leaves", currentStock: 12, unit: "lbs", minLevel: 15, status: "Low Stock", lastRestocked: "Mar 28" },
  { id: 3, name: "Matcha Powder", category: "Powders", currentStock: 8, unit: "lbs", minLevel: 10, status: "Low Stock", lastRestocked: "Apr 1" },
  { id: 4, name: "Tapioca Pearls", category: "Toppings", currentStock: 55, unit: "lbs", minLevel: 15, status: "In Stock", lastRestocked: "Apr 7" },
  { id: 5, name: "Oat Milk", category: "Dairy", currentStock: 18, unit: "gal", minLevel: 10, status: "In Stock", lastRestocked: "Apr 6" },
  { id: 6, name: "Whole Milk", category: "Dairy", currentStock: 3, unit: "gal", minLevel: 8, status: "Low Stock", lastRestocked: "Apr 3" },
  { id: 7, name: "Brown Sugar", category: "Syrups", currentStock: 30, unit: "lbs", minLevel: 10, status: "In Stock", lastRestocked: "Apr 4" },
  { id: 8, name: "Taro Powder", category: "Powders", currentStock: 0, unit: "lbs", minLevel: 5, status: "Out of Stock", lastRestocked: "Mar 20" },
  { id: 9, name: "Black Tea", category: "Tea Leaves", currentStock: 40, unit: "lbs", minLevel: 20, status: "In Stock", lastRestocked: "Apr 9" },
  { id: 10, name: "Coconut Jelly", category: "Toppings", currentStock: 25, unit: "lbs", minLevel: 10, status: "In Stock", lastRestocked: "Apr 2" },
];

export const initialShipments = [
  { id: 1, shipmentId: "SH-001", items: "Jasmine Tea Leaves (50 lbs)", vendor: "Yunnan Farms", status: "In Transit", shipDate: "Apr 8", eta: "Apr 12", progress: 65 },
  { id: 2, shipmentId: "SH-002", items: "Tapioca Pearls (30 lbs)", vendor: "Pearl Co.", status: "Delivered", shipDate: "Apr 3", eta: "Apr 8", progress: 100 },
  { id: 3, shipmentId: "SH-003", items: "Oat Milk (20 gal)", vendor: "Oatly Supply", status: "Delayed", shipDate: "Apr 5", eta: "Apr 15", progress: 30 },
  { id: 4, shipmentId: "SH-004", items: "Brown Sugar (25 lbs)", vendor: "Sweet Source", status: "Processing", shipDate: "Apr 9", eta: "Apr 18", progress: 10 },
  { id: 5, shipmentId: "SH-005", items: "Matcha Powder (15 lbs)", vendor: "Uji Imports", status: "In Transit", shipDate: "Apr 7", eta: "Apr 14", progress: 50 },
  { id: 6, shipmentId: "SH-006", items: "Whole Milk (10 gal)", vendor: "Local Dairy", status: "Delivered", shipDate: "Apr 1", eta: "Apr 1", progress: 100 },
  { id: 7, shipmentId: "SH-007", items: "Taro Powder (20 lbs)", vendor: "Taro Farm", status: "Delayed", shipDate: "Apr 2", eta: "Apr 2", progress: 20 },
  { id: 8, shipmentId: "SH-008", items: "Black Tea (40 lbs)", vendor: "Ceylon Direct", status: "In Transit", shipDate: "Apr 9", eta: "Apr 16", progress: 45 },
];

export const initialVendors = [
  { id: 1, name: "Yunnan Farms", contact: "Li Wei", email: "li@yunnanfarms.cn", phone: "+86-xxx", status: "Active", products: ["Jasmine Tea", "Black Tea", "Oolong"], leadTime: 14, rating: 4.5, totalOrders: 45 },
  { id: 2, name: "Pearl Co.", contact: "Sarah Kim", email: "sarah@pearlco.com", phone: "+1-xxx", status: "Active", products: ["Tapioca Pearls", "Coconut Jelly"], leadTime: 7, rating: 4.8, totalOrders: 32 },
  { id: 3, name: "Oatly Supply", contact: "Mike Johnson", email: "mike@oatly.com", phone: "+1-xxx", status: "Active", products: ["Oat Milk"], leadTime: 5, rating: 4.2, totalOrders: 28 },
  { id: 4, name: "Sweet Source", contact: "Ana Garcia", email: "ana@sweetsource.com", phone: "+1-xxx", status: "Active", products: ["Brown Sugar", "Honey"], leadTime: 10, rating: 4.6, totalOrders: 19 },
  { id: 5, name: "Uji Imports", contact: "Ken Tanaka", email: "ken@ujiimports.jp", phone: "+81-xxx", status: "Active", products: ["Matcha Powder"], leadTime: 21, rating: 4.9, totalOrders: 15 },
  { id: 6, name: "Local Dairy", contact: "Bob Smith", email: "bob@localdairy.com", phone: "+1-xxx", status: "Active", products: ["Whole Milk", "Oat Milk"], leadTime: 2, rating: 3.8, totalOrders: 52 },
];

export const initialAlerts = [
  { id: 1, type: "Critical", title: "Out of Stock: Taro Powder", message: "Taro Powder inventory has reached 0 lbs. Immediate reorder required to fulfill pending orders.", category: "Stock", time: "10 mins ago", read: false },
  { id: 2, type: "Critical", title: "Shipment Delayed: Oat Milk", message: "Shipment SH-003 from Oatly Supply is delayed by 10 days. Expected ETA is now Apr 15.", category: "Shipment", time: "1 hour ago", read: false },
  { id: 3, type: "Warning", title: "Expiring Soon: Whole Milk", message: "3 gallons of Whole Milk will expire in 48 hours. Consider running a promotion or prioritizing usage.", category: "Expiry", time: "2 hours ago", read: false },
  { id: 4, type: "Warning", title: "Low Stock: Matcha Powder", message: "Matcha Powder is below the minimum threshold (8 lbs remaining). Reorder recommended.", category: "Stock", time: "3 hours ago", read: false },
  { id: 5, type: "Warning", title: "Low Stock: Oolong Tea", message: "Oolong Tea is below the minimum threshold (12 lbs remaining). Reorder recommended.", category: "Stock", time: "4 hours ago", read: false },
  { id: 6, type: "Info", title: "Shipment Delivered: Tapioca Pearls", message: "Shipment SH-002 from Pearl Co. has been delivered. Stock updated automatically.", category: "Shipment", time: "5 hours ago", read: true },
  { id: 7, type: "Info", title: "Reorder Placed: Brown Sugar", message: "A reorder for Brown Sugar has been placed with Sweet Source. ETA: Apr 18.", category: "Stock", time: "6 hours ago", read: true },
];