"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  AlertTriangle,
  Package,
  DollarSign,
  RotateCcw,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  costPerUnit: number;
  lastUpdated: string;
}

function getStockStatus(item: InventoryItem): "in_stock" | "low_stock" | "out_of_stock" {
  if (item.quantity === 0) return "out_of_stock";
  if (item.quantity <= item.minStock) return "low_stock";
  return "in_stock";
}

const stockStatusConfig: Record<
  string,
  { label: string; className: string; icon: React.ElementType }
> = {
  in_stock: {
    label: "In Stock",
    className: "bg-green-100 text-green-800 border-green-200",
    icon: Package,
  },
  low_stock: {
    label: "Low Stock",
    className: "bg-amber-100 text-amber-800 border-amber-200",
    icon: AlertTriangle,
  },
  out_of_stock: {
    label: "Out of Stock",
    className: "bg-red-100 text-red-800 border-red-200",
    icon: AlertTriangle,
  },
};

export default function AdminInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [restockDialogOpen, setRestockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [restockQty, setRestockQty] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Cleaning Solutions",
    quantity: "",
    unit: "bottles",
    minStock: "",
    costPerUnit: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await fetch("/api/admin/inventory");
        const data = await res.json();
        setInventory(data);
      } catch {
        setInventory([]);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  const filteredInventory = useMemo(() => {
    if (!searchQuery.trim()) return inventory;
    const q = searchQuery.toLowerCase();
    return inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [inventory, searchQuery]);

  const stats = useMemo(() => {
    const lowStock = inventory.filter(
      (item) => getStockStatus(item) === "low_stock"
    );
    const outOfStock = inventory.filter(
      (item) => getStockStatus(item) === "out_of_stock"
    );
    const totalValue = inventory.reduce(
      (sum, item) => sum + item.quantity * item.costPerUnit,
      0
    );
    return {
      totalItems: inventory.length,
      lowStockCount: lowStock.length,
      outOfStockCount: outOfStock.length,
      totalValue: totalValue.toFixed(2),
    };
  }, [inventory]);

  const handleRestock = () => {
    if (!selectedItem || !restockQty) return;
    const qty = Number(restockQty);
    if (qty <= 0) return;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      )
    );

    setRestockDialogOpen(false);
    setSelectedItem(null);
    setRestockQty("");
    toast({
      title: "Restocked successfully",
      description: `Added ${qty} units to ${selectedItem.name}.`,
    });
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.costPerUnit) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const item: InventoryItem = {
      id: inventory.length + 100,
      name: newItem.name,
      category: newItem.category,
      quantity: Number(newItem.quantity),
      unit: newItem.unit,
      minStock: Number(newItem.minStock) || 5,
      costPerUnit: Number(newItem.costPerUnit),
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setInventory((prev) => [...prev, item]);
    setAddDialogOpen(false);
    setNewItem({
      name: "",
      category: "Cleaning Solutions",
      quantity: "",
      unit: "bottles",
      minStock: "",
      costPerUnit: "",
    });
    toast({
      title: "Item added!",
      description: `${item.name} has been added to inventory.`,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Inventory
          </h2>
          <p className="text-muted-foreground mt-1">
            Track and manage cleaning supplies and equipment
          </p>
        </div>
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Items</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.totalItems}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Low Stock</p>
              <p className="text-xl font-bold text-amber-700">
                {stats.lowStockCount}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-red-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Out of Stock</p>
              <p className="text-xl font-bold text-red-700">
                {stats.outOfStockCount}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Value</p>
              <p className="text-xl font-bold text-gray-900">
                ${stats.totalValue}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search items by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80">
                  <TableHead className="font-semibold">Item Name</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="font-semibold">Quantity</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">
                    Unit
                  </TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">
                    Min Stock
                  </TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">
                    Cost/Unit
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">
                    Updated
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No inventory items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => {
                    const status = getStockStatus(item);
                    const cfg = stockStatusConfig[status];
                    const StatusIcon = cfg.icon;
                    const isLowOrOut =
                      status === "low_stock" || status === "out_of_stock";
                    return (
                      <TableRow
                        key={item.id}
                        className={cn(
                          isLowOrOut && "bg-amber-50/50"
                        )}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {isLowOrOut && (
                              <AlertTriangle
                                className={cn(
                                  "w-4 h-4 shrink-0",
                                  status === "out_of_stock"
                                    ? "text-red-500"
                                    : "text-amber-500"
                                )}
                              />
                            )}
                            <span
                              className={cn(
                                "text-sm font-medium",
                                isLowOrOut && "text-gray-900"
                              )}
                            >
                              {item.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "text-sm font-bold",
                              status === "out_of_stock"
                                ? "text-red-600"
                                : status === "low_stock"
                                ? "text-amber-600"
                                : "text-gray-900"
                            )}
                          >
                            {item.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {item.unit}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {item.minStock}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm">
                          ${item.costPerUnit.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[11px] font-medium",
                              cfg.className
                            )}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {formatDate(item.lastUpdated)}
                        </TableCell>
                        <TableCell className="text-right">
                          {isLowOrOut && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-[#1B4332] hover:text-[#1B4332] hover:bg-emerald-50 h-8 text-xs"
                              onClick={() => {
                                setSelectedItem(item);
                                setRestockDialogOpen(true);
                              }}
                            >
                              <RotateCcw className="w-3.5 h-3.5 mr-1" />
                              Restock
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Restock Dialog */}
      <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Restock Item</DialogTitle>
            <DialogDescription>
              Add quantity to {selectedItem?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {selectedItem && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                <p className="text-sm font-semibold">{selectedItem.name}</p>
                <p className="text-xs text-muted-foreground">
                  Current stock:{" "}
                  <span className="font-semibold text-amber-600">
                    {selectedItem.quantity} {selectedItem.unit}
                  </span>{" "}
                  (Min: {selectedItem.minStock})
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="restock-qty">Quantity to Add *</Label>
              <Input
                id="restock-qty"
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={restockQty}
                onChange={(e) => setRestockQty(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRestockDialogOpen(false);
                setRestockQty("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRestock}
              className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
            >
              <Package className="w-4 h-4 mr-1" />
              Restock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to the inventory
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name *</Label>
              <Input
                id="item-name"
                placeholder="e.g. Wood Polish"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(val) =>
                    setNewItem((prev) => ({ ...prev, category: val }))
                  }
                >
                  <SelectTrigger id="item-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cleaning Solutions">
                      Cleaning Solutions
                    </SelectItem>
                    <SelectItem value="Tools & Equipment">
                      Tools & Equipment
                    </SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-unit">Unit</Label>
                <Select
                  value={newItem.unit}
                  onValueChange={(val) =>
                    setNewItem((prev) => ({ ...prev, unit: val }))
                  }
                >
                  <SelectTrigger id="item-unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottles">Bottles</SelectItem>
                    <SelectItem value="pcs">Pieces</SelectItem>
                    <SelectItem value="boxes">Boxes</SelectItem>
                    <SelectItem value="pairs">Pairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-qty">Quantity *</Label>
                <Input
                  id="item-qty"
                  type="number"
                  placeholder="0"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-min">Min Stock</Label>
                <Input
                  id="item-min"
                  type="number"
                  placeholder="5"
                  value={newItem.minStock}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      minStock: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-cost">Cost/Unit *</Label>
                <Input
                  id="item-cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newItem.costPerUnit}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      costPerUnit: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddItem}
              className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
