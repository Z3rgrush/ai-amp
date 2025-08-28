import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Facebook,
  Search,
  MessageCircle,
  ShoppingCart,
  Upload,
  Target,
  DollarSign,
  Plus,
  X,
  Calendar as CalendarIcon,
  Users,
} from "lucide-react";
import { format } from "date-fns";

const platforms = [
  {
    id: "meta",
    name: "Meta Ads",
    icon: Facebook,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    id: "google",
    name: "Google Ads",
    icon: Search,
    color: "bg-green-50 text-green-600 border-green-200",
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    icon: MessageCircle,
    color: "bg-gray-50 text-gray-600 border-gray-200",
  },
  {
    id: "amazon",
    name: "Amazon Ads",
    icon: ShoppingCart,
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
];

type Adset = {
  id: string;
  name: string;
  interests: string[];
  customAudiences: string[];
  lookalikes: string[];
  targetAge: string;
  targetGender: string;
  targetLocation: string;
};

export function CreationPage() {
  const [selectedPlatform, setSelectedPlatform] =
    useState("meta");
  const [budgetType, setBudgetType] = useState<
    "daily" | "lifetime"
  >("daily");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [adData, setAdData] = useState({
    campaignName: "",
    objective: "",
    budget: "",
    audience: "",
    adTitle: "",
    adDescription: "",
    keywords: "",
    targetAge: "",
    targetLocation: "",
  });

  const [adsets, setAdsets] = useState<Adset[]>([
    {
      id: "1",
      name: "Default Adset",
      interests: [],
      customAudiences: [],
      lookalikes: [],
      targetAge: "",
      targetGender: "",
      targetLocation: "",
    },
  ]);

  const [newInterest, setNewInterest] = useState("");
  const [newCustomAudience, setNewCustomAudience] =
    useState("");

  const handleInputChange = (field: string, value: string) => {
    setAdData((prev) => ({ ...prev, [field]: value }));
  };

  const addAdset = () => {
    const newAdset: Adset = {
      id: Date.now().toString(),
      name: `Adset ${adsets.length + 1}`,
      interests: [],
      customAudiences: [],
      lookalikes: [],
      targetAge: "",
      targetGender: "",
      targetLocation: "",
    };
    setAdsets([...adsets, newAdset]);
  };

  const removeAdset = (id: string) => {
    if (adsets.length > 1) {
      setAdsets(adsets.filter((adset) => adset.id !== id));
    }
  };

  const updateAdset = (
    id: string,
    field: keyof Adset,
    value: any,
  ) => {
    setAdsets(
      adsets.map((adset) =>
        adset.id === id ? { ...adset, [field]: value } : adset,
      ),
    );
  };

  const addInterestToAdset = (adsetId: string) => {
    if (newInterest.trim()) {
      const adset = adsets.find((a) => a.id === adsetId);
      if (
        adset &&
        !adset.interests.includes(newInterest.trim())
      ) {
        updateAdset(adsetId, "interests", [
          ...adset.interests,
          newInterest.trim(),
        ]);
      }
      setNewInterest("");
    }
  };

  const removeInterestFromAdset = (
    adsetId: string,
    interest: string,
  ) => {
    const adset = adsets.find((a) => a.id === adsetId);
    if (adset) {
      updateAdset(
        adsetId,
        "interests",
        adset.interests.filter((i) => i !== interest),
      );
    }
  };

  const addCustomAudienceToAdset = (adsetId: string) => {
    if (newCustomAudience.trim()) {
      const adset = adsets.find((a) => a.id === adsetId);
      if (
        adset &&
        !adset.customAudiences.includes(
          newCustomAudience.trim(),
        )
      ) {
        updateAdset(adsetId, "customAudiences", [
          ...adset.customAudiences,
          newCustomAudience.trim(),
        ]);
      }
      setNewCustomAudience("");
    }
  };

  const removeCustomAudienceFromAdset = (
    adsetId: string,
    audience: string,
  ) => {
    const adset = adsets.find((a) => a.id === adsetId);
    if (adset) {
      updateAdset(
        adsetId,
        "customAudiences",
        adset.customAudiences.filter((a) => a !== audience),
      );
    }
  };

  const renderPlatformForm = () => {
    const platform = platforms.find(
      (p) => p.id === selectedPlatform,
    );

    if (!platform) return null;

    const IconComponent = platform.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg border ${platform.color}`}
          >
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <h3>{platform.name} Campaign</h3>
            <p className="text-muted-foreground">
              Create a new advertising campaign
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaignName">
                Campaign Name
              </Label>
              <Input
                id="campaignName"
                placeholder="Enter campaign name"
                value={adData.campaignName}
                onChange={(e) =>
                  handleInputChange(
                    "campaignName",
                    e.target.value,
                  )
                }
              />
            </div>

            <div>
              <Label htmlFor="objective">
                Campaign Objective
              </Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("objective", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">
                    Brand Awareness
                  </SelectItem>
                  <SelectItem value="traffic">
                    Traffic
                  </SelectItem>
                  <SelectItem value="conversions">
                    Conversions
                  </SelectItem>
                  <SelectItem value="leads">
                    Lead Generation
                  </SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="budget">Budget</Label>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      budgetType === "daily"
                        ? "font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    Daily
                  </span>
                  <Switch
                    checked={budgetType === "lifetime"}
                    onCheckedChange={(checked) =>
                      setBudgetType(
                        checked ? "lifetime" : "daily",
                      )
                    }
                  />
                  <span
                    className={
                      budgetType === "lifetime"
                        ? "font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    Lifetime
                  </span>
                </div>
              </div>
              <Input
                id="budget"
                type="number"
                placeholder={
                  budgetType === "daily" ? "100" : "1000"
                }
                value={adData.budget}
                onChange={(e) =>
                  handleInputChange("budget", e.target.value)
                }
              />
              {budgetType === "lifetime" && (
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {startDate
                          ? format(startDate, "MMM dd, yyyy")
                          : "Start Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {endDate
                          ? format(endDate, "MMM dd, yyyy")
                          : "End Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) =>
                          startDate ? date <= startDate : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="adTitle">Ad Title</Label>
              <Input
                id="adTitle"
                placeholder="Enter compelling ad title"
                value={adData.adTitle}
                onChange={(e) =>
                  handleInputChange("adTitle", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor="adDescription">
                Ad Description
              </Label>
              <Textarea
                id="adDescription"
                placeholder="Describe your product or service..."
                rows={3}
                value={adData.adDescription}
                onChange={(e) =>
                  handleInputChange(
                    "adDescription",
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* Adsets Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Ad Sets & Targeting
                </CardTitle>
                <CardDescription>
                  Configure audience targeting for your campaign
                </CardDescription>
              </div>
              <Button
                onClick={addAdset}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Adset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {adsets.map((adset, index) => (
              <Card key={adset.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {adset.name}
                    </CardTitle>
                    {adsets.length > 1 && (
                      <Button
                        onClick={() => removeAdset(adset.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Target Location</Label>
                      <Input
                        placeholder="United States, Canada, etc."
                        value={adset.targetLocation}
                        onChange={(e) =>
                          updateAdset(
                            adset.id,
                            "targetLocation",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Age Range</Label>
                      <Select
                        onValueChange={(value) =>
                          updateAdset(
                            adset.id,
                            "targetAge",
                            value,
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-24">
                            18-24
                          </SelectItem>
                          <SelectItem value="25-34">
                            25-34
                          </SelectItem>
                          <SelectItem value="35-44">
                            35-44
                          </SelectItem>
                          <SelectItem value="45-54">
                            45-54
                          </SelectItem>
                          <SelectItem value="55+">
                            55+
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Select
                        onValueChange={(value) =>
                          updateAdset(
                            adset.id,
                            "targetGender",
                            value,
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All
                          </SelectItem>
                          <SelectItem value="male">
                            Male
                          </SelectItem>
                          <SelectItem value="female">
                            Female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Interests</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add interest (e.g., technology, fitness)"
                        value={newInterest}
                        onChange={(e) =>
                          setNewInterest(e.target.value)
                        }
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          addInterestToAdset(adset.id)
                        }
                      />
                      <Button
                        onClick={() =>
                          addInterestToAdset(adset.id)
                        }
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {adset.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary">
                          {interest}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() =>
                              removeInterestFromAdset(
                                adset.id,
                                interest,
                              )
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Custom Audiences</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add custom audience (e.g., Website Visitors, Email List)"
                        value={newCustomAudience}
                        onChange={(e) =>
                          setNewCustomAudience(e.target.value)
                        }
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          addCustomAudienceToAdset(adset.id)
                        }
                      />
                      <Button
                        onClick={() =>
                          addCustomAudienceToAdset(adset.id)
                        }
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {adset.customAudiences.map(
                        (audience, idx) => (
                          <Badge key={idx} variant="outline">
                            {audience}
                            <X
                              className="h-3 w-3 ml-1 cursor-pointer"
                              onClick={() =>
                                removeCustomAudienceFromAdset(
                                  adset.id,
                                  audience,
                                )
                              }
                            />
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Creative Assets
            </CardTitle>
            <CardDescription>
              Upload images, videos, or other creative materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">
                Drop files here or click to upload
              </p>
              <Button variant="outline">Choose Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Create New Campaign</h1>
        <p className="text-muted-foreground">
          Design and launch advertising campaigns across
          multiple platforms
        </p>
      </div>

      <Tabs
        value={selectedPlatform}
        onValueChange={setSelectedPlatform}
      >
        <TabsList className="grid w-full grid-cols-4">
          {platforms.map((platform) => (
            <TabsTrigger
              key={platform.id}
              value={platform.id}
              className="flex items-center gap-2"
            >
              <platform.icon className="h-4 w-4" />
              {platform.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {platforms.map((platform) => (
          <TabsContent key={platform.id} value={platform.id}>
            <Card>
              <CardContent className="p-6">
                {renderPlatformForm()}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline">Save Draft</Button>
        <div className="flex gap-3">
          <Button variant="outline">Preview Campaign</Button>
          <Button>Launch Campaign</Button>
        </div>
      </div>
    </div>
  );
}