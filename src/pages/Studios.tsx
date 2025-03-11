
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Filter, BarChart2, Plus, Star, Search, ChevronDown, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Studio {
  id: number;
  studioId: string;
  studioName: string;
  ownerName: string;
  contact: string;
  services: number;
  rating: number;
  status: boolean;
}

const Studios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sample data
  const studiosData: Studio[] = [
    {
      id: 1,
      studioId: 'STU10001',
      studioName: 'Saiteja Laundry',
      ownerName: 'Saiteja',
      contact: '8099830308',
      services: 56,
      rating: 4.5,
      status: true
    },
    {
      id: 2,
      studioId: 'STU10002',
      studioName: 'Sparkle Clean Laundry',
      ownerName: 'Ravi Kumar',
      contact: '9876543210',
      services: 48,
      rating: 4.7,
      status: true
    },
    {
      id: 3,
      studioId: 'STU10003',
      studioName: 'Fresh & Clean',
      ownerName: 'Priya Sharma',
      contact: '7654321098',
      services: 42,
      rating: 4.3,
      status: true
    },
    {
      id: 4,
      studioId: 'STU10004',
      studioName: 'Express Wash',
      ownerName: 'Ajay Patel',
      contact: '9988776655',
      services: 38,
      rating: 4.1,
      status: true
    },
    {
      id: 5,
      studioId: 'STU10005',
      studioName: 'Royal Laundry',
      ownerName: 'Sneha Reddy',
      contact: '8765432109',
      services: 52,
      rating: 4.6,
      status: true
    },
    {
      id: 6,
      studioId: 'STU10006',
      studioName: 'Quick Clean',
      ownerName: 'Vikram Singh',
      contact: '9876123450',
      services: 35,
      rating: 3.9,
      status: false
    },
    {
      id: 7,
      studioId: 'STU10007',
      studioName: 'Urban Laundry',
      ownerName: 'Meera Desai',
      contact: '8123456789',
      services: 44,
      rating: 4.2,
      status: false
    },
    {
      id: 8,
      studioId: 'STU10008',
      studioName: 'Elite Washing',
      ownerName: 'Rahul Gupta',
      contact: '7890123456',
      services: 39,
      rating: 3.8,
      status: false
    }
  ];

  // Filtering and sorting logic
  const filteredStudios = studiosData.filter((studio) => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      studio.studioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studio.studioId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studio.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studio.contact.includes(searchTerm);
    
    // Status filter
    const matchesStatus = statusFilter === null || 
      (statusFilter === 'active' && studio.status) ||
      (statusFilter === 'inactive' && !studio.status);
    
    // Rating filter
    const matchesRating = ratingFilter === null ||
      (ratingFilter === 'above4.5' && studio.rating >= 4.5) ||
      (ratingFilter === '4to4.5' && studio.rating >= 4 && studio.rating < 4.5) ||
      (ratingFilter === 'below4' && studio.rating < 4);
    
    return matchesSearch && matchesStatus && matchesRating;
  }).sort((a, b) => {
    return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
  });

  // Calculate stats
  const totalStudios = studiosData.length;
  const activeStudios = studiosData.filter(s => s.status).length;
  const inactiveStudios = studiosData.filter(s => !s.status).length;
  const avgSackValue = 396; // Example value from the image

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter(null);
    setRatingFilter(null);
    setSortDirection('asc');
  };

  const toggleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Layout activeSection="studios">
      <div className="space-y-6">
        {/* Header Section - Updated to match design */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Laundry Studios</h1>
            <p className="text-gray-600 mt-1">Manage all laundry studios on your platform</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="bg-white" 
              onClick={resetFilters}
            >
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
            <Button 
              variant="outline" 
              className="bg-white"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Overall Analytics
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Add New Studio
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Total Studios</p>
                <p className="text-3xl font-bold">{totalStudios}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Active Studios</p>
                <p className="text-3xl font-bold text-green-500">{activeStudios}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Inactive Studios</p>
                <p className="text-3xl font-bold">{inactiveStudios}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Avg. Sack Value</p>
                <p className="text-3xl font-bold">₹{avgSackValue}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons and Filters */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-gray-500">Filter by:</p>
            <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-[120px]">
                <span className="flex items-center gap-2">
                  <span>Status</span>
                  <ChevronDown size={16} />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter || "all"} onValueChange={(value) => setRatingFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-[120px]">
                <span className="flex items-center gap-2">
                  <span>Rating</span>
                  <ChevronDown size={16} />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="above4.5">Above 4.5</SelectItem>
                <SelectItem value="4to4.5">4.0 - 4.5</SelectItem>
                <SelectItem value="below4">Below 4.0</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="bg-white"
              onClick={toggleSort}
            >
              <span className="flex items-center gap-2">
                <span>Sort</span>
                <ArrowUpDown size={16} />
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search by studio ID, name, etc."
                className="pl-10 w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Removed the duplicate action buttons section */}

        {/* Studios Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">S.NO</TableHead>
                <TableHead>STUDIO ID</TableHead>
                <TableHead>STUDIO NAME</TableHead>
                <TableHead>OWNER NAME</TableHead>
                <TableHead>PRIMARY CONTACT</TableHead>
                <TableHead>SERVICES</TableHead>
                <TableHead>RATING</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudios.map((studio) => (
                <TableRow key={studio.id}>
                  <TableCell>{studio.id}</TableCell>
                  <TableCell>{studio.studioId}</TableCell>
                  <TableCell>{studio.studioName}</TableCell>
                  <TableCell>{studio.ownerName}</TableCell>
                  <TableCell>{studio.contact}</TableCell>
                  <TableCell>{studio.services}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {studio.rating.toFixed(1)}
                      <Star className="ml-1 text-yellow-500 fill-yellow-500" size={16} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={studio.status}
                      onCheckedChange={() => {
                        // This would update the status in a real app
                        console.log(`Toggled status for ${studio.studioName}`);
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Studios;
