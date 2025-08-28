import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Facebook,
  Search,
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Pause,
  Play,
  Settings,
  Target,
  DollarSign,
  Eye,
  MousePointer,
  ShoppingBag,
  Sparkles,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const mockCampaigns = [
  {
    id: 1,
    name: "Summer Beach Reads-1PD-Conversions",
    platform: "meta",
    status: "active",
    budget: 500,
    spent: 342,
    impressions: 45678,
    clicks: 1234,
    conversions: 89,
    ctr: 2.7,
    cpc: 0.28,
    roas: 4.2,
  },
  {
    id: 2,
    name: "Tor-Sanderson-Search",
    platform: "google",
    status: "active",
    budget: 800,
    spent: 652,
    impressions: 67890,
    clicks: 2156,
    conversions: 145,
    ctr: 3.2,
    cpc: 0.3,
    roas: 3.8,
  },
  {
    id: 3,
    name: "Jorly-The Grotto-TikTok Shop",
    platform: "tiktok",
    status: "paused",
    budget: 300,
    spent: 125,
    impressions: 123456,
    clicks: 3456,
    conversions: 67,
    ctr: 2.8,
    cpc: 0.04,
    roas: 2.1,
  },
  {
    id: 4,
    name: "SP - Romantasy Group",
    platform: "amazon",
    status: "active",
    budget: 1000,
    spent: 789,
    impressions: 34567,
    clicks: 1876,
    conversions: 234,
    ctr: 5.4,
    cpc: 0.42,
    roas: 5.6,
  },
];

const platforms = {
  meta: {
    name: "Meta Ads",
    icon: Facebook,
    color: "bg-blue-50 text-blue-600",
  },
  google: {
    name: "Google Ads",
    icon: Search,
    color: "bg-green-50 text-green-600",
  },
  tiktok: {
    name: "TikTok Ads",
    icon: MessageCircle,
    color: "bg-gray-50 text-gray-600",
  },
  amazon: {
    name: "Amazon Ads",
    icon: ShoppingCart,
    color: "bg-orange-50 text-orange-600",
  },
};

