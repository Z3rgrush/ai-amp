import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Plus, TrendingUp, BarChart3, Settings, Facebook, MessageCircle, Search, ShoppingCart } from 'lucide-react';
import { CreationPage } from './components/CreationPage';
import { OptimizationPage } from './components/OptimizationPage';
import { ReportingPage } from './components/ReportingPage';
import holtzbrinckoLogo from 'figma:asset/640c70a230d2ca6cfcbfb8dc76de64f5e1c70b54.png';

const navigation = [
  { name: 'Creation', icon: Plus, id: 'creation' },
  { name: 'Optimization', icon: TrendingUp, id: 'optimization' },
  { name: 'Reporting', icon: BarChart3, id: 'reporting' },
];

const platforms = [
  { name: 'Meta Ads', icon: Facebook, color: 'text-blue-600' },
  { name: 'Google Ads', icon: Search, color: 'text-green-600' },
  { name: 'TikTok Ads', icon: MessageCircle, color: 'text-black' },
  { name: 'Amazon Ads', icon: ShoppingCart, color: 'text-orange-600' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('creation');

  const renderContent = () => {
    switch (activeTab) {
      case 'creation':
        return <CreationPage />;
      case 'optimization':
        return <OptimizationPage />;
      case 'reporting':
        return <ReportingPage />;
      default:
        return <CreationPage />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-4">
              <div className="mb-4">
                <img 
                  src={holtzbrinckoLogo} 
                  alt="Holtzbrinck Publishing Group" 
                  className="h-8 w-auto mb-3"
                />
              </div>
              <h2 className="mb-2">AI-AMP</h2>
              <p className="text-muted-foreground">Ad Manager</p>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Platforms</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {platforms.map((platform) => (
                    <SidebarMenuItem key={platform.name}>
                      <SidebarMenuButton>
                        <platform.icon className={`h-4 w-4 ${platform.color}`} />
                        <span>{platform.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-hidden">
          <div className="p-6 h-full overflow-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}