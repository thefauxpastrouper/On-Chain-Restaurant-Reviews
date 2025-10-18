import { NavLink } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Star,
  Edit,
  Trash2,
  Settings,
  UtensilsCrossed,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar";
import { ConnectWalletButton } from "./ConnectWalletButton";

const menuItems = [
  { title: "Browse Restaurants", url: "/", icon: Home },
  { title: "Register Restaurant", url: "/register", icon: PlusCircle },
  { title: "Add Review", url: "/add-review", icon: Star },
  { title: "Update Review", url: "/update-review", icon: Edit },
  { title: "Delete Review", url: "/delete-review", icon: Trash2 },
  { title: "Update Restaurant", url: "/update-restaurant", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">RestaurantChain</h2>
            <p className="text-xs text-muted-foreground">On-chain Reviews</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-accent"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <ConnectWalletButton />
      </SidebarFooter>
    </Sidebar>
  );
}
