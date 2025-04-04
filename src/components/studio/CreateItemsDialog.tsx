
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service, SubService, ClothingItem } from '@/types/services';
import { useToast } from "@/hooks/use-toast";
import { useServicesData } from "@/hooks/useServicesData";

interface CreateItemsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  services: Service[];
  subServices: SubService[];
  clothingItems: ClothingItem[];
  onItemsCreated?: (newServices: Service[], newSubServices: SubService[], newClothingItems: ClothingItem[]) => void;
}

const CreateItemsDialog: React.FC<CreateItemsDialogProps> = ({
  isOpen,
  onOpenChange,
  services,
  subServices,
  clothingItems,
  onItemsCreated
}) => {
  const [activeTab, setActiveTab] = useState<string>("service");
  const [serviceName, setServiceName] = useState<string>("");
  const [subServiceName, setSubServiceName] = useState<string>("");
  const [clothingItemName, setClothingItemName] = useState<string>("");
  
  // Local state to track newly created items, so we can show them immediately
  const [localServices, setLocalServices] = useState<Service[]>(services);
  const [localSubServices, setLocalSubServices] = useState<SubService[]>(subServices);
  const [localClothingItems, setLocalClothingItems] = useState<ClothingItem[]>(clothingItems);
  
  const { toast } = useToast();
  const { addService, addSubService, addClothingItem } = useServicesData();

  // Update local state when props change
  useEffect(() => {
    setLocalServices(services);
    setLocalSubServices(subServices);
    setLocalClothingItems(clothingItems);
  }, [services, subServices, clothingItems]);

  const handleCreateService = () => {
    if (serviceName.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Service name cannot be empty"
      });
      return;
    }

    // Pass the service name string instead of the whole object
    const success = addService(serviceName.trim());
    
    if (success) {
      // Update the local state to show the new service immediately
      // The actual ID will be different, but will be refreshed when the dialog reopens
      const newService: Service = {
        id: `temp-${Date.now()}`,
        name: serviceName.trim(),
        active: true
      };
      
      const updatedServices = [...localServices, newService];
      setLocalServices(updatedServices);
      
      // Notify parent component about new items
      if (onItemsCreated) {
        onItemsCreated(updatedServices, localSubServices, localClothingItems);
      }
      
      toast({
        title: "Success",
        description: `Service "${serviceName}" has been created`
      });
      setServiceName("");
    }
  };

  const handleCreateSubService = () => {
    if (subServiceName.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Sub-service name cannot be empty"
      });
      return;
    }

    // Pass the sub-service name string instead of the whole object
    const success = addSubService(subServiceName.trim());
    
    if (success) {
      // Update the local state to show the new sub-service immediately
      const newSubService: SubService = {
        id: `temp-${Date.now()}`,
        name: subServiceName.trim(),
        active: true
      };
      
      const updatedSubServices = [...localSubServices, newSubService];
      setLocalSubServices(updatedSubServices);
      
      // Notify parent component about new items
      if (onItemsCreated) {
        onItemsCreated(localServices, updatedSubServices, localClothingItems);
      }
      
      toast({
        title: "Success",
        description: `Sub-service "${subServiceName}" has been created`
      });
      setSubServiceName("");
    }
  };

  const handleCreateClothingItem = () => {
    if (clothingItemName.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Clothing item name cannot be empty"
      });
      return;
    }

    // Pass the clothing item name string instead of the whole object
    const success = addClothingItem(clothingItemName.trim());
    
    if (success) {
      // Update the local state to show the new clothing item immediately
      const newClothingItem: ClothingItem = {
        id: `temp-${Date.now()}`,
        name: clothingItemName.trim(),
        active: true
      };
      
      const updatedClothingItems = [...localClothingItems, newClothingItem];
      setLocalClothingItems(updatedClothingItems);
      
      // Notify parent component about new items
      if (onItemsCreated) {
        onItemsCreated(localServices, localSubServices, updatedClothingItems);
      }
      
      toast({
        title: "Success",
        description: `Clothing item "${clothingItemName}" has been created`
      });
      setClothingItemName("");
    }
  };

  const handleClose = () => {
    setServiceName("");
    setSubServiceName("");
    setClothingItemName("");
    setActiveTab("service");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] bg-white shadow-xl border-0">
        <DialogHeader className="text-center pb-2 border-b">
          <DialogTitle className="text-xl font-bold text-blue-600">Create New Items</DialogTitle>
          <p className="text-gray-500 text-sm mt-1">Add new services, sub-services, and clothing items</p>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="service">Service</TabsTrigger>
            <TabsTrigger value="subservice">Sub Service</TabsTrigger>
            <TabsTrigger value="clothingitem">Clothing Item</TabsTrigger>
          </TabsList>
          
          <TabsContent value="service" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Enter service name"
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={handleCreateService}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Create Service
            </Button>
            
            {localServices.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Existing Services</h4>
                <div className="max-h-[150px] overflow-y-auto bg-gray-50 rounded p-2 border">
                  {localServices.filter(s => s.active).map(service => (
                    <div key={service.id} className="py-1 px-2 border-b last:border-b-0">
                      {service.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="subservice" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subservice-name">Sub Service Name</Label>
              <Input
                id="subservice-name"
                value={subServiceName}
                onChange={(e) => setSubServiceName(e.target.value)}
                placeholder="Enter sub service name"
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={handleCreateSubService}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Create Sub Service
            </Button>
            
            {localSubServices.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Existing Sub Services</h4>
                <div className="max-h-[150px] overflow-y-auto bg-gray-50 rounded p-2 border">
                  {localSubServices.filter(s => s.active).map(subService => (
                    <div key={subService.id} className="py-1 px-2 border-b last:border-b-0">
                      {subService.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="clothingitem" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clothingitem-name">Clothing Item Name</Label>
              <Input
                id="clothingitem-name"
                value={clothingItemName}
                onChange={(e) => setClothingItemName(e.target.value)}
                placeholder="Enter clothing item name"
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={handleCreateClothingItem}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Create Clothing Item
            </Button>
            
            {localClothingItems.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Existing Clothing Items</h4>
                <div className="max-h-[150px] overflow-y-auto bg-gray-50 rounded p-2 border">
                  {localClothingItems.filter(c => c.active).map(clothingItem => (
                    <div key={clothingItem.id} className="py-1 px-2 border-b last:border-b-0">
                      {clothingItem.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4 pt-3 border-t">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="px-5 py-2 font-medium text-gray-700 hover:bg-gray-100 border-gray-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateItemsDialog;
