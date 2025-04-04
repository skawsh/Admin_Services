
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RevenueTable } from '@/components/revenue/RevenueTable';
import { RevenueOrder, RevenueUpdateEvent } from '@/components/revenue/types/RevenueTypes';

interface RevenueTableSectionProps {
  allOrders: RevenueOrder[];
  pendingOrders: RevenueOrder[];
  paidOrders: RevenueOrder[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  onRevenueUpdate?: (event: RevenueUpdateEvent) => void;
}

export const RevenueTableSection: React.FC<RevenueTableSectionProps> = ({
  allOrders,
  pendingOrders,
  paidOrders,
  activeTab,
  setActiveTab,
  onRevenueUpdate
}) => {
  return (
    <div className="mt-8">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Payments Pending</TabsTrigger>
            <TabsTrigger value="paid">Payments Received</TabsTrigger>
          </TabsList>
          <Button variant="outline">Export Data</Button>
        </div>
        
        <TabsContent value="all">
          <RevenueTable orders={allOrders} onRevenueUpdate={onRevenueUpdate} />
        </TabsContent>
        
        <TabsContent value="pending">
          <RevenueTable orders={pendingOrders} onRevenueUpdate={onRevenueUpdate} />
        </TabsContent>
        
        <TabsContent value="paid">
          <RevenueTable orders={paidOrders} onRevenueUpdate={onRevenueUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
