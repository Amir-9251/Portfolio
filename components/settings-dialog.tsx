"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Settings, Palette, Eye, Layout, Star } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { toast } from "@/components/ui/use-toast"

interface SettingsProps {
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

// Define the settings interface
interface PortfolioSettings {
    // Appearance
    theme: string
    fontScale: number

    // Accessibility
    reducedMotion: boolean
    highContrast: boolean
    letterSpacing: number
    lineHeight: number

    // Layout
    contentDensity: string
    sectionVisibility: {
        about: boolean
        projects: boolean
        skills: boolean
        contact: boolean
    }
}

// Default settings
const defaultSettings: PortfolioSettings = {
    // Appearance
    theme: "system",
    fontScale: 1,

    // Accessibility
    reducedMotion: false,
    highContrast: false,
    letterSpacing: 0,
    lineHeight: 1.5,

    // Layout
    contentDensity: "default",
    sectionVisibility: {
        about: true,
        projects: true,
        skills: true,
        contact: true,
    },
}

export function SettingsDialog({ className, open, onOpenChange }: SettingsProps) {
    const { theme, setTheme } = useTheme()
    const [settings, setSettings] = useState<PortfolioSettings>({ ...defaultSettings })
    const [dialogOpen, setDialogOpen] = useState(false)

    // Handle controlled/uncontrolled state
    const isOpen = open !== undefined ? open : dialogOpen
    const setIsOpen = onOpenChange || setDialogOpen

    // Load settings from localStorage on component mount
    useEffect(() => {
        const savedSettings = localStorage.getItem("portfolio-settings")
        if (savedSettings) {
            try {
                const parsedSettings = JSON.parse(savedSettings)
                setSettings({ ...defaultSettings, ...parsedSettings })
                setTheme(parsedSettings.theme || "system")
            } catch (e) {
                console.error("Error parsing saved settings:", e)
            }
        }

        // Apply settings
        applySettings({ ...defaultSettings, ...JSON.parse(savedSettings || "{}") })
    }, [setTheme])

    // Apply all settings to the DOM
    const applySettings = (settingsToApply: PortfolioSettings) => {
        // Font scale
        document.documentElement.style.setProperty("--font-scale", settingsToApply.fontScale.toString())

        // Reduced motion
        if (settingsToApply.reducedMotion) {
            document.documentElement.classList.add("reduce-motion")
        } else {
            document.documentElement.classList.remove("reduce-motion")
        }

        // High contrast
        if (settingsToApply.highContrast) {
            document.documentElement.classList.add("high-contrast")
        } else {
            document.documentElement.classList.remove("high-contrast")
        }

        // Letter spacing
        document.documentElement.style.setProperty("--letter-spacing", `${settingsToApply.letterSpacing}em`)

        // Line height
        document.documentElement.style.setProperty("--line-height", settingsToApply.lineHeight.toString())

        // Content density
        document.documentElement.setAttribute("data-density", settingsToApply.contentDensity)

        // Section visibility
        Object.entries(settingsToApply.sectionVisibility).forEach(([section, isVisible]) => {
            const sectionElement = document.getElementById(section)
            if (sectionElement) {
                sectionElement.style.display = isVisible ? "" : "none"
            }
        })

        // Save settings
        localStorage.setItem("portfolio-settings", JSON.stringify(settingsToApply))
    }

    // Update a single setting
    const updateSetting = <K extends keyof PortfolioSettings>(key: K, value: PortfolioSettings[K]) => {
        const newSettings = { ...settings, [key]: value }
        setSettings(newSettings)

        // Special case for theme
        if (key === "theme") {
            setTheme(value as string)
        }

        // Apply the updated settings
        applySettings(newSettings)
    }

    // Update a nested setting
    const updateNestedSetting = (parent: keyof PortfolioSettings, key: string, value: any) => {
        const parentValue = { ...settings[parent] }
        parentValue[key] = value

        const newSettings = { ...settings, [parent]: parentValue }
        setSettings(newSettings)

        // Apply the updated settings
        applySettings(newSettings)
    }

    // Reset all settings to default
    const handleResetSettings = () => {
        setSettings({ ...defaultSettings })
        setTheme(defaultSettings.theme)
        applySettings(defaultSettings)

        toast({
            title: "Settings reset",
            description: "All settings have been reset to their default values.",
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className={`rounded-full ${className}`}>
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>Customize your portfolio viewing experience.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="appearance" className="mt-4">
                    <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="appearance" className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            <span className="hidden sm:inline">Appearance</span>
                        </TabsTrigger>
                        <TabsTrigger value="accessibility" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">Accessibility</span>
                        </TabsTrigger>
                        <TabsTrigger value="layout" className="flex items-center gap-2">
                            <Layout className="h-4 w-4" />
                            <span className="hidden sm:inline">Layout</span>
                        </TabsTrigger>
                        <TabsTrigger value="coming-soon" className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            <span className="hidden sm:inline">Coming Soon</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance" className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Color Theme</Label>
                                <RadioGroup
                                    id="theme"
                                    value={settings.theme}
                                    onValueChange={(value) => updateSetting("theme", value)}
                                    className="flex flex-wrap gap-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="light" id="light" />
                                        <Label htmlFor="light">Light</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="dark" id="dark" />
                                        <Label htmlFor="dark">Dark</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="system" id="system" />
                                        <Label htmlFor="system">System</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="font-scale">Font Size</Label>
                                    <span className="text-sm text-muted-foreground">{Math.round(settings.fontScale * 100)}%</span>
                                </div>
                                <Slider
                                    id="font-scale"
                                    min={0.8}
                                    max={1.4}
                                    step={0.05}
                                    value={[settings.fontScale]}
                                    onValueChange={(value) => updateSetting("fontScale", value[0])}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Accessibility Tab */}
                    <TabsContent value="accessibility" className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                                </div>
                                <Switch
                                    id="reduced-motion"
                                    checked={settings.reducedMotion}
                                    onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="high-contrast">High Contrast</Label>
                                    <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                                </div>
                                <Switch
                                    id="high-contrast"
                                    checked={settings.highContrast}
                                    onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="letter-spacing">Letter Spacing</Label>
                                    <span className="text-sm text-muted-foreground">{settings.letterSpacing}em</span>
                                </div>
                                <Slider
                                    id="letter-spacing"
                                    min={0}
                                    max={0.5}
                                    step={0.05}
                                    value={[settings.letterSpacing]}
                                    onValueChange={(value) => updateSetting("letterSpacing", value[0])}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="line-height">Line Height</Label>
                                    <span className="text-sm text-muted-foreground">{settings.lineHeight}x</span>
                                </div>
                                <Slider
                                    id="line-height"
                                    min={1}
                                    max={2}
                                    step={0.1}
                                    value={[settings.lineHeight]}
                                    onValueChange={(value) => updateSetting("lineHeight", value[0])}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Layout Tab */}
                    <TabsContent value="layout" className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="content-density">Content Density</Label>
                                <RadioGroup
                                    id="content-density"
                                    value={settings.contentDensity}
                                    onValueChange={(value) => updateSetting("contentDensity", value)}
                                    className="flex flex-col space-y-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="compact" id="compact" />
                                        <Label htmlFor="compact">Compact</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="default" id="default" />
                                        <Label htmlFor="default">Default</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="comfortable" id="comfortable" />
                                        <Label htmlFor="comfortable">Comfortable</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Section Visibility</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="show-about"
                                            checked={settings.sectionVisibility.about}
                                            onCheckedChange={(checked) => updateNestedSetting("sectionVisibility", "about", checked)}
                                        />
                                        <Label htmlFor="show-about">Show About Section</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="show-projects"
                                            checked={settings.sectionVisibility.projects}
                                            onCheckedChange={(checked) => updateNestedSetting("sectionVisibility", "projects", checked)}
                                        />
                                        <Label htmlFor="show-projects">Show Projects Section</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="show-skills"
                                            checked={settings.sectionVisibility.skills}
                                            onCheckedChange={(checked) => updateNestedSetting("sectionVisibility", "skills", checked)}
                                        />
                                        <Label htmlFor="show-skills">Show Skills Section</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="show-contact"
                                            checked={settings.sectionVisibility.contact}
                                            onCheckedChange={(checked) => updateNestedSetting("sectionVisibility", "contact", checked)}
                                        />
                                        <Label htmlFor="show-contact">Show Contact Section</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Coming Soon Tab */}
                    <TabsContent value="coming-soon" className="space-y-6">
                        <div className="space-y-4">
                            <div className="rounded-md bg-muted p-4">
                                <p className="text-sm text-muted-foreground mb-2">
                                    These features are planned for future updates. Stay tuned!
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Dark Mode Improvements</h4>
                                        <p className="text-xs text-muted-foreground">Enhanced dark mode with custom color schemes</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Blog Section</h4>
                                        <p className="text-xs text-muted-foreground">A dedicated blog section to share your thoughts</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Testimonials</h4>
                                        <p className="text-xs text-muted-foreground">Display testimonials from clients and colleagues</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">3D Elements</h4>
                                        <p className="text-xs text-muted-foreground">Interactive 3D elements to showcase your work</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Project Filtering</h4>
                                        <p className="text-xs text-muted-foreground">Filter projects by category, technology, or date</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Animated Background</h4>
                                        <p className="text-xs text-muted-foreground">Subtle animated backgrounds for visual interest</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Resume Builder</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Generate a customized resume from your portfolio data
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleResetSettings}>
                        Reset to Default
                    </Button>
                    <Button onClick={() => setIsOpen(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
