
import React, { useState } from 'react';
import { StudioService } from '@/types/services';
import { Card } from '../ui/card';
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useServicesData } from '@/hooks/useServicesData';

interface StudioServicesDetailsProps {
  studioServices: StudioService[];
  onServiceStatusChange: (serviceIndex: number) => void;
  onSubServiceStatusChange?: (serviceIndex: number, subServiceIndex: number, active: boolean) => void;
  onClothingItemStatusChange?: (serviceIndex: number, subServiceIndex: number, itemId: string, active: boolean) => void;
}

const StudioServicesDetails: React.FC<StudioServicesDetailsProps> = ({
  studioServices,
  onServiceStatusChange,
  onSubServiceStatusChange,
  onClothingItemStatusChange
}) => {
  const { services, subServices, clothingItems } = useServicesData();
  const [expandedServices, setExpandedServices] = useState<{[key: string]: boolean}>({});
  
  // Helper functions to get names from IDs
  const getSubServiceName = (id: string) => {
    const subService = subServices.find(s => s.id === id);
    return subService ? subService.name : id;
  };

  const getClothingItemName = (id: string) => {
    const item = clothingItems.find(i => i.id === id);
    return item ? item.name : id;
  };

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Studio Services</h2>
      {studioServices.map((service, serviceIndex) => {
        const isExpanded = expandedServices[service.id] !== false; // Default to expanded
        
        return (
          <Card key={service.id} className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleServiceExpansion(service.id)}>
                <div className="flex items-center gap-3">
                  {isExpanded ? 
                    <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <Badge variant={service.active ? "success" : "secondary"}>
                    {service.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <Switch
                  checked={service.active}
                  onCheckedChange={() => onServiceStatusChange(serviceIndex)}
                  onClick={(e) => e.stopPropagation()} // Prevent triggering collapse
                />
              </div>
              
              {isExpanded && (
                <div className="pl-4 space-y-6 mt-4">
                  {service.subServices.map((subService, subIndex) => (
                    <div key={subIndex} className="border p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-lg">{getSubServiceName(subService.name)}</h4>
                          {onSubServiceStatusChange && (
                            <Badge variant={subService.active !== false ? "success" : "secondary"}>
                              {subService.active !== false ? 'Active' : 'Inactive'}
                            </Badge>
                          )}
                        </div>
                        {onSubServiceStatusChange && (
                          <Switch
                            checked={subService.active !== false}
                            onCheckedChange={(checked) => 
                              onSubServiceStatusChange(serviceIndex, subIndex, checked)
                            }
                          />
                        )}
                      </div>
                      
                      {/* Pricing Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Per KG Pricing */}
                        <div className="border rounded-md p-3 bg-white">
                          <h5 className="font-medium mb-2 text-gray-700">Per KG Pricing</h5>
                          <div className="grid grid-cols-2 gap-3">
                            {subService.standardPricePerKg !== undefined && (
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Standard:</span>
                                <span className="font-medium">₹{subService.standardPricePerKg}</span>
                              </div>
                            )}
                            {subService.expressPricePerKg !== undefined && (
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Express:</span>
                                <span className="font-medium">₹{subService.expressPricePerKg}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Per Item Pricing */}
                        <div className="border rounded-md p-3 bg-white">
                          <h5 className="font-medium mb-2 text-gray-700">Per Item Pricing</h5>
                          <div className="grid grid-cols-2 gap-3">
                            {subService.standardPricePerItem !== undefined && (
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Standard:</span>
                                <span className="font-medium">₹{subService.standardPricePerItem}</span>
                              </div>
                            )}
                            {subService.expressPricePerItem !== undefined && (
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Express:</span>
                                <span className="font-medium">₹{subService.expressPricePerItem}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Clothing Items Section */}
                      {subService.selectedItems && subService.selectedItems.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-3 text-gray-700">Clothing Items</h5>
                          <div className="space-y-3">
                            {subService.selectedItems.map((itemId, itemIndex) => {
                              const itemActive = subService.clothingItemsStatus?.[itemId] !== false;
                              
                              return (
                                <div key={itemIndex} className="flex flex-col border rounded-md p-3 bg-white">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium">{getClothingItemName(itemId)}</div>
                                    {onClothingItemStatusChange && (
                                      <div className="flex items-center gap-2">
                                        <Badge variant={itemActive ? "success" : "secondary"} className="mr-2">
                                          {itemActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <Switch
                                          checked={itemActive}
                                          onCheckedChange={(checked) => 
                                            onClothingItemStatusChange(serviceIndex, subIndex, itemId, checked)
                                          }
                                          className="ml-auto"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    {subService.standardItemPrices && subService.standardItemPrices[itemId] !== undefined && (
                                      <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Standard Price:</span>
                                        <span className="font-medium">₹{subService.standardItemPrices[itemId]}</span>
                                      </div>
                                    )}
                                    {subService.expressItemPrices && subService.expressItemPrices[itemId] !== undefined && (
                                      <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Express Price:</span>
                                        <span className="font-medium">₹{subService.expressItemPrices[itemId]}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StudioServicesDetails;
