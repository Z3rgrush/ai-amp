import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Facebook, Search, MessageCircle, ShoppingCart, Download, Calendar, TrendingUp, TrendingDown, DollarSign, Eye, MousePointer, ShoppingBag, Target, Sparkles, Award, AlertCircle, Activity } from 'lucide-react';

const performanceData = [
  { date: '2025-01-01', meta: 450, google: 780, tiktok: 320, amazon: 890 },
  { date: '2025-01-02', meta: 520, google: 690, tiktok: 280, amazon: 920 },
  { date: '2025-01-03', meta: 480, google: 720, tiktok: 350, amazon: 850 },
  { date: '2025-01-04', meta: 600, google: 810, tiktok: 420, amazon: 980 },
  { date: '2025-01-05', meta: 550, google: 750, tiktok: 380, amazon: 1100 },
  { date: '2025-01-06', meta: 620, google: 830, tiktok: 450, amazon: 950 },
  { date: '2025-01-07', meta: 580, google: 780, tiktok: 390, amazon: 1050 }
];

const platformMetrics = [
  { name: 'Meta Ads', value: 3850, color: '#1877F2', growth: 12.5 },
  { name: 'Google Ads', value: 5360, color: '#4285F4', growth: 8.3 },
  { name: 'TikTok Ads', value: 2590, color: '#000000', growth: -3.2 },
  { name: 'Amazon Ads', value: 6745, color: '#FF9900', growth: 15.7 }
];

const conversionData = [
  { platform: 'Meta', conversions: 234, cost: 1250, roas: 4.2 },
  { platform: 'Google', conversions: 189, cost: 1890, roas: 3.8 },
  { platform: 'TikTok', conversions: 156, cost: 890, roas: 2.1 },
  { platform: 'Amazon', conversions: 298, cost: 1560, roas: 5.6 }
];

const campaignPerformance = [
  { name: 'Summer Sale', platform: 'Meta', impressions: 45678, clicks: 1234, conversions: 89, spend: 342, roas: 4.2 },
  { name: 'Product Launch', platform: 'Google', impressions: 67890, clicks: 2156, conversions: 145, spend: 652, roas: 3.8 },
  { name: 'Brand Awareness', platform: 'TikTok', impressions: 123456, clicks: 3456, conversions: 67, spend: 125, roas: 2.1 },
  { name: 'Romantasy PPC', platform: 'Amazon', impressions: 34567, clicks: 1876, conversions: 234, spend: 789, roas: 5.6 }
];

export function ReportingPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatNumber = (num: number) => num.toLocaleString();

  const totalSpend = platformMetrics.reduce((sum, platform) => sum + platform.value, 0);
  const totalConversions = conversionData.reduce((sum, item) => sum + item.conversions, 0);
  const avgRoas = conversionData.reduce((sum, item) => sum + item.roas, 0) / conversionData.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Performance Reports</h1>
          <p className="text-muted-foreground">Comprehensive analytics across all advertising platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* AI Insights Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            AI Performance Insights
          </CardTitle>
          <CardDescription>Key findings and trends from your advertising data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Amazon Outperforming</p>
                <p className="text-sm text-muted-foreground">Amazon Ads delivering 42% higher ROAS than average. Romantasy category showing exceptional results.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Weekend Performance Spike</p>
                <p className="text-sm text-muted-foreground">Conversion rates increase 23% on weekends. Consider shifting more budget to Friday-Sunday.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Mobile Traffic Dominance</p>
                <p className="text-sm text-muted-foreground">78% of clicks from mobile devices, but conversion rate 34% lower than desktop. Optimize mobile experience.</p>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Key Trend:</strong> Overall performance improved 12.5% week-over-week. Meta and Amazon driving growth while TikTok performance declining (-3.2%).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpend)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalConversions)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROAS</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRoas.toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.7%</span> from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">3 new</span> this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Daily revenue across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="meta" stroke="#1877F2" name="Meta" />
                <Line type="monotone" dataKey="google" stroke="#4285F4" name="Google" />
                <Line type="monotone" dataKey="tiktok" stroke="#000000" name="TikTok" />
                <Line type="monotone" dataKey="amazon" stroke="#FF9900" name="Amazon" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Spend Distribution</CardTitle>
            <CardDescription>Budget allocation across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformMetrics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Comparison</CardTitle>
          <CardDescription>ROAS and conversion metrics by platform</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="conversions" fill="#8884d8" name="Conversions" />
              <Bar dataKey="roas" fill="#82ca9d" name="ROAS" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Campaign Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Details</CardTitle>
          <CardDescription>Detailed metrics for each active campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Campaign</th>
                  <th className="text-left p-2">Platform</th>
                  <th className="text-right p-2">Impressions</th>
                  <th className="text-right p-2">Clicks</th>
                  <th className="text-right p-2">Conversions</th>
                  <th className="text-right p-2">Spend</th>
                  <th className="text-right p-2">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{campaign.name}</td>
                    <td className="p-2">
                      <Badge variant="outline">{campaign.platform}</Badge>
                    </td>
                    <td className="p-2 text-right">{formatNumber(campaign.impressions)}</td>
                    <td className="p-2 text-right">{formatNumber(campaign.clicks)}</td>
                    <td className="p-2 text-right">{campaign.conversions}</td>
                    <td className="p-2 text-right">{formatCurrency(campaign.spend)}</td>
                    <td className="p-2 text-right">
                      <span className={campaign.roas >= 4 ? 'text-green-600' : campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'}>
                        {campaign.roas}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}