export function OptimizationPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(
    mockCampaigns[0],
  );
  const [budgetAdjustment, setBudgetAdjustment] = useState([
    selectedCampaign.budget,
  ]);

  // Update budget adjustment when campaign changes
  const handleCampaignSelect = (
    campaign: typeof selectedCampaign,
  ) => {
    setSelectedCampaign(campaign);
    setBudgetAdjustment([campaign.budget]);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-50 text-green-600 border-green-200",
      paused: "bg-yellow-50 text-yellow-600 border-yellow-200",
      ended: "bg-gray-50 text-gray-600 border-gray-200",
    };
    return (
      <Badge
        className={
          statusStyles[status as keyof typeof statusStyles] ||
          statusStyles.ended
        }
      >
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) =>
    `${amount.toLocaleString()}`;
  const formatNumber = (num: number) => num.toLocaleString();

  const getAIInsights = (campaign: typeof selectedCampaign) => {
    const conversionRate =
      (campaign.conversions / campaign.clicks) * 100;
    const spendRate = (campaign.spent / campaign.budget) * 100;

    switch (campaign.platform) {
      case "meta":
        return {
          insights: [
            {
              icon:
                campaign.roas >= 4 ? CheckCircle : TrendingUp,
              color:
                campaign.roas >= 4
                  ? "text-green-600"
                  : "text-blue-600",
              title:
                campaign.roas >= 4
                  ? "Strong ROAS Performance"
                  : "Improve Conversion Rate",
              description:
                campaign.roas >= 4
                  ? `Excellent ROAS of ${campaign.roas}x. Consider scaling budget by 30-50% to maximize profitable reach.`
                  : `Good CTR (${campaign.ctr}%) but conversion rate could improve. Test different landing pages and audience targeting.`,
            },
            {
              icon:
                campaign.ctr >= 2.5
                  ? CheckCircle
                  : AlertTriangle,
              color:
                campaign.ctr >= 2.5
                  ? "text-green-600"
                  : "text-yellow-600",
              title:
                campaign.ctr >= 2.5
                  ? "Optimize for Lookalikes"
                  : "Improve Ad Creative",
              description:
                campaign.ctr >= 2.5
                  ? "Strong CTR suggests good creative-audience fit. Create lookalike audiences from converters."
                  : "Low CTR indicates weak creative. Test new images, videos, and ad copy variations.",
            },
            {
              icon: TrendingUp,
              color: "text-blue-600",
              title: "A/B Test Ad Formats",
              description:
                "Test carousel vs single image ads and video content to improve engagement rates.",
            },
          ],
          priority:
            campaign.roas >= 4
              ? `High-performing campaign ready for scaling. Increase budget gradually while monitoring CPA.`
              : `Focus on improving conversion rate through landing page optimization and audience refinement.`,
        };

      case "google":
        return {
          insights: [
            {
              icon:
                campaign.ctr >= 3 ? CheckCircle : AlertTriangle,
              color:
                campaign.ctr >= 3
                  ? "text-green-600"
                  : "text-yellow-600",
              title:
                campaign.ctr >= 3
                  ? "Excellent CTR Performance"
                  : "Optimize Keywords",
              description:
                campaign.ctr >= 3
                  ? `Outstanding CTR of ${campaign.ctr}%. Add negative keywords to maintain quality and reduce wasted spend.`
                  : "Below-average CTR. Review keyword relevance and add more specific long-tail keywords.",
            },
            {
              icon:
                campaign.roas >= 3.5
                  ? TrendingUp
                  : AlertTriangle,
              color:
                campaign.roas >= 3.5
                  ? "text-blue-600"
                  : "text-yellow-600",
              title:
                campaign.roas >= 3.5
                  ? "Scale High-Performing Keywords"
                  : "Pause Low-Performing Keywords",
              description:
                campaign.roas >= 3.5
                  ? "Identify top-performing keywords and increase bids by 20-30% to capture more volume."
                  : "Review search terms report and pause keywords with poor performance or high CPA.",
            },
            {
              icon: CheckCircle,
              color: "text-green-600",
              title: "Expand Match Types",
              description:
                "Test broad match keywords with smart bidding to discover new relevant search queries.",
            },
          ],
          priority:
            campaign.roas >= 3.5
              ? `Strong Google Ads performance. Focus on keyword expansion and bid optimization for growth.`
              : `Review keyword strategy and quality score to improve overall campaign efficiency.`,
        };

      case "tiktok":
        return {
          insights: [
            {
              icon:
                campaign.status === "paused"
                  ? AlertTriangle
                  : TrendingDown,
              color:
                campaign.status === "paused"
                  ? "text-yellow-600"
                  : "text-red-600",
              title:
                campaign.status === "paused"
                  ? "Campaign Currently Paused"
                  : "Underperforming Campaign",
              description:
                campaign.status === "paused"
                  ? "Campaign paused due to low ROAS. Consider testing new creative formats before reactivating."
                  : `Low ROAS of ${campaign.roas}x suggests poor performance. Review targeting and creative strategy.`,
            },
            {
              icon:
                campaign.cpc <= 0.1 ? CheckCircle : TrendingUp,
              color:
                campaign.cpc <= 0.1
                  ? "text-green-600"
                  : "text-blue-600",
              title:
                campaign.cpc <= 0.1
                  ? "Low CPC Advantage"
                  : "Optimize for Engagement",
              description:
                campaign.cpc <= 0.1
                  ? `Excellent CPC of ${formatCurrency(campaign.cpc)}. Focus on improving post-click experience and conversion rates.`
                  : "TikTok offers lower CPCs. Focus on engaging video content that drives actions beyond just clicks.",
            },
            {
              icon: AlertTriangle,
              color: "text-orange-600",
              title: "Test Native Video Content",
              description:
                "Create authentic, user-generated style videos that blend naturally with TikTok feed content.",
            },
          ],
          priority:
            campaign.status === "paused"
              ? `Campaign paused. Develop new creative strategy with native TikTok content before relaunch.`
              : `Low ROAS requires immediate attention. Test new video creatives and younger audience segments.`,
        };

      case "amazon":
        return {
          insights: [
            {
              icon:
                campaign.roas >= 5 ? CheckCircle : TrendingUp,
              color:
                campaign.roas >= 5
                  ? "text-green-600"
                  : "text-blue-600",
              title:
                campaign.roas >= 5
                  ? "Exceptional Amazon Performance"
                  : "Scale Amazon Campaigns",
              description:
                campaign.roas >= 5
                  ? `Outstanding ROAS of ${campaign.roas}x. Aggressively scale budget and expand to related products/keywords.`
                  : "Good performance for Amazon PPC. Consider increasing bids on high-converting search terms.",
            },
            {
              icon:
                campaign.ctr >= 5 ? CheckCircle : TrendingUp,
              color:
                campaign.ctr >= 5
                  ? "text-green-600"
                  : "text-blue-600",
              title:
                campaign.ctr >= 5
                  ? "Strong Product Visibility"
                  : "Optimize Product Listings",
              description:
                campaign.ctr >= 5
                  ? `Excellent CTR of ${campaign.ctr}%. Focus on conversion optimization through pricing and reviews.`
                  : "Improve product images, titles, and bullet points to increase click-through rates.",
            },
            {
              icon: TrendingUp,
              color: "text-blue-600",
              title: "Expand Keyword Portfolio",
              description:
                "Add auto campaigns to discover new converting keywords and expand manual campaign targeting.",
            },
          ],
          priority:
            campaign.roas >= 5
              ? `Top-performing platform. Maximize investment here by increasing budgets and expanding product coverage.`
              : `Solid Amazon performance. Focus on keyword expansion and product listing optimization for growth.`,
        };

      default:
        return {
          insights: [],
          priority:
            "No specific insights available for this platform.",
        };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Campaign Optimization</h1>
        <p className="text-muted-foreground">
          Monitor and optimize your advertising campaigns for
          better performance
        </p>
      </div>

      {/* AI Insights Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI Optimization Insights - {selectedCampaign.name}
          </CardTitle>
          <CardDescription>
            Personalized recommendations for this{" "}
            {
              platforms[
                selectedCampaign.platform as keyof typeof platforms
              ].name
            }{" "}
            campaign
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getAIInsights(selectedCampaign).insights.map(
              (insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <insight.icon
                    className={`h-5 w-5 ${insight.color} mt-0.5 flex-shrink-0`}
                  />
                  <div>
                    <p className="font-medium">
                      {insight.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Priority Action:</strong>{" "}
              {getAIInsights(selectedCampaign).priority}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>
              Select a campaign to optimize
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCampaigns.map((campaign) => {
              const platform =
                platforms[
                  campaign.platform as keyof typeof platforms
                ];
              return (
                <div
                  key={campaign.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedCampaign.id === campaign.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleCampaignSelect(campaign)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded ${platform.color}`}
                    >
                      <platform.icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {campaign.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(campaign.status)}
                        <span className="text-sm text-muted-foreground">
                          ROAS: {campaign.roas}x
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Campaign Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded ${platforms[selectedCampaign.platform as keyof typeof platforms].color}`}
                  >
                    {(() => {
                      const IconComponent =
                        platforms[
                          selectedCampaign.platform as keyof typeof platforms
                        ].icon;
                      return (
                        <IconComponent className="h-4 w-4" />
                      );
                    })()}
                  </div>
                  <div>
                    <CardTitle>
                      {selectedCampaign.name}
                    </CardTitle>
                    <CardDescription>
                      {
                        platforms[
                          selectedCampaign.platform as keyof typeof platforms
                        ].name
                      }
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedCampaign.status)}
                  <Button variant="outline" size="sm">
                    {selectedCampaign.status === "active" ? (
                      <Pause className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold">
                    {formatNumber(selectedCampaign.impressions)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Impressions
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold">
                    {formatNumber(selectedCampaign.clicks)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Clicks
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedCampaign.conversions}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Conversions
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedCampaign.roas}x
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ROAS
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget Optimization
                </CardTitle>
                <CardDescription>
                  Adjust daily budget based on performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Daily Budget</span>
                    <span>
                      {formatCurrency(budgetAdjustment[0])}
                    </span>
                  </div>
                  <Slider
                    value={budgetAdjustment}
                    onValueChange={setBudgetAdjustment}
                    max={2000}
                    step={50}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>
                    Spent:{" "}
                    {formatCurrency(selectedCampaign.spent)}
                  </span>
                  <span>
                    Remaining:{" "}
                    {formatCurrency(
                      selectedCampaign.budget -
                        selectedCampaign.spent,
                    )}
                  </span>
                </div>
                <Progress
                  value={
                    (selectedCampaign.spent /
                      selectedCampaign.budget) *
                    100
                  }
                  className="w-full"
                />
                <Button className="w-full" size="sm">
                  Update Budget
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Key Metrics
                </CardTitle>
                <CardDescription>
                  Campaign performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CTR</span>
                    <span className="flex items-center gap-1">
                      {selectedCampaign.ctr}%
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPC</span>
                    <span className="flex items-center gap-1">
                      {formatCurrency(selectedCampaign.cpc)}
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="flex items-center gap-1">
                      {(
                        (selectedCampaign.conversions /
                          selectedCampaign.clicks) *
                        100
                      ).toFixed(1)}
                      %
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Settings className="h-3 w-3 mr-2" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Auto-Optimization Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Auto-Optimization Rules</CardTitle>
              <CardDescription>
                Set up automated optimization rules to improve
                campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Auto-pause low performing ads</p>
                  <p className="text-sm text-muted-foreground">
                    Pause ads with CTR below 1.5%
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Budget reallocation</p>
                  <p className="text-sm text-muted-foreground">
                    Move budget to high-performing campaigns
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Bid optimization</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically adjust bids for better ROAS
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}